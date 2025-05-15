import { AdventageCardProps } from './types'
import { Grid } from '@mui/material'
import AlarmIcon from '@mui/icons-material/Alarm'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly'
import PaletteIcon from '@mui/icons-material/Palette'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import StreetviewIcon from '@mui/icons-material/Streetview'

const advettagesList: AdventageCardProps[] = [
    {
        id: "adv1",
        icon: <StreetviewIcon fontSize='large' sx={{ fill: 'var(--lightGrey)', mr: "10px" }} />,
        title: "Remote Control",
        image: (process.env.NODE_ENV === "production" ?
            process.env.REACT_APP_BASE_API_URL_PROD :
            process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/remote-control.jpg",
        text: "Monitor remote facilities and the performance of workers or equipment."
    },
    {
        id: "adv2",
        icon: <PersonSearchIcon fontSize='large' sx={{ fill: 'var(--lightGrey)', mr: "10px" }} />,
        title: "Personification",
        image: (process.env.NODE_ENV === "production" ?
            process.env.REACT_APP_BASE_API_URL_PROD :
            process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/personification.jpg",
        text: "Contact list support. Forms can be assigned to an individual contact to compare different filling results, which can also be commented on."
    },
    {
        id: "adv3",
        icon: <MobileFriendlyIcon fontSize='large' sx={{ fill: 'var(--lightGrey)', mr: "10px" }} />,
        title: "Use Mobile",
        image: (process.env.NODE_ENV === "production" ?
            process.env.REACT_APP_BASE_API_URL_PROD :
            process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/use-mobile.jpg",
        text: "All operations with form are available from a smartphone, tablet, or computer."
    },
    {
        id: "adv4",
        icon: <PaletteIcon fontSize='large' sx={{ fill: 'var(--lightGrey)', mr: "10px" }} />,
        title: "Branding",
        image: (process.env.NODE_ENV === "production" ?
            process.env.REACT_APP_BASE_API_URL_PROD :
            process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/branding.jpg",
        text: "Add the company logo and brand colors in the settings - form elements will be stylized when viewed by recipients."
    },
    {
        id: "adv5",
        icon: <LocationOnIcon fontSize='large' sx={{ fill: 'var(--lightGrey)', mr: "10px" }} />,
        title: "GPS Localization",
        image: (process.env.NODE_ENV === "production" ?
            process.env.REACT_APP_BASE_API_URL_PROD :
            process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/gps-localization.jpeg",
        text: "When filling out the form, when uploading images, geo-positions are stored (the corresponding function of the gadget must be enabled), which you can view in Google Maps."
    },
    {
        id: "adv6",
        icon: <AlarmIcon fontSize='large' sx={{ fill: 'var(--lightGrey)', mr: "10px" }} />,
        title: "Reminders",
        image: (process.env.NODE_ENV === "production" ?
            process.env.REACT_APP_BASE_API_URL_PROD :
            process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/reminder.jpg",
        text: "Set up an automatic reminder for the form - an email will be sent to the assigned contact with a link to fill out the form."
    }
]

export default function AdventagesChapter() {
    return (
        <Grid container alignItems="flex-start">
            {
                advettagesList.map(adventage =>
                    <Grid key={adventage.id} item xs={12} sm={6} lg={4} textAlign='center' sx={{ mb: "30px" }}>
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
