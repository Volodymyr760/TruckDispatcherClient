import { Helmet } from "react-helmet"
import { Container, Grid } from "@mui/material"
import PageHeader from "../../../components/PageHeader/PageHeader"
import ChangeEmailForm from "./ChangeEmailForm"

export default function ChangeEmailPage(): JSX.Element {
    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>TruckDispatcher.top - Change email</title>
                <meta name="description" content="Forms for remote work and control with customers, business units and personnel, create your form with questions, add images, answer options and your comments - TruckDispatcher.top" />
            </Helmet>
            <PageHeader title="Change Email" />
            <Grid container direction="column" alignItems="center">
                <ChangeEmailForm />
            </Grid>
        </Container>
    )
}