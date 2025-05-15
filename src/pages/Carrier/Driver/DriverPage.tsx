import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { IDriver } from "../../../types/driver"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { Alert, Container, Grid, Snackbar, TextField, Tooltip } from "@mui/material"
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import MuiButton from "../../../components/Button/MuiButton"
import Spinner from "../../../components/Spinner/Spinner"
import DriverCard from "./DriverCard"
import DriverSortFieldBar from "./DriverSortFieldBar"
import DriverForm from "./DriverForm"
import { IntersectionObserverComponent } from "../../../components/IntersectionObserver/IntersectionObserverComponent"

export default function DriverPage(): JSX.Element {
    const { driverSearchParams, loading, error } = useTypedSelector(state => state.driver)
    const { auth } = useTypedSelector(state => state.auth)
    const { searchDrivers, loadMoreDrivers, setDriverPage, setDriverSearchCriteria } = useActions()
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [driver, setDriver] = useState<IDriver | null>(null)

    const сloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

    useEffect(() => {
        searchDrivers(driverSearchParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [driverSearchParams.searchCriteria, driverSearchParams.sortField, driverSearchParams.order])

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        if (driverSearchParams.totalItemsCount === 0) return;
        entries.forEach((entry) => {
            if (entry.isIntersecting && driverSearchParams.currentPage * driverSearchParams.pageSize < driverSearchParams.totalItemsCount) {
                loadMoreDrivers({
                    pageSize: driverSearchParams.pageSize,
                    currentPage: driverSearchParams.currentPage + 1,
                    searchCriteria: driverSearchParams.searchCriteria,
                    userId: auth.user.id,
                    sortField: driverSearchParams.sortField,
                    order: driverSearchParams.order,
                    includeNavProperties: driverSearchParams.includeNavProperties,
                    itemList: [],
                    pageCount: 0,
                    totalItemsCount: 0
                })
                setDriverPage(driverSearchParams.currentPage + 1);
            }
        });
    };

    const onSearchFilterChanged = async (text: string) => {
        if (text.length > 0 && text.length < 3) return
        setDriverPage(1)
        setDriverSearchCriteria(text)
    }

    const onEdit = (driver: null | IDriver) => setDriver(driver)

    const onCreate = () => {
        const driver: IDriver = { 
            id: null, 
            firstName: '', 
            lastName: '', 
            phone: '',
            email: '', 
            avatar: '', 
            userId: auth.user.id,
            truckId: '', truck: null,
            notes: '' 
        }
        setDriver(driver)
    }

    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>Truskdispatcher.com - Drivers</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truskdispatcher.com" />
            </Helmet>
            {/*Page Header */}
            <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
                <Grid item sx={{ width: {xs: "100%", md: "48%" } }}>
                    <Tooltip title="First Name, Last Name, Email or Phone" placement="bottom">
                        <TextField label="Search" type="text" margin="none" fullWidth
                            sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                            onChange={(event) => onSearchFilterChanged(event.target.value)}
                        />
                    </Tooltip>
                </Grid>
                <Grid item sx={{ width: {xs: "100%", md: "48%" } }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px'>
                        <Grid item sx={{width: "45%"}}>
                            <DriverSortFieldBar fields={["First Name", "Last Name", "Phone", "Email"]} />
                        </Grid>
                        <Grid item sx={{width: "45%", textAlign: "right"}}>
                            <MuiButton size='large' variant='contained' onClickHandler={onCreate}>
                                <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>+ Driver</span>
                            </MuiButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* Drivers List */}
            {
                driverSearchParams.itemList.length > 0 ?
                    <div style={{ margin: "30px 0" }}>
                        {driverSearchParams.itemList.map(driver =>
                            <DriverCard key={driver.id} driver={driver} onEdit={onEdit} />
                        )}
                    </div> :
                    loading ? <Spinner /> :
                        error ? <ErrorMessage appearance="regular">{error}</ErrorMessage> :
                            <p style={{ padding: "0 15px" }}>No drivers</p>
            }
            <IntersectionObserverComponent onIntersection={handleIntersection} />
            {driver && <DriverForm driver={driver} closeForm={() => setDriver(null)} />}
            <Snackbar open={snackBarState !== null} autoHideDuration={4000} onClose={сloseSnackbar}>
                <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>
        </Container>
    )
}
