import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RouteNames } from '../../../routing'
import { ISnackBarMessageState } from '../../../types/common/snackBarMessageState'
import { InvoiceCardProps } from './types'
import { useActions } from '../../../hooks/useActions'
import { partialUpdateInvoiceAxios, removeInvoiceAxios } from '../../../api/invoice'
import { Alert, Box, Divider, Grid, IconButton, Menu, MenuItem, Snackbar, Tooltip } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined'
import RemoveDoneIcon from '@mui/icons-material/RemoveDone'
import AppDeleteConfirmDialog from '../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog'

export default function InvoiceCard({ invoice }: InvoiceCardProps) {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const { removeInvoice, updateInvoiceIsRead } = useActions()
    const navigate = useNavigate()

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget)
    const handleClose = () => setAnchorElUser(null)

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

    const onPreview = async () => {
        try {
            if (!invoice.isRead) {
                const updatedInvoice = await partialUpdateInvoiceAxios(invoice.id, { op: "replace", path: "/IsRead", value: true })
                updateInvoiceIsRead(updatedInvoice)
            }
            navigate(RouteNames.INVOICES + "/" + invoice.id)
        } catch (error) {
            setSnackBarState({ message: "Unable to preview the invoice.", severity: "error" })
        }
    }

    const onDelete = async () => {
        try {
            setLoadingState(true)
            setSnackBarState(null)
            await removeInvoiceAxios(invoice.id)
            removeInvoice(invoice)
        } catch (error) {
            setSnackBarState({ message: "Unable to remove invoice.", severity: "error" })
        } finally {
            setLoadingState(false)
        }
    }

    return (
        <div style={{ display: "flex", padding: "15px 0" }}>
            {/* Header Icon */}
            <div style={{ flexBasis: "24px", flexShrink: 0 }}>
                <ImageOutlinedIcon fontSize='large' sx={{ fill: 'var(--lightGrey)' }} />
            </div>
            {/* Card Content */}
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" sx={{ flexGrow: 1, margin: "0 10px" }}>
                <span className='text-16' style={{ fontWeight: invoice.isRead ? 600 : 800 }}>{invoice.invoiceTo}</span>
                <span className='text-16' style={{ fontWeight: invoice.isRead ? 600 : 800 }}>
                    {invoice.item}, {invoice.quantity} month(s)
                </span>
                <span className='text-14' style={{ fontWeight: invoice.isRead ? 600 : 800 }}>
                    Invoice No: {invoice.invoiceNo} Total: ${invoice.total.toFixed(2)}
                </span>
                <span className='text-12' style={{ fontWeight: invoice.isRead ? 600 : 800 }}>
                    Created: {(new Date(invoice.createdAt.toString() + "Z")).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})}
                </span>
                <Grid item sx={{ display: 'flex' }}>
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap='15px'>
                        <span className='text-12' style={{ fontWeight: invoice.isRead ? 600 : 800 }}>
                            Paid:
                        </span>
                        {
                            invoice.isPaid ?
                                <DoneAllIcon fontSize='small' sx={{ fill: '#2e7d32' }} /> :
                                <RemoveDoneIcon fontSize='small' sx={{ fill: 'var(--red)' }} />
                        }
                    </Grid>
                </Grid>
            </Grid>
            {/* Menu */}
            <Box sx={{ flexBasis: { xs: "24px", sm: "70px" }, flexShrink: 0 }}>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'right', justifyContent: "end" }}>
                    {loadingState && <CircularProgress size="1rem" sx={{ m: '4px 10px 0 0' }} />}
                    <Tooltip title='Preview & Print' placement="top">
                        <PreviewOutlinedIcon
                            sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--green)"} }}
                            onClick={onPreview}
                        />
                    </Tooltip>
                    <Divider orientation="vertical" flexItem />
                    <Tooltip title="Remove" placement="top">
                        <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--red)"} }} onClick={() => setConfirmDialogOpen(true)} />
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
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={onPreview}>
                                <PreviewOutlinedIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)' }} />
                                <span className='text-16'>Preview & Print</span>
                            </Grid>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={onDelete}>
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
                        onCancel={() => setConfirmDialogOpen(false)} 
                        onDelete={onDelete}
                        message={`The invoice #${invoice.invoiceNo} will be deleted permanently. Please confirm.`}
                    />
            }
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
