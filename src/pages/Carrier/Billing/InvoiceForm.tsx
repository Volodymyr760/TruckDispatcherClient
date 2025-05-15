import { useState } from "react"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { InvoiceFormProps } from "./types"
import { CreateInvoiceDto } from "../../../types/invoice"
import { createInvoiceAxios } from "../../../api/invoice"
import { TextField, Modal, Box, Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress'
import CloseIcon from '@mui/icons-material/Close'
import MuiButton from "../../../components/Button/MuiButton"
import ErrorMessage from "../../../components/Messages/ErrorMessage"

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    maxHeight: '80%',
    display: 'block',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    minWidth: '20rem',
    width: '80%',
    maxWidth: '60rem'
};

export default function InvoiceForm({ pricepackage, onClose }: InvoiceFormProps) {
    const { auth } = useTypedSelector(state => state.auth)
    const { createInvoice } = useActions()
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [errorState, setErrorState] = useState<null | string>(null)
    const [invoiceTo, setInvoiceTo] = useState<string>(auth.user.firstName + " " + auth.user.lastName)
    const [duration, setDuration] = useState("1")
    const [note, setNote] = useState<string | null>(null)

    const onGetInvoice = async () => {
        const createInvoiceDto: CreateInvoiceDto = {
            invoiceTo: invoiceTo,
            item: pricepackage.name,
            quantity: Number.parseInt(duration),
            price: pricepackage.price,
            notes: note
        }
        try {
            setLoadingState(true)
            setErrorState(null)
            const createdInvoice = await createInvoiceAxios(createInvoiceDto)
            createInvoice(createdInvoice)
            onClose()
        } catch (error) {
            setErrorState("Unable to create the invoice.")
        } finally {
            setLoadingState(false)
        }
    }

    return (
        <Modal
            open={true}
            onClose={onClose}
        >
            <Box sx={style}>
                <CloseIcon
                    sx={{ cursor: 'pointer', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--red)" }, position: "absolute", top: "15px", right: "15px" }}
                    onClick={onClose}
                />
                <Grid container direction="column" justifyContent="center" spacing={2} sx={{ padding: '20px' }}>
                    <Grid item>
                        <Typography component='p' sx={{ fontSize: "20px", lineHeight: "28px", textAlign: "center" }}>
                            {pricepackage.name}
                        </Typography>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography component='span' sx={{ color: "#3b78e7", margin: "16px 0 22px", fontSize: "36px", lineHeight: "44px" }}>
                                ${pricepackage.price}
                            </Typography>
                            <Typography component='span' sx={{ fontSize: "14px", fontWeight: 700, lineHeight: "18px" }}>
                                &nbsp;per month
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Invoice To"
                            fullWidth
                            value={invoiceTo}
                            onChange={(e) => setInvoiceTo(e.target.value)}
                            error={invoiceTo.length === 0}
                            helperText={invoiceTo.length === 0 ? "Invoice to is a required field." : "Company name or your full name."}
                        />
                    </Grid>
                    <Grid item>
                        <FormControl sx={{ minWidth: 120, width: "100%" }}>
                            <InputLabel id="select-duration-label">Duration</InputLabel>
                            <Select
                                labelId="select-duration-label"
                                id="select-duration-helper"
                                value={duration}
                                label="Duration"
                                onChange={(e) => setDuration(e.target.value)}
                            >
                                <MenuItem value={1}>1 month</MenuItem>
                                <MenuItem value={3}>3 months</MenuItem>
                                <MenuItem value={6}>6 months</MenuItem>
                                <MenuItem value={9}>9 months</MenuItem>
                                <MenuItem value={12}>1 year</MenuItem>
                            </Select>
                            <FormHelperText>Price plan activates from payment date until the duration ends</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Notes"
                            fullWidth
                            multiline
                            rows={2}
                            type="text"
                            margin="normal"
                            onChange={(e) => setNote(e.target.value)}
                            helperText={"Add your wishes, for example, postpone the activation date to a later time."}
                        />
                    </Grid>
                    {errorState && <ErrorMessage appearance="small" >{errorState}</ErrorMessage>}
                    <Grid item sx={{ textAlign: 'right' }}>
                        <MuiButton variant="outlined" onClickHandler={onClose}>
                            Cancel
                        </MuiButton>&nbsp;&nbsp;
                        <MuiButton variant='contained' color='success' disabled={invoiceTo.length === 0} onClickHandler={onGetInvoice}>
                            {loadingState && <CircularProgress size="1rem" sx={{ mr: '10px' }} />} Get Invoice
                        </MuiButton>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}
