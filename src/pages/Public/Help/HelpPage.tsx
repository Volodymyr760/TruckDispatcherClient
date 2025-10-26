import { Helmet } from "react-helmet"
import { Container } from "@mui/material"
import PageHeader from "../../../components/PageHeader/PageHeader"
import AccordionWrapper from "./AccordionWrapper"

export default function HelpPage() {

    return (
        <Container maxWidth="lg" sx={{ minHeight: 'calc(100vh - 320px)' }}>
            <Helmet>
                <title>TruckDispatcher.top - Help</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truckdispatcher.top" />
            </Helmet>
            <PageHeader title="How To Use" />
            <AccordionWrapper title="Let's get started" contentId="content10" panelId="panel10">
                <span className="text-16" style={{fontWeight: 600}}>
                    We hope you have successfully registered, confirmed your email,
                    signed in the site and gained access to the Dashboard (top right).
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/dashboard.jpg"} alt="" width='80%'
                        style={{ margin: '20px 0' }} />
                </div>
            </AccordionWrapper>
            <AccordionWrapper title="Creating a new truck" contentId="content20" panelId="panel20" >
                <span className="text-16">
                    On Dashboard page select option Trucks (1) from the left menu and click the button "+ Truck" (2).
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/creating-truck-1.jpg"} alt="creating truck" width='100%'
                        style={{ margin: '20px 0' }} />
                </div>
                <span className="text-16">
                    The creating / editing window will open:
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/creating-truck-2.jpg"} alt="creating truck" width='100%'
                        style={{ margin: '20px 0' }} />
                </div>
                <span className="text-16">
                    Change the required fields and click "Save".
                </span>
            </AccordionWrapper>
            <AccordionWrapper title="Search" contentId="content30" panelId="panel30" >
                <span className="text-16">
                    Use the search button (1) on the left, select the truck and other parameters, then click the "Search" button (2).
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/search-1.jpg"} alt="search" width='100%'
                        style={{ margin: '20px 0' }} />
                </div>
                <span className="text-16">
                    Save noteworthy loads to your own list using the "Save To Loads" button (1).
                </span>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/search-2.jpg"} alt="search" width='100%'
                        style={{ margin: '20px 0' }} />
                </div>
            </AccordionWrapper>
            <AccordionWrapper title="Truck statuses" contentId="content40" panelId="panel40" >
                <p className="text-16">
                    Each truck can have one of the following statuses: "Pending", "On Road" or "Repair". 
                    You can change the current status in the truck edit form.
                </p>
                <p className="text-16">
                    Maintaining the current status of the truck allows you not to miss the need to load it.
                </p>
            </AccordionWrapper>
            <AccordionWrapper title="Load statuses" contentId="content50" panelId="panel50" >
                <p className="text-16">
                    Orders retrieved from search results can have the following statuses: "Saved", "Booked", "InProgress", "Completed" or "Payed", which correspond to the "lifecycle" of the load.
                    To change the current load status, use the edit form on the "Loads" page.
                </p>
                <p className="text-16">
                    Maintaining up-to-date order statuses helps to track the load of the truck fleet and is the basis for calculating financial results in the Dashboard page.
                </p>
            </AccordionWrapper>
            <AccordionWrapper title="Heatmap" contentId="content60" panelId="panel60" >
                <p className="text-16" >
                    The heatmap displays supply and demand trends across all states based on the number of loads, 
                    their prices and distances published for today and tomorrow.
                </p>
                <p>
                    <span style={{ float: "left", width: '15px', height: '15px', backgroundColor: "var(--darkBlue)" }}></span>
                    <span style={{ float: "left", width: '15px', height: '15px', marginLeft: 10, backgroundColor: "var(--blue)" }}></span>
                    <span style={{ float: "left", width: '15px', height: '15px', marginLeft: 10, backgroundColor: "var(--lightyellow)" }}></span>
                    <span style={{ float: "left", width: '15px', height: '15px', marginLeft: 10, backgroundColor: "var(--orange)" }}></span>
                    <span style={{ float: "left", width: '15px', height: '15px', marginLeft: 10, backgroundColor: "var(--red)" }}></span>
                    <span className="text-16" style={{marginLeft: 10}}> - from a smaller number of loads (with low price and short distance) 
                        to a larger number (with high price and long distance)
                    </span>
                </p>
            </AccordionWrapper>
            <AccordionWrapper title="Billing" contentId="content70" panelId="panel70" >
                <p className="text-16">
                    To receive an invoice for payment - on the Billing page (1),
                    use the "+ Order" button (2) and specify the desired options in the invoice settings window.
                </p>
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/billing-1.jpg"} alt="billing" width='80%'
                        style={{ margin: '20px 0' }} />
                </div>
                <br />
                <div style={{ padding: '0 30px', textAlign: "center" }}>
                    <img src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/billing-11.jpg"} alt="billing" width='80%'
                        style={{ margin: '20px 0' }} />
                </div>
                <p className="text-16">
                    Receipt of account payment is checked 2 times a day
                    and the administrator changes the limits of the user's price package. 
                </p>
                <p className="text-16">
                    When the paid package expires, the administrator returns the Free price package to the 
                    user, but searching or creating new trucks, drivers and loads will be disabled.
                </p>
            </AccordionWrapper>
        </Container>
    )
}
