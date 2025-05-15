import { Link } from "react-router-dom"
import { RouteNames } from "../../../routing"
import { Helmet } from "react-helmet"
import { Container, Grid } from "@mui/material"
import PageHeader from "../../../components/PageHeader/PageHeader"
import LoginForm from "./LoginForm"

export default function LoginPage(): JSX.Element {

    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>TruckDispatcher.com - Sign In</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truskdispatcher.com" />
            </Helmet>
            <PageHeader title="Sign In" />
            <Grid container direction="column" alignItems="center">
                <LoginForm />
                <p className="text-16" style={{margin: "24px 0"}} >
                    Or <Link to={RouteNames.REGISTER}>Sign Up</Link> if you don't have an account yet.
                </p>
                <p className="text-16" style={{margin: "24px 0"}} >
                    <Link to={RouteNames.FORGOT_PASSWORD}>Forgot password?</Link>
                </p>
            </Grid>
        </Container>
    )
}
