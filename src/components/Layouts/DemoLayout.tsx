import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RouteNames } from '../../routing'
import { LayoutProps } from './types'
import { ISnackBarMessageState } from '../../types/common/snackBarMessageState'
import { Alert, Box, Container, CssBaseline, Divider, IconButton, List, Snackbar, Toolbar, Typography } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MenuIcon from '@mui/icons-material/Menu'
import MuiDrawer from '@mui/material/Drawer'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import AppAvatar from '../AppBars/AppAvatar/AppAvatar'
import HelpBar from '../AppBars/HelpBar/HelpBar'
import LeftMenuItems from './LeftMenuItems'
import NotificationBar from '../AppBars/NotificationBar/NotificationBar'
import SettingsBar from '../AppBars/SettingsBar/SettingsBar'
import '../../index.css';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ paddingTop: '12px' }}>
            {'Copyright © '}
            <Link color="inherit" to={RouteNames.HOME}>
                Dispatch
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

export default function DemoAppBar({ children, title }: LayoutProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null);

    const onSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackBarState(null)
    };

    const toggleDrawer = () => setOpen(!open);

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex', minHeight: '100%' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} sx={{ backgroundColor: 'white' }}>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton edge="start" aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{ marginRight: '36px', ...(open && { display: 'none' }), color: "var(--lightGrey)" }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="var(--lightGrey)" noWrap fontFamily="Mulish" fontWeight={800} sx={{ flexGrow: 1 }}  >
                            {title}
                        </Typography>
                        <HelpBar />
                        &nbsp;&nbsp;
                        <SettingsBar />
                        <NotificationBar />
                        &nbsp;
                        <AppAvatar />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1], }} >
                        <Typography variant="h6" component="a" href={RouteNames.HOME} sx={{
                            mr: 2, display: { xs: 'flex' }, fontSize: '24px', lineHeight: '1',
                            fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: 'var(--darkGrey)', textDecoration: 'none',
                        }}
                        >
                            Dispatch
                        </Typography>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <LeftMenuItems />
                    </List>
                </Drawer>
                <Box component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto'
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 1, mb: 1, pt: 1, pb: 1, minHeight: 'calc(100vh - 110px)', marginBottom: '0' }}>
                        {children}
                    </Container>
                    <footer><Copyright sx={{ pt: 4 }} /></footer>
                </Box>
                <Snackbar
                    open={snackBarState !== null}
                    autoHideDuration={4000}
                    onClose={onSnackbarClose}
                >
                    <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
}
