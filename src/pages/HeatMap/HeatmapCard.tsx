import { Link } from 'react-router-dom'
import { RouteNames } from '../../routing'
import { Grid, Paper, Tooltip } from '@mui/material'
import { HeatmapCardProps } from './types'
import InventoryIcon from '@mui/icons-material/Inventory'

export default function HeatmapCard({todayHeatmapState, tomorrowHeatmapState}: HeatmapCardProps): JSX.Element {
    
    const colorOfTodayHeatmapState: string = setColor(todayHeatmapState.ranq)
    const colorOfTomorrowHeatmapState: string = setColor(tomorrowHeatmapState.ranq)

    function setColor(ranq: number): string {
        let colorVariableFromCss: string
        switch(ranq){
            case 1:
                colorVariableFromCss = "var(--darkBlue)"
                break
            case 2:
                colorVariableFromCss = "var(--blue)"
                break
            case 3:
                colorVariableFromCss = "var(--lightyellow)"
                break
            case 4:
                colorVariableFromCss = "var(--orange)"
                break                                 
            default:
                colorVariableFromCss = "var(--red)"
                break
        }

        return colorVariableFromCss
    }

    return (
        <Paper elevation={6} className='price-card' sx={{ overflow: 'hidden', padding: "20px 14px" }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                <Grid item>
                    <span className='text-16' style={{ fontWeight: 800 }}>
                        {todayHeatmapState.state}
                    </span>
                </Grid>
                <Grid item>
                    <Tooltip title="See All Loads" placement="bottom">
                        <Link to={RouteNames.LOAD} style={{ textDecoration: 'none', color: 'var(--darkGrey)' }}>
                            <InventoryIcon sx={{ fill: 'var(--lightGrey)' }} />
                        </Link>
                    </Tooltip>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ margin: "10px 0" }} >
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                    <span className='text-14' style={{fontWeight: "bold"}}>
                        {new Date().toLocaleDateString("en-US", {month: "short", day: "numeric"})}
                    </span>
                    <div style={{ width: '15px', height: '15px', marginLeft: 10, backgroundColor: colorOfTodayHeatmapState, color: "white" }}></div>
                </div>
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                    <span className='text-14' style={{fontWeight: "bold"}}>
                        {(new Date(new Date().getTime() + 86400000)).toLocaleDateString("en-US", {month: "short", day: "numeric"})}
                    </span>
                    <div style={{ width: '15px', height: '15px', marginLeft: 10, backgroundColor: colorOfTomorrowHeatmapState, color: "white" }}></div>
                </div>
            </Grid>
            <div style={{textAlign: "center", margin: "15px 0"}}>
                <span className='text-14' style={{ fontWeight: "bold"  }}>
                    Pickups
                </span>
            </div>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ margin: "10px 0" }} >
                <span className='text-14' style={{ fontWeight: "bold"  }}>
                    {todayHeatmapState ? `$${todayHeatmapState.averagePickupRate}/mi` : "$0/mi"}
                </span>
                <span className='text-14' style={{ fontWeight: "bold"  }}>
                    {tomorrowHeatmapState ? `$${tomorrowHeatmapState.averagePickupRate}/mi` : "$0/mi"}
                </span>
            </Grid>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ margin: "10px 0" }} >
                <span className='text-14' style={{ fontWeight: "bold"  }}>
                    {todayHeatmapState ? todayHeatmapState.pickupsAmount : 0} load(s)
                </span>
                <span className='text-14' style={{ fontWeight: "bold"  }}>
                    {tomorrowHeatmapState ? tomorrowHeatmapState.pickupsAmount : 0} load(s)
                </span>
            </Grid>
            <div style={{textAlign: "center", margin: "15px 0"}}>
                <span className='text-14' style={{ fontWeight: "bold"  }}>
                    Deliveries
                </span>
            </div>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ margin: "10px 0" }} >
                <span className='text-14' style={{ fontWeight: "bold"  }}>
                    {todayHeatmapState ? `$${todayHeatmapState.averageDeliveryRate}/mi` : "$0/mi"}
                </span>
                <span className='text-14' style={{ fontWeight: "bold"  }}>
                    {tomorrowHeatmapState ? `$${tomorrowHeatmapState.averageDeliveryRate}/mi` : "$0/mi"}
                </span>
            </Grid>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ margin: "10px 0" }} >
                <span className='text-14' style={{ fontWeight: "bold"  }}>
                    {todayHeatmapState ? todayHeatmapState.deliveriesAmount : 0} load(s)
                </span>
                <span className='text-14' style={{ fontWeight: "bold"  }}>
                    {tomorrowHeatmapState ? tomorrowHeatmapState.deliveriesAmount : 0} load(s)
                </span>
            </Grid>
        </Paper>
    )
}
