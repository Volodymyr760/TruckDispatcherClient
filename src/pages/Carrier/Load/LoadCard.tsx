import { useState } from "react"
import { useActions } from "../../../hooks/useActions"
import { Equipment } from "../../../types/common/equipment"
import { IImportLoad } from "../../../types/importload"
import { LoadCardProps } from './types'
import { LoadStatus } from "../../../types/load"
import { Avatar, Box, CircularProgress, Divider, Grid, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import CallIcon from '@mui/icons-material/Call'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import NavigationIcon from '@mui/icons-material/Navigation'
import ReplyIcon from '@mui/icons-material/Reply'
import ReplyAllIcon from '@mui/icons-material/ReplyAll'
import AppDeleteConfirmDialog from "../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog"
import BackhaulsList from "../Search/BackhaulsList"

export default function LoadCard({ load, onEdit }: LoadCardProps): JSX.Element {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [showShipperInfo, setShowShipperInfo] = useState<boolean>(false)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)
    const [loadingState, setLoadingState] = useState<boolean>(false)

    const [currentImportLoad, setCurrentImportLoad] = useState<IImportLoad>(null)
    const [isToAnywhereState, setIsToAnywhereState] = useState<boolean>(false)

    const { removeLoad } = useActions()

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const onDeleteLoad = async () => {
        setLoadingState(true)
        removeLoad(load.id)
        setLoadingState(false)
    }

    return (
        <div style={{ display: "flex", padding: "15px 0" }}>
            {/* Broker Logo */}
            <div style={{ flexBasis: "24px", flexShrink: 0 }}>
                {
                    load.shipperLogo ?
                    <Avatar 
                        src={(process.env.NODE_ENV === "production" ?
                            process.env.REACT_APP_BASE_API_URL_PROD :
                            process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + load.shipperLogo}
                        sx={{ width: 20, height: 20, fontSize: 14, margin: '1px 3px' }}
                        />
                    :
                    <Avatar sx={{ width: 20, height: 20, fontSize: 14, bgcolor: "var(--blue)", color: "white" }}>{load.shipperName.toUpperCase().charAt(0)}</Avatar>
                }
            </div>
            {/* Card Content */}
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" sx={{ flexGrow: 1, margin: "0 10px" }}>
                {/* Origin */}
                <span className='text-16' style={{fontWeight: "bold"}}>
                    {load.origin} - {
                        load.pickUp.toString().includes("Z") ?
                        new Date(load.pickUp).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"}) :
                        new Date(load.pickUp.toString() + "Z").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})
                    }
                </span>
                {/* Destination */}
                <span className='text-16' style={{fontWeight: "bold"}}>
                    {load.destination} - {
                        load.delivery.toString().includes("Z") ?
                        new Date(load.delivery).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"}) :
                        new Date(load.delivery.toString() + "Z").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})
                    }
                </span>
                {/* Equipment & Measurements */}
                <Grid container direction="row" sx={{ justifyContent: "flex-start", alignItems: "flex-start" }} >
                    <LocalShippingIcon sx={{ width: 18, height: 18, margin: '1px 3px', fill: 'var(--lightGrey)' }}/> 
                    <span className='text-16'>{Equipment[load.equipment]}</span>
                    { load.weight > 0 && <span className='text-14'>, {load.weight} lbs</span> }
                    { load.length > 0 && <span className='text-14'>, {load.length} ft</span> }
                    <span className='text-14' style={{marginLeft: 5}}>/ {LoadStatus[load.loadStatus]}</span>
                </Grid>
                {/* Rate */}
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                    <span style={{fontSize: 20, fontWeight: 700, color: 'var(--darkGrey)', marginRight: 5}}>${Math.round(load.rate * 100)/100} </span>
                    <span className='text-16' style={{marginRight: 5}}>(${Math.round(load.ratePerMile * 100)/100}/mi)</span>
                </div>
                {/* Profit */}
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                    <span 
                        style={{fontSize: 16, fontWeight: 700, 
                            color: load.profit <= 0 ? 'var(--red)' :
                            load.profitPerMile / load.ratePerMile > 0.33 ? 'var(--green)' : 'var(--blue)', 
                        marginRight: 5}}
                    >
                        ${Math.round(load.profit * 100)/100}
                    </span>
                    <span className='text-14' style={{margin: "0px 3px"}}>profit</span>
                    <span className='text-14'>(${Math.round(load.profitPerMile * 100)/100}/mi, {Math.round(load.profitPerMile/load.ratePerMile * 100)}%)</span>
                </div>
                {/* Truck */}
                {
                    load.truck && 
                    <div style={{display: 'flex'}}>
                        <Avatar 
                            src={(process.env.NODE_ENV === "production" ?
                                process.env.REACT_APP_BASE_API_URL_PROD :
                                process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + load.truck.avatar}
                            sx={{ width: 18, height: 18, fontSize: 12, backgroundColor: 'var(--blue)', margin: '1px 3px' }}
                        >
                            {load.truck.name.charAt(0)}
                        </Avatar> 
                        <span className='text-12' style={{margin: "1px 5px"}}>{load.truck.name + " " + load.truck.licensePlate}</span>
                    </div>
                }
                {/* Map Directions */}
                <Tooltip title="Show on map" placement="top">
                    <a href={`https://www.google.com/maps/dir/?api=1&origin=${load.origin}&destination=${load.destination}&travelmode=driving`}
                        target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
                        <div style={{display: 'flex', textAlign: 'left'}}>
                            <NavigationIcon sx={{ width: 18, height: 18, fontSize: 12, margin: '1px 3px', fill: 'var(--lightGrey)' }}/> 
                            <span className='text-14' style={{margin: "1px 5px"}}>{Math.round(load.miles)} mi, 
                                (DH-O: {Math.round(load.deadheadOrigin)}, DH-D: {Math.round(load.deadheadDestination)})
                            </span>
                        </div>
                    </a>
                </Tooltip>
                {/* Shipper Info */}
                <div style={{display: 'flex'}} onClick={() => setShowShipperInfo(!showShipperInfo)}>
                    <span className='text-14' style={{margin: "1px 5px"}}>{load.shipperName}</span>
                    { 
                        showShipperInfo ? 
                        <ExpandLessIcon sx={{fill: 'var(--lightGrey)', cursor: 'pointer', margin: '0px 0px 3px'}}/> : 
                        <ExpandMoreIcon sx={{fill: 'var(--lightGrey)', cursor: 'pointer', margin: '0px 0px 3px'}}/>}
                </div>
                <Box sx={{ display: !showShipperInfo && "none", padding: "0 0 5px 10px" }}>
                    <div style={{display: 'flex', textAlign: 'center'}}>
                        <span className='text-14'>{load.shipperPhone}</span>
                        <a href={`tel:${load.shipperPhone}`} >
                            <CallIcon sx={{ width: 18, height: 18, fontSize: 12, margin: '0px 3px', cursor: 'pointer', fill: 'var(--lightGrey)' }} />
                        </a>
                    </div>
                    <div style={{display: 'flex'}}>
                        <span className='text-14'>{load.shipperEmail}</span>
                        <a href={`mailto:${load.shipperEmail}`} >
                            <MailOutlineIcon sx={{ width: 18, height: 18, fontSize: 12, margin: '0px 3px', cursor: 'pointer', fill: 'var(--lightGrey)' }} />
                        </a>
                    </div>
                    <p className='text-14' style={{margin: 0}}>Reference Id: {load.referenceId}</p>
                </Box>
                {/* Requirements */}
                {
                    (load.requirements) &&
                    <p className='text-14' style={{margin: 0}}>{load.requirements}</p>
                }
            </Grid>
            {/* Menu */}
            <Box sx={{ flexBasis: { xs: "24px", sm: "140px" }, flexShrink: 0 }}>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'right', justifyContent: "end" }}>
                    {loadingState && <CircularProgress size="1rem" sx={{ m: '4px 10px 0 0' }} />}
                    <Tooltip title="Backhauls To Anywhere" placement="top">
                        <ReplyAllIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--green)" } }} 
                            onClick={() => 
                                {
                                    setCurrentImportLoad({
                                        referenceId: load.referenceId,
                                        origin: load.origin,
                                        originLatitude: 0,
                                        originLongitude: 0,
                                        destination: load.destination,
                                        destinationLatitude: 0,
                                        destinationLongitude: 0,
                                        pickUp: load.pickUp,
                                        delivery: load.delivery,
                                        length: 0,
                                        weight: 0,
                                        equipment: load.equipment,
                                        shipperName: '',
                                        shipperLogo: '',
                                        shipperEmail: '',
                                        shipperPhone: '',
                                        shipperDotNumber: '',
                                        shipperMcNumber: '',
                                        miles: 0,
                                        deadheadOrigin: 0,
                                        deadheadDestination: 0,
                                        rate: 0,
                                        ratePerMile: 0,
                                        profit: 0,
                                        profitPerMile: 0,
                                        requirements: ''
                                    })
                                    setIsToAnywhereState(true)
                                }} 
                        />
                    </Tooltip>
                    <Divider orientation="vertical" flexItem />
                    <Tooltip title={"Backhauls To " + load.origin} placement="top">
                        <ReplyIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--green)" } }} 
                            onClick={() => 
                                {
                                    setCurrentImportLoad({
                                        referenceId: load.referenceId,
                                        origin: load.origin,
                                        originLatitude: 0,
                                        originLongitude: 0,
                                        destination: load.destination,
                                        destinationLatitude: 0,
                                        destinationLongitude: 0,
                                        pickUp: load.pickUp,
                                        delivery: load.delivery,
                                        length: 0,
                                        weight: 0,
                                        equipment: load.equipment,
                                        shipperName: '',
                                        shipperLogo: '',
                                        shipperEmail: '',
                                        shipperPhone: '',
                                        shipperDotNumber: '',
                                        shipperMcNumber: '',
                                        miles: 0,
                                        deadheadOrigin: 0,
                                        deadheadDestination: 0,
                                        rate: 0,
                                        ratePerMile: 0,
                                        profit: 0,
                                        profitPerMile: 0,
                                        requirements: ''
                                    })
                                    setIsToAnywhereState(false)
                                }} 
                        />
                    </Tooltip>
                    <Divider orientation="vertical" flexItem />
                    <Tooltip title="View | Edit" placement="top">
                        <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--yellow)" } }} onClick={() => onEdit(load)} />
                    </Tooltip>
                    <Divider orientation="vertical" flexItem />
                    <Tooltip title="Remove" placement="top">
                        <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--red)" } }} onClick={() => setConfirmDialogOpen(true)} />
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
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" 
                                onClick={() => 
                                    {
                                        setCurrentImportLoad({
                                            referenceId: load.referenceId,
                                            origin: load.origin,
                                            originLatitude: 0,
                                            originLongitude: 0,
                                            destination: load.destination,
                                            destinationLatitude: 0,
                                            destinationLongitude: 0,
                                            pickUp: load.pickUp,
                                            delivery: load.delivery,
                                            length: 0,
                                            weight: 0,
                                            equipment: load.equipment,
                                            shipperName: '',
                                            shipperLogo: '',
                                            shipperEmail: '',
                                            shipperPhone: '',
                                            shipperDotNumber: '',
                                            shipperMcNumber: '',
                                            miles: 0,
                                            deadheadOrigin: 0,
                                            deadheadDestination: 0,
                                            rate: 0,
                                            ratePerMile: 0,
                                            profit: 0,
                                            profitPerMile: 0,
                                            requirements: ''
                                        })
                                        setIsToAnywhereState(true)
                                    }}>
                                <ReplyAllIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)' }} />
                                <span className='text-16'>Backhauls To Anywhere</span>
                            </Grid>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" 
                                onClick={() => 
                                    {
                                        setCurrentImportLoad({
                                            referenceId: load.referenceId,
                                            origin: load.origin,
                                            originLatitude: 0,
                                            originLongitude: 0,
                                            destination: load.destination,
                                            destinationLatitude: 0,
                                            destinationLongitude: 0,
                                            pickUp: load.pickUp,
                                            delivery: load.delivery,
                                            length: 0,
                                            weight: 0,
                                            equipment: load.equipment,
                                            shipperName: '',
                                            shipperLogo: '',
                                            shipperEmail: '',
                                            shipperPhone: '',
                                            shipperDotNumber: '',
                                            shipperMcNumber: '',
                                            miles: 0,
                                            deadheadOrigin: 0,
                                            deadheadDestination: 0,
                                            rate: 0,
                                            ratePerMile: 0,
                                            profit: 0,
                                            profitPerMile: 0,
                                            requirements: ''
                                        })
                                        setIsToAnywhereState(false)
                                    }}>
                                <ReplyIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)' }} />
                                <span className='text-16'>Backhauls To {load.origin}</span>
                            </Grid>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={() => onEdit(load)}>
                                <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)' }} />
                                <span className='text-16'>Edit</span>
                            </Grid>
                        </MenuItem>                        
                        <MenuItem onClick={handleClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={() => setConfirmDialogOpen(true)}>
                                <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)' }} />
                                <span className='text-16'>Remove</span>
                            </Grid>
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
            {
                currentImportLoad && 
                <BackhaulsList 
                    importLoad={currentImportLoad}
                    truck={load.truck}
                    isToAnywhere={isToAnywhereState}
                    onClose={() => setCurrentImportLoad(null)} 
                />
            }
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