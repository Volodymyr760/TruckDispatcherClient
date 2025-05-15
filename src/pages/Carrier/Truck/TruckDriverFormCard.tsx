import { TruckDriverFormCardProps } from './types'
import { Avatar, Grid } from '@mui/material'

export default function TruckDriverFormCard({driver}: TruckDriverFormCardProps) {
    
    return (
    <Grid container direction="row" sx={{ justifyContent: "flex-start", alignItems: "center", marginBottom: "5px" }} >
        <Grid item sx={{marginRight: "5px"}}>
        {
            driver.avatar ?
            <Avatar alt="Avatar" src={(process.env.NODE_ENV === "production" ?
                                process.env.REACT_APP_BASE_API_URL_PROD :
                                process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + driver.avatar} />
                :
            <Avatar sx={{ bgcolor: "var(--blue)", color: "white", width: 18, height: 18, fontSize: 12 }}>
                {driver.firstName.charAt(0) + driver.lastName.charAt(0)}
            </Avatar>
        }
        </Grid>
        <Grid item>
            <Grid container direction="column" sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                <span className='text-14'>{driver.firstName} {driver.lastName}</span>
                <span className='text-12' style={{margin: "1px 5px"}}>{driver.email}</span>
                <span className='text-12' style={{margin: "1px 5px"}}>{driver.phone}</span>
            </Grid>
        </Grid>
    </Grid>
    )
}
