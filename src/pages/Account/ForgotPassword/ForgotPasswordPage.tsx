import { Helmet } from "react-helmet"
import { Container, Grid } from "@mui/material"
import PageHeader from "../../../components/PageHeader/PageHeader"
import ForgotPasswordForm from "./ForgotPasswordForm"

export default function ForgotPasswordPage(): JSX.Element {
    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>TruckDispatcher.com - Forgot password</title>
                <meta name="description" content="Forms for remote work and control with customers, business units and personnel, create your form with questions, add images, answer options and your comments = TruckDispatcher.com" />
            </Helmet>
            <PageHeader
                title="Send us your email."
                text="We will send the link with code to your email to confirm reset password action."
            />
            <Grid container direction="column" alignItems="center">
                <ForgotPasswordForm />
            </Grid>
        </Container>
    )
}