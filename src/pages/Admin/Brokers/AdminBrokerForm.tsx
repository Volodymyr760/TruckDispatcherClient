import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import { useActions } from "../../../hooks/useActions"
import { isPhoneValid } from "../../../hooks/IsPhoneValid"
import { isAppFileValid } from "../../../hooks/IsAppFileValid"
import { IBroker } from "../../../types/broker"
import { BrokerFormProps } from "./types"
import { EMAIL_REG_EXP } from "../../../types/common/RegularExpressions"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { removeImageAxios, uploadImageAxios } from "../../../api/image"
import { Alert, Button, Grid, IconButton, InputAdornment, Snackbar, SwipeableDrawer, TextField, Tooltip } from "@mui/material"
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

export default function AdminBrokerForm({ broker, closeForm }: BrokerFormProps): JSX.Element {
    const { createBroker, updateBroker } = useActions()
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [errorState, setErrorState] = useState<null | string>(null)

    const [previewBlockVisible, setPreviewBlockVisible] = useState<boolean>(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [avatarSource, setAvatarSource] = useState<string | ArrayBuffer | null | Blob>(null)

    useEffect(() => {
        if (broker.logo) {
            setAvatarSource((process.env.NODE_ENV === "production" ?
                process.env.REACT_APP_BASE_API_URL_PROD :
                process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + broker.logo)
            setPreviewBlockVisible(true)
        }
    }, [broker.logo])

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
        parserName: Yup.string()
            .required('Required field.'),
        name: Yup.string()
            .required('Required field.')
            .max(450, 'Name may not be greater than 450 characters.'),
        shortName: Yup.string()
            .required('Required field.')
            .max(450, 'Short name may not be greater than 450 characters.'),
        email: Yup.string()
            .required('Required field.')
            .max(256, 'Email may not be greater than 256 characters.')
            .matches(EMAIL_REG_EXP, "Email is not valid and may not be greater than 256 characters."),
        phone: Yup.string()
            .required('Required field.')
            .max(256, 'Phone number may not be greater than 20 characters.'),
        dotNumber: Yup.string()
            .required('Required field.')
            .max(20, 'DOT number may not be greater than 20 characters.'),
        mcNumber: Yup.string()
            .required('Required field.')
            .max(20, 'MC number may not be greater than 20 characters.'),
    })

    const defaultValues: IBroker = {
        id: broker.id,
        parserName: broker.parserName,
        name: broker.name,
        shortName: broker.shortName,
        logo: broker.logo,
        phone: broker.phone,
        email: broker.email,
        dotNumber: broker.dotNumber,
        mcNumber: broker.mcNumber,
        notes: broker.notes || ''
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSubmit = async (Broker: IBroker): Promise<void> => {
        try {
            setLoadingState(true)
            setErrorState(null)
            if (Broker.id) {
                if (Broker.logo && avatarSource === null) { //avatar file was deleted during editing the form
                    await removeImageAxios(Broker.logo)
                    Broker.logo = null
                }
                if (selectedFile) { // avatar file was updated so - remove old file and then upload new file:
                    if (Broker.logo) await removeImageAxios(Broker.logo)
                    const uploadedFile = await uploadImageAxios(selectedFile)
                    Broker.logo = uploadedFile.fileName
                }
                updateBroker(Broker)
            } else {
                if (selectedFile) {
                    const uploadedFile = await uploadImageAxios(selectedFile)
                    Broker.logo = uploadedFile.fileName
                }
                createBroker(Broker)
            }
            onCancelHandler()
        } catch (error) {
            setErrorState(error.message || "Unable to save the Broker.")
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
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        style={{ textTransform: 'none', backgroundColor: 'transparent', boxShadow: 'none', borderRadius: "16px", margin: '0 3px' }}
                                    >
                                        <EditOutlinedIcon fontSize="small" sx={{ fill: 'var(--lightGrey)' }} />
                                        <span className="a-small-blue" style={{ margin: '2px 5px 0' }}>Replace</span>
                                        <input
                                            type="file"
                                            hidden
                                            onChange={fileSelectedHandler}
                                        />
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
                                    <span className="a-small-blue" style={{ margin: '2px 5px 0' }}>Add logo</span>
                                    <input type="file" hidden onChange={fileSelectedHandler} />
                                </Button>
                            </div>
                        }
                    </Grid>
                    <Grid item>
                        <Controller name="parserName" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Parser Name" type="text" margin="normal" fullWidth
                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" >
                                                    <AccountCircleIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.parserName)} helperText={errors.parserName?.message} />}
                        />
                    </Grid>
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
                        <Controller name="shortName" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Short Name" type="text" margin="normal" fullWidth
                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" >
                                                    <AccountCircleIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.shortName)} helperText={errors.shortName?.message} />}
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
                        <Controller name="phone" control={control}
                            render={({ field }) =>
                                <>
                                    <TextField {...field} label="Phone" type="tel" margin="normal" fullWidth
                                        sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
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
                    <Grid item>
                        <Controller name="dotNumber" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="DOT" type="number" margin="normal" fullWidth
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
                        <Controller name="mcNumber" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="MC" type="number" margin="normal" fullWidth
                                    sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" >
                                                    <AccountCircleIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.mcNumber)} helperText={errors.mcNumber?.message} />}
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