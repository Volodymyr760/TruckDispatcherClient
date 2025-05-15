import { Link } from 'react-router-dom'
import { RouteNames } from '../../../routing'
import { LoadsByStatusCardProps } from './types'
import { Grid, Paper, Tooltip } from '@mui/material'
import InventoryIcon from '@mui/icons-material/Inventory'

export default function LoadsGrossCostsByStatusCard({loadsByStatus}: LoadsByStatusCardProps) {
    
    return (
        <Paper elevation={6} className='price-card' sx={{ overflow: 'hidden', padding: "20px 14px" }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                <Grid item>
                    <span className='text-16' style={{ color: "var(--blue)", fontWeight: 800 }}>GROSS</span>
                </Grid>
                <Grid item>
                    <Tooltip title="See All Loads" placement="bottom">
                        <Link to={RouteNames.LOAD} style={{ textDecoration: 'none', color: 'var(--darkGrey)' }}>
                            <InventoryIcon sx={{ fill: 'var(--lightGrey)' }} />
                        </Link>
                    </Tooltip>
                </Grid>
            </Grid>
            <div style={{textAlign: "center", margin: "15px 0"}}>
                <span className='text-14' style={{ fontWeight: "bold"  }}>
                    Gross / Costs
                </span>
            </div>
            {/* Options list */}
            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ margin: "10px 0" }} >
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"  }}>
                        All Loads
                    </span>
                </Grid>
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"  }}>
                        {loadsByStatus ? loadsByStatus.allLoadsGross : 0} / {loadsByStatus ? loadsByStatus.allLoadsCosts : 0}
                    </span>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px' >
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"  }}>
                        Saved
                    </span>
                </Grid>
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"  }}>
                        {loadsByStatus ? loadsByStatus.savedLoadsGross : 0} / {loadsByStatus ? loadsByStatus.savedLoadsCosts : 0}
                    </span>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px' >
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"  }}>
                        Booked
                    </span>
                </Grid>
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"  }}>
                        {loadsByStatus ? loadsByStatus.bookedLoadsGross : 0} / {loadsByStatus ? loadsByStatus.bookedLoadsCosts : 0}
                    </span>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px' >
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"  }}>
                        In Progress
                    </span>
                </Grid>
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"  }}>
                        {loadsByStatus ? loadsByStatus.inProgressLoadsGross : 0} / {loadsByStatus ? loadsByStatus.inProgressLoadsCosts : 0}
                    </span>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px' >
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"  }}>
                        Completed
                    </span>
                </Grid>
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"  }}>
                        {loadsByStatus ? loadsByStatus.completedLoadsGross : 0} / {loadsByStatus ? loadsByStatus.completedLoadsCosts : 0}
                    </span>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px' >
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"  }}>
                        Payed
                    </span>
                </Grid>
                <Grid item>
                    <span className='text-14' style={{ fontWeight: "bold"  }}>
                        {loadsByStatus ? loadsByStatus.payedLoadsGross : 0} / {loadsByStatus ? loadsByStatus.payedLoadsCosts : 0}
                    </span>
                </Grid>
            </Grid>
        </Paper>
    )
}
