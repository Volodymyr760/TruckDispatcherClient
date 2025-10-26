import { Link } from "react-router-dom"
import { RouteNames } from "../../../routing"
import { Helmet } from "react-helmet"
import { Container, Grid } from "@mui/material"
import PageHeader from "../../../components/PageHeader/PageHeader"
import RegisterForm from "./RegisterForm"

export default function RegisterPage(): JSX.Element {
    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>TruckDispatcher.top - Sign Up</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truckdispatcher.top" />
            </Helmet>
            <PageHeader title="Sign Up" />
            <Grid container direction="column" alignItems="center">
                <RegisterForm />
                <p className="text-16" style={{margin: "24px 0"}} >
                    Or <Link to={RouteNames.LOGIN}>Sign In</Link> if you already registered.
                </p>                
            </Grid>
        </Container>
    )
}
