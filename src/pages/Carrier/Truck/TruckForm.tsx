import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import { useActions } from "../../../hooks/useActions"
import { isAppFileValid } from "../../../hooks/IsAppFileValid"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { TruckFormProps } from "./types"
import { removeImageAxios, uploadImageAxios } from "../../../api/image"
import { Alert, Button, Chip, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, InputLabel, 
    MenuItem, Radio, RadioGroup, Select, Snackbar, SwipeableDrawer, TextField, Tooltip } from "@mui/material"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined'
import CircularProgress from '@mui/material/CircularProgress'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import MuiButton from "../../../components/Button/MuiButton"
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import { ITruck, TruckStatus } from "../../../types/truck"
import { Equipment } from "../../../types/common/equipment"
import TruckDriverFormCard from "./TruckDriverFormCard"

export default function TruckForm({ truck, onClose }: TruckFormProps): JSX.Element {
    const { createTruck, updateTruck } = useActions()
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [errorState, setErrorState] = useState<null | string>(null)
    const equipments: Equipment[] = [Equipment.Flatbed, Equipment.Reefer, Equipment.Van]

    const [previewBlockVisible, setPreviewBlockVisible] = useState<boolean>(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [avatarSource, setAvatarSource] = useState<string | ArrayBuffer | null | Blob>(null)

    const [truckStatusState, setTruckStatusState] = useState<TruckStatus>(truck.truckStatus)

    useEffect(() => {
        if (truck.avatar) {
            setAvatarSource((process.env.NODE_ENV === "production" ?
                process.env.REACT_APP_BASE_API_URL_PROD :
                process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + truck.avatar)
            setPreviewBlockVisible(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [truck.avatar])

    const onSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

    const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (!isAppFileValid(file)) {
                setSnackBarState({ message: "File is not valid", severity: "warning" });
                return;
            }
            setSelectedFile(file)
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => { setAvatarSource(reader.result) }
        }
        setPreviewBlockVisible(true)
    }

    const deleteHandler = () => {
        setSelectedFile(null)
        setAvatarSource(null)
        setPreviewBlockVisible(false)
    }
    
    const onTruckStatusChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch(event.target.value){
            case TruckStatus.OnRoad.toString():
                setTruckStatusState(TruckStatus.OnRoad)
                break
            case TruckStatus.Repair.toString():
                setTruckStatusState(TruckStatus.Repair)
                break
            default:
                setTruckStatusState(TruckStatus.Pending)
                break
        }
    };

    const toggleDrawer = (anchor: string, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (event && event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
            ) return
            if (!open) onClose()
        };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Required field.')
            .max(450, 'First name may not be greater than 450 characters.'),
        licensePlate: Yup.string()
            .required('Required field.')
            .max(450, 'Last name may not be greater than 450 characters.')
    })

    const defaultValues: ITruck = {
        id: truck.id,
        name: truck.name || '',
        licensePlate: truck.licensePlate || '',
        equipment: truck.equipment,
        costPerMile: truck.costPerMile || 0.5,
        avatar: truck.avatar || '',
        drivers: truck.drivers || [],
        loads: truck.loads || [],
        truckStatus: truck.truckStatus || TruckStatus.Pending,
        notes: truck.notes || "",
        userId: truck.userId,
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues
    })

    const onSubmit = async (truck: ITruck): Promise<void> => {
        try {
            truck.truckStatus = truckStatusState
            setLoadingState(true)
            setErrorState(null)
            if (truck.id) {
                if (truck.avatar && avatarSource === null) { //image file was deleted during editing the form
                    await removeImageAxios(truck.avatar)
                    truck.avatar = null
                }
                if (selectedFile) { // image file was updated so - remove old file and then upload new file:
                    if (truck.avatar) await removeImageAxios(truck.avatar)
                    const uploadedFile = await uploadImageAxios(selectedFile)
                    truck.avatar = uploadedFile.fileName
                }
                updateTruck(truck)
            } else {
                if (selectedFile) {
                    const uploadedFile = await uploadImageAxios(selectedFile)
                    truck.avatar = uploadedFile.fileName
                }
                createTruck(truck)
            }
            onCancelHandler()
        } catch (error) {
            setErrorState(error.message || "Unable to save the truck.")
        } finally {
            setLoadingState(false)
        }
    }

    const onCancelHandler = () => {
        reset()
        onClose()
    }
      
    return (
        <SwipeableDrawer open={true} anchor='right' transitionDuration={1500} sx={{ zIndex: 1202 }}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
        >
            <CloseIcon
                sx={{ cursor: 'pointer', fill: 'var(--lightGrey)', '&:hover': { fill: "red" }, position: "absolute", top: "5px", right: "15px" }}
                onClick={onCancelHandler}
            />
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '360px' }}>
                <Grid container direction={'column'} justifyContent="center" spacing={2} sx={{ padding: '20px' }}>
                    <Grid item> {/* Avatar */}
                        {previewBlockVisible ?
                            <div className='preview-wrapper'>
                                <img
                                    src={avatarSource && typeof (avatarSource) != undefined ?
                                        avatarSource.toString() :
                                        (process.env.NODE_ENV === "production" ?
                                            process.env.REACT_APP_BASE_API_URL_PROD :
                                            process.env.REACT_APP_BASE_API_URL_DEV) + "/Assets/default-avatar.png"
                                    }
                                    alt="Preview" className='preview-image'
                                />
                                <Grid container direction="row" justifyContent="space-around" alignItems="center">
                                    <Button variant="outlined" component="label" onClick={deleteHandler}
                                        style={{ textTransform: 'none', backgroundColor: 'transparent', boxShadow: 'none', borderRadius: "16px", margin: '0 3px' }}
                                    >
                                        <DeleteOutlinedIcon fontSize="small" sx={{ fill: 'var(--lightGrey)' }} />
                                        <span className="a-small-blue" style={{ margin: '2px 5px 0' }}>Delete</span>
                                    </Button>
                                    <Button variant="outlined" component="label"
                                        style={{ textTransform: 'none', backgroundColor: 'transparent', boxShadow: 'none', borderRadius: "16px", margin: '0 3px' }}
                                    >
                                        <EditOutlinedIcon fontSize="small" sx={{ fill: 'var(--lightGrey)' }} />
                                        <span className="a-small-blue" style={{ margin: '2px 5px 0' }}>Replace</span>
                                        <input type="file" hidden onChange={fileSelectedHandler} />
                                    </Button>
                                </Grid>
                            </div>
                            :
                            <div className='uploader-wrapper'>
                                <Button variant="contained" component="label"
                                    style={{ textTransform: 'none', backgroundColor: 'transparent', boxShadow: 'none', margin: '10px 0' }}
                                >
                                    <Tooltip title="Choose from gallery" placement="bottom">
                                        <AddAPhotoIcon fontSize="large" sx={{ fill: 'var(--lightGrey)' }} />
                                    </Tooltip>
                                    <input type="file" hidden onChange={fileSelectedHandler} />
                                </Button>
                                <Button variant="outlined" component="label"
                                    style={{ textTransform: 'none', boxShadow: 'none', margin: '15px 0' }}
                                >
                                    <AddAPhotoOutlinedIcon fontSize="small" sx={{ fill: 'var(--lightGrey)' }} />
                                    <span className="a-small-blue" style={{ margin: '2px 5px 0' }}>Add photo</span>
                                    <input type="file" hidden onChange={fileSelectedHandler} />
                                </Button>
                            </div>
                        }
                    </Grid>
                    <Grid item> {/* Name */}
                        <Controller name="name" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Name" type="text" fullWidth
                                    inputRef={input => input && input.focus()}
                                    sx={{margin: 0, "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" >
                                                    <LocalShippingIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.name)} helperText={errors.name?.message} 
                                />}
                        />
                    </Grid>
                    <Grid item> {/* License Plate */}
                        <Controller name="licensePlate" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="License Plate" type="text" fullWidth
                                    sx={{margin: 0, "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" >
                                                    <LocalShippingIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                    error={Boolean(errors.licensePlate)} helperText={errors.licensePlate?.message} 
                                />}
                        />
                    </Grid>
                    <Grid item> {/* Equipment */}
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="equipment-label">Equipment</InputLabel>
                            <Controller name="equipment" control={control}
                                defaultValue={equipments[0]}
                                render={({ field }) => (
                                    <Select label="Equipment" {...field}
                                        sx={{"& .MuiOutlinedInput-input": muiTextFieldStyle}}
                                    >
                                        {equipments.map((equipment, index) =>
                                            <MenuItem key={index} value={equipment}
                                            sx={{fontSize: "14px", fontFamily: "Mulish", padding: "2px 10px"}}
                                            >
                                                {Equipment[equipment]}
                                            </MenuItem>)}
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item> {/* Truck Status */}
                        <FormControl sx={{ margin: "10px 0", width: "100%" }} component="fieldset" variant="standard"  >
                            <FormLabel component="legend" id="truck-status-legend">Truck Status:</FormLabel>
                            <Controller rules={{ required: true }} control={control} name="truckStatus"
                                render={({ field }) => (
                                    <RadioGroup {...field}
                                        onChange={onTruckStatusChanged}
                                        value={truckStatusState}
                                    >
                                        <FormControlLabel value={TruckStatus.OnRoad} control={<Radio sx={{marginLeft: "20px"}} />}
                                            label={ <span className="text-14">On Road</span> }
                                        />
                                        <FormControlLabel value={TruckStatus.Pending} control={<Radio sx={{marginLeft: "20px"}}/>}
                                            label={ <span className="text-14">Pending</span> }
                                        />
                                        <FormControlLabel value={TruckStatus.Repair} control={<Radio sx={{marginLeft: "20px"}}/>}
                                            label={ <span className="text-14">Repair</span> }
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item> {/* Cost Per Mile */}
                        <Controller name="costPerMile" control={control}
                            render={({ field }) =>
                                <TextField  {...field} label="Cost Per Mile" type="number" fullWidth
                                    sx={{margin: 0, "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    inputProps={{min: 0, max: 10, step: 0.01}}
                                    error={Boolean(errors.costPerMile)} helperText={errors.costPerMile?.message} />} />
                    </Grid>
                    <Grid item> {/* Notes */}
                        <Controller name="notes" control={control}
                            render={({ field }) =>
                                <TextField {...field} label="Notes" type="text" fullWidth multiline rows={4}
                                    sx={{margin: 0, "& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                    error={Boolean(errors.notes)} helperText={errors.notes?.message} />} />
                    </Grid>
                    {/* Assigned Drivers */}
                    { truck.drivers.length > 0 &&
                        <Grid item>
                            <Divider><Chip label="Drivers" /></Divider>
                            <Grid container direction="column" justifyContent="center" spacing={2} sx={{ padding: '20px' }}>
                                { truck.drivers.map(driver => <TruckDriverFormCard key={driver.id} driver={driver}/>) }
                            </Grid>
                        </Grid>
                    }
                {errorState && <ErrorMessage appearance="small" >{errorState}</ErrorMessage>}
                </Grid>
                {/* Buttons */}
                <Grid container direction="row" justifyContent="space-around" alignItems="center" mb={2}>
                    <MuiButton variant='contained' onClickHandler={onCancelHandler}>
                        <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Cancel</span>
                    </MuiButton>
                    <MuiButton variant="contained" type="submit">
                        {loadingState && <CircularProgress size="1rem" sx={{ mr: '10px' }} />} <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Save</span>
                    </MuiButton>
                </Grid>
            </form>
            <Snackbar
                open={snackBarState !== null}
                autoHideDuration={4000}
                onClose={onSnackbarClose}
            >
                <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>
        </SwipeableDrawer>
    )
}