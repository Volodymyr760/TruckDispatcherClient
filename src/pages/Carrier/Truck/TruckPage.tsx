import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { Equipment } from "../../../types/common/equipment"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { ITruck, TruckStatus } from "../../../types/truck"
import { Alert, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Tooltip } from "@mui/material"
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import { IntersectionObserverComponent } from "../../../components/IntersectionObserver/IntersectionObserverComponent"
import MuiButton from "../../../components/Button/MuiButton"
import Spinner from "../../../components/Spinner/Spinner"
import TruckCard from "./TruckCard"
import TruckSortFieldBar from "./TruckSortFieldBar"
import TruckForm from "./TruckForm"
import './styles.css'

export default function TruckPage(): JSX.Element {
    const { truckSearchParams, loading, error } = useTypedSelector(state => state.truck)
    const { auth } = useTypedSelector(state => state.auth)
    const { searchTrucks, setTruckPage, setTruckSearchCriteria, setTruckEquipment, setTruckStatus, loadMoreTrucks } = useActions()
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [truck, setTruck] = useState<ITruck | null>(null)

    const equipments: Equipment[] = [Equipment.All, Equipment.Flatbed, Equipment.Reefer, Equipment.Van]
    const truckStatuses: TruckStatus[] = [TruckStatus.All, TruckStatus.OnRoad, TruckStatus.Pending, TruckStatus.Repair]

    const сloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

    useEffect(() => {
        searchTrucks(truckSearchParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [truckSearchParams.equipment, truckSearchParams.truckStatus, 
        truckSearchParams.sortField, truckSearchParams.order])
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        if (truckSearchParams.totalItemsCount === 0) return
        entries.forEach((entry) => {
            if (entry.isIntersecting && truckSearchParams.currentPage * truckSearchParams.pageSize < truckSearchParams.totalItemsCount) {
                loadMoreTrucks({
                    pageSize: truckSearchParams.pageSize,
                    currentPage: truckSearchParams.currentPage + 1,
                    searchCriteria: truckSearchParams.searchCriteria,
                    userId: auth.user.id,
                    sortField: truckSearchParams.sortField,
                    order: truckSearchParams.order,
                    includeNavProperties: truckSearchParams.includeNavProperties,
                    itemList: [],
                    pageCount: 0,
                    totalItemsCount: 0,
                    equipment: truckSearchParams.equipment,
                    truckStatus: truckSearchParams.truckStatus
                })
                setTruckPage(truckSearchParams.currentPage + 1);
            }
        })
    }

    const onSearchFilterChanged = async (text: string) => {
        if (text.length > 0 && text.length < 3) return
        setTruckPage(1)
        setTruckSearchCriteria(text)
        searchTrucks({pageSize: truckSearchParams.pageSize, currentPage: 1, searchCriteria: text, userId: truckSearchParams.userId,
            sortField: truckSearchParams.sortField, order: truckSearchParams.order, includeNavProperties: truckSearchParams.includeNavProperties,
            itemList: [], pageCount: 0, totalItemsCount: 0, equipment: truckSearchParams.equipment, truckStatus: truckSearchParams.truckStatus
        }) // no dependency in useEffect due to bug - sends requests permanently
    }

    const onEquipmentFilterChanged = async (event: SelectChangeEvent<Equipment>) => {
        setTruckPage(1)
        setTruckEquipment(event.target.value as Equipment)
    }

    const onTruckStatusFilterChanged = async (event: SelectChangeEvent<TruckStatus>) => {
        setTruckPage(1)
        setTruckStatus(event.target.value as TruckStatus)
    }
    
    const onEdit = (truck: null | ITruck) => setTruck(truck)

    const onCreate = () => {
        const truck: ITruck = { id: null, name: '', licensePlate: '', equipment: Equipment.Van, costPerMile: 0.5,
            avatar: null, drivers: [], loads: [], userId: auth.user.id, truckStatus: TruckStatus.Pending }
        setTruck(truck)
    }

    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>Truskdispatcher.com - Trucks</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truskdispatcher.com" />
            </Helmet>
            {/*Page Header */}
            <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
                <Grid item sx={{ width: {xs: "100%", md: "33%" } }}>
                    <Tooltip title="Truck Name / License Plate" placement="bottom">
                        <TextField label="Search" type="text" margin="normal" fullWidth
                            defaultValue={truckSearchParams.searchCriteria}
                            sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                            onChange={(event) => onSearchFilterChanged(event.target.value)}
                        />
                    </Tooltip>
                </Grid>
                <Grid item sx={{ width: {xs: "100%", md: "33%" } }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='5px'>
                        <Grid item sx={{width: "48%"}}>
                            <FormControl sx={{minWidth: 100}} fullWidth>
                                <InputLabel id="equipment-label">Equipment</InputLabel>
                                <Select label="Equipment"
                                    defaultValue={equipments[0]}
                                    sx={{"& .MuiOutlinedInput-input": muiTextFieldStyle}}
                                    onChange={(e) => onEquipmentFilterChanged(e)}
                                >
                                    {equipments.map((equipment, index) =>
                                    <MenuItem key={index} value={equipment} 
                                        sx={{fontSize: "16px", fontFamily: "Mulish", padding: "2px 10px"}}
                                    >
                                        {Equipment[equipment]}
                                    </MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sx={{width: "48%"}}>
                            <FormControl sx={{minWidth: 100}} fullWidth>
                                <InputLabel id="truck-status-label">Truck Status</InputLabel>
                                <Select label="Truck Status"
                                    defaultValue={truckStatuses[0]}
                                    sx={{"& .MuiOutlinedInput-input": muiTextFieldStyle}}
                                    onChange={(e) => onTruckStatusFilterChanged(e)}
                                >
                                    {truckStatuses.map((truckStatus, index) =>
                                    <MenuItem key={index} value={truckStatus} 
                                        sx={{fontSize: "16px", fontFamily: "Mulish", padding: "2px 10px"}}
                                    >
                                        {TruckStatus[truckStatus]}
                                    </MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ width: {xs: "100%", md: "33%" } }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px'>
                        <Grid item sx={{width: "45%"}}>
                            <TruckSortFieldBar fields={["Name", "Equipment", "License Plate", "Truck Status"]}/>
                        </Grid>
                        <Grid item sx={{width: "45%", textAlign: "right"}}>
                            <MuiButton size='large' variant='contained' onClickHandler={onCreate}>
                                <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>+ Truck</span>
                            </MuiButton>                            
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>            
            {/* Trucks List */}
            {
                truckSearchParams.itemList.length > 0 ?
                    <div style={{ margin: "30px 0" }}>
                        {truckSearchParams.itemList.map(truck =>
                            <TruckCard key={truck.id} truck={truck} onEdit={onEdit} />
                        )}
                    </div> :
                    loading ? <Spinner /> :
                        error ? <ErrorMessage appearance="regular">{error}</ErrorMessage> :
                            <p style={{ padding: "0 15px" }}>No trucks</p>
            }
            <IntersectionObserverComponent onIntersection={handleIntersection} />
            {truck && <TruckForm truck={truck} onClose={() => setTruck(null)} />}
            <Snackbar open={snackBarState !== null} autoHideDuration={4000} onClose={сloseSnackbar}>
                <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>
        </Container>
    )
}
