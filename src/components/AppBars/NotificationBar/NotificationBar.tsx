import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Button, Container, Grid, IconButton, Menu, Tooltip } from '@mui/material'
import Badge from '@mui/material/Badge'
import CloseIcon from '@mui/icons-material/Close'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Spinner from '../../Spinner/Spinner'
import ErrorMessage from '../../Messages/ErrorMessage'
import { useActions } from '../../../hooks/useActions'
import { clonedObject } from '../../../hooks/clonedObject'
import { INotification } from '../../../types/notification'
import moment from 'moment'

export default function NotificationBar() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
    const { notificationSearchParams, loading, error } = useTypedSelector(state => state.notification)
    const { getNotifications, removeNotification, setNotificationPage, 
        loadMoreNotifications, updateNotificationIsRead } = useActions()
    const navigate = useNavigate()

    useEffect(() => {
        if(notificationSearchParams.itemList.length === 0) getNotifications(notificationSearchParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget)
    const handleClose = () => setAnchorElUser(null)

    const markAsReadHandler = (notification: INotification) => {
        const notificationToUpdate = clonedObject(notification)
        notificationToUpdate.isRead = true
        updateNotificationIsRead(notificationToUpdate)
    }

    const onContinueHandler = (notification: INotification) => {
        markAsReadHandler(notification)
        navigate(notification.callBackUrl)
    }

    const loadMoreHandler = () => {
        setNotificationPage(notificationSearchParams.currentPage + 1)
        loadMoreNotifications(notificationSearchParams)
    }

    return (
        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Notifications">
                <IconButton color="inherit" onClick={handleOpen}>
                    <Badge badgeContent={notificationSearchParams.itemList.filter(n => n.isRead === false).length || 0} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Tooltip>
            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} keepMounted
                anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
                transformOrigin={{ vertical: 'top', horizontal: 'right'}}
                open={Boolean(anchorElUser)} onClose={handleClose}
            >
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" gap="10px" width="300px">
                    {
                        notificationSearchParams.itemList.length > 0 ?
                            notificationSearchParams.itemList.map(n =>
                                <Grid item key={n.id} p="5px">
                                    <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" >
                                        {/* SenderAvatar */}
                                        <Grid item width="50px" p="2px">
                                            {
                                                n.senderAvatarUrl ?
                                                    <Avatar alt="" src={n.senderAvatarUrl} /> :
                                                    <Avatar sx={{ bgcolor: 'teal' }}>DF</Avatar>
                                            }

                                        </Grid>
                                        {/* Content */}
                                        <Grid item width="214px" p="2px">
                                            <p className='text-14' style={{fontWeight: n.isRead ? 400 : 800, margin: 0}}>{n.message}</p>
                                            <p className='text-12' style={{fontWeight: n.isRead ? 400 : 800, margin: '6px 0'}}>{moment(n.createdAt.toString() + "Z").fromNow()}</p>
                                        </Grid>
                                        {/* Delete button */}
                                        <Grid item width="24px" p="2px">
                                            <CloseIcon
                                                sx={{ cursor: 'pointer', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--red)" } }}
                                                onClick={() => removeNotification(n.id)}
                                            />
                                        </Grid>
                                        <Grid container direction="row" justifyContent="space-around" alignItems="center" m={1}>
                                            <Button size="small" color="secondary" variant='outlined' sx={{ textTransform: "none", display: n.isRead && "none", borderRadius: "16px" }}
                                                onClick={() => markAsReadHandler(n)}
                                            >
                                                <span className='text-12'>Mark as read</span>
                                            </Button>
                                            {
                                                n.callBackUrl &&
                                                <Button size="small" color="success" variant='outlined' sx={{ textTransform: "none", borderRadius: "16px" }}
                                                    onClick={() => onContinueHandler(n)}
                                                >
                                                    <span className='text-12'>Continue</span>
                                                </Button>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ) :
                            loading ? null : <p style={{ padding: "0 15px" }}>No notifications</p>
                    }
                </Grid>
                {loading ?
                    <Spinner /> :
                    error ? <ErrorMessage appearance="small">{error}</ErrorMessage> : null
                }
                {
                    notificationSearchParams.currentPage * notificationSearchParams.pageSize < notificationSearchParams.totalItemsCount &&
                    <Container sx={{ textAlign: "center", margin: "15px 0" }}>
                        <Button size="small" variant="outlined" onClick={loadMoreHandler}>
                            {loading ? 'Loading...' : 'Load more'}
                        </Button>
                    </Container>
                }
            </Menu>
        </Box>
    )
}
