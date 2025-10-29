import { Helmet } from "react-helmet"
import { RouteNames } from '../../../routing'
import { Container } from '@mui/material'
import PageHeader from '../../../components/PageHeader/PageHeader'
import AdventagesChapter from './AdventagesChapter'
import FeaturesPage from '../Features/FeaturesPage'
import HeatmapChapter from './HeatmapChapter/HeatmapChapter'
import PricePage from '../Prices/PricePage'
import TopPageChapter from './TopPageChapter'
import RedirectButton from './RedirectButton'

export default function HomePage(): JSX.Element {
    return (
        <Container maxWidth="lg">
            <Helmet>
                <title>TruckDispatcher.top - Loadboard, Virtual Dispatcher, TMS and more over</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truckdispatcher.top" />
            </Helmet>
            <PageHeader title="Why Truck Dispatcher?" id="home" />
            <TopPageChapter />
            <FeaturesPage />
            <PageHeader title="How It Works" />
            <AdventagesChapter />
            <RedirectButton route={RouteNames.HELP} title='Learn More' />
            <PageHeader
                title="Supply And Demand Heatmap"
                text='You may need to sign in to view available heatmaps for all supported equipments.'
            />
            <HeatmapChapter />
            <PricePage />
            <PageHeader title="Get Started" text="Free Price Plan & Access To Dashboard" />
            <RedirectButton route={RouteNames.REGISTER} title='Sign Up' />
        </Container>
    );
};
