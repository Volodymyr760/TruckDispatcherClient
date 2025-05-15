import { useState } from 'react'
import { useActions } from '../../../hooks/useActions'
import { AccountStatus } from '../../../types/user'
import { ISnackBarMessageState } from '../../../types/common/snackBarMessageState'
import { UserCardProps } from './types'
import { createNotificationAxios } from '../../../api/notification'
import { removeUserAxios } from '../../../api/user'
import { Alert, Avatar, Box, Divider, Grid, IconButton, Menu, MenuItem, Snackbar, Tooltip } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined'
import AppDeleteConfirmDialog from '../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog'

export default function UserCard({ user, onEditAccount, onManageUser }: UserCardProps) {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const { removeUserAccount } = useActions()

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget)

    const handleClose = () => setAnchorElUser(null)

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

    const onSendWarning = async (text: string) => {
        const notification = {
            senderAvatarUrl: null,
            senderFullName: "DoYourForm",
            message: text,
            isRead: false,
            callBackUrl: "",
            createdAt: new Date(new Date().toUTCString()),
            recipientId: user.id,
            recipientEmail: user.email
        }
        try {
            setLoadingState(true)
            setSnackBarState(null)
            await createNotificationAxios(notification)
            setSnackBarState({ message: "Warning has been sent.", severity: "success" })
        } catch (error) {
            setSnackBarState({ message: error.message || 'Unable to send the warning.', severity: "error" })
        } finally {
            setLoadingState(false)
        }
    }

    const onDeleteUser = async () => {
        try {
            setLoadingState(true)
            setSnackBarState(null)
            await removeUserAxios(user.id)
            removeUserAccount(user)
        } catch (error) {
            setSnackBarState({ message: error.message || "Unable to remove user", severity: "error" })
        } finally {
            setLoadingState(false)
        }
    }

    return (
        <div style={{ display: "flex", padding: "15px 0" }}>
            <div style={{ flexBasis: "24px", flexShrink: 0 }}>
                {
                    user.avatar ?
                        <Avatar
                            alt="Avatar"
                            src={(process.env.NODE_ENV === "production" ?
                                process.env.REACT_APP_BASE_API_URL_PROD :
                                process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + user.avatar}
                        />
                        :
                        <Avatar sx={{ bgcolor: "green", color: "white" }}>{user.firstName.charAt(0) + user.lastName.charAt(0)}</Avatar>
                }
            </div>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" sx={{ flexGrow: 1, margin: "0 10px", width: { xs: "140px" } }}>
                <span className='text-14' style={{fontWeight: 800}}>{user.firstName + " " + user.lastName}</span>
                <span className='text-14'>User Id: {user.id}</span>
                <span className='text-14'>{user.email}</span>
                <span className='text-14'>Account Status: {AccountStatus[user.accountStatus]}</span>
                <span className='text-12'>
                    Start Payed: {
                        user.startPayedPeriodDate.toString().includes('Z') ?
                        new Date(user.startPayedPeriodDate.toString()).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"}) :
                        new Date(user.startPayedPeriodDate.toString() + "Z").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})
                    }
                </span>
                <span className='text-12' style={{
                    color: new Date() > new Date(user.finishPayedPeriodDate) ? '#d32f2f' : 'var(--darkGrey)',
                    fontWeight: new Date() > new Date(user.finishPayedPeriodDate) && 'bold'
                }}>
                    Finish Payed: {new Date(user.finishPayedPeriodDate.toString() + "Z").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})}
                </span>
                <span className='text-12'>
                    Last Login: {new Date(user.lastLoginDate.toString() + "Z").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})}
                </span>
            </Grid>
            <Box sx={{ flexBasis: { xs: "24px", sm: "140px" }, flexShrink: 0 }}>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'right', justifyContent: "end" }}>
                    {loadingState && <CircularProgress size="1rem" sx={{ m: '4px 10px 0 0' }} />}
                    <Tooltip title="Finish Date Warning" placement="top">
                        <ReportGmailerrorredOutlinedIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--blue)' }}
                            onClick={() => onSendWarning(
                                "Your price plan expires in 3 days and information that exceeds usage limits may be deleted. " +
                                "Please order an extension of the price plan or check whether critical data will be deleted"
                            )} />
                    </Tooltip>
                    <Divider orientation="vertical" flexItem />
                    <Tooltip title="Last Login Warning" placement="top">
                        <ReportGmailerrorredOutlinedIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--red)' }}
                            onClick={() => onSendWarning(
                                "We noticed that your account has been inactive for 1 year and according to our policies, the account will be deleted with all associated data. " +
                                "To continue using the site, please log in to your account within 3 days"
                            )} />
                    </Tooltip>
                    <Divider orientation="vertical" flexItem />
                    <Tooltip title="Edit Account" placement="top">
                        <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--yellow)' }} onClick={() => onEditAccount(user)} />
                    </Tooltip>                        
                    <Divider orientation="vertical" flexItem />
                    <Tooltip title='Manage User' placement="top">
                        <ManageAccountsOutlinedIcon
                            sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--green)' }}
                            onClick={() => onManageUser(user)}
                        />
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
                    <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} keepMounted
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorElUser)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px"
                                onClick={() => onSendWarning(
                                    "Your price plan expires in 3 days and information that exceeds usage limits may be deleted. " +
                                    "Please order an extension of the price plan or check whether critical data will be deleted"
                                )}>
                                <ReportGmailerrorredOutlinedIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--blue)' }} />
                                <span className='text-16'>Finish Date Warning</span>
                            </Grid>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px"
                                onClick={() => onSendWarning(
                                    "We noticed that your account has been inactive for 1 year and according to our policies, the account will be deleted with all associated data. " +
                                    "To continue using the site, please log in to your account within 3 days"
                                )}>
                                <ReportGmailerrorredOutlinedIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--red)' }} />
                                <span className='text-16'>Last Login Warning</span>
                            </Grid>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={() => onManageUser(user)}>
                                <ManageAccountsOutlinedIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--green)' }} />
                                <span className='text-16'>Manage user</span>
                            </Grid>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={() => onEditAccount(user)}>
                                <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--yellow)' }} />
                                <span className='text-16'>Edit Account</span>
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
            {confirmDialogOpen && <AppDeleteConfirmDialog onCancel={() => setConfirmDialogOpen(false)} onDelete={() => onDeleteUser()} />}
            <Snackbar
                open={snackBarState !== null}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
            >
                <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>
        </div>
    )
}