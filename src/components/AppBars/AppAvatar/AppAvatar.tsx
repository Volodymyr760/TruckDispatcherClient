import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useActions } from '../../../hooks/useActions'
import { IRoute, RouteNames } from '../../../routing'
import { Avatar, Box, Grid, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PasswordIcon from '@mui/icons-material/Password'
import LogoutIcon from '@mui/icons-material/Logout'
import ChangeEmailPage from '../../../pages/Account/ChangeEmail/ChangeEmailPage'
import ChangePasswordPage from '../../../pages/Account/ChangePassword/ChangePasswordPage'
import ResetPasswordPage from '../../../pages/Account/ResetPassword/ResetPasswordPage'

export default function AppAvatar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { auth } = useTypedSelector(state => state.auth)
    const { logout } = useActions()
    const navigate = useNavigate()

    const settings: { route: IRoute, icon: React.ReactNode }[] = [
        { route: { path: RouteNames.CHANGE_EMAIL, title: "Change email", component: <ChangeEmailPage /> }, icon: <MailOutlineIcon sx={{ color: "var(--darkGrey)" }} /> },
        { route: { path: RouteNames.CHANGE_PASSWORD, title: "Change password", component: <ChangePasswordPage /> }, icon: <PasswordIcon sx={{ color: "var(--darkGrey)" }} /> },
        { route: { path: RouteNames.RESET_PASSWORD, title: "Reset password", component: <ResetPasswordPage /> }, icon: <PasswordIcon sx={{ color: "var(--darkGrey)" }} /> },
    ];

    const handleLogout = () => {
        logout(auth.user.email, auth.tokens.accessToken)
        navigate(RouteNames.HOME)
    }

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget)

    const handleClose = () => setAnchorElUser(null)

    return (
        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Manage profile">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    {
                        auth.user.avatar ?
                            <Avatar
                                alt="Avatar"
                                src={(process.env.NODE_ENV === "production" ?
                                    process.env.REACT_APP_BASE_API_URL_PROD :
                                    process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + auth.user.avatar}
                            />
                            :
                            <Avatar sx={{ bgcolor: 'grey' }}>{auth.user.firstName.charAt(0) + auth.user.lastName.charAt(0)}</Avatar>
                    }
                </IconButton>
            </Tooltip>
            <Menu sx={{ mt: '45px' }} id="menu-appbar"
                anchorEl={anchorElUser} keepMounted
                anchorOrigin={{vertical: 'top', horizontal: 'right' }} 
                transformOrigin={{ vertical: 'top', horizontal: 'right'}}
                open={Boolean(anchorElUser)} onClose={handleClose}
            >
                <Box sx={{ margin: "5px 15px" }}>
                    <p className='text-16' style={{fontWeight: 800, margin: "8px 0"}}>{auth.user.firstName + " " + auth.user.lastName}</p>
                    <p className='text-12' style={{margin: "6px 0"}}>{"Roles: " + auth.roles.join(", ")}</p>
                </Box>
                <hr style={{ width: "90%" }} />
                {settings.map((setting) => (
                    <MenuItem key={setting.route.path} component={Link} to={setting.route.path} onClick={handleClose}>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="10px">
                            <span className='text-16'>{setting.route.title}</span>
                            {setting.icon}
                        </Grid>
                    </MenuItem>
                ))}
                <hr style={{ width: "90%" }} />
                <MenuItem component={Link} to={RouteNames.HOME} onClick={handleLogout}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="10px">
                        {/* <Typography sx={{ textAlign: "left", fontSize: "0.95rem" }}>Logout</Typography> */}
                        <span className='text-16'>Logout</span>
                        <LogoutIcon sx={{ color: "var(--red)" }} />
                    </Grid>
                </MenuItem>
            </Menu>
        </Box>
    )
}
