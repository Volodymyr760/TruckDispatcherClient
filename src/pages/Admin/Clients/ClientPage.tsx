import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { AppRoles } from "../../../types/common/appRoles"
import { ClientStatus, IClient } from "../../../types/client"
import { muiTextFieldStyle } from "../../../types/common/muiTextFieldStyle"
import { Alert, Container, Grid, Snackbar, TextField, Tooltip } from "@mui/material"
import ErrorMessage from "../../../components/Messages/ErrorMessage"
import { IntersectionObserverComponent } from "../../../components/IntersectionObserver/IntersectionObserverComponent"
import MuiButton from "../../../components/Button/MuiButton"
import Spinner from "../../../components/Spinner/Spinner"
import ClientCard from "./ClientCard"
import ClientSortFieldBar from "./ClientSortFieldBar"
import ClientForm from "./ClientForm"

export default function ClientPage(): JSX.Element {
    const { clientSearchParams, loading, error } = useTypedSelector(state => state.client)
    const { auth } = useTypedSelector(state => state.auth)
    const { searchClients, loadMoreClients, setClientPage, setClientError, setClientSearchCriteria } = useActions()
    const [client, setClient] = useState<IClient | null>(null)
    
    const clearErrorAndCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        // if (reason === 'clickaway') return
        setClientError(null)
    };

    useEffect(() => {
        searchClients(clientSearchParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientSearchParams.searchCriteria, clientSearchParams.sortField, clientSearchParams.order])

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        if (clientSearchParams.totalItemsCount === 0) return;
        entries.forEach((entry) => {
            if (entry.isIntersecting && clientSearchParams.currentPage * clientSearchParams.pageSize < clientSearchParams.totalItemsCount) {
                loadMoreClients({
                    pageSize: clientSearchParams.pageSize,
                    currentPage: clientSearchParams.currentPage + 1,
                    searchCriteria: clientSearchParams.searchCriteria,
                    userId: auth.user.id,
                    sortField: clientSearchParams.sortField,
                    order: clientSearchParams.order,
                    includeNavProperties: clientSearchParams.includeNavProperties,
                    itemList: [],
                    appRoles: clientSearchParams.appRoles,
                    clientStatus: clientSearchParams.clientStatus,
                    pageCount: 0,
                    totalItemsCount: 0
                })
                setClientPage(clientSearchParams.currentPage + 1);
            }
        });
    };

    const onSearchFilterChanged = async (text: string) => {
        if (text.length > 0 && text.length < 3) return
        setClientPage(1)
        setClientSearchCriteria(text)
    }

    const onEdit = (client: null | IClient) => setClient(client)

    const onCreate = () => {
        const client: IClient = { 
            id: null, 
            name: '', 
            email: '',
            city: '', 
            clientStatus: ClientStatus.Created,
            appRoles: AppRoles.Carrier,
            dotNumber: '',
            createdAt: new Date(),
            invitedAt: null,
            timeZoneShift: -5,
            notes: '' 
        }
        setClient(client)
    }

    return (
        <Container maxWidth="lg" className='layout-container' >
            <Helmet>
                <title>Truckdispatcher.top - Clients</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truckdispatcher.top" />
            </Helmet>
            {/*Page Header */}
            <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
                <Grid item sx={{ width: {xs: "100%", md: "48%" } }}>
                    <Tooltip title="Name / City / ClientStatus / AppRoles / DOT / CreatedAt / InvitedAt" placement="bottom">
                        <TextField label="Search" type="text" margin="none" fullWidth
                            defaultValue={clientSearchParams.searchCriteria}
                            sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                            onChange={(event) => onSearchFilterChanged(event.target.value)}
                        />
                    </Tooltip>
                </Grid>
                <Grid item sx={{ width: {xs: "100%", md: "48%" } }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px'>
                        <Grid item sx={{width: "45%"}}>
                            <ClientSortFieldBar fields={["Name", "City", "ClientStatus", "AppRoles", "DOT", "CreatedAt", "InvitedAt"]} />
                        </Grid>
                        <Grid item sx={{width: "45%", textAlign: "right"}}>
                            <MuiButton size='large' variant='contained' onClickHandler={onCreate}>
                                <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>+ Client</span>
                            </MuiButton>                            
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>            
            {/* Clients List */}
            {
                clientSearchParams.itemList.length > 0 ?
                    <div style={{ margin: "30px 0" }}>
                        {clientSearchParams.itemList.map(client =>
                            <ClientCard key={client.id} client={client} onEdit={onEdit} />
                        )}
                    </div> :
                    loading ? <Spinner /> :
                        error ? <ErrorMessage appearance="regular">{error}</ErrorMessage> :
                            <p style={{ padding: "0 15px" }}>No clients</p>
            }
            <IntersectionObserverComponent onIntersection={handleIntersection} />
            {client && <ClientForm client={client} closeForm={() => setClient(null)} />}
            <Snackbar open={error !== null} autoHideDuration={4000} onClose={clearErrorAndCloseSnackbar}>
                <Alert severity={"error"}>{error}</Alert>
            </Snackbar>
        </Container>
    )
}
