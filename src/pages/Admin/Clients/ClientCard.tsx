import { useState } from 'react'
import { useActions } from '../../../hooks/useActions'
import { AppRoles } from '../../../types/common/appRoles'
import { ClientCardProps } from './types'
import { ClientStatus } from '../../../types/client'
import { deleteClientAxios, getSendInvitationAxios } from '../../../api/client'
import { Avatar, Box, Divider, Grid, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined'
import AppDeleteConfirmDialog from '../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog'

export default function ClientCard({ client, onEdit }: ClientCardProps): JSX.Element {
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const { removeClient, inviteClientCarrier, setClientError } = useActions()
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)
    
    const onInvite = async () => {
        try {
            setLoadingState(true)
            const invitedClient = await getSendInvitationAxios(client.id)
            inviteClientCarrier(invitedClient)
        } catch (error) {
            setClientError(error.message || "Error while inviting the client.")
        } finally {
            setLoadingState(false)
        }
    }

    const onDeleteClient = async () => {
        try {
            setLoadingState(true)
            await deleteClientAxios(client.id)
            removeClient(client.id)
        } catch (error) {
            setClientError(error.message || "Error while removing the client.")
        } finally {
            setLoadingState(false)
        }
    }

    return (
        <div style={{ display: "flex", padding: "15px 0" }}>
            <div style={{ flexBasis: "24px", flexShrink: 0 }}>
                <Avatar sx={{ bgcolor: "var(--blue)", color: "white" }}>{client.name.charAt(0)}</Avatar>
            </div>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" sx={{ flexGrow: 1, margin: "0 10px" }}>
                <span className='text-14' style={{fontWeight: 800}}>{client.name} - {ClientStatus[client.clientStatus]}</span>
                <span className='text-14'>Location: {client.city}</span>
                <span className='text-14'>{client.email}</span>
                <span className='text-14'>DOT: {client.dotNumber}</span>
                <span className='text-14'>Time Zone Shift: {client.timeZoneShift}</span>
                <span className='text-14'>Role: {AppRoles[client.appRoles]}</span>
                <span className='text-14'>Created At: {
                        client.createdAt.toString().includes("Z") ?
                        new Date(client.createdAt).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"}) :
                        new Date(client.createdAt.toString() + "Z").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})
                    }
                </span>
                <span className='text-14'>Invited At: {
                        client.invitedAt ? 
                            client.invitedAt.toString().includes("Z") ?
                                new Date(client.invitedAt).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"}) :
                                new Date(client.invitedAt.toString() + "Z").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"}) :
                        "Not invited yet"
                    }
                </span>
            </Grid>
            <Box sx={{ flexBasis: { xs: "24px", sm: "140px" }, flexShrink: 0 }}>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'right', justifyContent: "end" }}>
                    {loadingState && <CircularProgress size="1rem" sx={{ m: '4px 10px 0 0' }} />}
                    {
                        client.clientStatus !== ClientStatus.Invited &&
                        <Tooltip title="Invite Carrier" placement="top">
                            <ReportGmailerrorredOutlinedIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--blue)' }}
                                onClick={() => onInvite()} />
                        </Tooltip>
                    }
                    {client.clientStatus !== ClientStatus.Invited && <Divider orientation="vertical" flexItem />}
                    <Tooltip title="Edit" placement="top">
                        <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--yellow)' }} onClick={() => onEdit(client)} />
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
                        {
                            client.clientStatus !== ClientStatus.Invited &&
                            <MenuItem onClick={handleClose}>
                                <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px"
                                    onClick={() => onInvite()}>
                                    <ReportGmailerrorredOutlinedIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--blue)' }} />
                                    <span className='text-16'>Invite Carrier</span>
                                </Grid>
                            </MenuItem>
                        }
                        <MenuItem onClick={handleClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={() => onEdit(client)}>
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
                    message={`The client ${client.name} will be deleted permanently. Please confirm.`}
                    onCancel={() => setConfirmDialogOpen(false)}
                    onDelete={onDeleteClient}
                />
            }
        </div>
    )
}