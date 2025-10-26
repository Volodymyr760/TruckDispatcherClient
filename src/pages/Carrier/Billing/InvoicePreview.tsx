import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from "react-helmet"
import { jsPDF } from "jspdf"
import html2canvas from 'html2canvas'
import { IInvoice } from '../../../types/invoice'
import { getInvoiceByIdAxios } from '../../../api/invoice'
import { Container, Grid, Tooltip } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import Spinner from '../../../components/Spinner/Spinner'
import ErrorMessage from '../../../components/Messages/ErrorMessage'

export default function InvoicePreview() {
    const { id } = useParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)
    const [invoice, setInvoice] = useState<IInvoice>(null)

    const getInvoice = async (id: string) => {
        try {
            setLoading(true)
            setError(null)
            setInvoice(await getInvoiceByIdAxios(id))
        } catch (error) {
            setError(error.message || 'Unknown server error.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getInvoice(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onDownload = () => {
        const input = document.getElementById('invoice');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4', true);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
                const imgX = (pdfWidth - imgWidth * ratio) / 2;
                const imgY = 30;
                pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
                pdf.save("download.pdf");
            });
    }

    return (
        <Container maxWidth="lg" className='layout-container'>
            <Helmet>
                <title>Truckdispatcher.top - Invoice preview</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truckdispatcher.top" />
            </Helmet>
            {loading ? <Spinner />
                :
                error ? <ErrorMessage appearance="large">{error}</ErrorMessage>
                    :
                    invoice ?
                        <div id="invoice" style={{ background: 'white', padding: '20px', position: 'relative' }}>
                            <Grid container direction="column" justifyContent="center" alignItems="center">
                                <Tooltip title='Download' placement="bottom">
                                    <DownloadIcon
                                        sx={{ cursor: 'pointer', fill: 'var(--lightGrey)', '&:hover': { fill: "green" }, position: "absolute", top: "15px", right: "15px" }}
                                        onClick={() => onDownload()}
                                    />
                                </Tooltip>
                                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                                    <Grid item>
                                        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" >
                                            <strong><p style={{ margin: "0" }}>Bank: </p></strong>
                                            <p style={{ margin: "0" }} className='text-12'>{invoice.bank}</p>
                                            <p style={{ margin: "0" }} className='text-12'>Address: {invoice.bankAddress}</p>
                                            <p style={{ margin: "0" }} className='text-12'>SWIFT: {invoice.swift}</p>
                                            <strong><p style={{ margin: "0" }}>Intermediary bank: </p></strong>
                                            <p style={{ margin: "0" }} className='text-12'>Name: {invoice.intermediaryBank}</p>
                                            <p style={{ margin: "0" }} className='text-12'>SWIFT: {invoice.intermediarySwift}</p>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" >
                                            <strong><p style={{ margin: "0" }}>Beneficiary: </p></strong>
                                            <p style={{ margin: "0" }} className='text-12'>{invoice.beneficiary}</p>
                                            <p style={{ margin: "0" }} className='text-12'>Account: {invoice.account}</p>
                                            <p style={{ margin: "0" }} className='text-12'>Email: {invoice.beneficiaryEmail}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <p className='pt1'>INVOICE #{invoice.invoiceNo}</p>
                                <p style={{ marginTop: '0' }}>
                                    Date: {new Date(invoice.createdAt.toString() + "Z").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"})}
                                </p>
                                <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: "20px" }}>
                                    <span className='text-14'>Invoiced to: {invoice.invoiceTo}</span>
                                    <span className='text-14'>Paid: {invoice.isPaid ? "Yes" : "No"}</span>
                                </Grid>
                                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                                    <Grid item>
                                        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" >
                                            <span className='text-14'>Account: {invoice.item}</span>
                                            <span className='text-14'>Months: {invoice.quantity}</span>
                                            <span className='text-14'>Price: ${invoice.price}</span>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" >
                                            <strong><span>Total: </span></strong>
                                            <span className='text-14'>${invoice.total.toFixed(2)}</span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                                    <p style={{ marginTop: "50px" }} className='text-14'>Comment: {invoice.notes}</p>
                                </Grid>
                            </Grid>
                            <p className='text-10' style={{ marginTop: '50px' }}>
                                * Downloaded pdf-document looks exactly as visible. Using mobile with small screen on download (right top button) please choose the landscape orientation.
                            </p>
                        </div>
                        :
                        <ErrorMessage appearance="regular">'Oops! Something went wrong.'</ErrorMessage>
            }
        </Container>
    )
}
