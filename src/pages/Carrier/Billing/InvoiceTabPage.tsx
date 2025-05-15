import { useEffect, useState } from "react"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { useActions } from "../../../hooks/useActions"
import { BillingTabPageProps } from "./types"
import { IPricepackage } from "../../../types/pricepackage"
import { Button, Container, Grid, Menu, MenuItem } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Spinner from "../../../components/Spinner/Spinner"
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import { IntersectionObserverComponent } from "../../../components/IntersectionObserver/IntersectionObserverComponent"
import InvoiceCard from "./InvoiceCard"
import InvoiceSortFieldBar from "./InvoiceSortFieldBar"

export default function InvoiceTabPage({ onCreate }: BillingTabPageProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const openNewInvoiceMenu = Boolean(anchorEl)
    const { invoiceSearchParams, loading, error } = useTypedSelector(state => state.invoice)
    const { pricepackageSearchParams } = useTypedSelector(state => state.pricepackage)
    const { getInvoices, searchPricepackages, setInvoicePage, loadMoreInvoices } = useActions()

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        if (invoiceSearchParams.totalItemsCount === 0) return;
        entries.forEach((entry) => {
            if (entry.isIntersecting && invoiceSearchParams.currentPage * invoiceSearchParams.pageSize <= invoiceSearchParams.totalItemsCount) {
                loadMoreInvoices({
                    pageSize: invoiceSearchParams.pageSize,
                    currentPage: invoiceSearchParams.currentPage + 1,
                    searchCriteria: invoiceSearchParams.searchCriteria,
                    userId: invoiceSearchParams.userId,
                    sortField: invoiceSearchParams.sortField,
                    order: invoiceSearchParams.order,
                    includeNavProperties: false,
                    itemList: [],
                    pageCount: 0,
                    totalItemsCount: 0
                })
                setInvoicePage(invoiceSearchParams.currentPage + 1)
            }
        });
    };

    useEffect(() => {
        getInvoices(invoiceSearchParams)
        if (pricepackageSearchParams.itemList.length === 0) searchPricepackages(pricepackageSearchParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceSearchParams.searchCriteria, invoiceSearchParams.sortField, invoiceSearchParams.order])

    const onOpenMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)

    const onCloseMenu = () => setAnchorEl(null)

    const onCreateInvoice = (pricepackage: IPricepackage) => {
        onCreate(pricepackage)
        setAnchorEl(null)
    }

    return (
        <Container maxWidth="lg" className='layout-container'>
            {/* Page Header */}
            <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
                <Grid item>
                    <InvoiceSortFieldBar
                        fields={["Invoice No", "Created At", "Paid", "Read"]}
                    />
                </Grid>
                <Grid item>
                    <Button
                        id="create-invoice-button"
                        aria-controls={openNewInvoiceMenu ? 'create-invoice-button' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openNewInvoiceMenu ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        color="primary"
                        onClick={onOpenMenu}
                        endIcon={<KeyboardArrowDownIcon />}
                        sx={{ textTransform: 'none', borderRadius: "16px" }}
                    >
                        <span className="text-16" style={{color: "var(--lightgreywhite)"}}>+ Order</span>
                    </Button>
                    <Menu
                        sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                        keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                        open={openNewInvoiceMenu} onClose={onCloseMenu}
                    >
                        {
                            pricepackageSearchParams.itemList.map(pricepackage =>
                                pricepackage.name !== "Trial" &&
                                <MenuItem key={pricepackage.id} onClick={() => onCreateInvoice(pricepackage)}>
                                    <span className="text-16" style={{ textAlign: "left", fontSize: "0.95rem" }}>
                                        {pricepackage.name}
                                    </span>
                                </MenuItem>)
                        }
                    </Menu>
                </Grid>
            </Grid>
            {/* Invoices List */}
            {
                invoiceSearchParams.itemList.length > 0 ?
                    <div style={{ margin: "30px 0" }}>
                        {invoiceSearchParams.itemList.map(invoice =>
                            <InvoiceCard key={invoice.id} invoice={invoice} />
                        )}
                    </div> :
                    loading ? <Spinner /> :
                        error ? <ErrorMessage appearance="regular">{error}</ErrorMessage> :
                            <p style={{ padding: "0 15px" }}>No invoices</p>
            }
            <IntersectionObserverComponent onIntersection={handleIntersection} />
            {(invoiceSearchParams.itemList.length > 0 && loading) && <Spinner />}
        </Container>
    )
}
