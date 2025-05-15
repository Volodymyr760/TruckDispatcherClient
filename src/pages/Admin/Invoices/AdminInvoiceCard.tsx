import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../../../routing';
import { InvoiceCardProps } from '../../Carrier/Billing/types';
import { ISnackBarMessageState } from '../../../types/common/snackBarMessageState';
import { useActions } from '../../../hooks/useActions';
import { partialUpdateInvoiceAxios, removeInvoiceAxios } from '../../../api/invoice';
import { Alert, Box, Divider, Grid, IconButton, Menu, MenuItem, Snackbar, Tooltip } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import AppDeleteConfirmDialog from '../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog';

export default function AdminInvoiceCard({ invoice }: InvoiceCardProps) {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null);
    const [loadingState, setLoadingState] = useState<boolean>(false);
    const { updateInvoiceIsPaid, removeInvoice } = useActions();
    const navigate = useNavigate();

    const handleHidenMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
    const handleHidenMenuClose = () => setAnchorElUser(null);

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackBarState(null);
    };

    const onMarkPaidInvoice = async () => {
        try {
            setLoadingState(true);
            setSnackBarState(null);
            const updatedInvoice = await partialUpdateInvoiceAxios(invoice.id, { op: "replace", path: "/IsPaid", value: !invoice.isPaid })
            updateInvoiceIsPaid(updatedInvoice);
            setSnackBarState({ message: "Updated.", severity: "success" });
        } catch (error) {
            setSnackBarState({ message: "Error while updating the isPaid status of the invoice.", severity: "error" });
        } finally {
            setLoadingState(false);
        }
    }

    const onDeleteInvoice = async () => {
        try {
            setLoadingState(true);
            setSnackBarState(null);
            await removeInvoiceAxios(invoice.id);
            removeInvoice(invoice);
        } catch (error) {
            setSnackBarState({ message: "Unable to remove invoice.", severity: "error" });
        } finally {
            setLoadingState(false);
        }
    }

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px' sx={{ minHeight: '56px', margin: '15px 0' }}>
            <Grid item>
                <Grid container justifyContent="flex-start" alignItems="center" gap='10px'>
                    <ImageOutlinedIcon fontSize='large' sx={{ fill: 'var(--lightGrey)' }} />
                    <Grid item>
                        <Grid container direction="column" justifyContent="space-between" alignItems="flex-start">
                            <Grid item sx={{ height: "24px", overflow: "hidden", width: { xs: "150px", sm: "330px", md: "370px", lg: "700px" } }}
                            >
                                <span className='text-16' style={{ fontWeight: invoice.isRead ? 600 : 800 }}>{invoice.invoiceTo}</span>
                            </Grid>
                            <span className='text-14' style={{ fontWeight: invoice.isRead ? 600 : 800 }}>{invoice.item}, {invoice.quantity} month(s)</span>
                            <span className='text-14' style={{ fontWeight: invoice.isRead ? 600 : 800 }}>Invoice No: {invoice.invoiceNo}</span>
                            <span className='text-14' style={{ fontWeight: invoice.isRead ? 600 : 800 }}>Total: ${invoice.total.toFixed(2)}</span>
                            <Grid item sx={{ display: 'flex' }}>
                                <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap='15px' >
                                    <span className='text-14' style={{ fontWeight: invoice.isRead ? 600 : 800 }}>Paid:</span>
                                    {
                                        invoice.isPaid ?
                                            <DoneAllIcon fontSize='small' sx={{ fill: 'var(--green)', height: "16px" }} /> :
                                            <RemoveDoneIcon fontSize='small' sx={{ fill: 'var(--red)', height: "16px" }} />
                                    }
                                </Grid>
                            </Grid>
                            <span className='text-12' style={{ fontWeight: invoice.isRead ? 400 : 800 }}>
                                Created: {new Date(invoice.createdAt.toString() + "Z").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})}
                            </span>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Box className="table-actions" sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                    {loadingState && <CircularProgress size="1rem" sx={{ m: '4px 10px 0 0' }} />}
                    <Tooltip title={invoice.isPaid ? 'Mark as unpaid' : 'Mark as paid'} placement="top">
                        <MarkChatReadOutlinedIcon
                            sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--green)' }}
                            onClick={onMarkPaidInvoice} />
                    </Tooltip>
                    <Divider orientation="vertical" flexItem />
                    <Tooltip title='Preview' placement="top">
                        <PreviewOutlinedIcon
                            sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--green)' }}
                            onClick={() => navigate(RouteNames.INVOICES + "/" + invoice.id)}
                        />
                    </Tooltip>
                    <Divider orientation="vertical" flexItem />
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
                    <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorElUser)} onClose={handleHidenMenuClose}
                    >
                        <MenuItem onClick={handleHidenMenuClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={onMarkPaidInvoice}>
                                <MarkChatReadOutlinedIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--green)' }} />
                                <span className='text-16'>{invoice.isPaid ? 'Mark as unpaid' : 'Mark as paid'}</span>
                            </Grid>
                        </MenuItem>
                        <MenuItem onClick={handleHidenMenuClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={() => navigate(RouteNames.INVOICES + "/" + invoice.id)}>
                                <PreviewOutlinedIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--green)' }} />
                                <span className='text-16'>Preview</span>
                            </Grid>
                        </MenuItem>
                        <MenuItem onClick={handleHidenMenuClose}>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap="10px" onClick={() => setConfirmDialogOpen(true)}>
                                <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--red)' }} />
                                <span className='text-16'>Remove</span>
                            </Grid>
                        </MenuItem>
                    </Menu>
                </Box>
            </Grid>
            {confirmDialogOpen && <AppDeleteConfirmDialog onCancel={() => setConfirmDialogOpen(false)} onDelete={onDeleteInvoice} />}
            <Snackbar
                open={snackBarState !== null}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
            >
                <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>
        </Grid>
    )
}
