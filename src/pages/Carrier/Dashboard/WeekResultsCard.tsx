import { useEffect, useState } from 'react'
import { WeekResults } from './types'
import { getWeekResultsAxios } from '../../../api/load'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { Grid, Paper, Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

export default function WeekResultsCard() {
    const { auth } = useTypedSelector(state => state.auth)
    const [weekResults, setWeekResults] = useState<WeekResults>(null)

    const weekResultsFromdb = async () =>{
        const result = await getWeekResultsAxios(auth.user.id)
        setWeekResults(result)
    };

    var startDateTime = new Date()
    var finalDateTime = new Date(startDateTime.getTime() - 604800000); // - 7 days in ms
    
    useEffect(() => { 
        weekResultsFromdb() 
        // eslint-disable-next-line
    }, [])
    
    return (
        <Paper elevation={6} className='price-card' sx={{ overflow: 'hidden', padding: "20px 14px" }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                <Grid item>
                    <span className='text-16' style={{ color: "var(--blue)", fontWeight: 800 }}>WEEK RESULTS</span>
                </Grid>
                <Grid item>
                    <Tooltip title="Results for the last 7 days" placement="bottom">
                        <HelpOutlineIcon sx={{ cursor: 'pointer', fill: 'var(--lightGrey)' }}/>
                    </Tooltip>
                </Grid>
            </Grid>
            <div style={{textAlign: "center", margin: "15px 0"}}>
                <span className='text-14' style={{ fontWeight: "bold"  }}>
                    {finalDateTime.toLocaleDateString("en-US", {month: "short", day: "numeric"})} - {new Date(Date.now()).toLocaleDateString("en-US", {month: "short", day: "numeric"})}
                </span>
            </div>
            {/* Options list */}
            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"  }}>
                        Mileage
                    </span>
                </Grid>
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"  }}>{weekResults ? weekResults.totalMiles : 0}</span>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"}}>
                        Average Rate
                    </span>
                </Grid>
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"}}>{weekResults ? weekResults.averageRate : 0}</span>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"}}>
                        Miles Per Truck
                    </span>
                </Grid>
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"}}>{weekResults ? weekResults.milesPerTruck : 0}</span>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"  }}>
                        Gross
                    </span>
                </Grid>
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"  }}>{weekResults ? weekResults.totalRate : 0}</span>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"}}>
                        Profit
                    </span>
                </Grid>
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"}}>{weekResults ? weekResults.totalProfit : 0}</span>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"}}>
                        Costs
                    </span>
                </Grid>
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"}}>{weekResults ? weekResults.totalCosts : 0}</span>
                </Grid>
            </Grid>
        </Paper>
    )
}
