import { Helmet } from "react-helmet"
import { Container, Grid } from "@mui/material"
import PageHeader from "../../../components/PageHeader/PageHeader"
import ProfileForm from "./ProfileForm"

export default function ProfilePage(): JSX.Element {
    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>TruckDispatcher.top - Profile</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truckdispatcher.top" />
            </Helmet>
            <PageHeader title="Profile" text="Check or update your profile settings." />
            <Grid container direction="column" alignItems="center">
                <ProfileForm />
            </Grid>
        </Container>
    )
}