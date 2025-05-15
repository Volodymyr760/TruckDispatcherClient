import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { RouteNames } from "../../../routing";
import { Role } from "../../../types/auth";
import { Container, Grid } from "@mui/material";
import { IntersectionObserverComponent } from "../../../components/IntersectionObserver/IntersectionObserverComponent";
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import Spinner from "../../../components/Spinner/Spinner";
import InvoiceSortFieldBar from "../../Carrier/Billing/InvoiceSortFieldBar";
import AdminInvoiceCard from "./AdminInvoiceCard";

export default function AdminInvoicesPage() {
    const { invoiceSearchParams, loading, error } = useTypedSelector(state => state.invoice);
    const { auth } = useTypedSelector(state => state.auth);
    const { getAllInvoices, setInvoicePage, loadMoreAllInvoices } = useActions();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.roles.includes(Role.Admin)) navigate(RouteNames.LOGIN);
        getAllInvoices({
            pageSize: invoiceSearchParams.pageSize,
            currentPage: invoiceSearchParams.currentPage,
            searchCriteria: invoiceSearchParams.searchCriteria,
            userId: '',
            sortField: invoiceSearchParams.sortField,
            order: invoiceSearchParams.order,
            includeNavProperties: invoiceSearchParams.includeNavProperties,
            itemList: [],
            pageCount: 0,
            totalItemsCount: 0
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        if (invoiceSearchParams.totalItemsCount === 0) return;
        entries.forEach((entry) => {
            if (entry.isIntersecting && invoiceSearchParams.currentPage * invoiceSearchParams.pageSize <= invoiceSearchParams.totalItemsCount) {
                loadMoreAllInvoices({
                    pageSize: invoiceSearchParams.pageSize,
                    currentPage: invoiceSearchParams.currentPage + 1,
                    searchCriteria: invoiceSearchParams.searchCriteria,
                    userId: '',
                    sortField: invoiceSearchParams.sortField,
                    order: invoiceSearchParams.order,
                    includeNavProperties: invoiceSearchParams.includeNavProperties,
                    itemList: [],
                    pageCount: 0,
                    totalItemsCount: 0
                })
                setInvoicePage(invoiceSearchParams.currentPage + 1);
            }
        });
    };

    return (
        <Container maxWidth="lg" className={loading ? 'layout-container loading-opacity' : 'layout-container'} >
            <Helmet>
                <title>Truskdispatcher.com - Admin Invoices</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truskdispatcher.com" />
            </Helmet>
            {/* Page Header */}
            <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
                <Grid item>
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                        <Grid item>
                            <InvoiceSortFieldBar fields={["Invoice No", "Created At", "Paid", "Read"]} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* Invoices List */}
            {
                invoiceSearchParams.itemList.length > 0 ?
                    <div style={{ margin: "30px 0" }}>
                        {invoiceSearchParams.itemList.map(invoice =>
                            <AdminInvoiceCard key={invoice.id} invoice={invoice} />
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
