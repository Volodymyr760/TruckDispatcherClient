import { Link } from 'react-router-dom'
import { RouteNames } from '../../../routing'
import { LoadsByStatusCardProps } from './types'
import { Grid, Paper, Tooltip } from '@mui/material'
import InventoryIcon from '@mui/icons-material/Inventory'

export default function LoadsNumbersByStatusCard({loadsByStatus}: LoadsByStatusCardProps) {
    
    return (
        <Paper elevation={6} className='price-card' sx={{ overflow: 'hidden', padding: "20px 14px" }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                <Grid item>
                    <span className='text-16' style={{ color: "var(--blue)", fontWeight: 800 }}>LOADS</span>
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
                    Number / Mileage
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
                        {loadsByStatus ? loadsByStatus.all : 0} / {loadsByStatus ? loadsByStatus.allLoadsMileage : 0}
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
                        {loadsByStatus ? loadsByStatus.savedLoads : 0} / {loadsByStatus ? loadsByStatus.savedLoadsMileage : 0}
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
                        {loadsByStatus ? loadsByStatus.bookedLoads : 0} / {loadsByStatus ? loadsByStatus.bookedLoadsMileage : 0}
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
                        {loadsByStatus ? loadsByStatus.inProgressLoads : 0} / {loadsByStatus ? loadsByStatus.inProgressLoadsMileage : 0}
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
                        {loadsByStatus ? loadsByStatus.completedLoads : 0} / {loadsByStatus ? loadsByStatus.completedLoadsMileage : 0}
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
                        {loadsByStatus ? loadsByStatus.payedLoads : 0} / {loadsByStatus ? loadsByStatus.payedLoadsMileage : 0}
                    </span>
                </Grid>
            </Grid>
        </Paper>
    )
}
