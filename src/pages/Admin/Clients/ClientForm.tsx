import React, { ChangeEvent, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import { useActions } from "../../../hooks/useActions"
import { AppRoles } from "../../../types/common/appRoles"
import { ICity } from "../../../types/city"
import { ClientStatus, IClient } from "../../../types/client"
import { ClientFormProps } from "./types"
import { EMAIL_REG_EXP } from "../../../types/common/RegularExpressions"
import { OrderType } from "../../../types/common/orderType"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { getCitiesAxios, getCityByFullnameAxios } from "../../../api/city"
import { Alert, Autocomplete, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, 
    MenuItem, Radio, RadioGroup, Snackbar, SwipeableDrawer, TextField } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CircularProgress from '@mui/material/CircularProgress'
import CloseIcon from '@mui/icons-material/Close'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import MuiButton from "../../../components/Button/MuiButton"

export default function ClientForm({ client, closeForm }: ClientFormProps): JSX.Element {
    const { createClient, updateClient } = useActions()
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [errorState, setErrorState] = useState<null | string>(null)
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)

    const [origins, setOrigins] = useState<ICity[]>([])
    const [originValue, setOriginValue] = useState<ICity | null>(null)
    const [originInputValue, setOriginInputValue] = useState<string>("")

    const [clientStatusState, setClientStatusState] = useState<ClientStatus>(client.clientStatus)
    const [clientAppRoleState, setClientAppRoleState] = useState<AppRoles>(client.appRoles)

    const fetchOriginCity = async (cityFullName: string) =>{
        const city = await getCityByFullnameAxios(cityFullName);
        setOriginValue(city)
    }
    
    useEffect(() => {
        if(client.city) fetchOriginCity(client.city)
        // eslint-disable-next-line
    }, [])
    
    const onTClientStatusChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch(event.target.value){
            case ClientStatus.Invited.toString():
                setClientStatusState(ClientStatus.Invited)
                break
            case ClientStatus.Stopped.toString():
                setClientStatusState(ClientStatus.Stopped)
                break
            default:
                setClientStatusState(ClientStatus.Created)
                break
        }
    };
    
    const onTClientAppRoleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value === AppRoles.Carrier.toString()) {
            setClientAppRoleState(AppRoles.Carrier)
        } else {
            setClientAppRoleState(AppRoles.Broker)
        }
    };

    const toggleDrawer = (anchor: string, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (event && event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
            ) return
            if (!open) closeForm()
        };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Required field.')
            .max(50, 'Name may not be greater than 50 characters.'),
        email: Yup.string()
            .required('Required field.')
            .max(256, 'Email may not be greater than 256 characters.')
            .matches(EMAIL_REG_EXP, "Email is not valid and may not be greater than 256 characters."),
        dotNumber: Yup.string()
            .required('Required field.')
            .max(20, 'dotNumber may not be greater than 20 characters.'),
        timeZoneShift: Yup.number()
            .required('Required field.')
            .min(-8, 'timeZoneShift may not be less than -8.')
            .max(-4, 'timeZoneShift may not be greater than -4.')
    })

    const defaultValues: IClient = {
        id: client.id,
        name: client.name,
        email: client.email,
        city: client.city,
        clientStatus: client.clientStatus,
        appRoles: client.appRoles,
        dotNumber: client.dotNumber,
        createdAt: client.createdAt,
        invitedAt: client.invitedAt,
        timeZoneShift: client.timeZoneShift,
        notes: client.notes
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => setSnackBarState(null)

    const onOriginFilterChanged = async (event, city) => setOriginValue(city)

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
    
    const onSubmit = async (client: IClient): Promise<void> => {
        if(!originValue) {
            setSnackBarState({ message: "Please choose client's city.", severity: "error" })
            return
        }
        client.city = originValue.fullName
        client.invitedAt = clientStatusState === ClientStatus.Invited ? new Date() : null
        client.clientStatus = clientStatusState
        client.appRoles = clientAppRoleState
        try {
            setLoadingState(true)
            setErrorState(null)
            if (client.id) {
                updateClient(client)
            } else {
                createClient(client)
            }
            onCancelHandler()
        } catch (error) {
            setErrorState(error.message || "Unable to save the client.")
        } finally {
            setLoadingState(false)
        }
    }

    const onCancelHandler = () => {
        reset()
        closeForm()
    }

    return (
        <SwipeableDrawer open={true} anchor='right' transitionDuration={1500} sx={{ zIndex: 1202 }}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
        >
            <CloseIcon
                sx={{ cursor: 'pointer', fill: 'var(--lightGrey)', '&:hover': { fill: "red" }, position: "absolute", top: "5px", right: "15px" }}
                onClick={onCancelHandler}
            />
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '360px' }}>
                <Grid container direction={'column'} justifyContent="center" spacing={2} sx={{ padding: '20px' }}>
                    {/* Name */}
                    <Grid item>
                        <Controller name="name" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Name" type="text" fullWidth 
                                    sx={{marginTop: 3, "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" >
                                                    <AccountCircleIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.name)} helperText={errors.name?.message} />}
                        />
                    </Grid>
                    {/* Dot Number */}
                    <Grid item>
                        <Controller name="dotNumber" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Dot Number" type="number" fullWidth
                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" >
                                                    <AccountCircleIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.dotNumber)} helperText={errors.dotNumber?.message} />}
                        />
                    </Grid>
                    {/* Email */}
                    <Grid item>
                        <Controller name="email" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Email" type="email" fullWidth
                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" >
                                                    <MailOutlineIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.email)} helperText={errors.email?.message}
                                />
                            }
                        />
                    </Grid>
                    {/* City */}
                    <Grid item>
                        <Autocomplete disablePortal multiple={false} 
                            options={origins} value={originValue} inputValue={originInputValue}
                            onInputChange={(event, newInputValue) => { setOriginInputValue(newInputValue) }}
                            onChange={onOriginFilterChanged}
                            getOptionLabel={(option) => option['fullName']}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            renderInput={(params) => 
                                <TextField {...params} label="City" 
                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    onChange={searchOriginCities}
                                />}
                            renderOption={(props, option) => (
                                <MenuItem {...props} key={option.id} value={option.name}
                                    sx={{ justifyContent: "space-between", fontSize: "16px", fontFamily: "Mulish" }}>
                                    {origins.length > 0 ? option.fullName : ''}
                                </MenuItem> )}
                        />
                    </Grid>
                    {/* Client Status */}
                    <Grid item>
                        <FormControl component="fieldset" variant="standard"  >
                            <FormLabel component="legend">Client Status:</FormLabel>
                            <Controller rules={{ required: true }} control={control} name="clientStatus"
                                render={({ field }) => (
                                    <RadioGroup {...field}
                                        onChange={onTClientStatusChanged}
                                        value={clientStatusState}
                                    >
                                        <FormControlLabel value={ClientStatus.Created} control={<Radio />}
                                            label={ <span className="text-14">{ClientStatus[ClientStatus.Created]}</span> }
                                        />
                                        <FormControlLabel value={ClientStatus.Invited} control={<Radio />}
                                            label={ <span className="text-14">{ClientStatus[ClientStatus.Invited]}</span> }
                                        />
                                        <FormControlLabel value={ClientStatus.Stopped} control={<Radio />}
                                            label={ <span className="text-14">{ClientStatus[ClientStatus.Stopped]}</span> }
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                    </Grid>
                    {/* Client Role */}
                    <Grid item>
                        <FormControl component="fieldset" variant="standard"  >
                            <FormLabel component="legend">Client Role:</FormLabel>
                            <Controller rules={{ required: true }} control={control} name="appRoles"
                                render={({ field }) => (
                                    <RadioGroup {...field}
                                        onChange={onTClientAppRoleChanged}
                                        value={clientAppRoleState}
                                    >
                                        <FormControlLabel value={AppRoles.Carrier} control={<Radio />}
                                            label={ <span className="text-14">{AppRoles[AppRoles.Carrier]}</span> }
                                        />
                                        <FormControlLabel value={AppRoles.Broker} control={<Radio />}
                                            label={ <span className="text-14">{AppRoles[AppRoles.Broker]}</span> }
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                    </Grid>
                    {/* Time Zone Shift */}
                    <Grid item>
                        <Controller name="timeZoneShift" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Time Zone Shift" type="number" fullWidth
                                    sx={{margin: 0, "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    inputProps={{min: -8, max: -4, step: 1}}
                                    error={Boolean(errors.timeZoneShift)} helperText={errors.timeZoneShift?.message} />} />
                    </Grid>
                    {/* Notes */}
                    <Grid item>
                        <Controller name="notes" control={control}
                            render={({ field }) =>
                                <TextField {...field} label="Notes" fullWidth 
                                    multiline rows={4} variant='outlined' style={{ height: 'none' }}
                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    error={Boolean(errors.notes)} helperText={errors.notes?.message} />} />
                    </Grid>
                    {errorState && <ErrorMessage appearance="small" >{errorState}</ErrorMessage>}
                </Grid>
                {/* Buttons */}
                <Grid container direction="row" justifyContent="space-around" alignItems="center" mb={2}>
                    <MuiButton variant='contained' onClickHandler={onCancelHandler}>
                        <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Cancel</span>
                    </MuiButton>
                    <MuiButton variant="contained" type="submit">
                        {loadingState && <CircularProgress size="1rem" sx={{ mr: '10px' }} />} <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Save</span>
                    </MuiButton>                    
                </Grid>
            </form>
            <Snackbar open={snackBarState !== null} autoHideDuration={4000} onClose={onSnackbarClose} >
                <Alert className="text-16" severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>            
        </SwipeableDrawer>
    )
}