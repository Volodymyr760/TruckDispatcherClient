import { useState } from 'react'
import { useActions } from '../../../hooks/useActions'
import { TruckCardProps } from './types'
import { Equipment } from '../../../types/common/equipment'
import { ITruck, TruckStatus } from '../../../types/truck'
import { ISnackBarMessageState } from '../../../types/common/snackBarMessageState'
import { Alert, Avatar, Box, Divider, Grid, IconButton, Menu, MenuItem, Snackbar, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import InventoryIcon from '@mui/icons-material/Inventory'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AppDeleteConfirmDialog from '../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog'
import TruckLoadsList from './TruckLoadsList'

export default function TruckCard({ truck, onEdit }: TruckCardProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)
    const [currentTruck, setCurrentTruck] = useState<ITruck>(null)
    const { removeTruck } = useActions()

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const сloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

    const onDeleteTruck = async () => {
        try {
            setSnackBarState(null)
            removeTruck(truck.id)
        } catch (error) {
            setSnackBarState({ message: error.message || "Unable to delete the truck.", severity: "error" })
        }
    }

    return (
        <div style={{ display: "flex", padding: "15px 0" }}>
            {/* Avatar */}
            <div style={{ flexBasis: "24px", flexShrink: 0 }}>
                {
                    truck.avatar ?
                        <Avatar
                            alt="Avatar"
                            src={(process.env.NODE_ENV === "production" ?
                                process.env.REACT_APP_BASE_API_URL_PROD :
                                process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + truck.avatar}
                        />
                        :
                        <Avatar sx={{ bgcolor: "var(--blue)", color: "white" }}>{truck.name.charAt(0)}</Avatar>
                }
            </div>
            {/* Card Content */}
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" sx={{ flexGrow: 1, margin: "0 10px" }}>
                <span className='text-14' style={{fontWeight: "bold"}}>{truck.name}</span>
                <span className='text-14' style={{fontWeight: "bold"}}>{truck.licensePlate}</span>
                <span className='text-12'>{Equipment[truck.equipment]} / {TruckStatus[truck.truckStatus]} / ${truck.costPerMile}/mi</span>
                {
                    truck.drivers.length > 0 && 
                    <div>
                        { truck.drivers.map(driver => 
                        <div key={driver.id} style={{display: 'flex'}}>
                            <Avatar 
                                src={(process.env.NODE_ENV === "production" ?
                                    process.env.REACT_APP_BASE_API_URL_PROD :
                                    process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + driver.avatar}
                                sx={{ width: 18, height: 18, fontSize: 12, backgroundColor: 'var(--blue)', margin: '1px 3px' }}
                            >
                                {driver.firstName.charAt(0) + driver.lastName.charAt(0)}
                            </Avatar> 
                            <span className='text-12' style={{margin: "1px 5px"}}>{driver.firstName + " " + driver.lastName}</span>
                        </div>
                        )}
                    </div>
                }
            </Grid>
            {/* Menu */}
            <Box sx={{ flexBasis: { xs: "24px", sm: "140px" }, flexShrink: 0 }}>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'right', justifyContent: "end" }}>
                    <Tooltip title="Loads list" placement="top">
                        <InventoryIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--green)" } }} 
                            onClick={() => setCurrentTruck(truck)} />
                    </Tooltip>
                    <Divider orientation="vertical" flexItem />
                    <Tooltip title="Edit" placement="top">
                        <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--yellow)" } }} onClick={() => onEdit(truck)} />
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
                    <Menu sx={{ mt: '45px' }} id="menu-appbar"
                        anchorEl={anchorEl} keepMounted transformOrigin={{vertical: 'top', horizontal: 'right'}}
                        open={Boolean(anchorEl)} onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={() => setCurrentTruck(truck)}>
                                <InventoryIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)' }} />
                                <span className='text-16'>Loads List</span>
                            </Grid>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={() => onEdit(truck)}>
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
                confirmDialogOpen &&
                <AppDeleteConfirmDialog
                    message={`The truck ${truck.name} will be deleted permanently with all asigned loads. Please confirm.`}
                    onCancel={() => setConfirmDialogOpen(false)}
                    onDelete={onDeleteTruck}
                />
            }
            <Snackbar
                open={snackBarState !== null}
                autoHideDuration={4000}
                onClose={сloseSnackbar}
            >
                <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>
            {currentTruck && <TruckLoadsList truck={truck} onClose={() => setCurrentTruck(null)} />}
        </div>
    )
}