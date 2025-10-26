import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useActions } from "../../../hooks/useActions"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import moment from "moment"
import { isPhoneValid } from "../../../hooks/IsPhoneValid"
import { AccountStatus, IUser } from "../../../types/user"
import { AccountFormProps } from './types'
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, SwipeableDrawer, TextField } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import CircularProgress from '@mui/material/CircularProgress'
import CloseIcon from '@mui/icons-material/Close'
import MuiButton from "../../../components/Button/MuiButton"
import PhoneIcon from '@mui/icons-material/Phone'
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import './styles.css'

export default function UserForm({ user, onClose }: AccountFormProps) {
    const { updateUser } = useActions()
    const [startDateState, setStartDateState] = useState<Date>(user.startPayedPeriodDate)
    const [finishDateState, setFinishDateState] = useState<Date>(user.finishPayedPeriodDate)
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [errorState, setErrorState] = useState<null | string>(null)
    const accountStatuses: AccountStatus[] = [AccountStatus.None, AccountStatus.ActiveUser, 
        AccountStatus.InactiveUserToRemove, AccountStatus.Warned]

    const toggleDrawer = (anchor: string, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (event && event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) return
            if (!open) onClose()
        };

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required('Required field.')
            .max(20, 'First name may not be greater than 20 characters.'),
        lastName: Yup.string()
            .required('Required field.')
            .max(20, 'Last name may not be greater than 20 characters.'),
            phoneNumber: Yup.string()
            .required('Required field.')
            .max(20, 'Phone number may not be greater than 20 characters.')
    })

    const defaultValues: IUser = {
        id: user.id,
        companyName: user.companyName,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar || '',
        accountStatus: user.accountStatus,
        email: user.email,
        emailConfirmed: user.emailConfirmed,
        phoneNumber: user.phoneNumber || '',
        startPayedPeriodDate: user.startPayedPeriodDate,
        finishPayedPeriodDate: user.finishPayedPeriodDate,
        lastLoginDate: user.lastLoginDate,
        createdAt: user.createdAt,
        searchDeadheads: user.searchDeadheads,
        searchMilesMin: user.searchMilesMin,
        searchMilesMax: user.searchMilesMax,
        searchSortField: user.searchSortField,
        searchSort: user.searchSort        
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSubmit = async (user: IUser): Promise<void> => {
        user.startPayedPeriodDate = startDateState
        user.finishPayedPeriodDate = finishDateState
        try {
            setLoadingState(true)
            setErrorState(null)
            updateUser(user)
            onCancelHandler()
        } catch (error) {
            setErrorState(error.toString())
        } finally {
            setLoadingState(false)
        }
    }

    const onCancelHandler = () => {
        reset()
        onClose()
    }

    return (
        <SwipeableDrawer open={true} anchor='right' transitionDuration={1500} sx={{ zIndex: 1202 }}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
        >
            <CloseIcon
                sx={{ cursor: 'pointer', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--red)" }, position: "absolute", top: "15px", right: "15px" }}
                onClick={onCancelHandler}
            />
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '360px' }}>
                <Grid container direction={'column'} justifyContent="center" spacing={2} sx={{ padding: '50px 20px' }}>
                    {/* First Name */}
                    <Grid item>
                        <Controller name="firstName" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="First Name" type="text" fullWidth
                                    inputRef={input => input && input.focus()}
                                    sx={{marginTop: 3, "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" >
                                                    <AccountCircleIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.firstName)} helperText={errors.firstName?.message} 
                                />}
                        />
                    </Grid>
                    {/* Last Name */}
                    <Grid item>
                        <Controller name="lastName" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Last Name" type="text" fullWidth
                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" >
                                                    <AccountCircleIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.lastName)} helperText={errors.lastName?.message} />}
                        />
                    </Grid>
                    {/* Phone */}
                    <Grid item>
                        <Controller name="phoneNumber" control={control}
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
                                        error={Boolean(errors.phoneNumber)} helperText={errors.phoneNumber?.message} />
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
                    {/* Start Payed Date */}
                    <Grid item sx={{margin: "15px 0"}}>
                        <Controller name="startPayedPeriodDate" control={control}
                            render={({ field }) =>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker sx={{width: "100%", "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                        {...field}
                                        label="Start Payed Date"
                                        value={moment(startDateState)}
                                        onChange={(newValue) => setStartDateState(newValue.toDate())}
                                    />
                                </LocalizationProvider>
                            } />
                    </Grid>
                    {/* Finish Payed Date */}
                    <Grid item>
                        <Controller name="finishPayedPeriodDate" control={control}
                            render={({ field }) =>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker sx={{width: "100%", "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                        {...field}
                                        label="Finish Payed Date"
                                        value={moment(finishDateState)}
                                        onChange={(newValue) => setFinishDateState(newValue.toDate())}
                                    />
                                </LocalizationProvider>
                            } />
                    </Grid>
                    {/* Account Status */}
                    <Grid item sx={{margin: "15px 0"}}>
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="account-status-select-label">Account Status</InputLabel>
                            <Controller
                                name="accountStatus"
                                defaultValue={accountStatuses[0]}
                                control={control}
                                render={({ field }) => (
                                    <Select label="Account Status" {...field}
                                        sx={{"& .MuiOutlinedInput-input": muiTextFieldStyle}}
                                    >
                                        {accountStatuses.map((accountStatus, index) =>
                                            <MenuItem key={index} 
                                                value={accountStatus}
                                                sx={{fontSize: "16px", fontFamily: "Mulish", padding: "2px 10px"}}
                                            >
                                                {AccountStatus[accountStatus]}
                                            </MenuItem>)}
                                    </Select>
                                )}
                            />
                        </FormControl>
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
        </SwipeableDrawer>
    )
}
