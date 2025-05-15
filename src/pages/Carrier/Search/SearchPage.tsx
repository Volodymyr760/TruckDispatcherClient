import { ChangeEvent, useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import moment from "moment"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { ICity } from "../../../types/city"
import { Equipment } from "../../../types/common/equipment"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { OrderType } from "../../../types/common/orderType"
import { Role } from "../../../types/auth"
import { brokerTrucks, SearchPageProps } from "./types"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { TruckDto, TruckStatus } from "../../../types/truck"
import { getCitiesAxios } from "../../../api/city"
import { getTrucksAxios } from "../../../api/truck"
import { getSearchSettinsAxios, partialUpdateUserAxios } from "../../../api/user"
import Autocomplete from '@mui/material/Autocomplete'
import { Alert, Box, Container, FormControl, FormHelperText, Grid, InputLabel, 
    MenuItem, Paper, Select, SelectChangeEvent, Slider, Snackbar, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import { IntersectionObserverComponent } from "../../../components/IntersectionObserver/IntersectionObserverComponent"
import MuiButton from "../../../components/Button/MuiButton"
import Spinner from "../../../components/Spinner/Spinner"
import SearchCard from "./SearchCard"
import SearchSortFieldBar from "./SearchSortFieldBar"
import './styles.css'

export default function SearchPage({ role }: SearchPageProps): JSX.Element {
    const { auth } = useTypedSelector(state => state.auth)    
    const { importLoadSearchParams, loading, error } = useTypedSelector(state => state.importLoad)
    const { searchImportLoads, loadMoreImportLoads, resetImportLoads, setImportLoadDeadhead, setImportLoadDestination, 
        setImportLoadMilesMin,  setImportLoadMilesMax, setImportLoadSortfield, setImportLoadSort, 
        setImportLoadOrigin, setImportLoadPage, setImportLoadTruck  } = useActions()

    const [searchTrucksState, setSearchTrucksState] = useState<TruckDto[]>([])

    const [pickupDateState, setPickupDateState] = useState<Date>(null)

    const [origins, setOrigins] = useState<ICity[]>([])
    const [originValue, setOriginValue] = useState<ICity | null>(null)
    const [originInputValue, setOriginInputValue] = useState<string>("")

    const [destinations, setDestinations] = useState<ICity[]>([]);
    const [destinationValue, setDestinationValue] = useState<ICity | null>(null)
    const [destinationInputValue, setDestinationInputValue] = useState<string>("")

    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)

    const сloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        if (importLoadSearchParams.totalItemsCount === 0) return
        entries.forEach((entry) => {
            if (entry.isIntersecting && importLoadSearchParams.currentPage * importLoadSearchParams.pageSize <= importLoadSearchParams.totalItemsCount) {
                loadMoreImportLoads({
                    pageSize: importLoadSearchParams.pageSize,
                    currentPage: importLoadSearchParams.currentPage + 1,
                    searchCriteria: '',
                    userId: '',
                    includeNavProperties: true,
                    sortField: importLoadSearchParams.sortField,
                    order: importLoadSearchParams.order,
                    itemList: [],
                    pageCount: importLoadSearchParams.pageCount,
                    totalItemsCount: importLoadSearchParams.totalItemsCount,
                    origin: importLoadSearchParams.origin,
                    destination: importLoadSearchParams.destination,
                    truck: importLoadSearchParams.truck,
                    pickupStartDate: pickupDateState,
                    deadhead: importLoadSearchParams.deadhead,
                    milesMin: importLoadSearchParams.milesMin,
                    milesMax: importLoadSearchParams.milesMax,
                })
                setImportLoadPage(importLoadSearchParams.currentPage + 1)
            }
        });
    }

    const fetchTrucks = async () =>{
        const result = await getTrucksAxios({
            pageSize: 1000,
            currentPage: 1,
            searchCriteria: "",
            userId: auth.user.id,
            sortField: "Name",
            order: OrderType.Ascending,
            includeNavProperties: false,
            itemList: [],
            pageCount: 0,
            totalItemsCount: 0,
            equipment: Equipment.All,
            truckStatus: TruckStatus.All
        });
        setSearchTrucksState(result.itemList)
    };

    const fetchUserSearchSettings = async () =>{
        const result = await getSearchSettinsAxios(auth.user.id);
        setImportLoadDeadhead(result.deadheads)
        setImportLoadMilesMin(result.milesMin)
        setImportLoadMilesMax(result.milesMax)
        setImportLoadSortfield(result.sortField)
        setImportLoadSort(result.sort)
    };

    useEffect(() => {
        fetchUserSearchSettings()
        if(role === Role.Carrier) {
            fetchTrucks()
        } else {
            setSearchTrucksState(brokerTrucks)
        }
        // eslint-disable-next-line
    }, [])

    const searchOriginCities = async (event: ChangeEvent<HTMLInputElement>) => {
        const result = await getCitiesAxios({
            pageSize: 20,
            currentPage: 1,
            searchCriteria: event.target.value,
            userId: auth.user.id,
            sortField: "FullName",
            order: OrderType.Ascending,
            includeNavProperties: false,
            itemList: [],
            pageCount: 0,
            totalItemsCount: 0
        });
        setOrigins(result.itemList)
    }

    const searchDestinationCities = async (event: ChangeEvent<HTMLInputElement>) => {
        const result = await getCitiesAxios({
            pageSize: 20,
            currentPage: 1,
            searchCriteria: event.target.value,
            userId: auth.user.id,
            sortField: "FullName",
            order: OrderType.Ascending,
            includeNavProperties: false,
            itemList: [],
            pageCount: 0,
            totalItemsCount: 0
        });
        setDestinations(result.itemList)
    }

    const onTruckFilterChanged = async (event: SelectChangeEvent) => {
        const truckToSearch = searchTrucksState.filter(t => t.id === event.target.value)[0]
        setImportLoadTruck(truckToSearch)
    }

    const onOriginFilterChanged = async (event, city) => {
        setOriginValue(city)
        setImportLoadOrigin(city)
    }

    const onDestinationFilterChanged = async (event, city) => {
        setDestinationValue(city)
        setImportLoadDestination(city)
    }

    const onDeadheadsChanged = (event: Event, newValue: number | number[]) => {
        setImportLoadDeadhead(newValue as number)
        partialUpdateUserAxios(auth.user.id, { op: "replace", path: "/searchDeadheads", value: newValue as number })
    }

    const onDistanceChanged = (event: Event, newValue: number | number[]) => {
        const distanceLimits = newValue as number[];
        setImportLoadMilesMin(distanceLimits[0])
        partialUpdateUserAxios(auth.user.id, { op: "replace", path: "/searchMilesMin", value: distanceLimits[0] })
        setImportLoadMilesMax(distanceLimits[1])
        partialUpdateUserAxios(auth.user.id, { op: "replace", path: "/searchMilesMax", value: distanceLimits[1] })
    };

    const onSearchReset = () => {
        setPickupDateState(null)

        setOriginValue(null)
        setOriginInputValue("")

        setDestinationValue(null)
        setDestinationInputValue("")

        resetImportLoads({
            pageSize: 25,
            currentPage: 1,
            searchCriteria: '',
            userId: '',
            includeNavProperties: true,
            sortField: importLoadSearchParams.sortField,
            order: importLoadSearchParams.order,
            itemList: [],
            pageCount: 0,
            totalItemsCount: 0,
            origin: null,
            destination: null,
            truck: null,
            pickupStartDate: null,
            deadhead: importLoadSearchParams.deadhead,
            milesMin: importLoadSearchParams.milesMin,
            milesMax: importLoadSearchParams.milesMax,
        })
    }

    const onSearch = () => {
        if(importLoadSearchParams.truck === null || pickupDateState === null || importLoadSearchParams.origin === null) {
            setSnackBarState({ message: "Please choose truck, pickup start date and origin city.", severity: "error" })
            return
        }
        searchImportLoads(importLoadSearchParams, pickupDateState)
    }
    
    return (
        <>
            <Helmet>
                <title>Truskdispatcher.com - Search</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truskdispatcher.com" />
            </Helmet>
            {/* Search settings */}
            <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                <Paper elevation={6} className='dahboard-card' sx={{ overflow: 'hidden' }}>
                    <Box sx={{ padding: "20px 0 30px 0" }}>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px'>
                            <Grid item sx={{ width: {xs: "100%", md: "48%" } }}>
                                <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px'>
                                    <Grid item sx={{ width: {xs: "100%", sm: "48%" } }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="truck-label">Truck</InputLabel>
                                            <Select labelId="truck-label" id="truck-simple-select"
                                                value={importLoadSearchParams.truck ? importLoadSearchParams.truck.id : ""}
                                                label="Truck" fullWidth
                                                sx={{"& .MuiOutlinedInput-input": muiTextFieldStyle}}
                                                onChange={onTruckFilterChanged}
                                            >
                                                {searchTrucksState.map((truck: TruckDto) =>
                                                <MenuItem key={truck.id} value={truck.id}
                                                    sx={{fontSize: "14px", fontFamily: "Mulish", padding: "2px 10px"}}
                                                >
                                                    {truck.name + " " + truck.licensePlate}
                                                </MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sx={{ width: {xs: "100%", sm: "48%" } }}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DatePicker label="Pickup" 
                                                sx={{width: "100%", "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                                value={moment(pickupDateState)}
                                                onChange={(newValue) => setPickupDateState(newValue.toDate())}
                                            />
                                        </LocalizationProvider>                                 
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ width: {xs: "100%", md: "48%" } }}>
                                <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px'>
                                    <Grid item sx={{ width: {xs: "100%", sm: "48%" } }}>
                                        <Autocomplete disablePortal multiple={false} options={origins} 
                                            value={originValue}
                                            inputValue={originInputValue}
                                            onInputChange={(event, newInputValue) => {
                                                setOriginInputValue(newInputValue);
                                              }}
                                            onChange={onOriginFilterChanged}
                                            getOptionLabel={(option) => option['fullName']}
                                            renderInput={(params) => 
                                                <TextField {...params} label="Origin" 
                                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                                    onChange={searchOriginCities}/>}
                                                        renderOption={(props, option) => (
                                                            <MenuItem {...props} key={option.id} value={option.name}
                                                                sx={{ justifyContent: "space-between", fontSize: "16px", fontFamily: "Mulish" }}>
                                                                {origins.length > 0 ? option.fullName : ''}
                                                            </MenuItem>
                                                    )}
                                        />
                                    </Grid>
                                    <Grid item sx={{ width: {xs: "100%", sm: "48%" } }}>
                                        <Autocomplete disablePortal multiple={false} options={destinations}
                                            value={destinationValue}
                                            inputValue={destinationInputValue}
                                            onInputChange={(event, newInputValue) => {
                                                setDestinationInputValue(newInputValue);
                                              }}
                                            onChange={onDestinationFilterChanged}
                                            getOptionLabel={(option) => option['fullName']}
                                            renderInput={(params) => 
                                                <TextField {...params} label="Destination" 
                                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                                    onChange={searchDestinationCities}/>}
                                                        renderOption={(props, option) => (
                                                            <MenuItem {...props} key={option.id} value={option.id}
                                                                sx={{ justifyContent: "space-between", fontSize: "16px", fontFamily: "Mulish" }} >
                                                                {destinations.length > 0 ? option.fullName: ''}
                                                            </MenuItem>)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px'>
                            <Grid item sx={{ width: {xs: "100%", md: "48%" } }}>
                                <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px'>
                                    <Grid item sx={{ width: {xs: "100%", sm: "48%" } }}>
                                        <FormHelperText>Deadheads</FormHelperText>
                                        <Slider
                                            value={importLoadSearchParams.deadhead}
                                            onChange={onDeadheadsChanged}
                                            valueLabelDisplay="auto"
                                            step={50} marks min={0} max={500}
                                        />
                                    </Grid>
                                    <Grid item sx={{ width: {xs: "100%", sm: "48%" } }}>
                                        <FormHelperText>Distance</FormHelperText>
                                        <Slider 
                                            value={[importLoadSearchParams.milesMin, importLoadSearchParams.milesMax]}
                                            onChange={onDistanceChanged}
                                            valueLabelDisplay="auto"
                                            step={200} marks min={0} max={4000}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ width: {xs: "100%", md: "48%" } }}>
                                <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px'>
                                    <Grid item sx={{width: {xs: "100%", sm: "48%" } }}>
                                        <SearchSortFieldBar fields={["Pickup", "Delivery", "Miles", "Rate", "Rate Per Mile", 
                                            "Profit", "Profit Per Mile"]}/>
                                    </Grid>
                                    <Grid item sx={{ width: {xs: "100%", sm: "48%" } }}>
                                        <Grid container direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                                            <MuiButton variant='contained' onClickHandler={onSearch}>
                                                <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Search</span>
                                            </MuiButton>
                                            <MuiButton variant="contained" color="inherit" onClickHandler={onSearchReset}>
                                                <span className="text-14" style={{color: 'var(--darkGrey)'}}>Reset</span>
                                            </MuiButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>                    
                </Paper>                
            </Grid>
            <Container maxWidth="lg" className='layout-container-searchpage' >
            {/* ImportLoads List */}
            {
                importLoadSearchParams.itemList.length > 0 ?
                    <div style={{ margin: "30px 0" }}>
                        {importLoadSearchParams.itemList.map(importLoad =>
                            <SearchCard key={importLoad.id} importLoad={importLoad} isBackhaul={false} />
                        )}
                    </div> :
                    loading ? <Spinner /> :
                        error ? <ErrorMessage appearance="regular">{error}</ErrorMessage> :
                            <p style={{ padding: "0 15px" }}>No loads. Please change the search settings.</p>
            }
            <IntersectionObserverComponent onIntersection={handleIntersection} />
            {(importLoadSearchParams.itemList.length > 0 && loading) && <Spinner />}
            <Snackbar
                open={snackBarState !== null}
                autoHideDuration={4000}
                onClose={сloseSnackbar}
            >
                <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>
            </Container>
        </>
    )
}
