import { useState } from "react"
import { Helmet } from "react-helmet"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { TabPanelProps } from "./types"
import { IPricepackage } from "../../../types/pricepackage"
import { Box, Container, Tab, Tabs } from "@mui/material"
import InvoiceTabPage from "./InvoiceTabPage"
import PriceTabPage from "./PriceTabPage"
import InvoiceForm from "./InvoiceForm"

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other} >
            {value === index && (<Box sx={{ p: 3 }}><div>{children}</div></Box>)}
        </div>
    );
}

function a11yProps(index: number) {
    return { id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` }
}

export default function BillingPage() {
    const [tabValue, setTabValue] = useState(0)
    const [pricepackage, setPricepackage] = useState<IPricepackage | null>(null)
    const { invoiceSearchParams } = useTypedSelector(state => state.invoice)
    const changeTabHandler = (event: React.SyntheticEvent, newValue: number) => setTabValue(newValue)
    const onCreateHandler = (pricepackage: IPricepackage) => setPricepackage(pricepackage)

    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>Truskdispatcher.com - Billing</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truskdispatcher.com" />
            </Helmet>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={changeTabHandler} aria-label="Billing tabs">
                        <Tab
                            label={
                                invoiceSearchParams.itemList.filter(i => i.isRead === false).length > 0 ?
                                    "Invoices (" + invoiceSearchParams.itemList.filter(i => i.isRead === false).length + ")" :
                                    "Invoices"}
                            {...a11yProps(1)}
                            sx={{ textTransform: "none" }}
                        />
                        <Tab label="Prices" {...a11yProps(0)} sx={{ textTransform: "none" }} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={tabValue} index={0}>
                    <InvoiceTabPage onCreate={onCreateHandler} />
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={1}>
                    <PriceTabPage onCreate={onCreateHandler} />
                </CustomTabPanel>
            </Box>
            {pricepackage && <InvoiceForm pricepackage={pricepackage} onClose={() => setPricepackage(null)} />}
        </Container>
    )
}