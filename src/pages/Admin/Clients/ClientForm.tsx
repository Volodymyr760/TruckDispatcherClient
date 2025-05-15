import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import { useActions } from "../../../hooks/useActions"
import { AppRoles } from "../../../types/common/appRoles"
import { ClientStatus, IClient } from "../../../types/client"
import { ClientFormProps } from "./types"
import { EMAIL_REG_EXP } from "../../../types/common/RegularExpressions"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { Alert, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, 
    Radio, RadioGroup, Snackbar, SwipeableDrawer, TextField } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CircularProgress from '@mui/material/CircularProgress'
import CloseIcon from '@mui/icons-material/Close'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MuiButton from "../../../components/Button/MuiButton"
import ErrorMessage from "../../../components/Messages/ErrorMessage"

export default function ClientForm({ client, closeForm }: ClientFormProps): JSX.Element {
    const { createClient, updateClient } = useActions()
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [errorState, setErrorState] = useState<null | string>(null)

    const [clientStatusState, setClientStatusState] = useState<ClientStatus>(client.clientStatus)
    const [clientAppRoleState, setClientAppRoleState] = useState<AppRoles>(client.appRoles)

    const onSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

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
        city: Yup.string()
            .required('Required field.')
            .max(50, 'City may not be greater than 50 characters.'),
            dotNumber: Yup.string()
            .required('Required field.')
            .max(20, 'dotNumber may not be greater than 20 characters.')
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
        notes: client.notes
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSubmit = async (client: IClient): Promise<void> => {
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
                    <Grid item>
                        <Controller name="name" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Name" type="text" margin="normal" fullWidth
                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
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
                    <Grid item>
                        <Controller name="email" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Email" type="email" margin="normal" fullWidth
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
                    <Grid item>
                        <Controller name="city" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="City" type="text" margin="normal" fullWidth
                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" >
                                                    <AccountCircleIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.city)} helperText={errors.city?.message} />}
                        />
                    </Grid>
                    <Grid item>
                        <FormControl sx={{ margin: "24px 0", width: "100%" }} component="fieldset" variant="standard"  >
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
                    <Grid item>
                        <FormControl sx={{ margin: "24px 0", width: "100%" }} component="fieldset" variant="standard"  >
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
                    <Grid item>
                        <Controller name="dotNumber" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Dot Number" type="number" margin="normal" fullWidth
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
                    <Grid item>
                        <Controller name="notes" control={control}
                            render={({ field }) =>
                                <TextField {...field} label="Notes" fullWidth
                                    margin="normal" multiline rows={4} variant='outlined' style={{ height: 'none' }}
                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    error={Boolean(errors.notes)} helperText={errors.notes?.message} />} />
                    </Grid>
                    {errorState && <ErrorMessage appearance="small" >{errorState}</ErrorMessage>}
                </Grid>
                <Grid container direction="row" justifyContent="space-around" alignItems="center" mb={2}>
                    <MuiButton variant='contained' onClickHandler={onCancelHandler}>
                        <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Cancel</span>
                    </MuiButton>
                    <MuiButton variant="contained" type="submit">
                        {loadingState && <CircularProgress size="1rem" sx={{ mr: '10px' }} />} <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Save</span>
                    </MuiButton>                    
                </Grid>
            </form>
            <Snackbar open={snackBarState !== null} autoHideDuration={4000} onClose={onSnackbarClose}>
                <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>
        </SwipeableDrawer>
    )
}