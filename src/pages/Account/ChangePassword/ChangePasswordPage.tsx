import { Helmet } from "react-helmet"
import { Container, Grid } from "@mui/material"
import PageHeader from "../../../components/PageHeader/PageHeader"
import ChangePasswordForm from "./ChangePasswordForm"

export default function ChangePasswordPage(): JSX.Element {
    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>TruckDispatcher.com - Change password</title>
                <meta name="description" content="Forms for remote work and control with customers, business units and personnel, create your form with questions, add images, answer options and your comments - TruckDispatcher.com" />
            </Helmet>
            <PageHeader title="Change password" />
            <Grid container direction="column" alignItems="center">
                <ChangePasswordForm />
            </Grid>
        </Container>
    )
}