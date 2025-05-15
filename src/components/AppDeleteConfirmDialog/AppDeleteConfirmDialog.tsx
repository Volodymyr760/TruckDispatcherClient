import { useState } from 'react'
import { IAppDeleteConfirmDialogProps } from './types'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import MuiButton from '../Button/MuiButton'

export default function AppDeleteConfirmDialog({ message, onCancel, onDelete }: IAppDeleteConfirmDialogProps) {
    const [open, setOpen] = useState(true)

    const onCloseHandler = () => {
        setOpen(false)
        onCancel()
    };

    const onDeleteHandler = () => {
        onDelete()
        onCloseHandler()
    };

    return (
        <Dialog
            open={open}
            onClose={onCloseHandler}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <CloseIcon
                sx={{ cursor: 'pointer', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--red)" }, position: "absolute", top: "15px", right: "15px" }}
                onClick={onCloseHandler}
            />
            <span className='text-20' style={{padding: "16px 24px", fontWeight: 600}}>Delete Confirmation.</span>
            <p style={{margin: "0", padding: "20px 24px"}}>
                {message || "This entity will be deleted permanently. Please confirm."}
            </p>
            <DialogActions sx={{ padding: "20px" }}>
                <MuiButton variant='contained' onClickHandler={onCloseHandler}>
                    <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Cancel</span>
                </MuiButton>                
                <MuiButton variant='contained' color='error' onClickHandler={onDeleteHandler}>
                    <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Confirm</span>
                </MuiButton>
            </DialogActions>
        </Dialog>
    )
}
