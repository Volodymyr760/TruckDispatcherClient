import * as React from 'react'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { IRoute, RouteNames } from '../../../routing'
import { Role } from '../../../types/auth'
import { AppBar, Box, Button, Container, Grid, Toolbar, IconButton, Menu, MenuItem, Typography, Tooltip } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AppAvatar from '../AppAvatar/AppAvatar'
import NotificationBar from '../NotificationBar/NotificationBar'

const mainMenuItems: { route: IRoute, icon: React.ReactNode }[] = [
    { route: { path: process.env.PUBLIC_URL + "/#features", title: "Features", component: null }, icon: null },
    { route: { path: process.env.PUBLIC_URL + "/#prices", title: "Prices", component: null }, icon: null },
    { route: { path: RouteNames.HELP, title: "Help", component: null }, icon: null }
]

export default function MainAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
    const { auth } = useTypedSelector(state => state.auth)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget)

    const handleCloseNavMenu = () => setAnchorElNav(null)

    return (
        <AppBar position="static" sx={{ backgroundColor: 'var(--white)' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" component="p" sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: "Mulish",
                        fontSize: '28px',
                        lineHeight: '1',
                        fontWeight: 600
                    }}
                    >
                        <Link to={RouteNames.HOME} style={{ textDecoration: 'none', color: 'var(--darkGrey)' }}>Dispatch</Link>
                    </Typography>
                    {/* Hiden menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            sx={{ fill: 'var(----darkGrey)' }}
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu id="menu-appbar" anchorEl={anchorElNav} keepMounted
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {mainMenuItems.map((page) => (
                                <MenuItem key={page.route.path} onClick={handleCloseNavMenu}>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="10px">
                                        <a href={page.route.path} className="main-menu-link">{page.route.title}</a>
                                    </Grid>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography variant="h6" component="p" sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontSize: '16px',
                        lineHeight: '1',
                        fontWeight: 600
                    }}
                    >
                        <Link to={RouteNames.HOME} style={{ textDecoration: 'none', color: 'var(--darkGrey)' }}>TruckDispatcher</Link>
                    </Typography>
                    {/* Main Menu pages */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {mainMenuItems.map((page) => (
                            <Button
                                key={page.route.path}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, display: 'block' }}
                            >
                                <a href={page.route.path} className="main-menu-link">{page.route.title}</a>
                            </Button>
                        ))}
                    </Box>
                    {/* Avatar */}
                    {
                        auth ?
                            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                                <Link to={
                                    auth.roles.includes(Role.Carrier) ?
                                        RouteNames.DASHBOARD : 
                                        auth.roles.includes(Role.Broker) ? 
                                            RouteNames.BROKER_LOADS :
                                                RouteNames.ADMIN_LOADS
                                    } className="main-menu-link">
                                        <Tooltip title="Manager Panel" placement="bottom">
                                            <DashboardIcon sx={{ fill: "var(--darkGrey)" }} />
                                        </Tooltip>
                                    </Link>
                                <NotificationBar />
                                <AppAvatar />
                            </Box>
                            :
                            <Button
                                onClick={handleCloseNavMenu}
                                color="primary"
                                variant="contained"
                                sx={{ my: 2, display: 'block', borderRadius: "16px" }}
                            >
                                <Link to='/login' className="main-menu-link" style={{ textTransform: 'none', color: 'white' }}>
                                    Sign In
                                </Link>
                            </Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
