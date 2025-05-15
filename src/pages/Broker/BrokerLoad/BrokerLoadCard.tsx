import { useState } from "react"
import { useActions } from "../../../hooks/useActions"
import { Equipment } from "../../../types/common/equipment"
import { BrokerLoadCardProps } from './types'
import { Avatar, Box, CircularProgress, Divider, Grid, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import CallIcon from '@mui/icons-material/Call'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import InventoryIcon from '@mui/icons-material/Inventory'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import NavigationIcon from '@mui/icons-material/Navigation'
import ScaleIcon from '@mui/icons-material/Scale';
import AppDeleteConfirmDialog from "../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog"

export default function BrokerLoadCard({ load, onEdit }: BrokerLoadCardProps): JSX.Element {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [showShipperInfo, setShowShipperInfo] = useState<boolean>(false)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)
    const [loadingState, setLoadingState] = useState<boolean>(false)

    const { removeBrokerLoad } = useActions()

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const onDeleteLoad = async () => {
        setLoadingState(true)
        removeBrokerLoad(load.id)
        setLoadingState(false)
    }

    return (
        <div style={{ display: "flex", padding: "15px 0" }}>
            <div style={{ flexBasis: "24px", flexShrink: 0 }}>
                <InventoryIcon sx={{ width: 20, height: 20, fill: 'var(--lightGrey)' }} />
            </div>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" sx={{ flexGrow: 1, margin: "0 10px" }}>
                <span className='text-14' style={{fontWeight: "bold"}}>
                    {load.origin} - {
                        load.pickUp.toString().includes("Z") ?
                        new Date(load.pickUp).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"}) :
                        new Date(load.pickUp.toString() + "Z").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})
                    }
                </span>
                <span className='text-14' style={{fontWeight: "bold"}}>
                    {load.destination} - {
                        load.delivery.toString().includes("Z") ?
                        new Date(load.delivery).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"}) :
                        new Date(load.delivery.toString() + "Z").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})
                    }
                </span>
                <div style={{display: 'flex'}}>
                        <LocalShippingIcon sx={{ width: 18, height: 18, margin: '1px 3px', fill: 'var(--lightGrey)' }}/> 
                    <span className='text-14'>{Equipment[load.equipment]}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                    <span style={{fontSize: 20, fontWeight: 700, color: 'var(--darkGrey)', marginRight: 5}}>${Math.round(load.rate * 100)/100} </span>
                    <span className='text-12' style={{marginRight: 5}}>(${Math.round(load.ratePerMile * 100)/100}/mi)</span>
                </div>
                <Tooltip title="Show on map" placement="top">
                    <a href={`https://www.google.com/maps/dir/?api=1&origin=${load.origin}&destination=${load.destination}&travelmode=driving`}
                        target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
                        <div style={{display: 'flex', textAlign: 'center'}}>
                            <NavigationIcon sx={{ width: 18, height: 18, fontSize: 12, margin: '1px 3px', fill: 'var(--lightGrey)' }}/> 
                            <span className='text-12' style={{margin: "1px 5px"}}>{Math.round(load.miles)} mi, 
                                (DH-O: {Math.round(load.deadheadOrigin)}, DH-D: {Math.round(load.deadheadDestination)})
                            </span>
                        </div>
                    </a>
                </Tooltip>
                {
                    (load.weight > 0 || load.length > 0) &&
                    <div style={{display: 'flex'}}>
                        <ScaleIcon sx={{ width: 18, height: 18, fontSize: 12, margin: '1px 3px', fill: 'var(--lightGrey)' }} />                    
                        <span className='text-12' style={{margin: "1px 5px"}}>{load.weight} lbs / {load.length} ft</span>
                    </div>
                }
                <div style={{display: 'flex'}} onClick={() => setShowShipperInfo(!showShipperInfo)}>
                    {
                        load.shipperLogo ?
                        <Avatar src={(process.env.NODE_ENV === "production" ?
                            process.env.REACT_APP_BASE_API_URL_PROD :
                            process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + load.shipperLogo}
                            variant="square"
                            sx={{ width: 18, height: 18, fontSize: 12, margin: '1px 3px' }}
                        /> :
                        <Avatar sx={{ width: 18, height: 18, fontSize: 12, margin: '1px 3px' }}>
                            {load.shipperName.charAt(0)}
                        </Avatar> 
                    }
                    <span className='text-12' style={{margin: "1px 5px"}}>{load.shipperName}</span>
                    { 
                        showShipperInfo ? 
                        <ExpandLessIcon sx={{fill: 'var(--lightGrey)', cursor: 'pointer', margin: '0px 0px 3px'}}/> : 
                        <ExpandMoreIcon sx={{fill: 'var(--lightGrey)', cursor: 'pointer', margin: '0px 0px 3px'}}/>}
                </div>
                <Box sx={{ display: !showShipperInfo && "none", padding: "0 0 5px 10px" }}>
                    <div style={{display: 'flex', textAlign: 'center'}}>
                        <span className='text-12'>{load.shipperPhone}</span>
                        <a href={`tel:${load.shipperPhone}`} >
                            <CallIcon sx={{ width: 18, height: 18, fontSize: 12, margin: '0px 3px', cursor: 'pointer', fill: 'var(--lightGrey)' }} />
                        </a>
                    </div>
                    <div style={{display: 'flex'}}>
                        <span className='text-12'>{load.shipperEmail}</span>
                        <a href={`mailto:${load.shipperEmail}`} >
                            <MailOutlineIcon sx={{ width: 18, height: 18, fontSize: 12, margin: '0px 3px', cursor: 'pointer', fill: 'var(--lightGrey)' }} />
                        </a>
                    </div>
                    <p className='text-12' style={{margin: 0}}>Reference Id: {load.referenceId}</p>
                </Box>
                {
                    (load.requirements) &&
                    <p className='text-12' style={{margin: 0}}>{load.requirements}</p>
                }
            </Grid>
            <Box sx={{ flexBasis: { xs: "24px", sm: "140px" }, flexShrink: 0 }}>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'right', justifyContent: "end" }}>
                    {loadingState && <CircularProgress size="1rem" sx={{ m: '4px 10px 0 0' }} />}
                    <Tooltip title="View | Edit" placement="top">
                        <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--yellow)' }} onClick={() => onEdit(load)} />
                    </Tooltip>
                    <Divider orientation="vertical" flexItem />
                    <Tooltip title="Remove" placement="top">
                        <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--red)' }} onClick={() => setConfirmDialogOpen(true)} />
                    </Tooltip>
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
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={() => onEdit(load)}>
                                <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--yellow)' }} />
                                <span className='text-16'>Edit</span>
                            </Grid>
                        </MenuItem>                        
                        <MenuItem onClick={handleClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={() => setConfirmDialogOpen(true)}>
                                <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--red)' }} />
                                <span className='text-16'>Remove</span>
                            </Grid>
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
            {
                confirmDialogOpen &&
                    <AppDeleteConfirmDialog
                        message='This load will be deleted permanently. Please confirm.'
                        onCancel={() => setConfirmDialogOpen(false)}
                        onDelete={onDeleteLoad}
                    />
            }
        </div>
    )
}