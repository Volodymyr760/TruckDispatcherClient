import { useEffect, useState } from 'react'
import { AccountFormProps, TabPanelProps } from './types'
import { clonedObject } from '../../../hooks/clonedObject'
import { Box, Container, Grid, Snackbar, Tab, Tabs } from '@mui/material'
import ErrorMessage from '../../../components/Messages/ErrorMessage'
import Spinner from '../../../components/Spinner/Spinner'
import AdminDriverCard from './AdminDriverCard'
import AccountInfo from './AccountInfo'
import RolesList from './RolesList'
import { IDriver } from '../../../types/driver'
import { ITruck } from '../../../types/truck'
import { ILoad } from '../../../types/load'
import { getUserByIdAxios } from '../../../api/user'
import AdminLoadCard from './AdminLoadCard'
import AdminTruckCard from './AdminTruckCard'

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props
    return (
        <div role="tabpanel" hidden={value !== index}
            id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return { id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` };
}

export default function ManageUser({ user, onClose }: AccountFormProps) {
    const [tabValue, setTabValue] = useState(0);
    const [drivers, setDrivers] = useState<IDriver[]>([]);
    const [trucks, setTrucks] = useState<ITruck[]>([]);
    const [loads, setLoads] = useState<ILoad[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

    const changeTabHandler = (event: React.SyntheticEvent, newValue: number) => setTabValue(newValue);

    const onSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackbarMessage(null)
    };
    
    const fetchUsersDetails = async () =>{
        try {
            setLoading(true);
            setError(null);
            const userFromDB = await getUserByIdAxios(user.id);
            setDrivers(userFromDB.drivers);
            setLoads(userFromDB.loads);
            setTrucks(userFromDB.trucks);
        } catch (error) {
            setError(error.message || 'Unable to get users detailes.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsersDetails();
        // eslint-disable-next-line
    }, [])

    const onDeleteDriver = async (driver: IDriver) => {
        let driversToUpdate: IDriver[] = clonedObject(drivers);
        driversToUpdate = drivers.filter(d => d.id !== driver.id);
        setDrivers(driversToUpdate);
    }

    const onDeleteLoad = async (load: ILoad) => {
        let loadsToUpdate: ILoad[] = clonedObject(loads);
        loadsToUpdate = loads.filter(l => l.id !== load.id);
        setLoads(loadsToUpdate);
    }
    
    const onDeleteTruck = async (truck: ITruck) => {
        let trucksToUpdate: ITruck[] = clonedObject(trucks);
        trucksToUpdate = trucks.filter(t => t.id !== truck.id);
        setTrucks(trucksToUpdate);
    }

    return (
        <Container maxWidth="lg" className='layout-container' >
            <AccountInfo user={user} onClose={onClose} />
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={changeTabHandler} aria-label="Account tabs">
                        <Tab label={drivers ? `Drivers(${drivers.length})` : "Drivers"}  {...a11yProps(1)} sx={{ textTransform: "none" }} />
                        <Tab label={loads ? `Loads(${loads.length})` : "Loads"}  {...a11yProps(2)} sx={{ textTransform: "none" }} />
                        <Tab label={trucks ? `Trucks(${trucks.length})` : "Trucks"}  {...a11yProps(2)} sx={{ textTransform: "none" }} />
                        <Tab label="Roles"  {...a11yProps(3)} sx={{ textTransform: "none" }} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={tabValue} index={0}>
                    {
                        loading ? <Spinner /> :
                            error ? <ErrorMessage appearance="small">{error}</ErrorMessage> :
                                drivers &&
                                <Container maxWidth="lg" className='layout-container' >
                                    <Grid container spacing={2} sx={{ margin: '30px 0', padding: '0', width: '100%' }}>
                                        {
                                            drivers.map(driver =>
                                                <AdminDriverCard key={driver.id} driver={driver} onDelete={onDeleteDriver} />)
                                        }
                                    </Grid>
                                </Container>
                    }
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={1}>
                    {
                        loading ? <Spinner /> :
                            error ? <ErrorMessage appearance="small">{error}</ErrorMessage> :
                                loads &&
                                <Container maxWidth="lg" className='layout-container' >
                                    <Grid container spacing={2} sx={{ margin: '30px 0', padding: '0', width: '100%' }}>
                                        {
                                            loads.map(load =>
                                                <AdminLoadCard key={load.id} load={load} onDelete={onDeleteLoad} />)
                                        }
                                    </Grid>
                                </Container>
                    }
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={2}>
                    {
                        loading ? <Spinner /> :
                            error ? <ErrorMessage appearance="small">{error}</ErrorMessage> :
                                trucks &&
                                <Container maxWidth="lg" className='layout-container' >
                                    <Grid container spacing={2} sx={{ margin: '30px 0', padding: '0', width: '100%' }}>
                                        {
                                            trucks.map(truck =>
                                                <AdminTruckCard key={truck.id} truck={truck} onDelete={onDeleteTruck} />)
                                        }
                                    </Grid>
                                </Container>
                    }
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={3}>
                    <RolesList userId={user.id} />
                </CustomTabPanel>
            </Box>
            <Snackbar
                open={snackbarMessage !== null}
                autoHideDuration={4000}
                onClose={onSnackbarClose}
                message={snackbarMessage}
            />
        </Container>
    )
}
