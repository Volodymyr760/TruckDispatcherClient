import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { RouteNames } from "../../../routing"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { IResetPasswordDto } from "../../../types/auth"
import { resetPasswordAxios } from "../../../api/user"
import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from "../../../types/common/RegularExpressions"
import { CircularProgress, Grid, IconButton, InputAdornment, TextField } from "@mui/material"
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { Visibility, VisibilityOff } from "@mui/icons-material"
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import MuiButton from "../../../components/Button/MuiButton"
import SuccessMessage from "../../../components/Messages/SuccessMessage"

export default function ResetPasswordForm(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)
    const [searchParams] = useSearchParams()

    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Required field.')
            .max(256, 'Email may not be greater than 256 characters.')
            .matches(EMAIL_REG_EXP, "Required field Email is not valid and may not be greater than 256 characters."),
        password: Yup.string()
            .required('Required field.')
            .max(100, 'Password may not be greater than 100 characters.')
            .matches(PASSWORD_REG_EXP, "Password is not valid. Must contain at least one uppercase, one symbol and at least 7 or more characters."),
        confirmPassword: Yup.string()
            .required('Required field.')
            .matches(PASSWORD_REG_EXP, "Confirmation Password is not valid. Should match with Password.")
    })

    const defaultValues: IResetPasswordDto = { code: searchParams.get("code") || '', email: searchParams.get("email"), password: '', confirmPassword: '' }

    const { control, handleSubmit, formState: { errors }, register, reset } = useForm({ resolver: yupResolver(validationSchema), defaultValues })

    const onSubmit = async (resetPasswordDto: IResetPasswordDto) => {
        try {
            setLoading(true)
            setError(null)
            setShowSuccessMessage(false)
            await resetPasswordAxios(resetPasswordDto)
            setShowSuccessMessage(true)
            reset()
        } catch (error) {
            setError(error.message || 'Unable reset password.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("code")} type="hidden" />
            <Grid container direction="column" alignContent="center">
                <Grid item xs={12} md={6}>
                    <Controller name="email" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Email" type="email" disabled margin="normal" fullWidth
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
                <Grid item xs={12} md={6}>
                    <Controller name="confirmPassword" control={control}
                        render={({ field }) =>
                            <TextField {...field} label="Confirm Password" type={showPassword ? 'text' : 'password'}
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
                                error={Boolean(errors.confirmPassword)} helperText={errors.confirmPassword?.message} />}
                    />
                </Grid>
                {error && <ErrorMessage appearance="regular">{error}</ErrorMessage>}
                {showSuccessMessage && <SuccessMessage appearance="regular">
                    <p className="text-16">Password has been changed successfully.</p>
                    <p className="text-16">Please <Link to={RouteNames.LOGIN}>Sign In</Link> using new password.</p>
                </SuccessMessage>}
                <Grid item sx={{ textAlign: "center", margin: { xs: '60px 0', sm: '60px 150px 60px 150px' } }}>
                    <MuiButton variant="contained" type="submit">
                        {loading && <CircularProgress size="1rem" sx={{ mr: '10px' }} />} <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Send</span>
                    </MuiButton>                    
                </Grid>
            </Grid>
        </form>
    )
}