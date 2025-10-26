import { Helmet } from "react-helmet"
import { Container } from "@mui/material"
import PageHeader from "../../../components/PageHeader/PageHeader"
import SuccessMessage from "../../../components/Messages/SuccessMessage"

export default function RegisterCompletePage(): JSX.Element {
    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>TruckDispatcher.top - Registration complete</title>
                <meta name="description" content="Forms for remote work and control with customers, business units and personnel, create your form with questions, add images, answer options and your comments - TruckDispatcher.top" />
            </Helmet>
            <PageHeader title="Registration is successful" />
            <SuccessMessage appearance="regular">
                Please check your mail-box and confirm the email-address before login.
            </SuccessMessage>
        </Container>
    )
}