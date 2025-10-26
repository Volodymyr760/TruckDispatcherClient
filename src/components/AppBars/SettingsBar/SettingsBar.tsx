import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { RouteNames } from '../../../routing'
import { Box, Grid, IconButton, Menu, MenuItem, Switch, Tooltip } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import ThemeContext from '../../Context/ThemeContext'

export default function SettingsBar() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
    const themeContext = useContext(ThemeContext);
    const { toggleTheme, theme } = themeContext;
    
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget)
    const handleClose = () => setAnchorElUser(null)

    return (
        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="App Settings">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <SettingsIcon />
                </IconButton>
            </Tooltip>
            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}} keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleClose}
            >
                <MenuItem>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="20px">
                        <span className='text-16'>Dark Mode</span>
                        <Switch checked={theme === 'dark'} onChange={toggleTheme} />
                    </Grid>
                </MenuItem>
                <MenuItem component={Link} to={RouteNames.PROFILE} onClick={handleClose}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="20px">
                        <span className='text-16'>Profile</span>
                        <AccountCircleIcon sx={{ fill: 'var(--lightGrey)' }} />
                    </Grid>
                </MenuItem>
            </Menu>
        </Box>
    )
}
