import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RouteNames } from '../../../routing'
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'

export default function SettingsBar() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget)
    const handleClose = () => setAnchorElUser(null)

    return (
        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="App Settings">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <SettingsIcon sx={{ color: "var(--lightGrey)" }} />
                </IconButton>
            </Tooltip>
            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}} keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleClose}
            >
                <MenuItem component={Link} to={RouteNames.PROFILE} onClick={handleClose}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="20px">
                        <span className='text-16'>Profile</span>
                        <AccountCircleIcon sx={{ fill: 'var(--lightGrey)' }} />
                    </Grid>
                </MenuItem>
                {/* <MenuItem
                    component={Link}
                    to={RouteNames.BRANDING}
                    onClick={handleClose}
                    disabled={auth.user.account.pricePackageType === PricePackageType.Free}
                >
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="20px">
                        <Typography sx={{ textAlign: "left", fontSize: "0.95rem" }}>Branding</Typography>
                        <PaletteIcon sx={{ fill: 'var(--lightGrey)' }} />
                    </Grid>
                </MenuItem> */}
            </Menu>
        </Box>
    )
}
