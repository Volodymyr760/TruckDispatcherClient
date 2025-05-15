import { useNavigate } from 'react-router-dom'
import { Helmet } from "react-helmet"
import { RouteNames } from '../../../routing'
import { Box, Container, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import ApartmentIcon from '@mui/icons-material/Apartment'
import CheckIcon from '@mui/icons-material/Check'
import GroupsIcon from '@mui/icons-material/Groups'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck'
import PaletteIcon from '@mui/icons-material/Palette'
import SettingsIcon from '@mui/icons-material/Settings'
import MuiButton from '../../../components/Button/MuiButton'
import PageHeader from '../../../components/PageHeader/PageHeader'
import AdventagesChapter from './AdventagesChapter'
import { muiTextFieldStyle } from '../../../types/common/muiTextFieldStyle'

export default function HomePage(): JSX.Element {
    const navigate = useNavigate()

    return (
        <Container maxWidth="lg">
            <Helmet>
                <title>TruckDispatcher.com - Forms for remote work and control with customers</title>
                <meta name="description" content="Forms for remote work and control with customers, business units and personnel, create your form with questions, add images, answer options and your comments - TruckDispatcher.com" />
            </Helmet>
            <PageHeader title="Loadboard and Virtual Dispatcher" id="home" />
            <Grid container alignItems="center">
                <Grid item xs={12} md={6} sx={{ padding: '0 40px' }}>
                    <p className='pt2' style={{ textAlign: 'center' }}>Combine load boards</p>
                    <p style={{ textAlign: 'center' }}>
                        Find the best loads and book them with all your loads in one place
                    </p>
                </Grid>
                <Grid item xs={12} md={6} textAlign='center' sx={{ padding: '0 40px' }}>
                    <Box sx={{ width: '100%' }}>
                        <List>
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <MailOutlineIcon sx={{ fill: 'var(--lightGrey)' }} />
                                </ListItemIcon>
                                <ListItemText sx={{"& .MuiTypography-root": muiTextFieldStyle}} primary="Share your forms in email and messengers" />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <SettingsIcon sx={{ fill: 'var(--lightGrey)' }} />
                                </ListItemIcon>
                                <ListItemText sx={{"& .MuiTypography-root": muiTextFieldStyle}} primary="Automation of business process control by setting reminders" />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <PaletteIcon sx={{ fill: 'var(--lightGrey)' }} />
                                </ListItemIcon>
                                <ListItemText sx={{"& .MuiTypography-root": muiTextFieldStyle}} primary="Promote your brand by adding a logo and styling the form with corporate colors" />
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
            </Grid>
            <PageHeader title="Features" />
            <Grid container alignItems="flex-start" sx={{ background: 'var(--lightgreywhite)', padding: '20px 0' }}>
                <Grid item xs={12} md={4} sx={{ padding: '0 20px', mb: "30px" }}>
                    <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item>
                            <ApartmentIcon fontSize='large' sx={{ fill: 'var(--lightGrey)', mr: "10px" }} />
                        </Grid>
                        <Grid item>
                            <span className='pt2' style={{ textAlign: 'center' }}>Business Units</span>
                        </Grid>
                    </Grid>
                    <p style={{ textAlign: 'center' }}>
                        Control of real estate, vehicles, infrastructure and equipment
                    </p>
                    <List>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                            </ListItemIcon>
                            <ListItemText sx={{"& .MuiTypography-root": muiTextFieldStyle}} primary="For landlords and tenants - receive regular inspections about property state and counters." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                            </ListItemIcon>
                            <ListItemText sx={{"& .MuiTypography-root": muiTextFieldStyle}} primary="For carriers - receive a daily inspection of the car with photo confirmation and geolocation." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                            </ListItemIcon>
                            <ListItemText sx={{"& .MuiTypography-root": muiTextFieldStyle}} primary="For technical services and security - create forms for visual control of infrastructure objects." />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: '0 20px', mb: "30px" }}>
                    <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item>
                            <NetworkCheckIcon fontSize='large' sx={{ fill: 'var(--lightGrey)', mr: "10px" }} />
                        </Grid>
                        <Grid item>
                            <span className='pt2' style={{ textAlign: 'center' }}>Processes</span>
                        </Grid>
                    </Grid>
                    <p style={{ textAlign: 'center' }}>
                        Tracking the status of tasks and jobs
                    </p>
                    <List>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                            </ListItemIcon>
                            <ListItemText sx={{"& .MuiTypography-root": muiTextFieldStyle}} primary="Get orders in forms with personalized customer information about quantity, delivery and payment options." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                            </ListItemIcon>
                            <ListItemText sx={{"& .MuiTypography-root": muiTextFieldStyle}} primary="Registration forms for visitors, entrants, ticket sales, etc." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                            </ListItemIcon>
                            <ListItemText sx={{"& .MuiTypography-root": muiTextFieldStyle}} primary="Receive confirmation in forms from staff about the stages of task performance." />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: '0 20px', mb: "30px" }}>
                    <Grid container direction='row' justifyContent='center' alignItems='center'>
                        <Grid item>
                            <GroupsIcon fontSize='large' sx={{ fill: 'var(--lightGrey)', mr: "10px" }} />
                        </Grid>
                        <Grid item>
                            <span className='pt2' style={{ textAlign: 'center' }}>People</span>
                        </Grid>
                    </Grid>
                    <p style={{ textAlign: 'center' }}>
                        Survey and data collection forms
                    </p>
                    <List>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                            </ListItemIcon>
                            <ListItemText sx={{"& .MuiTypography-root": muiTextFieldStyle}} primary="Post jobs in forms and receive candidate data before interviews." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                            </ListItemIcon>
                            <ListItemText sx={{"& .MuiTypography-root": muiTextFieldStyle}} primary="Create online tests for your training programs, check performance and assign grades on your smartphone." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                            </ListItemIcon>
                            <ListItemText sx={{"& .MuiTypography-root": muiTextFieldStyle}} primary="Customer Service - survey customers about satisfaction with the quality of your service." />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            <PageHeader title="Adventages" />
            <AdventagesChapter />
            <PageHeader title="Get Started" text="Free price plan & Access to dashboard" />
            <div style={{ textAlign: 'center' }}>
                <MuiButton variant='contained' onClickHandler={() => navigate(RouteNames.REGISTER)}>
                    <span className='text-16' style={{color: "var(--lightgreywhite)"}}>Sign Up</span>
                </MuiButton>
            </div>
        </Container>
    );
};
