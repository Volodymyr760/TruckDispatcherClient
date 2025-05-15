import { useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { AccountStatus } from '../../../types/user'
import { muiTextFieldStyle } from '../../../types/common/muiTextFieldStyle'
import { IUser } from '../../../types/user'
import { Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip } from '@mui/material'
import UserSortFieldBar from './UserSortFieldBar'
import Spinner from '../../../components/Spinner/Spinner'
import ErrorMessage from '../../../components/Messages/ErrorMessage'
import { IntersectionObserverComponent } from '../../../components/IntersectionObserver/IntersectionObserverComponent'
import UserForm from './UserForm'
import ManageUser from './ManageUser'
import UserCard from './UserCard'
import './styles.css'

export default function UsersPage(): JSX.Element {
    const { userSearchParams, loading, error } = useTypedSelector(state => state.user)
    const { searchUsers, loadMoreUsers, setUserSearchCriteria, setUserAccountStatus, setUserPage } = useActions()
    const [user, setUser] = useState<IUser | null>(null)
    const [userAccount, setUserAccount] = useState<IUser | null>(null)

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        if (userSearchParams.totalItemsCount === 0) return
        entries.forEach((entry) => {
            if (entry.isIntersecting && userSearchParams.currentPage * userSearchParams.pageSize <= userSearchParams.totalItemsCount) {
                loadMoreUsers({
                    pageSize: userSearchParams.pageSize,
                    currentPage: userSearchParams.currentPage + 1,
                    searchCriteria: userSearchParams.searchCriteria,
                    userId: "",
                    sortField: userSearchParams.sortField,
                    order: userSearchParams.order,
                    includeNavProperties: userSearchParams.includeNavProperties,
                    itemList: [],
                    pageCount: 0,
                    totalItemsCount: 0,
                    accountStatus: userSearchParams.accountStatus
                })
                setUserPage(userSearchParams.currentPage + 1)
            }
        });
    };

    const accountStatuses: AccountStatus[] = [AccountStatus.None, AccountStatus.ActiveUser, 
        AccountStatus.InactiveUserToRemove, AccountStatus.Warned]

    useEffect(() => {
        searchUsers(userSearchParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSearchParams.searchCriteria, userSearchParams.currentPage, userSearchParams.sortField, userSearchParams.order]);

    const onAccountstatusFilterChanged = async (event: SelectChangeEvent<AccountStatus>) => {
        setUserPage(1)
        setUserAccountStatus(event.target.value as AccountStatus)
    }

    const onSearchFilterChanged = async (text: string) => {
        if (text.length > 0 && text.length < 3) return
        setUserPage(1)
        setUserSearchCriteria(text)
    }

    return (
        <>
            <Helmet>
                <title>Truskdispatcher.com - Users</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truskdispatcher.com" />
            </Helmet>
            {
                user ? <ManageUser user={user} onClose={() => setUser(null)} /> :
                    <Container maxWidth="lg" className='layout-container'>
                        {/*Page Header */}
                        <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
                            <Grid item sx={{ width: {xs: "100%", md: "48%" } }}>
                                <Tooltip title="First Name, Last Name" placement="bottom">
                                    <TextField label="Search" type="text" margin="none" fullWidth
                                        sx={{"& .MuiOutlinedInput-root": muiTextFieldStyle, "& .MuiInputLabel-outlined": muiTextFieldStyle}}
                                        onChange={(event) => onSearchFilterChanged(event.target.value)}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item sx={{ width: {xs: "100%", md: "48%" } }}>
                                <Grid container direction="row" justifyContent="space-between" alignItems="center" gap='10px'>
                                    <Grid item sx={{width: "45%"}}>
                                        <UserSortFieldBar fields={["First name", "Last name", "Email", "Last Login", "StartPayedPeriod",
                                            "FinishPayedPeriod", "Last login"]} />
                                    </Grid>
                                    <Grid item sx={{width: "45%"}}>
                                        <FormControl sx={{ width: "100%" }}>
                                            <InputLabel id="account-status-select-label">Account status</InputLabel>
                                            <Select label="Account status"
                                                defaultValue={accountStatuses[0]}
                                                sx={{"& .MuiOutlinedInput-input": muiTextFieldStyle}}
                                                onChange={(e) => onAccountstatusFilterChanged(e)}
                                            >
                                                {accountStatuses.map((status, index) =>
                                                    <MenuItem key={index} value={status} 
                                                        sx={{fontSize: "16px", fontFamily: "Mulish", padding: "2px 10px"}}
                                                    >
                                                        {AccountStatus[status]}
                                                    </MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>                        
                        {/* Users List */}
                        {
                            userSearchParams.itemList.length > 0 ?
                                <div style={{ margin: "30px 0" }}>
                                    {userSearchParams.itemList.map(user =>
                                        <UserCard key={user.id} user={user}
                                            onEditAccount={user => setUserAccount(user)}
                                            onManageUser={user => setUser(user)}
                                        />
                                    )}
                                </div> :
                                loading ? <Spinner /> :
                                    error ? <ErrorMessage appearance="large">{error}</ErrorMessage> :
                                        <p style={{ padding: "0 15px" }}>No users</p>
                        }
                        <IntersectionObserverComponent onIntersection={handleIntersection} />
                        {(userSearchParams.itemList.length > 0 && loading) && <Spinner />}
                        {userAccount && <UserForm user={userAccount} onClose={() => setUserAccount(null)} />}
                    </Container>
            }
        </>
    );
};
