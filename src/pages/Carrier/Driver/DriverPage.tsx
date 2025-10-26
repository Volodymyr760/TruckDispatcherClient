import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { IDriver } from "../../../types/driver"
import { OrderType } from "../../../types/common/orderType"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { Alert, Box, Container, Grid, IconButton, Menu, MenuItem, Snackbar, TextField, Tooltip } from "@mui/material"
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import MuiButton from "../../../components/Button/MuiButton"
import Spinner from "../../../components/Spinner/Spinner"
import DriverCard from "./DriverCard"
import DriverForm from "./DriverForm"
import { IntersectionObserverComponent } from "../../../components/IntersectionObserver/IntersectionObserverComponent"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import SortOutlinedIcon from '@mui/icons-material/SortOutlined'

export default function DriverPage(): JSX.Element {
    const { driverSearchParams, loading, error } = useTypedSelector(state => state.driver)
    const { auth } = useTypedSelector(state => state.auth)
    const { searchDrivers, loadMoreDrivers, setDriverError, setDriverPage, setDriverSearchCriteria,
        setDriverSort, setDriverSortfield } = useActions()
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [driver, setDriver] = useState<IDriver | null>(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const fields = ["First Name", "Last Name", "Phone", "Email"]

    useEffect(() => {
        if (driverSearchParams.itemList.length > 0) return
        searchDrivers(driverSearchParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const сloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        setSnackBarState(null)
        setDriverError(null)
    };

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const onSearchFilterChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDriverPage(1)
        setDriverSearchCriteria(event.target.value)
        searchDrivers({ ...driverSearchParams, currentPage: 1, searchCriteria: event.target.value })
    }

    const onSelectChanged = (field: string) => {
        let driverSortOrder: OrderType = OrderType.Ascending
        if (field === driverSearchParams.sortField)
            driverSortOrder = driverSearchParams.order === OrderType.Ascending ? OrderType.Descending : OrderType.Ascending

        setDriverPage(1)
        setDriverSortfield(field)
        setDriverSort(driverSortOrder)
        searchDrivers({
            ...driverSearchParams,
            currentPage: 1,
            sortField: field,
            order: driverSortOrder
        })
    }

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
    }

    const onEdit = (driver: null | IDriver) => setDriver(driver)

    const onCreate = () => {
        if (new Date(auth.user.finishPayedPeriodDate) < new Date()) {
            setSnackBarState({ message: "Oops! Your paid period has expired.", severity: "warning" })
            return
        }
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
                <title>Truckdispatcher.top - Drivers</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truckdispatcher.top" />
            </Helmet>
            {/*Page Header */}
            <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
                <Grid item sx={{ width: { xs: "100%", md: "48%" } }}>
                    <Tooltip title="First Name, Last Name, Email or Phone" placement="bottom">
                        <TextField label="Search" type="text" margin="none" fullWidth
                            sx={{ "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle }}
                            value={driverSearchParams.searchCriteria}
                            onChange={onSearchFilterChanged}
                        />
                    </Tooltip>
                </Grid>
                <Grid item sx={{ width: { xs: "100%", md: "48%" } }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px'>
                        <Grid item sx={{ width: "45%" }}>
                            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                                <Tooltip title="Sort">
                                    <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                                        <SortOutlinedIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)' }} />
                                        <span className="text-14">Sort</span>
                                    </IconButton>
                                </Tooltip>
                                <Menu sx={{ mt: '45px' }} id="menu-sortfield-bar" anchorEl={anchorEl} keepMounted
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    open={Boolean(anchorEl)} onClose={handleClose}
                                >
                                    {
                                        fields.map(field =>
                                            <MenuItem key={field}
                                                sx={{ fontSize: "16px", fontFamily: "Mulish", padding: "2px 10px" }}
                                                onClick={() => {
                                                    onSelectChanged(field)
                                                    handleClose()
                                                }}
                                            >
                                                {field}&nbsp;
                                                {
                                                    field === driverSearchParams.sortField ?
                                                        driverSearchParams.order === OrderType.Ascending ?
                                                            <ArrowUpwardIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--orange)' }} />
                                                            :
                                                            <ArrowDownwardIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--orange)' }} />
                                                        : null
                                                }
                                            </MenuItem>
                                        )
                                    }
                                </Menu>
                            </Box>
                        </Grid>
                        <Grid item sx={{ width: "45%", textAlign: "right" }}>
                            <MuiButton size='large' variant='contained' onClickHandler={onCreate}>
                                <span className="text-14" style={{ color: 'var(--lightgreywhite)' }}>+ Driver</span>
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
            <Snackbar open={error !== null} autoHideDuration={4000} onClose={сloseSnackbar}>
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        </Container>
    )
}
