import { useEffect } from "react"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { useActions } from "../../../hooks/useActions"
import { BillingTabPageProps } from "./types"
import { Container, Grid } from "@mui/material"
import Spinner from "../../../components/Spinner/Spinner"
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import PriceCard from "./PriceCard";

export default function PriceTabPage({ onCreate }: BillingTabPageProps) {
    const { pricepackageSearchParams, error, loading } = useTypedSelector(state => state.pricepackage)
    const { searchPricepackages } = useActions()

    useEffect(() => {
        if (pricepackageSearchParams.itemList.length === 0) searchPricepackages(pricepackageSearchParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pricepackageSearchParams.sortField, pricepackageSearchParams.order])

    return (
        <Container maxWidth="lg" className='layout-container'>
            <Grid container>
                {
                    pricepackageSearchParams.itemList.map(pricepackage =>
                        <Grid item key={pricepackage.id} xs={12} md={4} sx={{ padding: "0 !important", marginBottom: "15px" }}
                            display="flex" justifyContent="center" alignItems="space-between">
                            <PriceCard pricepackage={pricepackage} onOrder={() => onCreate(pricepackage)} />
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
