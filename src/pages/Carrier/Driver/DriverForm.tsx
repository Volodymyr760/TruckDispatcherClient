import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import { useActions } from "../../../hooks/useActions"
import { isPhoneValid } from "../../../hooks/IsPhoneValid"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { isAppFileValid } from "../../../hooks/IsAppFileValid"
import { Equipment } from "../../../types/common/equipment"
import { IDriver } from "../../../types/driver"
import { OrderType } from "../../../types/common/orderType"
import { TruckDto, TruckStatus } from "../../../types/truck"
import { DriverFormProps } from "./types"
import { getTrucksAxios } from "../../../api/truck"
import { EMAIL_REG_EXP } from "../../../types/common/RegularExpressions"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { removeImageAxios, uploadImageAxios } from "../../../api/image"
import { Alert, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, 
    Select, Snackbar, SwipeableDrawer, TextField, Tooltip } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined'
import CircularProgress from '@mui/material/CircularProgress'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PhoneIcon from '@mui/icons-material/Phone'
import MuiButton from "../../../components/Button/MuiButton"
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import './styles.css'

export default function DriverForm({ driver, closeForm }: DriverFormProps): JSX.Element {
    const { auth } = useTypedSelector(state => state.auth)
    const { createDriver, updateDriver } = useActions()
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [errorState, setErrorState] = useState<null | string>(null)

    const [previewBlockVisible, setPreviewBlockVisible] = useState<boolean>(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [avatarSource, setAvatarSource] = useState<string | ArrayBuffer | null | Blob>(null)

    const [trucksState, setTrucksState] = useState<TruckDto[]>([])
    const [truckIdState, setTruckIdState] = useState(driver.truckId || '')

    useEffect(() => {
        if (driver.avatar) {
            setAvatarSource((process.env.NODE_ENV === "production" ?
                process.env.REACT_APP_BASE_API_URL_PROD :
                process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + driver.avatar)
            setPreviewBlockVisible(true)
        }
    }, [driver.avatar])

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
        fetchTrucks()
        // eslint-disable-next-line
    }, [])

    const onSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

    const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            if (!isAppFileValid(file)) {
                setSnackBarState({ message: "File is not valid", severity: "warning" })
                return
            }
            setSelectedFile(file)
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => { setAvatarSource(reader.result) }
        }
        setPreviewBlockVisible(true)
    }

    const onTruckChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTruckIdState(e.target.value)
    }

    const deleteHandler = () => {
        setSelectedFile(null)
        setAvatarSource(null)
        setPreviewBlockVisible(false)
    }

    const toggleDrawer = (anchor: string, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (event && event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
            ) return
            if (!open) closeForm()
        };

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required('Required field.')
            .max(20, 'First name may not be greater than 20 characters.'),
        lastName: Yup.string()
            .required('Required field.')
            .max(20, 'Last name may not be greater than 20 characters.'),
        email: Yup.string()
            .required('Required field.')
            .max(256, 'Email may not be greater than 256 characters.')
            .matches(EMAIL_REG_EXP, "Email is not valid and may not be greater than 256 characters."),
        phone: Yup.string()
            .required('Required field.')
            .max(256, 'Phone number may not be greater than 20 characters.')
    })

    const defaultValues: IDriver = {
        id: driver.id,
        firstName: driver.firstName,
        lastName: driver.lastName,
        phone: driver.phone,
        email: driver.email,
        avatar: driver.avatar,
        userId: driver.userId,
        truckId: driver.truckId || '',
        truck: driver.truck,
        notes: driver.notes
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSubmit = async (driver: IDriver): Promise<void> => {
        try {
            setLoadingState(true)
            setErrorState(null)
            driver.truck = truckIdState ? trucksState.filter(t => t.id === truckIdState)[0] : null
            driver.truckId = truckIdState ? truckIdState : null
            if (driver.id) {
                if (driver.avatar && avatarSource === null) { //avatar file was deleted during editing the form
                    await removeImageAxios(driver.avatar)
                    driver.avatar = null
                }
                if (selectedFile) { // avatar file was updated so - remove old file and then upload new file:
                    if (driver.avatar) await removeImageAxios(driver.avatar)
                    const uploadedFile = await uploadImageAxios(selectedFile)
                    driver.avatar = uploadedFile.fileName
                }
                updateDriver(driver)
            } else {
                if (selectedFile) {
                    const uploadedFile = await uploadImageAxios(selectedFile)
                    driver.avatar = uploadedFile.fileName
                }
                driver.truck = null
                createDriver(driver)
            }
            onCancelHandler()
        } catch (error) {
            setErrorState(error.message || "Unable to save the driver.")
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
                    {/* Avatar */}
                    <Grid item>
                        {previewBlockVisible ?
                            <div className='preview-wrapper'>
                                <img
                                    src={avatarSource && typeof (avatarSource) != undefined ?
                                        avatarSource.toString() :
                                        (process.env.NODE_ENV === "production" ?
                                            process.env.REACT_APP_BASE_API_URL_PROD :
                                            process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/default-avatar.png"
                                    }
                                    alt="Preview" className='preview-image'
                                />
                                <Grid container direction="row" justifyContent="space-around" alignItems="center">
                                    <Button variant="outlined" component="label"
                                        onClick={deleteHandler}
                                        style={{ textTransform: 'none', backgroundColor: 'transparent', boxShadow: 'none', borderRadius: "16px", margin: '0 3px' }}
                                    >
                                        <DeleteOutlinedIcon fontSize="small" sx={{ fill: 'var(--lightGrey)' }} />
                                        <span className="a-small-blue" style={{ margin: '2px 5px 0' }}>Delete</span>
                                    </Button>
                                    <Button variant="outlined" component="label"
                                        style={{ textTransform: 'none', backgroundColor: 'transparent', boxShadow: 'none', borderRadius: "16px", margin: '0 3px' }}
                                    >
                                        <EditOutlinedIcon fontSize="small" sx={{ fill: 'var(--lightGrey)' }} />
                                        <span className="a-small-blue" style={{ margin: '2px 5px 0' }}>Replace</span>
                                        <input type="file" hidden onChange={fileSelectedHandler}/>
                                    </Button>
                                </Grid>
                            </div>
                            :
                            <div className='uploader-wrapper'>
                                <Button variant="contained" component="label"
                                    style={{ textTransform: 'none', backgroundColor: 'transparent', boxShadow: 'none', margin: '10px 0' }}
                                >
                                    <Tooltip title="Choose from gallery" placement="bottom">
                                        <AddAPhotoIcon fontSize="large" sx={{ fill: 'var(--lightGrey)' }} />
                                    </Tooltip>
                                    <input type="file" hidden onChange={fileSelectedHandler} />
                                </Button>
                                <Button variant="outlined" component="label"
                                    style={{ textTransform: 'none', boxShadow: 'none', margin: '15px 0' }}
                                >
                                    <AddAPhotoOutlinedIcon fontSize="small" sx={{ fill: 'var(--lightGrey)' }} />
                                    <span className="a-small-blue" style={{ margin: '2px 5px 0' }}>Add avatar</span>
                                    <input type="file" hidden onChange={fileSelectedHandler} />
                                </Button>
                            </div>
                        }
                    </Grid>
                    {/* First Name */}
                    <Grid item>
                        <Controller name="firstName" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="First Name" type="text" fullWidth
                                sx={{ margin: 0, "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" >
                                                    <AccountCircleIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.firstName)} helperText={errors.firstName?.message} />}
                        />
                    </Grid>
                    {/* Last Name */}
                    <Grid item>
                        <Controller name="lastName" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Last Name" type="text" fullWidth
                                    sx={{ margin: 0, "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
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
                    {/* Email */}
                    <Grid item>
                        <Controller name="email" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Email" type="email" fullWidth
                                sx={{ margin: 0, "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
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
                    {/* Phone */}
                    <Grid item>
                        <Controller name="phone" control={control}
                            render={({ field }) =>
                                <>
                                    <TextField {...field} label="Phone" type="tel" fullWidth
                                        sx={{ margin: 0, "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton edge="end" >
                                                        <PhoneIcon />
                                                    </IconButton>
                                                </InputAdornment>),
                                        }}
                                        error={Boolean(errors.phone)} helperText={errors.phone?.message} />
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
                    {/* Truck */}
                    <Grid item sx={{maxHeight: 120}}>
                        <FormControl sx={{ width: '100%', margin: 0 }}>
                            <InputLabel id="truck-select-label">Truck</InputLabel>
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
                    {/* Notes */}
                    <Grid item>
                        <Controller name="notes" control={control}
                            render={({ field }) =>
                                <TextField {...field} label="Notes" fullWidth
                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    margin="none" multiline rows={4} variant='outlined' style={{ height: 'none' }}
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
            <Snackbar
                open={snackBarState !== null}
                autoHideDuration={4000}
                onClose={onSnackbarClose}
            >
                <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>
        </SwipeableDrawer>
    )
}