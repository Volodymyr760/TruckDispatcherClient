import { Helmet } from "react-helmet"
import { ErrorPageProps } from './types'
import { Container, Grid } from '@mui/material'
import PageHeader from '../../../components/PageHeader/PageHeader'
import '../../../index.css'

export default function ErrorPage({ status = '404', message = 'Page Not Found' }: ErrorPageProps): JSX.Element {

    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>TruckDispatcher.com - Page not found</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truskdispatcher.com" />
            </Helmet>
            <PageHeader title="Oops! Something went wrong." />
            <Grid>
                <p className="text-14" style={{ color: 'var(--red)', padding: '10px' }}>
                    {message}
                </p>
                <p className='text-14' style={{ padding: '10px', marginTop: '20px' }}>Error status: {status}</p>
            </Grid>
        </Container>
    )

};
