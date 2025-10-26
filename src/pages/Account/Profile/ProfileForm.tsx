import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { isAppFileValid } from "../../../hooks/IsAppFileValid"
import { IUser } from "../../../types/user"
import { EMAIL_REG_EXP } from "../../../types/common/RegularExpressions"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { removeImageAxios, uploadImageAxios } from "../../../api/image"
import { updateUserAxios } from "../../../api/user"
import { Alert, Button, Checkbox, FormControlLabel, Grid, IconButton, 
    InputAdornment, Snackbar, TextField, Tooltip } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined'
import CircularProgress from '@mui/material/CircularProgress'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MuiButton from "../../../components/Button/MuiButton"
import PhoneIcon from '@mui/icons-material/Phone'

export default function ProfileForm(): JSX.Element {
    const { auth } = useTypedSelector(state => state.auth)
    const { setUserAvatar, updateAuthUser } = useActions()
    const [loading, setLoading] = useState<boolean>(false)
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [previewAvatarVisible, setPreviewAvatarVisible] = useState<boolean>(false)
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarSource, setAvatarSource] = useState<string | ArrayBuffer | null | Blob>(null)

    useEffect(() => {
        if (auth.user.avatar) {
            setAvatarSource((process.env.NODE_ENV === "production" ?
                process.env.REACT_APP_BASE_API_URL_PROD :
                process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + auth.user.avatar)
            setPreviewAvatarVisible(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

    const validationSchema = Yup.object({
        companyName: Yup.string()
            .required('Required field.')
            .max(50, 'Company Name may not be greater than 50 characters.'),
        MC: Yup.string()
            .max(20, 'MC number may not be greater than 20 characters.'),
        DOT: Yup.string()
            .max(20, 'DOT number may not be greater than 20 characters.'),
        firstName: Yup.string()
            .required('Required field.')
            .max(20, 'First Name may not be greater than 20 characters.'),
        lastName: Yup.string()
            .required('Required field.')
            .max(20, 'Last Name may not be greater than 20 characters.'),
        email: Yup.string()
            .required('Required field.')
            .max(256, 'Email may not be greater than 256 characters.')
            .matches(EMAIL_REG_EXP, "Email is not valid and may not be greater than 256 characters.")
    })

    const defaultValues: IUser = {
        id: auth.user.id,
        companyName: auth.user.companyName,
        mc: auth.user.mc || '',
        dot: auth.user.dot || '',
        firstName: auth.user.firstName,
        lastName: auth.user.lastName,
        avatar: auth.user.avatar,
        accountStatus: auth.user.accountStatus,
        email: auth.user.email,
        emailConfirmed: auth.user.emailConfirmed,
        phoneNumber: auth.user.phoneNumber || '',
        startPayedPeriodDate: auth.user.startPayedPeriodDate,
        finishPayedPeriodDate: auth.user.finishPayedPeriodDate,
        lastLoginDate: auth.user.lastLoginDate,
        createdAt: auth.user.createdAt,
        searchDeadheads: auth.user.searchDeadheads,
        searchMilesMin: auth.user.searchMilesMin,
        searchMilesMax: auth.user.searchMilesMax,
        searchSortField: auth.user.searchSortField,
        searchSort: auth.user.searchSort
    }

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema), defaultValues
    })

    const onDeleteAvatar = () => {
        setAvatarFile(null)
        setAvatarSource(null)
        setPreviewAvatarVisible(false)
    }

    const onAvatarSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            if (!isAppFileValid(file)) {
                setSnackBarState({ message: "File is not valid", severity: "warning" })
                return
            }
            setAvatarFile(file)
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => { setAvatarSource(reader.result) }
        }
        setPreviewAvatarVisible(true)
    }

    const onSubmit = async (user: IUser) => {
        try {
            if (user.avatar && avatarSource === null) { //user's avatar was deleted during editing the form
                await removeImageAxios(user.avatar);
                user.avatar = null;
                setUserAvatar(null);
            }
            if (avatarFile) { // avatar file was updated so - remove old file, then upload new file:
                if (user.avatar) await removeImageAxios(user.avatar);
                const uploadedFile = await uploadImageAxios(avatarFile);
                user.avatar = uploadedFile.fileName;
                setUserAvatar(uploadedFile.fileName);
            }
            setLoading(true);
            const updatedUser = await updateUserAxios(user);
            updateAuthUser(updatedUser)
            setSnackBarState({ message: "Profile updated.", severity: "success" });
        } catch (error) {
            setSnackBarState({ message: error.message || "Error of saving profile.", severity: "error" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" alignContent="center">
                <Grid item xs={12} md={12} sx={{ marginBottom: '10px' }}>
                    {// Avatar
                        previewAvatarVisible ?
                            <div className='preview-wrapper'>
                                <img
                                    src={(avatarSource && typeof (avatarSource) != undefined) && avatarSource.toString()}
                                    alt="Preview" className='preview-image'
                                />
                                <div>
                                    <Button variant="outlined" component="label"
                                        onClick={onDeleteAvatar}
                                        style={{ textTransform: 'none', backgroundColor: 'transparent', boxShadow: 'none', borderRadius: "16px", margin: '3px' }}
                                    >
                                        <DeleteOutlinedIcon fontSize="small" sx={{ fill: 'var(--lightGrey)' }} />
                                        <span className="a-small-blue" style={{ margin: '2px 5px 0' }}>Delete</span>
                                    </Button>
                                    <Button variant="outlined" component="label"
                                        style={{ textTransform: 'none', backgroundColor: 'transparent', boxShadow: 'none', borderRadius: "16px", margin: '3px' }}
                                    >
                                        <EditOutlinedIcon fontSize="small" sx={{ fill: 'var(--lightGrey)' }} />
                                        <span className="a-small-blue" style={{ margin: '2px 5px 0' }}>Replace</span>
                                        <input type="file" hidden onChange={onAvatarSelected}/>
                                    </Button>
                                </div>
                            </div>
                            :
                            <div className='uploader-wrapper'>
                                <Button variant="contained" component="label"
                                    style={{ textTransform: 'none', backgroundColor: 'transparent', boxShadow: 'none', margin: '10px 0' }}
                                >
                                    <Tooltip title="Choose from gallery" placement="bottom">
                                        <AddAPhotoIcon fontSize="large" sx={{ fill: 'var(--lightGrey)' }} />
                                    </Tooltip>
                                    <input type="file" hidden onChange={onAvatarSelected}/>
                                </Button>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    style={{ textTransform: 'none', boxShadow: 'none', margin: '15px 0' }}
                                >
                                    <AddAPhotoOutlinedIcon fontSize="small" sx={{ fill: 'var(--lightGrey)' }} />
                                    <span className="a-small-blue" style={{ margin: '2px 5px 0' }}>Add avatar</span>
                                    <input
                                        type="file"
                                        hidden
                                        onChange={onAvatarSelected}
                                    />
                                </Button>
                            </div>
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller name="companyName" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Company Name" type="text" margin="normal" fullWidth
                                inputRef={input => input && input.focus()}
                                sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" >
                                                <AccountCircleIcon />
                                            </IconButton>
                                        </InputAdornment>),
                                }}
                                error={Boolean(errors.companyName)} helperText={errors.companyName?.message} />}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller name="mc" control={control}
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
                                error={Boolean(errors.mc)} helperText={errors.mc?.message} />}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller name="dot" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="DOT number" type="number" margin="normal" fullWidth
                                sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" >
                                                <AccountCircleIcon />
                                            </IconButton>
                                        </InputAdornment>),
                                }}
                                error={Boolean(errors.dot)} helperText={errors.dot?.message} />}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller name="firstName" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="First Name" type="text" margin="normal" fullWidth
                                sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
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
                <Grid item>
                    <Controller name="lastName" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Last Name" type="text" margin="normal" fullWidth
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
                <Grid item>
                    <Controller name="email" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Email" type="email" margin="normal" fullWidth disabled
                                sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" >
                                                <MailOutlineIcon />
                                            </IconButton>
                                        </InputAdornment>),
                                }}
                                error={Boolean(errors.email)} helperText={errors.email?.message} />}
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Controller name="emailConfirmed" control={control}
                                render={({ field: props }) => (
                                    <Checkbox {...props} checked={props.value} disabled
                                        onChange={(e) => props.onChange(e.target.checked)}
                                    />
                                )}
                            />
                        }
                        label="Email Confirmed?"
                        sx={{"& .MuiFormControlLabel-label": muiTextFieldStyle}}
                    />
                </Grid>
                <Grid item>
                    <Controller name="phoneNumber" control={control}
                        render={({ field }) =>
                            <TextField {...field} label="Phone" type="text" margin="normal" fullWidth
                                sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" >
                                                <PhoneIcon />
                                            </IconButton>
                                        </InputAdornment>),
                                }}
                                error={Boolean(errors.phoneNumber)} helperText={errors.phoneNumber?.message} />} />
                </Grid>
                <Grid item sx={{ textAlign: "center", margin: { xs: '24px 0', sm: '24px 150px 24px 150px' } }}>
                    <MuiButton variant="contained" type="submit">
                        {loading && <CircularProgress size="1rem" sx={{ mr: '10px' }} />} <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Save</span>
                    </MuiButton>                    
                </Grid>
            </Grid>
            <Snackbar
                open={snackBarState !== null}
                autoHideDuration={4000}
                onClose={onSnackbarClose}
            >
                <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>
        </form>
    )
}