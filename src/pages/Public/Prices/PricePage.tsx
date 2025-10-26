import React, { useEffect } from 'react'
import { Helmet } from "react-helmet"
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { Container, Grid } from '@mui/material'
import PageHeader from '../../../components/PageHeader/PageHeader'
import HomePriceCard from './HomePriceCard'
import Spinner from '../../../components/Spinner/Spinner'
import ErrorMessage from '../../../components/Messages/ErrorMessage'
import { useActions } from '../../../hooks/useActions'

export default function PricePage() {
    const { pricepackageSearchParams, error, loading } = useTypedSelector(state => state.pricepackage)
    const { searchPricepackages } = useActions()
    
    useEffect(() => {
        if (pricepackageSearchParams.itemList.length === 0) searchPricepackages(pricepackageSearchParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pricepackageSearchParams.sortField, pricepackageSearchParams.order])

    return (
        <Container maxWidth="lg" sx={{ minHeight: 'calc(100vh - 298px)' }}>
            <Helmet>
                <title>TruckDispatcher.top - Prices</title>
                <meta name="description" content="Forms for remote work and control with customers, business units and personnel, create your form with questions, add images, answer options and your comments - TruckDispatcher.top" />
            </Helmet>
            <PageHeader title="Prices" id="prices" />
            <Grid container>
                {
                    pricepackageSearchParams.itemList.map(pricepackage =>
                        <Grid item key={pricepackage.id} xs={12} md={4} sx={{ padding: "0 !important", marginBottom: "15px" }}
                            display="flex" justifyContent="center" alignItems="center">
                            <HomePriceCard pricepackage={pricepackage} />
                        </Grid>)
                }
            </Grid>
            {
                loading ? <Spinner /> :
                    error ? <ErrorMessage appearance="regular">{error}</ErrorMessage> : null
            }
        </Container>
    )
}
