import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import { RouteNames } from "../../../routing"
import { registerAxios } from "../../../api/user"
import { IRegisterDto, Role } from "../../../types/auth"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from "../../../types/common/RegularExpressions"
import { CircularProgress, FormControlLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, TextField } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { Visibility, VisibilityOff } from "@mui/icons-material"
import MuiButton from "../../../components/Button/MuiButton"
import ErrorMessage from "../../../components/Messages/ErrorMessage"

export default function RegisterForm(): JSX.Element {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [accountTypeState, setAccountTypeState] = useState<Role>(Role.Carrier)

    const validationSchema = Yup.object({
        companyName: Yup.string()
            .required('Required field.')
            .max(50, 'Company name may not be greater than 50 characters.'),
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
        password: Yup.string()
            .required('Required field.')
            .min(7, 'Must contain at least one uppercase, one symbol and at least 7 or more characters')
            .max(100, 'Password may not be greater than 100 characters.')
            .matches(PASSWORD_REG_EXP, "Password is not valid. Must contain at least one uppercase, one symbol and at least 7 or more characters."),
        confirmPassword: Yup.string()
            .required('Required field.')
            .max(100, 'Confirm password may not be greater than 100 characters.')
            .matches(PASSWORD_REG_EXP, "Confirm password is not valid. Should match with Password.")
    })

    const defaultValues: IRegisterDto = { firstName: '', lastName: '', companyName: '', role: Role.Carrier, email: '', password: '', confirmPassword: '' }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema), defaultValues
    })

    const onAccountTypeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === Role.Carrier) setAccountTypeState(Role.Carrier)
        if (event.target.value === Role.Broker) setAccountTypeState(Role.Broker)
    };

    const onSubmit = async (registerDto: IRegisterDto) => {
        try {
            setLoading(true)
            setError(null)
            await registerAxios({
                firstName: registerDto.firstName,
                lastName: registerDto.lastName,
                companyName: registerDto.companyName,
                role: accountTypeState,
                email: registerDto.email,
                password: registerDto.password,
                confirmPassword: registerDto.confirmPassword
            });
            reset();
            navigate(RouteNames.REGISTER_COMPLETE);
        } catch (error) {
            setError(error.message || 'Unable to register.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" alignContent="center">
                <Grid item xs={12} md={6}>
                    <Controller name="companyName" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Company name" type="text" margin="normal" fullWidth
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
                                error={Boolean(errors.companyName)} helperText={errors.companyName?.message} />} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller rules={{ required: true }} control={control} name="role"
                        render={({ field }) => (
                            <RadioGroup {...field}
                                onChange={onAccountTypeChanged}
                                value={accountTypeState}
                            >
                                <FormControlLabel value={Role.Carrier} control={<Radio />}
                                    label={ <span className="text-14">Carrier</span> }
                                />
                                <FormControlLabel value={Role.Broker} control={<Radio />}
                                    label={ <span className="text-14">Broker</span> }
                                />
                            </RadioGroup>
                                )}
                            />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller name="firstName" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="First name" type="text" margin="normal" fullWidth
                                sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" >
                                                <AccountCircleIcon />
                                            </IconButton>
                                        </InputAdornment>),
                                }}
                                error={Boolean(errors.firstName)} helperText={errors.firstName?.message} />} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller name="lastName" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Last name" type="text" margin="normal" fullWidth
                                sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" >
                                                <AccountCircleIcon />
                                            </IconButton>
                                        </InputAdornment>),
                                }}
                                error={Boolean(errors.lastName)} helperText={errors.lastName?.message} />} />
                </Grid>
                <Grid item xs={12} md={6}>
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
                                error={Boolean(errors.email)} helperText={errors.email?.message} />}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller name="password" control={control}
                        render={({ field }) =>
                            <TextField  {...field} label="Password" type={showPassword ? 'text' : 'password'}
                                sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                margin="normal" fullWidth
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
                                helperText="Must contain at least one uppercase, one symbol and at least 7 or more characters" />}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller name="confirmPassword" control={control}
                        render={({ field }) =>
                            <TextField {...field} label="Confirm Password" type={showPassword ? 'text' : 'password'}
                                sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                margin="normal" fullWidth
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
                <Grid item sx={{ textAlign: "center", margin: { xs: '24px 0', sm: '24px 150px 24px 150px' } }}>
                    <MuiButton variant="contained" type="submit">
                        {loading && <CircularProgress size="1rem" sx={{ mr: '10px' }} />} <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Sign Up</span>
                    </MuiButton>                    
                </Grid>
            </Grid>
        </form>
    )
}
