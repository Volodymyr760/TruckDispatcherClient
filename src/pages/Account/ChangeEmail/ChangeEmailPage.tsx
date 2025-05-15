import { Helmet } from "react-helmet"
import { Container } from "@mui/material"
import PageHeader from "../../../components/PageHeader/PageHeader"
import ChangeEmailForm from "./ChangeEmailForm"

export default function ChangeEmailPage(): JSX.Element {
    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>TruckDispatcher.com - Change email</title>
                <meta name="description" content="Forms for remote work and control with customers, business units and personnel, create your form with questions, add images, answer options and your comments - TruckDispatcher.com" />
            </Helmet>
            <PageHeader title="Change Email" />
            <ChangeEmailForm />
        </Container>
    )
}