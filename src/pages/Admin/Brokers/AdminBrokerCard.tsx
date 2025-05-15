import { useState } from 'react'
import { useActions } from '../../../hooks/useActions'
import { BrokerCardProps } from './types'
import { deleteBrokerAxios } from '../../../api/broker'
import { Avatar, Box, Divider, Grid, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AppDeleteConfirmDialog from '../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog'

export default function AdminbrokerCard({ broker, onEdit }: BrokerCardProps): JSX.Element {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const { removeBroker } = useActions()
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const onDeletebroker = async () => {
        setLoadingState(true)
        await deleteBrokerAxios(broker.id)
        removeBroker(broker.id)
        setLoadingState(false)
    }

    return (
        <div style={{ display: "flex", padding: "15px 0" }}>
            <div style={{ flexBasis: "24px", flexShrink: 0 }}>
                {
                    broker.logo ?
                        <Avatar alt="Logo"
                            src={(process.env.NODE_ENV === "production" ?
                                process.env.REACT_APP_BASE_API_URL_PROD :
                                process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + broker.logo}
                        />
                        :
                        <Avatar sx={{ bgcolor: "var(--blue)", color: "white" }}>{broker.name.charAt(0)}</Avatar>
                }
            </div>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" sx={{ flexGrow: 1, margin: "0 10px" }}>
                <span className='text-14' style={{fontWeight: 800}}>{broker.name}</span>
                <span className='text-14'>Parser: {broker.parserName}</span>
                <span className='text-14'>{broker.shortName}</span>
                <span className='text-14'>DOT: {broker.dotNumber} MC: {broker.mcNumber}</span>
                <span className='text-14'>{broker.phone}</span>
                <span className='text-14'>{broker.email}</span>
            </Grid>
            <Box sx={{ flexBasis: { xs: "24px", sm: "140px" }, flexShrink: 0 }}>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'right', justifyContent: "end" }}>
                    {loadingState && <CircularProgress size="1rem" sx={{ m: '4px 10px 0 0' }} />}
                    <Tooltip title="Edit" placement="top">
                        <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--yellow)' }} onClick={() => onEdit(broker)} />
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
                    <Menu sx={{ mt: '45px' }} id="menu-appbar"
                        anchorEl={anchorEl} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorEl)} onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={() => onEdit(broker)}>
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
                    message={`The broker ${broker.name} will be deleted permanently. Please confirm.`}
                    onCancel={() => setConfirmDialogOpen(false)}
                    onDelete={onDeletebroker}
                />
            }
        </div>
    )
}