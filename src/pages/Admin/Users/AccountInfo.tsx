import { AccountStatus } from '../../../types/user'
import { AccountFormProps } from './types'
import { Avatar, Grid } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import RemoveDoneIcon from '@mui/icons-material/RemoveDone'

export default function AccountInfo({ user, onClose }: AccountFormProps) {

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" gap='10px' sx={{ minHeight: '56px', margin: '5px 0' }}>
            <Grid item>
                <Grid container justifyContent="flex-start" alignItems="flex-start" gap='10px'>
                    <Grid item>
                        {
                            user.avatar ?
                                <Avatar
                                    alt="Avatar"
                                    src={(process.env.NODE_ENV === "production" ?
                                        process.env.REACT_APP_BASE_API_URL_PROD :
                                        process.env.REACT_APP_BASE_API_URL_DEV) + "/uploads/images/" + user.avatar}
                                /> :
                                <Avatar sx={{ bgcolor: "#158f7d" }}>X</Avatar>
                        }
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" justifyContent="space-between" alignItems="flex-start" sx={{
                            width: { xs: "150px", sm: "330px", md: "450px", lg: "700px" }
                        }}>
                            <span style={{ fontWeight: "bold" }}>{user.firstName + " " + user.lastName}</span>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" gap='15px' sx={{ margin: "10px 0" }} >
                                <span className='text-14'>Email confirmed:</span>
                                {
                                    user.emailConfirmed ?
                                        <DoneAllIcon fontSize='small' sx={{ fill: '#2e7d32' }} /> :
                                        <RemoveDoneIcon fontSize='small' sx={{ fill: 'var(--red)' }} />
                                }
                                <span className='text-14'>
                                    Registered:  {new Date(user.createdAt.toString() + "Z").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"})}
                                </span>
                            </Grid>
                            <span className='text-14'>{user.email}</span>
                            <span className='text-14'>Account Status: {AccountStatus[user.accountStatus]}</span>
                            <span className='text-12'>
                                Start Payed Date: {new Date(user.startPayedPeriodDate.toString() + "Z").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})}
                            </span>
                            <span className='text-12' style={{
                                color: new Date() > new Date(user.finishPayedPeriodDate) ? '#d32f2f' : 'var(--darkGrey)',
                                fontWeight: new Date() > new Date(user.finishPayedPeriodDate) && 'bold'
                            }}>
                                Finish Payed Date: {new Date(user.finishPayedPeriodDate.toString() + "Z").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})}
                            </span>
                            <span className='text-12'>Last Login: {new Date(user.lastLoginDate.toString() + "Z").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})}</span>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <CloseIcon
                    sx={{ cursor: 'pointer', fill: 'var(--lightGrey)', '&:hover': { fill: "var(--red)" } }}
                    onClick={onClose}
                />
            </Grid>
        </Grid>
    )
}
