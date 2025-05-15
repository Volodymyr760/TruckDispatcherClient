import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup";
import { EMAIL_REG_EXP } from "../../../types/common/RegularExpressions"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle";
import { forgotPasswordAxios } from "../../../api/user"
import { CircularProgress, Grid, IconButton, InputAdornment, TextField } from "@mui/material"
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MuiButton from "../../../components/Button/MuiButton"
import SuccessMessage from "../../../components/Messages/SuccessMessage"

export default function ForgotPasswordForm(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)

    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Required field.')
            .max(256, 'Email may not be greater than 256 characters.')
            .matches(EMAIL_REG_EXP, "Email is not valid and may not be greater than 256 characters.")
    })

    const defaultValues: { email: string } = { email: '' }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(validationSchema), defaultValues })

    const onSubmit = async ({ email }: { email: string }) => {
        try {
            setLoading(true)
            setError(null)
            setShowSuccessMessage(false)
            await forgotPasswordAxios(email)
            setShowSuccessMessage(true)
            reset()
        } catch (e) {
            setError(e.message || 'Unknown server error.')
        } finally {
            setLoading(false)
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
                {error && <ErrorMessage appearance="regular">{error}</ErrorMessage>}
                {showSuccessMessage && <SuccessMessage appearance="regular">
                    <p>Link has been send to your email.</p>
                    <p>Please use the link in email to reset password.</p>
                </SuccessMessage>}
                <Grid item sx={{ textAlign: "center", margin: { xs: '60px 0', sm: '60px 150px 40px 150px' } }}>
                    <MuiButton variant="contained" type="submit">
                        {loading && <CircularProgress size="1rem" sx={{ mr: '10px' }} />} <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Send</span>
                    </MuiButton>                    
                </Grid>
            </Grid>
        </form>
    )
}