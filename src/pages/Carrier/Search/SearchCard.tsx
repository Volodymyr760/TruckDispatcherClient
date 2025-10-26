import { useState } from "react"
import { clonedObject } from "../../../hooks/clonedObject"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { Equipment } from "../../../types/common/equipment"
import { IImportLoad } from "../../../types/importload"
import { ILoad, LoadStatus } from "../../../types/load"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { SearchCardProps } from "./types"
import { TruckDto } from "../../../types/truck"
import { createLoadAxios } from "../../../api/load"
import { Alert, Avatar, Box, CircularProgress, Divider, Grid, IconButton, Menu, MenuItem, Snackbar, Tooltip } from "@mui/material"
import CallIcon from '@mui/icons-material/Call'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import NavigationIcon from '@mui/icons-material/Navigation'
import ReplyIcon from '@mui/icons-material/Reply'
import ReplyAllIcon from '@mui/icons-material/ReplyAll'
import BackhaulsList from "./BackhaulsList"
import { Role } from "../../../types/auth"

export default function SearchCard({importLoad, isBackhaul}: SearchCardProps): JSX.Element {
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [showShipperInfo, setShowShipperInfo] = useState<boolean>(false)
    const [showRequirements, setShowRequirements ] = useState<boolean>(false)

    const [loadingSaveAsLoad, setLoadingSaveAsLoad] = useState<boolean>(false)
    const [successSaveAsLoad, setSuccessSaveAsLoad] = useState<string>("")
    const [errorSaveAsLoad, setErrorSaveAsLoad] = useState<string>("")

    const [currentImportLoad, setCurrentImportLoad] = useState<IImportLoad>(null)
    const [isToAnywhereState, setIsToAnywhereState] = useState<boolean>(false)

    const { auth } = useTypedSelector(state => state.auth)
    const { importLoadSearchParams } = useTypedSelector(state => state.importLoad)
    const { removeImportLoadFromSearch, createLoadFromImportLoad } = useActions()

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const onSaveAsLoad = async () => {
        try {
            setSuccessSaveAsLoad("")
            setErrorSaveAsLoad("")
            setLoadingSaveAsLoad(true)
            const load: ILoad = {
                referenceId: importLoad.referenceId,
                origin: importLoad.origin,
                destination: importLoad.destination,
                pickUp: importLoad.pickUp,
                delivery: importLoad.delivery,
                length: Math.round(importLoad.length),
                weight: Math.round(importLoad.weight),
                equipment: importLoad.equipment,
                shipperName: importLoad.shipperName,
                shipperLogo: importLoad.shipperLogo,
                shipperEmail: importLoad.shipperEmail,
                shipperPhone: importLoad.shipperPhone,
                miles: Math.round(importLoad.miles),
                deadheadOrigin: Math.round(importLoad.deadheadOrigin),
                deadheadDestination: Math.round(importLoad.deadheadDestination),
                rate: Math.round(importLoad.rate * 100)/100,
                ratePerMile: Math.round(importLoad.ratePerMile * 100)/100,
                profit: Math.round(importLoad.profit * 100)/100,
                profitPerMile: Math.round(importLoad.profitPerMile * 100)/100,
                requirements: importLoad.requirements,
                loadStatus: LoadStatus.Saved,
                truckId: importLoadSearchParams.truck?.id,
                truck: importLoadSearchParams.truck,
                userId: auth.user.id            
            };
            let truckToApply: TruckDto = null
            if(load.truck) truckToApply = clonedObject(load.truck)
            load.truck = null
            let loadToCreate = await createLoadAxios(load)
            if(loadToCreate.truckId) loadToCreate.truck = truckToApply
            createLoadFromImportLoad(loadToCreate)
            const succsessMessage = loadToCreate.truck ? `Load for ${loadToCreate.truck.name} ${loadToCreate.truck.licensePlate} saved.` :
                'Load saved, please assign a truck.'
            setSuccessSaveAsLoad(succsessMessage)
        } catch (error) {
            setErrorSaveAsLoad(error.message || "Unable to save the load.")
        } finally {
            setLoadingSaveAsLoad(false)
        }
    }

    const onSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

    return (
        <div style={{ display: "flex", padding: "15px 0" }}>
            {/* Avatar */}
            <div style={{ flexBasis: "24px", flexShrink: 0 }}>
                <Avatar 
                    src={(process.env.NODE_ENV === "production" ?
                        process.env.REACT_APP_BASE_API_URL_PROD :
                        process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + importLoad.shipperLogo}
                    sx={{ width: 20, height: 20, fontSize: 14, margin: '1px 3px' }}
                >
                    {importLoad.shipperName.toUpperCase().charAt(0)}
                </Avatar>
            </div>
            {/* Card Content */}
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" sx={{ flexGrow: 1, margin: "0 10px" }}>
                {/* Origin */}
                <span className='text-16' style={{fontWeight: "bold"}}>
                    {importLoad.origin} - {new Date(importLoad.pickUp.toString() + "Z").toLocaleDateString("en-US", {month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})}
                </span>
                {/* Destination */}
                <span className='text-16' style={{fontWeight: "bold"}}>
                    {importLoad.destination} - {new Date(importLoad.delivery.toString() + "Z").toLocaleDateString("en-US", {month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})}
                </span>
                {/* Status & Measurements */}
                <Grid container direction="row" sx={{ justifyContent: "flex-start", alignItems: "flex-start" }} >
                    <LocalShippingIcon sx={{ width: 18, height: 18, margin: '1px 3px', fill: 'var(--lightGrey)' }}/> 
                    <span className='text-14'>{Equipment[importLoad.equipment]}</span>
                    { importLoad.weight > 0 && <span className='text-14'>, {importLoad.weight} lbs</span> }
                    { importLoad.length > 0 && <span className='text-14'>, {importLoad.length} ft</span> }
                </Grid>
                {/* Rate */}
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                    <span className="text-20" style={{ fontWeight: 800, color: 'var(--darkGrey)', marginRight: 5}}>${Math.round(importLoad.rate * 100)/100} </span>
                    <span className='text-12' style={{marginRight: 5}}>(${Math.round(importLoad.ratePerMile * 100)/100}/mi)</span>
                </div>
                {/* Profit */}
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                    <span className='text-16' style={{fontWeight: 800, 
                            color: importLoad.profit <= 0 ? 'var(--red)' :
                            importLoad.profitPerMile / importLoad.ratePerMile > 0.33 ? 'var(--green)' : 'var(--blue)', 
                        marginRight: 5}}
                    >
                        ${Math.round(importLoad.profit * 100)/100}
                    </span>
                    <span className='text-12' style={{margin: "0px 3px"}}>profit</span>
                    <span className='text-12'>(${Math.round(importLoad.profitPerMile * 100)/100}/mi, {Math.round(importLoad.profitPerMile/importLoad.ratePerMile * 100)}%)</span>
                </div>
                {/* Map Directions */}
                <Tooltip title="Show on map" placement="top">
                    <a href={
                        isBackhaul ? 
                            `https://www.google.com/maps/dir/?api=1&origin=${importLoad.destination}&destination=${importLoad.origin}&travelmode=driving`
                        :
                            importLoadSearchParams.destination ?
                            `https://www.google.com/maps/dir/?api=1&origin=${importLoadSearchParams.origin.fullName}&destination=${importLoadSearchParams.destination.fullName}&travelmode=driving&waypoints=${importLoad.origin}|${importLoad.destination}`
                            :
                            `https://www.google.com/maps/dir/?api=1&origin=${importLoadSearchParams.origin.fullName}&destination=${importLoad.destination}&travelmode=driving&waypoints=${importLoad.origin}`
                    } 
                        target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
                        <div style={{display: 'flex', textAlign: 'left'}}>
                            <NavigationIcon sx={{ width: 18, height: 18, fontSize: 12, margin: '1px 3px', fill: 'var(--lightGrey)' }}/> 
                            <span className='text-12' style={{margin: "1px 5px"}}>{Math.round(importLoad.miles)} mi, 
                                (DH-O: {Math.round(importLoad.deadheadOrigin)}, DH-D: {Math.round(importLoad.deadheadDestination)})
                            </span>
                        </div>
                    </a>
                </Tooltip>
                {/* Shipper Info */}
                <div style={{display: 'flex'}} onClick={() => setShowShipperInfo(!showShipperInfo)}>
                    <span className='text-12' style={{margin: "1px 5px"}}>{importLoad.shipperName}</span>
                    { 
                        showShipperInfo ? 
                        <ExpandLessIcon sx={{fill: 'var(--lightGrey)', cursor: 'pointer'}}/> : 
                        <ExpandMoreIcon sx={{fill: 'var(--lightGrey)', cursor: 'pointer'}}/>}
                </div>
                <Box sx={{ display: !showShipperInfo && "none", padding: "0 0 5px 10px" }}>
                    <div style={{display: 'flex', textAlign: 'center'}}>
                        <span className='text-12'>DOT: {importLoad.shipperDotNumber}</span>
                        <ContentCopyIcon 
                            sx={{ width: 18, height: 18, fontSize: 12, margin: '1px 3px', cursor: 'pointer', fill: 'var(--lightGrey)' }}
                            onClick={() => {
                                navigator.clipboard.writeText(importLoad.shipperDotNumber)
                                setSnackBarState({message: `${importLoad.shipperDotNumber} copied`, severity: "success"})
                            }}
                        />
                    </div>
                    <div style={{display: 'flex'}}>
                        <span className='text-12'>MC: {importLoad.shipperMcNumber}</span>
                        <ContentCopyIcon 
                            sx={{ width: 18, height: 18, fontSize: 12, margin: '1px 3px', cursor: 'pointer', fill: 'var(--lightGrey)' }}
                            onClick={() => {
                                navigator.clipboard.writeText(importLoad.shipperMcNumber)
                                setSnackBarState({message: `${importLoad.shipperMcNumber} copied`, severity: "success"})
                            }}
                        />
                    </div>
                    <div style={{display: 'flex'}}>
                        <span className='text-12'>Reference Id: {importLoad.referenceId}</span>
                        <ContentCopyIcon 
                            sx={{ width: 18, height: 18, fontSize: 12, margin: '1px 3px', cursor: 'pointer', fill: 'var(--lightGrey)' }}
                            onClick={() => {
                                navigator.clipboard.writeText(importLoad.referenceId)
                                setSnackBarState({message: `${importLoad.referenceId} copied`, severity: "success"})
                            }}
                        />
                    </div>
                </Box>
                {/* Requirements */}
                {
                    importLoad.requirements.length > 0 &&
                    <div style={{display: 'flex'}} onClick={() => setShowRequirements(!showRequirements)}>
                        <span className='text-12' style={{margin: "1px 5px"}}>Requirements</span>
                        { 
                            showRequirements ? 
                            <ExpandLessIcon sx={{fill: 'var(--lightGrey)', cursor: 'pointer'}}/> : 
                            <ExpandMoreIcon sx={{fill: 'var(--lightGrey)', cursor: 'pointer'}}/>}
                    </div>
                }
                <Box sx={{ display: !showRequirements && "none", padding: "0 0 5px 10px" }}>
                    <span className='text-12'>{importLoad.requirements}</span>
                </Box>
                { errorSaveAsLoad && <p className="error-wrapper">{errorSaveAsLoad}</p> }
                { successSaveAsLoad && <p className="success-wrapper">{successSaveAsLoad}</p> }
            </Grid>
            {/* Menu */}
            <Box sx={{ flexBasis: { xs: "24px", sm: "140px" }, flexShrink: 0 }}>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'right', justifyContent: "end" }}>
                    {loadingSaveAsLoad && <CircularProgress size="1rem" sx={{ m: '0 10px' }} />}
                    {
                        auth.roles.includes(Role.Carrier) &&
                        <div>
                            <Tooltip title="Save to Loads" placement="top">
                                <FavoriteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--red)" } }} onClick={onSaveAsLoad} />
                            </Tooltip>
                            <Divider orientation="vertical" flexItem />
                        </div>
                    }
                    <Tooltip title="Call" placement="top">
                        <a href={`tel:${importLoad.shipperPhone}`} >
                            <CallIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--green)' }} />
                        </a>
                    </Tooltip>
                    <Divider orientation="vertical" flexItem />
                    <Tooltip title="Send email" placement="top">
                        <a href={`mailto:${importLoad.shipperEmail}`} >
                            <MailOutlineIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--green)' }} />
                        </a>
                    </Tooltip>
                    {
                        !isBackhaul &&
                        <div style={{display: "flex"}}>
                            <Divider orientation="vertical" flexItem />
                            <Tooltip title="Backhauls To Anywhere" placement="top">
                                <ReplyAllIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--green)' }} 
                                    onClick={() => 
                                        {
                                            setCurrentImportLoad(importLoad)
                                            setIsToAnywhereState(true)
                                        }} />
                            </Tooltip>
                            <Divider orientation="vertical" flexItem />
                            <Tooltip title={"Backhauls To " + importLoad.origin} placement="top">
                                <ReplyIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--green)' }} 
                                    onClick={() => 
                                        {
                                            setCurrentImportLoad(importLoad)
                                            setIsToAnywhereState(false)
                                        }} />
                            </Tooltip>
                            <Divider orientation="vertical" flexItem />
                            <Tooltip title="Remove from the search request" placement="top">
                                <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--red)' }} onClick={() => removeImportLoadFromSearch(importLoad.id)} />
                            </Tooltip>
                        </div>
                    }
                </Box>
                {/* Hiden burger menu */}
                <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: "end" }}>
                    <Tooltip title="Actions">
                        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                            <MoreVertIcon sx={{ color: "var(--darkGrey)" }} />
                        </IconButton>
                    </Tooltip>
                    <Menu id="menu-appbar" sx={{ mt: '45px' }} anchorEl={anchorEl} keepMounted
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        transformOrigin={{vertical: 'top', horizontal: 'right'}}
                        open={Boolean(anchorEl)} onClose={handleClose} 
                    >
                        {
                            auth.roles.includes(Role.Carrier) &&
                            <MenuItem onClick={handleClose}>
                                <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" 
                                    onClick={onSaveAsLoad}>
                                    <FavoriteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--red)" } }} />
                                    <span className='text-16'>Save</span>
                                </Grid>
                            </MenuItem>
                        }
                        <MenuItem onClick={handleClose}>
                            <a href={`tel:${importLoad.shipperPhone}`} style={{ textDecoration: 'none', color: 'rgb(32,33,36)' }} >
                                <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px">
                                    <CallIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--green)' }} />
                                    <span className='text-16'>Call</span>
                                </Grid>
                            </a>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <a href={`mailto:${importLoad.shipperEmail}`} style={{ textDecoration: 'none', color: 'rgb(32,33,36)' }} >
                                <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px">
                                    <MailOutlineIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--green)' }} />
                                    <span className='text-16'>Send email</span>
                                </Grid>
                            </a>
                        </MenuItem>
                        {
                            !isBackhaul &&
                                <MenuItem onClick={handleClose}>
                                    <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" 
                                        onClick={() => 
                                            {
                                                setCurrentImportLoad(importLoad)
                                                setIsToAnywhereState(true)
                                            }}>
                                        <ReplyAllIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--green)' }} />
                                        <span className='text-16'>Backhauls To Anywhere</span>
                                    </Grid>
                                </MenuItem>
                        }
                        {
                            !isBackhaul &&
                            <MenuItem onClick={handleClose}>
                                <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" 
                                    onClick={() => 
                                        {
                                            setCurrentImportLoad(importLoad)
                                            setIsToAnywhereState(false)
                                        }}>
                                    <ReplyIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--green)' }} />
                                    <span className='text-16'>Backhauls To {importLoad.origin}</span>
                                </Grid>
                            </MenuItem>
                        }
                        {
                            !isBackhaul &&
                            <MenuItem onClick={handleClose}>
                                <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px"
                                    onClick={() => removeImportLoadFromSearch(importLoad.id)}>
                                    <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--red)' }} />
                                    <span className='text-16'>Remove</span>
                                </Grid>
                            </MenuItem>
                        }
                    </Menu>
                </Box>
            </Box>
            {
                currentImportLoad && 
                <BackhaulsList 
                    importLoad={importLoad}
                    truck={importLoadSearchParams.truck}
                    isToAnywhere={isToAnywhereState}
                    onClose={() => setCurrentImportLoad(null)} 
                />
            }       
            <Snackbar
                open={snackBarState !== null}
                autoHideDuration={4000}
                onClose={onSnackbarClose}
            >
                <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>            
        </div>
    )
}
