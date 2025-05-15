import { Helmet } from "react-helmet"
import { Container, Grid } from "@mui/material"
import PageHeader from "../../../components/PageHeader/PageHeader"
import ResetPasswordForm from "./ResetPasswordForm"

export default function ResetPasswordPage(): JSX.Element {

    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>TruckDispatcher.com - Reset your password</title>
                <meta name="description" content="Forms for remote work and control with customers, business units and personnel, create your form with questions, add images, answer options and your comments - TruckDispatcher.com" />
            </Helmet>
            <PageHeader
                title="Reset your password."
                text="Send us new password you want use next time."
            />
            <Grid container direction="column" alignItems="center">
                <ResetPasswordForm />
            </Grid>
        </Container>
    )
}