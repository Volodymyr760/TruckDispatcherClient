import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { IBroker } from "../../../types/broker"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { ISnackBarMessageState } from "../../../types/common/snackBarMessageState"
import { Alert, Container, Grid, Snackbar, TextField, Tooltip } from "@mui/material"
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import MuiButton from "../../../components/Button/MuiButton"
import Spinner from "../../../components/Spinner/Spinner"
import AdminBrokerCard from "./AdminBrokerCard"
import AdminBrokerSortFieldBar from "./AdminBrokerSortFieldBar"
import AdminBrokerForm from "./AdminBrokerForm"
import { IntersectionObserverComponent } from "../../../components/IntersectionObserver/IntersectionObserverComponent"

export default function DriverPage(): JSX.Element {
    const { brokerSearchParams, loading, error } = useTypedSelector(state => state.broker)
    const { auth } = useTypedSelector(state => state.auth)
    const { searchBrokers, loadMoreBrokers, setBrokerPage, setBrokerSearchCriteria } = useActions()
    const [snackBarState, setSnackBarState] = useState<null | ISnackBarMessageState>(null)
    const [Broker, setBroker] = useState<IBroker | null>(null)

    const сloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setSnackBarState(null)
    };

    useEffect(() => {
        searchBrokers(brokerSearchParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brokerSearchParams.searchCriteria, brokerSearchParams.sortField, brokerSearchParams.order])

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        if (brokerSearchParams.totalItemsCount === 0) return;
        entries.forEach((entry) => {
            if (entry.isIntersecting && brokerSearchParams.currentPage * brokerSearchParams.pageSize < brokerSearchParams.totalItemsCount) {
                loadMoreBrokers({
                    pageSize: brokerSearchParams.pageSize,
                    currentPage: brokerSearchParams.currentPage + 1,
                    searchCriteria: brokerSearchParams.searchCriteria,
                    userId: auth.user.id,
                    sortField: brokerSearchParams.sortField,
                    order: brokerSearchParams.order,
                    includeNavProperties: brokerSearchParams.includeNavProperties,
                    itemList: [],
                    pageCount: 0,
                    totalItemsCount: 0
                })
                setBrokerPage(brokerSearchParams.currentPage + 1);
            }
        });
    };

    const onSearchFilterChanged = async (text: string) => {
        if (text.length > 0 && text.length < 3) return
        setBrokerPage(1)
        setBrokerSearchCriteria(text)
    }

    const onEdit = (Broker: null | IBroker) => setBroker(Broker)

    const onCreate = () => {
        const Broker: IBroker = { 
            id: null, 
            parserName: '', 
            name: '',
            shortName: '', 
            logo: '',
            email: '', 
            phone: '',
            dotNumber: '', 
            mcNumber: '',
            notes: '' 
        }
        setBroker(Broker)
    }

    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>Truckdispatcher.top - Brokers</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truckdispatcher.top" />
            </Helmet>
            {/*Page Header */}
            <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
                <Grid item sx={{ width: {xs: "100%", md: "48%" } }}>
                    <Tooltip title="Name / Short Name" placement="bottom">
                        <TextField label="Search" type="text" margin="none" fullWidth
                            defaultValue={brokerSearchParams.searchCriteria}
                            sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                            onChange={(event) => onSearchFilterChanged(event.target.value)}
                        />
                    </Tooltip>
                </Grid>
                <Grid item sx={{ width: {xs: "100%", md: "48%" } }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px'>
                        <Grid item sx={{width: "45%"}}>
                            <AdminBrokerSortFieldBar fields={["Name", "Dot", "MC", "Short Name"]} />
                        </Grid>
                        <Grid item sx={{width: "45%", textAlign: "right"}}>
                            <MuiButton size='large' variant='contained' onClickHandler={onCreate}>
                                <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>+ Broker</span>
                            </MuiButton>                            
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>            
            {/*  Brokers List */}
            {
                brokerSearchParams.itemList.length > 0 ?
                    <div style={{ margin: "30px 0" }}>
                        {brokerSearchParams.itemList.map(Broker =>
                            <AdminBrokerCard key={Broker.id} broker={Broker} onEdit={onEdit} />
                        )}
                    </div> :
                    loading ? <Spinner /> :
                        error ? <ErrorMessage appearance="regular">{error}</ErrorMessage> :
                            <p style={{ padding: "0 15px" }}>No  Brokers</p>
            }
            <IntersectionObserverComponent onIntersection={handleIntersection} />
            {Broker && <AdminBrokerForm broker={Broker} closeForm={() => setBroker(null)} />}
            <Snackbar open={snackBarState !== null} autoHideDuration={4000} onClose={сloseSnackbar}>
                <Alert severity={snackBarState?.severity}>{snackBarState?.message}</Alert>
            </Snackbar>
        </Container>
    )
}
