import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import { RouteNames } from "../../../routing"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { changePasswordAxios } from "../../../api/user"
import { IChangePasswordDto } from "../../../types/auth"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from "../../../types/common/RegularExpressions"
import { Alert, CircularProgress, Grid, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material"
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { Visibility, VisibilityOff } from "@mui/icons-material"
import MuiButton from "../../../components/Button/MuiButton"

export default function ChangePasswordForm(): JSX.Element {
    const navigate = useNavigate()
    const { auth } = useTypedSelector(state => state.auth)
    const { logout } = useActions()
    const [loading, setLoading] = useState<boolean>(false)
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Required field.')
            .max(256, 'Email may not be greater than 256 characters.')
            .matches(EMAIL_REG_EXP, "Email is not valid and may not be greater than 256 characters."),
        oldPassword: Yup.string()
            .required('Required field.')
            .max(100, 'Password may not be greater than 100 characters.')
            .matches(PASSWORD_REG_EXP, "Password is not valid. Must contain at least one uppercase, one symbol and at least 7 or more characters."),
        newPassword: Yup.string()
            .required('Required field.')
            .min(7, 'Must contain at least one uppercase, one symbol and at least 7 or more characters')
            .max(100, 'Password may not be greater than 100 characters.')
            .matches(PASSWORD_REG_EXP, "New Password is not valid. Must contain at least one uppercase, one symbol and at least 7 or more characters."),
        confirmNewPassword: Yup.string()
            .required('Required field.')
            .max(100, 'Password may not be greater than 100 characters.')
            .matches(PASSWORD_REG_EXP, "Confirm New Password is not valid. Should match with New Password.")
    })

    const defaultValues: IChangePasswordDto = { email: auth.user.email, oldPassword: '', newPassword: '', confirmNewPassword: '' }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(validationSchema), defaultValues })

    const onSubmit = async (changePasswordDto: IChangePasswordDto) => {
        try {
            setLoading(true)
            setSnackBarState(null)
            await changePasswordAxios(changePasswordDto)
            reset()
            setTimeout(() => {
                logout(auth.user.email, auth.tokens.accessToken)
                navigate(RouteNames.LOGIN)
            }, 2000);
            setSnackBarState({ message: "Password has been changed", severity: "success" })
        } catch (error) {
            setSnackBarState({ message: error.message || 'Unable to change the password', severity: "error" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" alignContent="center">
                <Grid item xs={12} md={6}>
                    <Controller name="email" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Email" type="email"
                                margin="normal" fullWidth disabled
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
                <Grid item xs={12} md={6}>
                    <Controller name="oldPassword" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Old Password" type={showPassword ? 'text' : 'password'}
                                margin="normal" fullWidth
                                inputRef={input => input && input.focus()}
                                sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(errors.oldPassword)} helperText={errors.oldPassword?.message} />}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller name="newPassword" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="New Password" type={showPassword ? 'text' : 'password'}
                                margin="normal" fullWidth
                                sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(errors.newPassword)} 
                                helperText="Must contain at least one uppercase, one symbol and at least 7 or more characters" 
                            />}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller name="confirmNewPassword" control={control}
                        render={({ field }) =>
                            <TextField {...field} label="Confirm New Password" type={showPassword ? 'text' : 'password'}
                                margin="normal" fullWidth
                                sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(errors.confirmNewPassword)} helperText={errors.confirmNewPassword?.message} />}
                    />
                </Grid>
                <Grid item sx={{ textAlign: "center", margin: { xs: '60px 0', sm: '60px 150px 60px 150px' } }}>
                    <MuiButton variant="contained" type="submit">
                        {loading && <CircularProgress size="1rem" sx={{ mr: '10px' }} />} <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Send</span>
                    </MuiButton>
                </Grid>
            </Grid>
            <Snackbar
                open={snackBarState !== null}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
            >
                <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>
        </form>
    )
}