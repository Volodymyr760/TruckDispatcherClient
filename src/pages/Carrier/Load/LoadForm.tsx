import React, { ChangeEvent, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import moment from "moment"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { isPhoneValid } from "../../../hooks/IsPhoneValid"
import { Equipment } from "../../../types/common/equipment"
import { OrderType } from "../../../types/common/orderType"
import { ILoad, LoadStatus } from "../../../types/load"
import { LoadFormProps } from "./types"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { TruckDto, TruckStatus } from "../../../types/truck"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { getTrucksAxios } from "../../../api/truck"
import { Alert, Autocomplete, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, 
    Snackbar, SwipeableDrawer, TextField } from "@mui/material"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import CircularProgress from '@mui/material/CircularProgress'
import CloseIcon from '@mui/icons-material/Close'
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import MuiButton from "../../../components/Button/MuiButton"
import PhoneIcon from '@mui/icons-material/Phone'
import { ICity } from "../../../types/city"
import { getCitiesAxios, getCityByFullnameAxios } from "../../../api/city"

export default function LoadForm({ load, closeForm }: LoadFormProps): JSX.Element {
    const { auth } = useTypedSelector(state => state.auth)
    const { error, loading } = useTypedSelector(state=> state.load)
    const { createLoad, updateLoad, setLoadError, setLoadLoading } = useActions()
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)

    const [origins, setOrigins] = useState<ICity[]>([])
    const [originValue, setOriginValue] = useState<ICity | null>(null)
    const [originInputValue, setOriginInputValue] = useState<string>("")
    const [destinations, setDestinations] = useState<ICity[]>([])
    const [destinationValue, setDestinationValue] = useState<ICity | null>(null)
    const [destinationInputValue, setDestinationInputValue] = useState<string>("")

    const [pickupDateState, setPickupDateState] = useState<Date>(
        load.pickUp ? 
            load.pickUp.toString().includes('Z') ? new Date(load.pickUp.toString()) : new Date(load.pickUp.toString() + "Z") 
            : new Date()
    )
    const [deliveryDateState, setDeliveryDateState] = useState<Date>(
        load.delivery ? 
            load.delivery.toString().includes('Z') ? new Date(load.delivery.toString()) : new Date(load.delivery.toString() + "Z") 
            : new Date()
    )

    const [trucksState, setTrucksState] = useState<TruckDto[]>([])
    const [truckIdState, setTruckIdState] = useState(load.truckId || '')

    const equipments: Equipment[] = [Equipment.Flatbed, Equipment.Reefer, Equipment.Van]
    const loadStatuses: LoadStatus[] = [LoadStatus.Booked, LoadStatus.Completed, LoadStatus.InProgress, 
        LoadStatus.Payed, LoadStatus.Saved]

    const fetchOriginCity = async (cityFullName: string) =>{
        const city = await getCityByFullnameAxios(cityFullName);
        setOriginValue(city)
    }

    const fetchDestinationCity = async (cityFullName: string) =>{
        const city = await getCityByFullnameAxios(cityFullName);
        setDestinationValue(city)
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
        setTrucksState(result.itemList)
    }

    useEffect(() => {
        if(load.origin) fetchOriginCity(load.origin)
        if(load.destination) fetchDestinationCity(load.destination)
        fetchTrucks()
        // eslint-disable-next-line
    }, [])

    const defaultValues: ILoad = {
        id: load.id, 
        referenceId: load.referenceId, 
        origin: load.origin, destination: load.destination, 
        pickUp: load.pickUp, delivery: load.delivery,
        length: load.length, weight: load.weight, 
        equipment: load.equipment,
        shipperName: load.shipperName, shipperEmail: load.shipperEmail, shipperPhone: load.shipperPhone,
        miles: load.miles, deadheadOrigin: load.deadheadOrigin, deadheadDestination: load.deadheadDestination,
        rate: load.rate, ratePerMile: load.ratePerMile, profit: load.profit, profitPerMile: load.profitPerMile,
        requirements: load.requirements,
        loadStatus: load.loadStatus,
        truckId: load.truckId || '', truck: load.truck,
        userId: auth.user.id
    }

    const validationSchema = Yup.object({
        referenceId: Yup.string()
            .required('Required field.')
            .max(450, 'Reference Id may not be greater than 450 characters.'),
        length: Yup.number()
            .min(0, 'Length may not be less than 0.'),
        width: Yup.number()
            .min(0, 'Width may not be less than 0.'),
        height: Yup.number()
            .min(0, 'Height may not be less than 0.'),
        weight: Yup.number()
            .min(0, 'weight may not be less than 0.'),
        shipperName: Yup.string()
            .required('Required field.')
            .max(256, 'Shipper name may not be greater than 256 characters.'),
        shipperEmail: Yup.string()
            .max(256, 'Email may not be greater than 256 characters.'),
        shipperPhone: Yup.string()
            .max(50, 'Phone may not be greater than 50 characters.'),
        miles: Yup.number()
            .required('Required field.')
            .min(1, 'Miles may not be less than 1 mile.')
            .max(4000, "Phone may not be greater than 4000 miles."),
        deadheadOrigin: Yup.number()
            .min(0, 'Deadhead may not be less than 0.')
            .max(4000, "Deadhead may not be greater than 4000 miles."),
        deadheadDestination: Yup.number()
            .min(0, 'Deadhead may not be less than 0.')
            .max(4000, "Deadhead may not be greater than 4000 miles."),
        rate: Yup.number()
            .min(0, 'Rate may not be less than 0.'),
        ratePerMile: Yup.number()
            .min(0, 'Rate Per Mile may not be less than 0.'),
        profit: Yup.number()
            .min(0, 'Profit may not be less than 0.'),
        profitPerMile: Yup.number()
            .min(0, 'Profit Per Mile may not be less than 0.'),
        requirements: Yup.string()
            .max(450, 'Requirements may not be greater than 450 characters.')
    })

    const onSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => setSnackBarState(null)

    const toggleDrawer = (anchor: string, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (event && event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
            ) return
            if (!open) closeForm()
        };

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const searchOriginCities = async (event: ChangeEvent<HTMLInputElement>) => {
        const result = await getCitiesAxios({
            pageSize: 20,
            currentPage: 1,
            searchCriteria: event.target.value,
            userId: "",
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
            userId: "",
            sortField: "FullName",
            order: OrderType.Ascending,
            includeNavProperties: false,
            itemList: [],
            pageCount: 0,
            totalItemsCount: 0
        });
        setDestinations(result.itemList)
    }
    
    const onOriginFilterChanged = async (event, city) => setOriginValue(city)

    const onDestinationFilterChanged = async (event, city) => setDestinationValue(city)

    const onTruckChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTruckIdState(e.target.value)
    }

    const onCancelHandler = () => {
        reset()
        closeForm()
    }

    const onSubmit = async (load: ILoad): Promise<void> => {
        if(!originValue || !destinationValue) {
            setSnackBarState({ message: "Please choose Origin and Destination.", severity: "error" })
            return
        }
        load.origin = originValue.fullName
        load.destination = destinationValue.fullName
        load.pickUp = pickupDateState
        load.delivery = deliveryDateState
        try {
            setLoadLoading(true)
            setLoadError(null)
            load.truck = truckIdState ? trucksState.filter(t => t.id === truckIdState)[0] : null
            load.truckId = truckIdState ? truckIdState : null
            if (load.id) {
                updateLoad(load)
            } else {
                createLoad(load)
            }
            onCancelHandler()
        } catch (error) {
            setLoadError(error.message || "Unable to save the load.")
        } finally {
            setLoadLoading(false)
        }
    }

    return (
        <SwipeableDrawer open={true} anchor='right' transitionDuration={1500} sx={{ zIndex: 1202 }}
            onClose={toggleDrawer('right', false)} onOpen={toggleDrawer('right', true)}
        >
            <CloseIcon
                sx={{ cursor: 'pointer', fill: 'var(--lightGrey)', '&:hover': { fill: "red" }, position: "absolute", top: "5px", right: "15px" }}
                onClick={onCancelHandler}
            />
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '360px' }}>
                <Grid container direction={'column'} justifyContent="center" spacing={2} sx={{ padding: '20px' }}>
                    <Grid item> {/* Origin */}
                        <Autocomplete disablePortal multiple={false} 
                            options={origins} value={originValue} inputValue={originInputValue}
                            onInputChange={(event, newInputValue) => { setOriginInputValue(newInputValue) }}
                            onChange={onOriginFilterChanged}
                            getOptionLabel={(option) => option['fullName']}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            renderInput={(params) => 
                                <TextField {...params} label="Origin" 
                                    sx={{marginTop: 3, "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    onChange={searchOriginCities}/>}
                                    renderOption={(props, option) => (
                                            <MenuItem {...props} key={option.id} value={option.name}
                                                sx={{ justifyContent: "space-between", fontSize: "16px", fontFamily: "Mulish" }}>
                                                {origins.length > 0 ? option.fullName : ''}
                                            </MenuItem>
                                    )}
                        />
                    </Grid>
                    <Grid item> {/* Destination */}
                        <Autocomplete disablePortal 
                                multiple={false} 
                                options={destinations} 
                                value={destinationValue}
                                inputValue={destinationInputValue}
                                onInputChange={(event, newInputValue) => { setDestinationInputValue(newInputValue) }}
                                onChange={onDestinationFilterChanged}
                                getOptionLabel={(option) => option['fullName']}
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                renderInput={(params) => 
                                    <TextField {...params} label="Destination" 
                                        sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                        onChange={searchDestinationCities}/>}
                                        renderOption={(props, option) => (
                                                <MenuItem {...props} key={option.id} value={option.name}
                                                    sx={{ justifyContent: "space-between", fontSize: "16px", fontFamily: "Mulish" }}>
                                                    {origins.length > 0 ? option.fullName : ''}
                                                </MenuItem>
                                        )}
                            />
                    </Grid>
                    <Grid item> {/* Pickup */}
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DateTimePicker label="Pickup" sx={{width: "100%", "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                value={moment(pickupDateState)}
                                onChange={(newValue) => setPickupDateState(newValue.toDate())}
                            />
                        </LocalizationProvider>                        
                    </Grid>
                    <Grid item> {/* Delivery */}
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DateTimePicker label="Delivery" sx={{width: "100%", "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                value={moment(deliveryDateState)}
                                onChange={(newValue) => setDeliveryDateState(newValue.toDate())}
                            />
                        </LocalizationProvider>                            
                    </Grid>
                    <Grid item> {/* Weight & Lenght */}
                        <Grid container direction="row" sx={{justifyContent: "space-between", alignItems: "center"}}>
                            <Grid item>
                                <Controller name="weight" control={control}
                                    render={({ field }) =>
                                        <TextField  {...field} label="Weight" type="number"
                                            sx={{width: "120px", "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                            error={Boolean(errors.weight)} helperText={errors.weight?.message} />} />
                            </Grid>
                            <Grid item>
                                <Controller name="length" control={control}
                                    render={({ field }) =>
                                        <TextField  {...field} label="Length" type="number" margin="none"
                                            sx={{width: "120px", "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                            error={Boolean(errors.length)} helperText={errors.length?.message} />} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item> {/* Equipment */}
                        <FormControl fullWidth>
                            <InputLabel id="equipment-label">Equipment</InputLabel>
                            <Controller name="equipment" defaultValue={equipments[0]} control={control} 
                                render={({ field }) => (
                                    <Select label="Equipment" {...field}
                                        sx={{"& .MuiOutlinedInput-input": muiTextFieldStyle}}
                                    >
                                        {equipments.map((equipment, index) =>
                                            <MenuItem key={index} value={equipment}
                                                sx={{fontSize: "16px", fontFamily: "Mulish", padding: "2px 10px"}}
                                            >
                                                {Equipment[equipment]}
                                            </MenuItem>)}
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item> {/* Shipper Name */}
                        <Controller name="shipperName" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Shipper" type="text" fullWidth
                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    error={Boolean(errors.shipperName)} helperText={errors.shipperName?.message} />}
                        />
                    </Grid>
                    <Grid item> {/* Shipper Email */}
                        <Controller name="shipperEmail" control={control}
                            render={({ field }) =>
                                <TextField  {...field}
                                    label="Email" type="email" fullWidth
                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" >
                                                    <MailOutlineIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.shipperEmail)} helperText={errors.shipperEmail?.message}
                                />
                            }
                        />
                    </Grid>
                    <Grid item> {/* Shipper Phone */}
                        <Controller name="shipperPhone" control={control}
                            render={({ field }) =>
                                <>
                                    <TextField {...field} label="Phone" type="text" fullWidth
                                        sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton edge="end" >
                                                        <PhoneIcon />
                                                    </IconButton>
                                                </InputAdornment>),
                                        }}
                                        error={Boolean(errors.shipperPhone)} helperText={errors.shipperPhone?.message} />
                                    {
                                        !isPhoneValid(field.value) &&
                                        <p className="error-wrapper">
                                            Phone number is not valid. Must contain from 11 up to 13 characters, valid formats: +31636363634, 1234567890, 075-63546725, 123-456-7890, (123)456-7890, (123) 456-7890, 123.456.7890.
                                        </p>
                                    }
                                </>
                            }
                        />
                    </Grid>
                    <Grid item> {/* Miles DH-O DH-D */}
                        <Grid container direction="row" sx={{justifyContent: "space-between", alignItems: "center"}}>
                            <Grid item>
                                <Controller name="miles" control={control}
                                    render={({ field }) =>
                                        <TextField  {...field} label="Miles" type="number"
                                            inputProps={{min: 0, max: 5000, step: 1}}
                                            sx={{width: "90px", "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                            error={Boolean(errors.miles)} helperText={errors.miles?.message} 
                                        />} 
                                />
                            </Grid>
                            <Grid item>
                                <Controller name="deadheadOrigin" control={control}
                                    render={({ field }) =>
                                        <TextField  {...field} label="DH-O" type="number"
                                            inputProps={{min: 0, max: 5000, step: 1}}
                                            sx={{width: "90px", "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                            error={Boolean(errors.deadheadOrigin)} helperText={errors.deadheadOrigin?.message} 
                                        />} 
                                />
                            </Grid>
                            <Grid item>
                                <Controller name="deadheadDestination" control={control}
                                    render={({ field }) =>
                                    <TextField  {...field} label="DH-D" type="number"
                                        sx={{width: "90px", "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                        error={Boolean(errors.deadheadDestination)} helperText={errors.deadheadDestination?.message} 
                                        inputProps={{min: 0, max: 5000, step: 1}}
                                    />} 
                                />
                            </Grid> 
                        </Grid>
                    </Grid>
                    <Grid item> {/* Rate & RPM */}
                        <Grid container direction="row" sx={{justifyContent: "space-between", alignItems: "center"}}>
                            <Grid item>
                                <Controller name="rate" control={control}
                                    render={({ field }) =>
                                        <TextField  {...field} label="Rate" type="number"
                                            sx={{width: "120px", "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                            inputProps={{min: 0, max: 1000000, step: 0.01}}
                                            error={Boolean(errors.rate)} helperText={errors.length?.message} 
                                        />} 
                                />
                            </Grid>
                            <Grid item>
                                <Controller name="ratePerMile" control={control}
                                    render={({ field }) =>
                                        <TextField  {...field} label="Rate Per Mile" type="number"
                                            sx={{width: "120px", "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                            inputProps={{min: 0, max: 1000000, step: 0.01}}
                                            error={Boolean(errors.ratePerMile)} helperText={errors.ratePerMile?.message} 
                                        />} 
                                />
                            </Grid>                          
                        </Grid>                                    
                    </Grid>
                    <Grid item> {/* Profit & PPM */}
                        <Grid container direction="row" sx={{justifyContent: "space-between", alignItems: "center"}}>
                            <Grid item>
                                <Controller name="profit" control={control}
                                    render={({ field }) =>
                                        <TextField  {...field} label="Profit" type="number"
                                            sx={{width: "120px", "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                            inputProps={{min: 0, max: 1000000, step: 0.01}}
                                            error={Boolean(errors.profit)} helperText={errors.profit?.message} 
                                        />} 
                                />
                            </Grid>
                            <Grid item>
                                <Controller name="profitPerMile" control={control}
                                    render={({ field }) =>
                                        <TextField  {...field} label="Profit Per Mile" type="number"
                                            sx={{width: "120px", "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                            inputProps={{min: 0, max: 1000000, step: 0.01}}    
                                            error={Boolean(errors.profitPerMile)} helperText={errors.profitPerMile?.message} 
                                        />} 
                                />
                            </Grid>                          
                        </Grid>                                     
                    </Grid>
                    <Grid item> {/* Load Status */}
                        <FormControl fullWidth>
                        <InputLabel id="load-status-label">Load Status</InputLabel>
                        <Controller name="loadStatus"
                            defaultValue={LoadStatus.Saved}
                            control={control}
                            render={({ field }) => (
                                <Select label="Load Status" {...field} fullWidth
                                    sx={{"& .MuiOutlinedInput-input": muiTextFieldStyle}}
                                >
                                    {loadStatuses.map((loadStatus, index) =>
                                        <MenuItem key={index} value={loadStatus}
                                            sx={{fontSize: "16px", fontFamily: "Mulish", padding: "2px 10px"}}
                                        >
                                            {LoadStatus[loadStatus]}
                                        </MenuItem>)}
                                </Select>
                            )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item> {/* Truck */}
                        <FormControl fullWidth>
                            <InputLabel id="truck-label">Truck</InputLabel>
                            <Controller name="truckId" control={control}
                                render={({ field }) => (
                                    <Select label="Truck" {...field}
                                        value={trucksState.length > 0 && truckIdState ?
                                             trucksState.filter(t => t.id === truckIdState)[0].id : ""}
                                        onChange={onTruckChanged}
                                        sx={{"& .MuiOutlinedInput-input": muiTextFieldStyle}}
                                    > 
                                        {trucksState.map((truck: TruckDto) =>
                                            <MenuItem key={truck.id} value={truck.id}
                                                sx={{fontSize: "14px", fontFamily: "Mulish", padding: "2px 10px"}}
                                            >
                                                {truck.name + " " + truck.licensePlate}
                                            </MenuItem>)} 
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item> {/* ReferenceId */}
                        <Controller name="referenceId" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Reference Id" type="text" fullWidth
                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    error={Boolean(errors.referenceId)} helperText={errors.referenceId?.message} />}
                        />
                    </Grid>
                    <Grid item> {/* Requirements */}
                        <Controller name="requirements" control={control}
                            render={({ field }) =>
                                <TextField {...field} label="Requirements" fullWidth multiline rows={4} variant='outlined'
                                    sx={{ height: 'none', "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    error={Boolean(errors.requirements)} helperText={errors.requirements?.message} />} />
                    </Grid>
                    {error && <ErrorMessage appearance="small" >{error}</ErrorMessage>}
                </Grid>
                {/* Buttons */}
                <Grid container direction="row" justifyContent="space-around" alignItems="center" mb={2}>
                    <MuiButton variant='contained' onClickHandler={onCancelHandler}>
                        <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Cancel</span>
                    </MuiButton>
                    <MuiButton variant="contained" type="submit">
                        {loading && <CircularProgress size="1rem" sx={{ mr: '10px' }} />} <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Save</span>
                    </MuiButton>                    
                </Grid>
            </form>
            <Snackbar open={snackBarState !== null} autoHideDuration={4000} onClose={onSnackbarClose} >
                <Alert className="text-16" severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>
        </SwipeableDrawer>
    )
}