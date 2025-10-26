import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import { RouteNames } from "../../../routing"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { changeEmailAxios } from "../../../api/user"
import { IChangeEmailDto } from "../../../types/auth"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from "../../../types/common/RegularExpressions"
import { Alert, CircularProgress, Grid, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material"
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MuiButton from "../../../components/Button/MuiButton"
import { Visibility, VisibilityOff } from "@mui/icons-material"

export default function ChangeEmailForm(): JSX.Element {
    const navigate = useNavigate()
    const { auth } = useTypedSelector(state => state.auth)
    const { login } = useActions()
    const [loading, setLoading] = useState<boolean>(false)
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

    const validationSchema = Yup.object({
        existingEmail: Yup.string()
            .max(256, 'Email may not be greater than 256 characters.')
            .matches(EMAIL_REG_EXP, "Email is not valid and may not be greater than 256 characters."),
        newEmail: Yup.string()
            .max(256, 'Email may not be greater than 256 characters.')
            .matches(EMAIL_REG_EXP, "Email is not valid and may not be greater than 256 characters."),
        password: Yup.string()
            .required('Required field.')
            .min(7, 'Must contain at least one uppercase, one symbol and at least 7 or more characters')
            .max(100, 'Password may not be greater than 100 characters.')
            .matches(PASSWORD_REG_EXP, "Password is not valid. Must contain at least one uppercase, one symbol and at least 7 or more characters."),
    })

    const defaultValues: IChangeEmailDto = { existingEmail: auth.user.email, newEmail: '', password: '' }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema), defaultValues
    })

    const onSubmit = async (changeEmailDto: IChangeEmailDto) => {
        try {
            setLoading(true)
            setSnackBarState(null)
            await changeEmailAxios(changeEmailDto);
            reset();
            setTimeout(() => {
                localStorage.removeItem('id');
                login(null);
                navigate(RouteNames.LOGIN);
            }, 2000);
            setSnackBarState({ message: "Email has been changed", severity: "success" });
        } catch (error) {
            setSnackBarState({ message: error.message || 'Unable to change email', severity: "error" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" alignContent="center">
                <Grid item xs={12} md={6}>
                    <Controller name="existingEmail" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Existing Email" type="email"
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
                                error={Boolean(errors.existingEmail)} helperText={errors.existingEmail?.message} />}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller name="newEmail" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="New Email" type="email" margin="normal" fullWidth
                                inputRef={input => input && input.focus()}
                                sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" >
                                                <MailOutlineIcon />
                                            </IconButton>
                                        </InputAdornment>),
                                }}
                                error={Boolean(errors.newEmail)} helperText={errors.newEmail?.message} />}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller name="password" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Password" type={showPassword ? 'text' : 'password'}
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
                                error={Boolean(errors.password)} 
                                helperText="Must contain at least one uppercase, one symbol and at least 7 or more characters" 
                            />}
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