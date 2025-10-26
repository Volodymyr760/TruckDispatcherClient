import { useContext } from "react"
import { Helmet } from "react-helmet"
import { Container, Grid } from '@mui/material'
import ApartmentIcon from '@mui/icons-material/Apartment'
import CheckIcon from '@mui/icons-material/Check'
import InventoryIcon from '@mui/icons-material/Inventory'
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck'
import PageHeader from '../../../components/PageHeader/PageHeader'
import ThemeContext from "../../../components/Context/ThemeContext"

export default function FeaturesPage() {
    const themeContext = useContext(ThemeContext);
    const { theme } = themeContext;
    
    return (
        <Container maxWidth="lg" sx={{ minHeight: 'calc(100vh - 298px)' }}>
            <Helmet>
                <title>TruckDispatcher.top - Help</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truckdispatcher.top" />
            </Helmet>
            <PageHeader title="Possibilities" />
            <Grid container alignItems="flex-start" sx={{ backgroundColor: theme === 'dark' ? 'var(--bgLight)' : 'var(--lightgreywhite)', padding: '20px 0' }}>
                <Grid item xs={12} md={4} sx={{ padding: '0 20px', mb: "30px" }}>
                    <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item>
                            <InventoryIcon fontSize='large' sx={{ fill: 'var(--lightGrey)', mr: "10px" }} />
                        </Grid>
                        <Grid item>
                            <span className='pt2' style={{ textAlign: 'center' }}>Loads</span>
                        </Grid>
                    </Grid>
                    <p style={{ textAlign: 'center' }}>
                        Searching the best loads for your trucks
                    </p>
                    <div style={{display: 'flex', textAlign: 'start', margin: '8px 0'}}>
                        <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                        <span style={{marginLeft: '20px'}}>Aggregation of loads from over 200 brokers.</span>
                    </div>
                    <div style={{display: 'flex', textAlign: 'start', margin: '8px 0'}}>
                        <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                        <span style={{marginLeft: '20px'}}>In search results, RPM is calculated taking into account deadheads.</span>
                    </div>
                    <div style={{display: 'flex', textAlign: 'start', margin: '8px 0'}}>
                        <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                        <span style={{marginLeft: '20px'}}>Integrated profit calculator in search results.</span>
                    </div>
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: '0 20px', mb: "30px" }}>
                    <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item>
                            <NetworkCheckIcon fontSize='large' sx={{ fill: 'var(--lightGrey)', mr: "10px" }} />
                        </Grid>
                        <Grid item>
                            <span className='pt2' style={{ textAlign: 'center' }}>Forecasting</span>
                        </Grid>
                    </Grid>
                    <p style={{ textAlign: 'center' }}>
                        Backhauls, Payments And Heatmap
                    </p>
                    <div style={{display: 'flex', textAlign: 'start', margin: '8px 0'}}>
                        <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                        <span style={{marginLeft: '20px'}}>Planning - for each load in the search results, a calculation of backhauls is available.</span>
                    </div>
                    <div style={{display: 'flex', textAlign: 'start', margin: '8px 0'}}>
                        <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                        <span style={{marginLeft: '20px'}}>Thanks to support for load statuses, information about expected revenues and already achieved financial results is available on the dashboard.</span>
                    </div>
                    <div style={{display: 'flex', textAlign: 'start', margin: '8px 0'}}>
                        <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                        <span style={{marginLeft: '20px'}}>Heatmap is calculated for 'Today' and 'Tomorrow' for each state and type of equipment - hopefully your trucks will always be on the move.</span>
                    </div>
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: '0 20px', mb: "30px" }}>
                    <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item>
                            <ApartmentIcon fontSize='large' sx={{ fill: 'var(--lightGrey)', mr: "10px" }} />
                        </Grid>
                        <Grid item>
                            <span className='pt2' style={{ textAlign: 'center' }}>TMS</span>
                        </Grid>
                    </Grid>
                    <p style={{ textAlign: 'center' }}>
                        The information system contains data on trucks (and their statuses), drivers, completed trips and key financial results.
                    </p>
                    <div style={{display: 'flex', textAlign: 'start', margin: '8px 0'}}>
                        <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                        <span style={{marginLeft: '20px'}}>Monitoring the workload of the truck fleet and drivers.</span>
                    </div>
                    <div style={{display: 'flex', textAlign: 'start', margin: '8px 0'}}>
                        <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                        <span style={{marginLeft: '20px'}}>Tracking booked downloads, 'in progress' and payments.</span>
                    </div>
                    <div style={{display: 'flex', textAlign: 'start', margin: '8px 0'}}>
                        <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                        <span style={{marginLeft: '20px'}}>Comparison of profitability of different types of equipment.</span>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}
