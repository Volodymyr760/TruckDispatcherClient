import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { RouteNames } from "../../../routing"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { ILoginDto, Role } from "../../../types/auth"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { loginAxios } from "../../../api/user"
import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from "../../../types/common/RegularExpressions"
import { CircularProgress, Grid, IconButton, InputAdornment, TextField } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import MuiButton from "../../../components/Button/MuiButton"

export default function LoginForm(): JSX.Element {
    const navigate = useNavigate()
    const { login, setAuthLoading, setAuthError, setDriverUserId, setInvoiceUserId,
        setLoadUserld, setNotificationUserId, setTruckUserId } = useActions()
    const { loading, error } = useTypedSelector(state => state.auth)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Required field.')
            .max(256, 'Email may not be greater than 256 characters.')
            .matches(EMAIL_REG_EXP, "Email is not valid and may not be greater than 50 characters."),
        password: Yup.string()
            .required('Required field.')
            .max(100, 'Password may not be greater than 100 characters.')
            .matches(PASSWORD_REG_EXP, "Password is not valid. Must contain at least one uppercase, one symbol and at least 7 or more characters.")
    })

    const defaultValues: ILoginDto = { email: '', password: '' }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(validationSchema), defaultValues })

    const onSubmit = async (loginModel: ILoginDto) => {
        try {
            setAuthLoading(true)
            setAuthError(null)
            const authModel = await loginAxios(loginModel)
            localStorage.setItem("auth", JSON.stringify(authModel))
            login(authModel)
            // set userId to each stores where it uses: driver, invoice, load, notification, truck
            setDriverUserId(authModel.user.id)
            setInvoiceUserId(authModel.user.id)
            setLoadUserld(authModel.user.id)
            setNotificationUserId(authModel.user.id)
            setTruckUserId(authModel.user.id)
            reset()
            if (authModel.roles.includes(Role.Carrier)) navigate(RouteNames.DASHBOARD)
            if (authModel.roles.includes(Role.Admin)) navigate(RouteNames.ADMIN_LOADS)
            if (authModel.roles.includes(Role.Broker)) navigate(RouteNames.BROKER_LOADS)
        } catch (error) {
            setAuthError(error.message || 'Unknown server error.')
        } finally {
            setAuthLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" alignContent="center">
                <Grid item xs={12} md={6}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) =>
                            <TextField {...field} label="Email" type="email" margin="normal" fullWidth
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
                                error={Boolean(errors.password)} helperText={errors.password?.message} />}
                    />
                </Grid>
                {error && <ErrorMessage appearance="regular">{error}</ErrorMessage>}
                <Grid item sx={{ textAlign: "center", margin: { xs: '24px 0', sm: '24px 150px 24px 150px' } }}>
                    <MuiButton variant="contained" type="submit">
                        {loading && <CircularProgress size="1rem" sx={{ mr: '10px' }} />} <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Sign In</span>
                    </MuiButton>
                </Grid>
            </Grid>
        </form>
    )
}
