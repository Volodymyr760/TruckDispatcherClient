import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { EquipmentProfitability, LoadsByStatus } from "./types"
import { getEquipmentProfitabilityAxios, getLoadsNumbersByStatusAxios } from "../../../api/load"
import { Grid } from "@mui/material"
import AverageRatesCard from "./AverageRateCard"
import LoadsGrossCostsByStatusCard from "./LoadsGrossCostsByStatusCard"
import LoadsNumbersByStatusCard from "./LoadsNumbersByStatusCard"
import LoadsProfitByEquipmentCard from "./LoadsProfitByEquipmentCard"
import TruckNumbersByStatusCard from "./TrucksNumbersByStatusCard"
import WeekResultsCard from "./WeekResultsCard";
import "./styles.css"

export default function Dashboard() {
    const { auth } = useTypedSelector(state => state.auth)
    const [loadsByStatus, setLoadsByStatus] = useState<LoadsByStatus>(null)
    const [equipmentequipmentProfotabilityState, setEquipmentequipmentProfotabilityState] = useState<EquipmentProfitability>(null)

    const loadsNumbersFromdb = async () =>{
        const result = await getLoadsNumbersByStatusAxios(auth.user.id)
        setLoadsByStatus(result)
    };

    const equipmentProfitabilityFromdb = async () =>{
        const result = await getEquipmentProfitabilityAxios(auth.user.id)
        setEquipmentequipmentProfotabilityState(result)
    };

    useEffect(() => { 
        loadsNumbersFromdb()
        equipmentProfitabilityFromdb()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Helmet>
                <title>Truckdispatcher.top - Dashboard</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truckdispatcher.top" />
            </Helmet>
            <Grid container>
                <Grid item xs={12} md={4} sx={{ padding: "0 !important", marginBottom: "15px" }}
                        display="flex" justifyContent="center" alignItems="center">
                    <AverageRatesCard/>
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: "0 !important", marginBottom: "15px" }}
                        display="flex" justifyContent="center" alignItems="center">
                    <TruckNumbersByStatusCard/>
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: "0 !important", marginBottom: "15px" }}
                        display="flex" justifyContent="center" alignItems="center">
                    <LoadsProfitByEquipmentCard equipmentProfotability={equipmentequipmentProfotabilityState}/>
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: "0 !important", marginBottom: "15px" }}
                        display="flex" justifyContent="center" alignItems="center">
                    <WeekResultsCard/>
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: "0 !important", marginBottom: "15px" }}
                        display="flex" justifyContent="center" alignItems="center">
                    <LoadsNumbersByStatusCard loadsByStatus={loadsByStatus}/>
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: "0 !important", marginBottom: "15px" }}
                        display="flex" justifyContent="center" alignItems="center">
                    <LoadsGrossCostsByStatusCard loadsByStatus={loadsByStatus}/>
                </Grid>
            </Grid>
        </>
    )
}
