import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RouteNames } from '../../../routing';
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SchoolIcon from '@mui/icons-material/School'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

export default function HelpBar() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget)

    const handleClose = () => setAnchorElUser(null)

    return (
        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Help">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <HelpOutlineIcon sx={{ color: "var(--lightGrey)78" }} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleClose}
            >
                <MenuItem component={Link} to={RouteNames.HELP} onClick={handleClose}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="10px">
                        <SchoolIcon sx={{ color: "var(--darkGrey)" }} />
                        <span className='text-16'>Knowledge base</span>
                    </Grid>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="10px">
                        <a href="mailto:support@truckdispatcher.com">
                            <ThumbUpIcon sx={{ color: "var(--darkGrey)" }} />
                        </a>
                        <a href="mailto:support@truckdispatcher.com" 
                        style={{ fontSize: "0.95rem", textDecoration: "none", color: "var(--darkGrey)" }}>
                            <span className='text-16'>Suggest a feature</span>
                        </a>
                    </Grid>
                </MenuItem>
            </Menu>
        </Box>
    )
}
