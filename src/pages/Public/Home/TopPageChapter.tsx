import { Box, Grid } from '@mui/material'
import ApartmentIcon from '@mui/icons-material/Apartment'
import CalculateIcon from '@mui/icons-material/Calculate'
import SettingsIcon from '@mui/icons-material/Settings'

export default function TopPageChapter(): JSX.Element {
    return (
        <Grid container alignItems="center">
            <Grid item xs={12} md={6} sx={{ padding: '0 40px' }}>
                <p className='pt2' style={{ textAlign: 'center' }}>Our Advantages</p>
                <p style={{ textAlign: 'center' }}>
                    Find the best loads and book them with all your loads in one place
                </p>
            </Grid>
            <Grid item xs={12} md={6} textAlign='center' sx={{ padding: '0 40px' }}>
                <Box sx={{ width: '100%' }}>
                    <div style={{ display: 'flex', textAlign: 'start', margin: '8px 0' }}>
                        <CalculateIcon />
                        <span style={{ marginLeft: '20px' }}>We calculate RPM including deadheads</span>
                    </div>
                    <div style={{ display: 'flex', textAlign: 'start', margin: '8px 0' }}>
                        <SettingsIcon />
                        <span style={{ marginLeft: '20px' }}>Integrated profit calculator</span>
                    </div>
                    <div style={{ display: 'flex', textAlign: 'start', margin: '8px 0' }}>
                        <ApartmentIcon />
                        <span style={{ marginLeft: '20px' }}>Base TMS features</span>
                    </div>
                </Box>
            </Grid>
        </Grid>
    )
}
