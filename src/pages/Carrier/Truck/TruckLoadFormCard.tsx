import { useState } from 'react'
import { TruckLoadFormCardProps } from './types'
import { LoadStatus } from '../../../types/load'
import { Equipment } from '../../../types/common/equipment'
import { Avatar, Box, Grid, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import NavigationIcon from '@mui/icons-material/Navigation'
import StyledDeleteIcon from '../../../components/StyledIcons/StyledDeleteIcon'

export default function TruckLoadFormCard({load, onDelete}: TruckLoadFormCardProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    return (
        <div style={{ display: "flex", padding: "15px 0" }}>
            {/* Avatar */}
            <div style={{ flexBasis: "24px", flexShrink: 0 }}>
                <Avatar 
                    src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + load.shipperLogo}
                    sx={{ width: 20, height: 20, fontSize: 14, backgroundColor: 'var(--blue)', margin: '1px 3px' }}
                >
                    {load.shipperName.toUpperCase().charAt(0)}
                </Avatar>                
            </div>
            {/* Card Content */}
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" sx={{ flexGrow: 1, margin: "0 10px" }}>
                <span className='text-14' style={{fontWeight: "bold"}}>{load.origin} - {new Date(load.pickUp).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})}</span>
                <span className='text-14' style={{fontWeight: "bold"}}>{load.destination} - {new Date(load.delivery).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})}</span>
                <Grid container direction="row" sx={{ justifyContent: "flex-start", alignItems: "flex-start" }} >
                    <LocalShippingIcon sx={{ width: 18, height: 18, margin: '1px 3px', fill: 'var(--lightGrey)' }}/> 
                    <span className='text-14'>{Equipment[load.equipment]}</span>
                    { load.weight > 0 && <span className='text-14'>, {load.weight} lbs</span> }
                    { load.length > 0 && <span className='text-14'>, {load.length} ft</span> }
                    <span className='text-14' style={{marginLeft: 5}}>/ {LoadStatus[load.loadStatus]}</span>
                </Grid>
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                    <span style={{fontSize: 20, fontWeight: 700, color: 'var(--darkGrey)', marginRight: 5}}>${Math.round(load.rate * 100)/100} </span>
                    <span className='text-12' style={{marginRight: 5}}>(${Math.round(load.ratePerMile * 100)/100}/mi)</span>
                </div>
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                    <span 
                        style={{fontSize: 16, fontWeight: 700, 
                            color: load.profit <= 0 ? 'var(--red)' :
                            load.profitPerMile / load.ratePerMile > 0.33 ? 'var(--green)' : 'var(--blue)', 
                        marginRight: 5}}
                    >
                        ${Math.round(load.profit * 100)/100}
                    </span>
                    <span className='text-12' style={{margin: "0px 3px"}}>profit</span>
                    <span className='text-12'>(${Math.round(load.profitPerMile * 100)/100}/mi, {Math.round(load.profitPerMile/load.ratePerMile * 100)}%)</span>
                </div>
                <Tooltip title="Show on map" placement="top">
                    <a href={`https://www.google.com/maps/dir/?api=1&origin=${load.origin}&destination=${load.destination}&travelmode=driving`}
                        target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
                        <div style={{display: 'flex', textAlign: 'left'}}>
                            <NavigationIcon sx={{ width: 18, height: 18, fontSize: 12, margin: '1px 3px', fill: 'var(--lightGrey)' }}/> 
                            <span className='text-12' style={{margin: "1px 5px"}}>{Math.round(load.miles)} mi, 
                                (DH-O: {Math.round(load.deadheadOrigin)}, DH-D: {Math.round(load.deadheadDestination)})
                            </span>
                        </div>
                    </a>
                </Tooltip>
            </Grid>
            {/* Menu */}
            <Box sx={{ flexBasis: { xs: "24px", sm: "140px" }, flexShrink: 0 }}>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'right', justifyContent: "end" }}>
                    <StyledDeleteIcon  tooltipTitle="Remove" onDelete={() => {onDelete(load)}}
                    />
                </Box>
                {/* Hiden burger menu */}
                <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: "end" }}>
                    <Tooltip title="Actions">
                        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                            <MoreVertIcon sx={{ color: "var(--darkGrey)" }} />
                        </IconButton>
                    </Tooltip>
                    <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorEl} keepMounted
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorEl)} onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={() => {onDelete(load)}}>
                                <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)' }} />
                                <span>Remove</span>
                            </Grid>
                        </MenuItem>
                    </Menu>
                </Box>
            </Box> 
        </div>
    )
}
