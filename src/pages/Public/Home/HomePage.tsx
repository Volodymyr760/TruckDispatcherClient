import { useNavigate } from 'react-router-dom'
import { Helmet } from "react-helmet"
import { RouteNames } from '../../../routing'
import { Box, Container, Grid } from '@mui/material'
import ApartmentIcon from '@mui/icons-material/Apartment'
import CalculateIcon from '@mui/icons-material/Calculate'
import SettingsIcon from '@mui/icons-material/Settings'
import MuiButton from '../../../components/Button/MuiButton'
import PageHeader from '../../../components/PageHeader/PageHeader'
import AdventagesChapter from './AdventagesChapter'
import FeaturesPage from '../Features/FeaturesPage'
import PricePage from '../Prices/PricePage'
import HeatmapChapter from './HeatmapChapter/HeatmapChapter'

export default function HomePage(): JSX.Element {
    const navigate = useNavigate()
    
    return (
        <Container maxWidth="lg">
            <Helmet>
                <title>TruckDispatcher.top - Loadboard, Virtual Dispatcher, TMS and more over</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truckdispatcher.top" />
            </Helmet>
            <PageHeader title="Why Truck Dispatcher?" id="home" />
            <Grid container alignItems="center">
                <Grid item xs={12} md={6} sx={{ padding: '0 40px' }}>
                    <p className='pt2' style={{ textAlign: 'center' }}>Our Advantages</p>
                    <p style={{ textAlign: 'center' }}>
                        Find the best loads and book them with all your loads in one place
                    </p>
                </Grid>
                <Grid item xs={12} md={6} textAlign='center' sx={{ padding: '0 40px' }}>
                    <Box sx={{ width: '100%' }}>
                        <div style={{display: 'flex', textAlign: 'start', margin: '8px 0'}}>
                            <CalculateIcon />
                            <span style={{marginLeft: '20px'}}>We calculate RPM including deadheads</span>
                        </div>
                        <div style={{display: 'flex', textAlign: 'start', margin: '8px 0'}}>
                            <SettingsIcon />
                            <span style={{marginLeft: '20px'}}>Integrated profit calculator</span>
                        </div>
                        <div style={{display: 'flex', textAlign: 'start', margin: '8px 0'}}>
                            <ApartmentIcon />
                            <span style={{marginLeft: '20px'}}>Base TMS features</span>
                        </div>
                    </Box>
                </Grid>
            </Grid>
            <FeaturesPage />
            <PageHeader title="How It Works" />
            <AdventagesChapter />
            <div style={{ textAlign: 'center' }}>
                <MuiButton variant='contained' onClickHandler={() => navigate(RouteNames.HELP)}>
                    <span className='text-16' style={{color: "var(--lightgreywhite)"}}>Learn More</span>
                </MuiButton>
            </div>
            <PageHeader 
                title="Supply And Demand Heatmap" 
                text='You may need to sign in to view available heatmaps for all supported equipments.' 
            />
            <HeatmapChapter/>
            <PricePage />
            <PageHeader title="Get Started" text="Free Price Plan & Access To Dashboard" />
            <div style={{ textAlign: 'center' }}>
                <MuiButton variant='contained' onClickHandler={() => navigate(RouteNames.REGISTER)}>
                    <span className='text-16' style={{color: "var(--lightgreywhite)"}}>Sign Up</span>
                </MuiButton>
            </div>
        </Container>
    );
};
