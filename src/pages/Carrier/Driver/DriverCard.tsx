import { useState } from 'react'
import { useActions } from '../../../hooks/useActions'
import { TruckStatus } from '../../../types/truck'
import { Equipment } from '../../../types/common/equipment'
import { DriverCardProps } from './types'
import { deleteDriverAxios } from '../../../api/driver'
import { Avatar, Box, Divider, Grid, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import CallIcon from '@mui/icons-material/Call'
import CircularProgress from '@mui/material/CircularProgress'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AppDeleteConfirmDialog from '../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog'

export default function DriverCard({ driver, onEdit }: DriverCardProps): JSX.Element {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const { removeDriver } = useActions()
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const onDeleteDriver = async () => {
        setLoadingState(true)
        await deleteDriverAxios(driver.id)
        removeDriver(driver.id)
        setLoadingState(false)
    }

    return (
        <div style={{ display: "flex", padding: "15px 0" }}>
            {/* Avatar */}
            <div style={{ flexBasis: "24px", flexShrink: 0 }}>
                {
                    driver.avatar ?
                        <Avatar alt="Avatar"
                            src={(process.env.NODE_ENV === "production" ?
                                process.env.REACT_APP_BASE_API_URL_PROD :
                                process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + driver.avatar}
                        />
                        :
                        <Avatar sx={{ bgcolor: "var(--blue)", color: "white" }}>{driver.firstName.charAt(0) + driver.lastName.charAt(0)}</Avatar>
                }
            </div>
            {/* Card Content */}
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" sx={{ flexGrow: 1, margin: "0 10px" }}>
                <span className='text-14' style={{fontWeight: 800}}>{driver.firstName + " " + driver.lastName}</span>
                <span className='text-14'>{driver.phone}</span>
                <span className='text-14'>{driver.email}</span>
                {
                    driver.truck && 
                    <div style={{display: 'flex'}}>
                        {
                            driver.truck.avatar ?
                            <Avatar 
                                src={(process.env.NODE_ENV === "production" ?
                                    process.env.REACT_APP_BASE_API_URL_PROD :
                                    process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + driver.truck.avatar}
                                sx={{ width: 18, height: 18, fontSize: 12, backgroundColor: 'var(--blue)', margin: '1px 3px' }}
                            >
                                {driver.truck.name.charAt(0)}
                            </Avatar> :
                            <Avatar sx={{ width: 18, height: 18, fontSize: 12, bgcolor: "var(--blue)", color: "white" }}>{driver.truck.name.charAt(0)}</Avatar>
                        } 
                        <span className='text-14' style={{margin: "1px 5px"}}>{driver.truck.name + " " + driver.truck.licensePlate}</span>
                    </div>
                }
                {
                    driver.truck && 
                    <div style={{display: 'flex'}}>
                        <LocalShippingIcon sx={{ width: 18, height: 18, margin: '1px 3px', fill: 'var(--lightGrey)' }}/> 
                        <span className='text-14'>{Equipment[driver.truck.equipment]} / {TruckStatus[driver.truck.truckStatus]}</span>
                    </div>
                }
            </Grid>
            {/* Menu */}
            <Box sx={{ flexBasis: { xs: "24px", sm: "140px" }, flexShrink: 0 }}>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'right', justifyContent: "end" }}>
                    {loadingState && <CircularProgress size="1rem" sx={{ m: '4px 10px 0 0' }} />}
                    <Tooltip title="Send email" placement="top">
                        <a href={`mailto:${driver.email}`} >
                            <MailOutlineIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--green)" } }} />
                        </a>
                    </Tooltip>
                    <Divider orientation="vertical" flexItem />
                    <div style={{ display: "flex" }}>
                        <div style={{ margin: '0 5px' }}>
                            <a href={`tel:${driver.phone}`} >
                                <Tooltip title="Call" placement="top">
                                    <CallIcon sx={{ cursor: 'pointer', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--green)" } }} />
                                </Tooltip>
                            </a>
                        </div>
                        <Divider orientation="vertical" flexItem />
                    </div>
                    <Tooltip title="Edit" placement="top">
                        <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--yellow)" } }} onClick={() => onEdit(driver)} />
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
                        anchorEl={anchorEl} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorEl)} onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <a href={`mailto:${driver.email}`} style={{ textDecoration: 'none', color: 'rgb(32,33,36)' }} >
                                <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px">
                                    <MailOutlineIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)' }} />
                                    <span className='text-16'>Send email</span>
                                </Grid>
                            </a>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <a href={`tel:${driver.phone}`} style={{ textDecoration: 'none', color: 'rgb(32,33,36)' }} >
                                <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px">
                                    <CallIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)' }} />
                                    <span className='text-16'>Call</span>
                                </Grid>
                            </a>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={() => onEdit(driver)}>
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
                    message={`The driver ${driver.firstName} ${driver.lastName} will be deleted permanently. Please confirm.`}
                    onCancel={() => setConfirmDialogOpen(false)}
                    onDelete={onDeleteDriver}
                />
            }
        </div>
    )
}