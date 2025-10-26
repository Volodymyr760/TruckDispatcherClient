import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { useActions } from "../../../hooks/useActions"
import { Equipment } from "../../../types/common/equipment"
import { IImportLoad } from "../../../types/importload"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { Alert, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Tooltip } from "@mui/material"
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import MuiButton from "../../../components/Button/MuiButton"
import Spinner from "../../../components/Spinner/Spinner"
import { IntersectionObserverComponent } from "../../../components/IntersectionObserver/IntersectionObserverComponent"
import BrokerLoadCard from "./BrokerLoadCard"
import BrokerLoadForm from "./BrokerLoadForm"
import BrokerLoadSortFieldBar from "./BrokerLoadSortFieldBar"

export default function BrokerLoadPage(): JSX.Element {
    const { brokerLoadSearchParams, loading, error } = useTypedSelector(state => state.brokerLoad)
    const { auth } = useTypedSelector(state => state.auth)
    const { getBrokerLoads, setBrokerLoadPage, setBrokerLoadSearchCriteria, setBrokerLoadEquipment, loadMoreBrokerLoads } = useActions()
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [load, setLoad] = useState<IImportLoad | null>(null)
    const equipments: Equipment[] = [Equipment.All, Equipment.Flatbed, Equipment.Reefer, Equipment.Van]

    const сloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        if (brokerLoadSearchParams.totalItemsCount === 0) return
        entries.forEach((entry) => {
            if (entry.isIntersecting && brokerLoadSearchParams.currentPage * brokerLoadSearchParams.pageSize <= brokerLoadSearchParams.totalItemsCount) {
                loadMoreBrokerLoads({
                    pageSize: brokerLoadSearchParams.pageSize,
                    currentPage: brokerLoadSearchParams.currentPage + 1,
                    searchCriteria: brokerLoadSearchParams.searchCriteria,
                    userId: auth.user.id,
                    sortField: brokerLoadSearchParams.sortField,
                    order: brokerLoadSearchParams.order,
                    includeNavProperties: brokerLoadSearchParams.includeNavProperties,
                    itemList: [],
                    pageCount: 0,
                    totalItemsCount: 0,
                    equipment: brokerLoadSearchParams.equipment
                })
                setBrokerLoadPage(brokerLoadSearchParams.currentPage + 1)
            }
        });
    };
     
    useEffect(() => {
        getBrokerLoads(brokerLoadSearchParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brokerLoadSearchParams.searchCriteria, brokerLoadSearchParams.equipment,
        brokerLoadSearchParams.sortField, brokerLoadSearchParams.order])

    const onSearchFilterChanged = async (text: string) => {
        if (text.length > 0 && text.length < 3) return
        setBrokerLoadPage(1)
        setBrokerLoadSearchCriteria(text)
    }

    const onEquipmentFilterChanged = async (event: SelectChangeEvent<Equipment>) => {
        setBrokerLoadPage(1)
        setBrokerLoadEquipment(event.target.value as Equipment)
    }

    const onEdit = (load: null | IImportLoad) => setLoad(load)

    const onCreate = () => {
        const load: IImportLoad = { 
            id: null, referenceId: '', 
            origin: '', originLatitude: 0, originLongitude: 0,
            destination: '', destinationLatitude: 0, destinationLongitude: 0,
            pickUp: null, delivery: null,
            length: 0, weight: 0, 
            equipment: Equipment.Van,
            shipperId: auth.user.id, shipperName: auth.user.companyName, shipperLogo: auth.user.avatar || '', 
            shipperEmail: auth.user.email, shipperPhone: auth.user.phoneNumber || '',
            shipperDotNumber: auth.user.dot || '', shipperMcNumber: auth.user.mc || '',
            miles: 1, deadheadOrigin: 0, deadheadDestination: 0,
            rate: 1, ratePerMile: 0, profit: 0, profitPerMile: 0,
            requirements: ''
        }
        setLoad(load)
    }

    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>Truckdispatcher.top - Loads</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truckdispatcher.top" />
            </Helmet>
            {/* Page Header */}
            <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
                <Grid item sx={{ width: {xs: "100%", md: "33%" } }}>
                    <Tooltip title="Origin / Destination, ReferenceId" placement="bottom">
                        <TextField label="Search" type="text" margin="none" fullWidth
                            sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                            onChange={(event) => onSearchFilterChanged(event.target.value)}
                        />
                    </Tooltip>
                </Grid>
                <Grid item sx={{ width: {xs: "100%", md: "33%" } }}>
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
                <Grid item sx={{ width: {xs: "100%", md: "33%" } }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px'>
                        <Grid item sx={{width: "45%"}}>
                            <BrokerLoadSortFieldBar fields={["Origin", "Destination", "Pickup", "Delivery", 
                                "Miles", "Rate", "Rate Per Mile"]} />
                        </Grid>
                        <Grid item sx={{width: "45%", textAlign: "right"}}>
                            <MuiButton size='large' variant='contained' onClickHandler={onCreate}>
                                <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>+ Load</span>
                            </MuiButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* BrokerLoads List */}
            {
                brokerLoadSearchParams.itemList.length > 0 ?
                    <div style={{ margin: "30px 0" }}>
                        {brokerLoadSearchParams.itemList.map(load =>
                            <BrokerLoadCard key={load.id} load={load} onEdit={onEdit} />
                        )}
                    </div> :
                    loading ? <Spinner /> :
                        error ? <ErrorMessage appearance="regular">{error}</ErrorMessage> :
                            <p style={{ padding: "0 15px" }}>No loads</p>
            }
            <IntersectionObserverComponent onIntersection={handleIntersection} />
            {(brokerLoadSearchParams.itemList.length > 0 && loading) && <Spinner />}
            {load && <BrokerLoadForm load={load} closeForm={() => setLoad(null)} />}
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
