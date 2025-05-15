import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { Equipment } from "../../../types/common/equipment"
import { ILoad, LoadStatus } from "../../../types/load"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { Alert, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Tooltip } from "@mui/material"
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import { IntersectionObserverComponent } from "../../../components/IntersectionObserver/IntersectionObserverComponent"
import MuiButton from "../../../components/Button/MuiButton"
import Spinner from "../../../components/Spinner/Spinner"
import LoadCard from "./LoadCard"
import LoadSortFieldBar from "./LoadSortFieldBar"
import LoadForm from "./LoadForm"
import './styles.css'

export default function LoadPage(): JSX.Element {
    const { loadSearchParams, loading, error } = useTypedSelector(state => state.load)
    const { auth } = useTypedSelector(state => state.auth)
    const { searchLoads, setLoadPage, setLoadSearchCriteria, setLoadEquipment, setLoadStatus, loadMoreLoads } = useActions()
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [load, setLoad] = useState<ILoad | null>(null)

    const equipments: Equipment[] = [Equipment.All, Equipment.Flatbed, Equipment.Reefer, Equipment.Van]
    const loadStatuses: LoadStatus[] = [LoadStatus.All, LoadStatus.Saved, LoadStatus.Booked, LoadStatus.InProgress,
        LoadStatus.Completed, LoadStatus.Payed]

    const сloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        if (loadSearchParams.totalItemsCount === 0) return
        entries.forEach((entry) => {
            if (entry.isIntersecting && loadSearchParams.currentPage * loadSearchParams.pageSize <= loadSearchParams.totalItemsCount) {
                loadMoreLoads({
                    pageSize: loadSearchParams.pageSize,
                    currentPage: loadSearchParams.currentPage + 1,
                    searchCriteria: loadSearchParams.searchCriteria,
                    userId: auth.user.id,
                    sortField: loadSearchParams.sortField,
                    order: loadSearchParams.order,
                    includeNavProperties: loadSearchParams.includeNavProperties,
                    itemList: [],
                    pageCount: 0,
                    totalItemsCount: 0,
                    equipment: loadSearchParams.equipment,
                    loadStatus: loadSearchParams.loadStatus
                })
                setLoadPage(loadSearchParams.currentPage + 1)
            }
        });
    };
         
    useEffect(() => {
        searchLoads(loadSearchParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadSearchParams.searchCriteria, loadSearchParams.equipment, loadSearchParams.loadStatus,
         loadSearchParams.sortField, loadSearchParams.order])

    const onSearchFilterChanged = async (text: string) => {
        if (text.length > 0 && text.length < 3) return
        setLoadPage(1)
        setLoadSearchCriteria(text)
    }

    const onEquipmentFilterChanged = async (event: SelectChangeEvent<Equipment>) => {
        setLoadPage(1)
        setLoadEquipment(event.target.value as Equipment)
    }

    const onLoadStatusFilterChanged = async (event: SelectChangeEvent<LoadStatus>) => {
        setLoadPage(1)
        setLoadStatus(event.target.value as LoadStatus)
    }

    const onEdit = (load: null | ILoad) => setLoad(load)

    const onCreate = () => {
        const load: ILoad = { 
            id: null,  
            referenceId: '#1', 
            origin: '', destination: '', 
            pickUp: null, delivery: null,
            length: 0, weight: 0, equipment: Equipment.Van,
            shipperName: '', shipperLogo: '', shipperEmail: '', shipperPhone: '',
            miles: 1, deadheadOrigin: 0, deadheadDestination: 0,
            rate: 0, ratePerMile: 0, profit: 0, profitPerMile: 0,
            requirements: '',
            loadStatus: LoadStatus.Saved,
            truckId: '', truck: null,
            userId: auth.user.id
        }
        setLoad(load)
    }
    
    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>Truskdispatcher.com - Loads</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truskdispatcher.com" />
            </Helmet>
            {/* Page Header */}
            <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
                <Grid item sx={{ width: {xs: "100%", md: "33%" } }}>
                    <Tooltip title="Origin / Destination, ReferenceId, Truck Name / License Plate" placement="bottom">
                        <TextField label="Search" type="text" margin="none" fullWidth
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
                                    onChange={(e) => onEquipmentFilterChanged(e)}
                                    sx={{"& .MuiOutlinedInput-input": muiTextFieldStyle}}
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
                                <InputLabel id="load-status-label">Load Status</InputLabel>
                                <Select label="Load Status"
                                    defaultValue={loadStatuses[0]}
                                    onChange={(e) => onLoadStatusFilterChanged(e)}
                                    sx={{"& .MuiOutlinedInput-input": muiTextFieldStyle}}
                                >
                                    {loadStatuses.map((loadStatus, index) =>
                                    <MenuItem key={index} value={loadStatus} 
                                        sx={{fontSize: "16px", fontFamily: "Mulish", padding: "2px 10px"}}
                                    >
                                        {LoadStatus[loadStatus]}
                                    </MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ width: {xs: "100%", md: "33%" } }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px'>
                        <Grid item sx={{width: "45%"}}>
                            <LoadSortFieldBar fields={["Origin", "Destination", "Pickup", "Delivery", "Miles",
                                "Rate", "Rate Per Mile", "Profit", "Profit Per Mile", "Truck Name"]} />
                        </Grid>
                        <Grid item sx={{width: "45%", textAlign: "right"}}>
                            <MuiButton size='large' variant='contained' onClickHandler={onCreate}>
                                <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>+ Load</span>
                            </MuiButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* Loads List */}
            {
                loadSearchParams.itemList.length > 0 ?
                    <div style={{ margin: "30px 0" }}>
                        {loadSearchParams.itemList.map(load =>
                            <LoadCard key={load.id} load={load} onEdit={onEdit} />
                        )}
                    </div> :
                    loading ? <Spinner /> :
                        error ? <ErrorMessage appearance="regular">{error}</ErrorMessage> :
                            <p style={{ padding: "0 15px" }}>No loads</p>
            }
            <IntersectionObserverComponent onIntersection={handleIntersection} />
            {(loadSearchParams.itemList.length > 0 && loading) && <Spinner />}
            {load && <LoadForm load={load} closeForm={() => setLoad(null)} />}
            <Snackbar
                open={snackBarState !== null}
                autoHideDuration={4000}
                onClose={сloseSnackbar}
            >
                <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>
        </Container>
    )
}
