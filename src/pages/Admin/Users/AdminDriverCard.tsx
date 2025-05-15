import { useState } from 'react'
import { AdminDriverCardProps } from './types'
import { ISnackBarMessageState } from '../../../types/common/snackBarMessageState'
import { deleteDriverAxios } from '../../../api/driver'
import { Alert, Avatar, Box, Grid, IconButton, Menu, MenuItem, Snackbar, Tooltip } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AppDeleteConfirmDialog from '../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog'

export default function AdminDriverCard({ driver, onDelete }: AdminDriverCardProps) {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)

    const handleHidenMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget)

    const handleHidenMenuClose = () => setAnchorElUser(null)

    const сloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

    const removeDriver = async () => {
        try {
            setLoadingState(true)
            setSnackBarState(null)
            await deleteDriverAxios(driver.id)
            onDelete(driver)
        } catch (error) {
            setSnackBarState({ message: error.message || "Unable to delete the driver.", severity: "error" })
        } finally {
            setLoadingState(false)
        }
    }

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px' sx={{ minHeight: '56px', margin: '5px 0' }}>
            <Grid item>
                <Grid container justifyContent="flex-start" alignItems="center" gap='10px'>
                    <Grid item>
                        {
                            driver.avatar ?
                                <Avatar
                                    alt="Avatar"
                                    src={(process.env.NODE_ENV === "production" ?
                                        process.env.REACT_APP_BASE_API_URL_PROD :
                                        process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + driver.avatar
                                    }
                                />
                                :
                                <Avatar sx={{ bgcolor: "#158f7d", color: "#f5f5f5" }}>{driver.firstName.charAt(0) + driver.lastName.charAt(0)}</Avatar>
                        }
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" justifyContent="space-between" alignItems="flex-start" sx={{
                            width: { xs: "70px", sm: "230px", md: "370px", lg: "700px" }
                        }}>
                            <Grid item>
                                <span className='test-16'>{driver.firstName + " " + driver.lastName}</span>
                            </Grid>
                            <Grid item>
                                <span className='text-12'>Email: {driver.email}</span>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Box className="table-actions" sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                    {loadingState && <CircularProgress size="1rem" sx={{ m: '4px 10px 0 0' }} />}
                    <Tooltip title="Remove" placement="top">
                        <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--red)' }} onClick={() => setConfirmDialogOpen(true)} />
                    </Tooltip>                        
                </Box>
                {/* Hiden burger menu */}
                <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                    <Tooltip title="Actions">
                        <IconButton onClick={handleHidenMenuOpen} sx={{ p: 0 }}>
                            <MoreVertIcon sx={{ color: "var(--darkGrey)" }} />
                        </IconButton>
                    </Tooltip>
                    <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} keepMounted
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorElUser)}
                        onClose={handleHidenMenuClose}
                    >
                        <MenuItem onClick={handleHidenMenuClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={() => setConfirmDialogOpen(true)}>
                                <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--red)' }} />
                                <span className='text-16'>Remove</span>
                            </Grid>
                        </MenuItem>
                    </Menu>
                </Box>
            </Grid>
            {confirmDialogOpen && <AppDeleteConfirmDialog onCancel={() => setConfirmDialogOpen(false)} onDelete={removeDriver} />}
            <Snackbar
                open={snackBarState !== null}
                autoHideDuration={4000}
                onClose={сloseSnackbar}
            >
                <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>
        </Grid>
    )
}