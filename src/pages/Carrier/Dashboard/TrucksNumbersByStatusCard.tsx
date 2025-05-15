import { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Link } from 'react-router-dom'
import { TrucksByStatus } from './types'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { RouteNames } from '../../../routing'
import { getTrucksNumbersByStatusAxios } from '../../../api/truck'
import { Grid, Paper, Tooltip } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

export default function TrucksNumbersByStatusCard() {
    const { auth } = useTypedSelector(state => state.auth)
    const [truckNumbers, setTruckNumbers] = useState<TrucksByStatus>(null)

    const truckNumbersFromdb = async () =>{
        const result = await getTrucksNumbersByStatusAxios(auth.user.id)
        setTruckNumbers(result)
    };
    
    useEffect(() => { 
        truckNumbersFromdb() 
        // eslint-disable-next-line
    }, [])
    
    return (
        <Paper elevation={6} className='price-card' sx={{ overflow: 'hidden', padding: "20px 14px" }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                <Grid item>
                    <span className='text-16' style={{ color: "var(--blue)", fontWeight: 800 }}>TRUCKS</span>                    
                </Grid>
                <Grid item>
                    <Tooltip title="See All Trucks" placement="bottom">
                        <Link to={RouteNames.TRUCK} style={{ textDecoration: 'none', color: 'var(--darkGrey)' }}>
                            <LocalShippingIcon sx={{ fill: 'var(--lightGrey)' }} />
                        </Link>
                    </Tooltip>
                </Grid>
            </Grid>
            <div style={{textAlign: "center", margin: "15px 0 0 0"}}>
                <span className='text-14' style={{ fontWeight: "bold"  }}>
                    {new Date(Date.now()).toLocaleDateString("en-US", {month: "short", day: "numeric"})}
                </span>
            </div>
            <div>
                <Doughnut
                    data={{
                        labels: ["On Road", "Pending", "Repair"],
                        datasets: [
                            {
                                label: "Trucks",
                                data: [
                                    truckNumbers ? truckNumbers.trucksOnRoad : 0, 
                                    truckNumbers ? truckNumbers.trucksPending : 0, 
                                    truckNumbers ? truckNumbers.trucksRepair : 0
                                ],
                                backgroundColor: [ "rgba(8, 145, 75, 0.8)", "rgba(255, 180, 0, 0.8)", "rgba(211, 47, 47, 0.8)" ],
                                borderRadius: 5
                            }
                        ]
                    }}
                    options={{maintainAspectRatio: false}}
                />
            </div>            
        </Paper>
    )
}
