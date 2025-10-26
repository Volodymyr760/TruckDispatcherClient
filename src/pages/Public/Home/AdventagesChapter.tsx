import { AdventageCardProps } from './types'
import { Grid } from '@mui/material'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SettingsIcon from '@mui/icons-material/Settings'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'

const advettagesList: AdventageCardProps[] = [
    {
        id: "adv1",
        icon: <SettingsIcon fontSize='large' sx={{ fill: 'var(--lightGrey)', mr: "10px" }} />,
        title: "Fleet Setup",
        image: (process.env.NODE_ENV === "production" ?
            process.env.REACT_APP_BASE_API_URL_PROD :
            process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/setup_fleet.jpg",
        text: "Step 1: Enter your trucks and drivers details. We support the following equipment types: Van, Reefer, Flatbed."
    },
    {
        id: "adv2",
        icon: <TravelExploreIcon fontSize='large' sx={{ fill: 'var(--lightGrey)', mr: "10px" }} />,
        title: "Searching",
        image: (process.env.NODE_ENV === "production" ?
            process.env.REACT_APP_BASE_API_URL_PROD :
            process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/searching_loads_online.jpg",
        text: "Step 2: Search for loads as on a regular load board. Mark profitable orders to automatically save them to your own list."
    },
    {
        id: "adv3",
        icon: <DoneAllIcon fontSize='large' sx={{ fill: 'var(--lightGrey)', mr: "10px" }} />,
        title: "Key Results",
        image: (process.env.NODE_ENV === "production" ?
            process.env.REACT_APP_BASE_API_URL_PROD :
            process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/financial_results.jpg",
        text: "Step 3: The Dashboard page displays key results of completed trips."
    }
]

export default function AdventagesChapter() {
    return (
        <Grid container alignItems="flex-start">
            {
                advettagesList.map(adventage =>
                    <Grid key={adventage.id} item xs={12} md={4} textAlign='center' sx={{ mb: "30px" }}>
                        <Grid container direction='row' justifyContent='center' alignItems='center'>
                            <Grid item >
                                {adventage.icon}
                            </Grid>
                            <Grid item>
                                <span className='pt2' style={{ textAlign: 'center' }}>{adventage.title}</span>
                            </Grid>
                        </Grid>
                        <div style={{ padding: '0 30px' }}>
                            <img src={adventage.image} alt="" width='100%'
                                style={{ margin: '20px 0', maxHeight: '344px' }} />
                            <p style={{ textAlign: 'center' }}>
                                {adventage.text}
                            </p>
                        </div>
                    </Grid>)
            }
        </Grid>
    )
}
