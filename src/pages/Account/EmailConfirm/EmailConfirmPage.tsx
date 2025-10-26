import { Helmet } from "react-helmet"
import { Container } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { RouteNames } from "../../../routing"
import { confirmEmailAxios } from "../../../api/user"
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import PageHeader from "../../../components/PageHeader/PageHeader"
import Spinner from "../../../components/Spinner/Spinner"
import SuccessMessage from "../../../components/Messages/SuccessMessage"

export default function EmailConfirmPage(): JSX.Element {
    const [searchParams] = useSearchParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)

    const tryToConfirmEmailByUrlParams = async () => {
        try {
            setLoading(true)
            setError(null)
            await confirmEmailAxios(searchParams.get("code"), searchParams.get("email"))
        } catch (error) {
            setError(error.message || 'Unknown server error.')
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        tryToConfirmEmailByUrlParams()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>TruckDispatcher.top - Email confirmation page</title>
                <meta name="description" content="Forms for remote work and control with customers, business units and personnel, create your form with questions, add images, answer options and your comments = TruckDispatcher.top" />
            </Helmet>
            <PageHeader title="Email Confirmation" />
            {loading ? <Spinner />
                :
                error ? <ErrorMessage appearance="regular">{error}</ErrorMessage>
                    :
                    <SuccessMessage appearance="regular">
                        Email has been successfully verified. Please <Link to={RouteNames.LOGIN}>Sign In</Link> to continue.
                    </SuccessMessage>
            }
        </Container>
    )
}