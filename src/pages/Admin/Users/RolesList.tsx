import { useEffect, useState } from 'react'
import { RolesListProps } from './types'
import { ChangeRolesDto } from '../../../types/auth'
import { changeUserRolesAxios, getRolesByIdAxios } from '../../../api/user'
import { Checkbox, Snackbar } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Spinner from '../../../components/Spinner/Spinner'
import MuiButton from '../../../components/Button/MuiButton'

export default function RolesList({ userId }: RolesListProps) {
    const [roles, setRoles] = useState<null | ChangeRolesDto>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<null | string>(null)

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setMessage(null)
    };

    const getRoles = async (id: string) => {
        try {
            setLoading(true)
            setMessage(null)
            setRoles(await getRolesByIdAxios(id))
        } catch (error) {
            setMessage(error.message || 'Unable to get users roles.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getRoles(userId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.checked ?
            setRoles({ ...roles, userRoles: [event.target.value, ...roles.userRoles] }) :
            setRoles({ ...roles, userRoles: roles.userRoles.filter(r => r !== event.target.value) })
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            setMessage(null)
            await changeUserRolesAxios(roles)
            setMessage('Roles updated.')
        } catch (error) {
            setMessage(error.message || 'Unable to update roles.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={(e) => onSubmitHandler(e)}>
            <span className='text-16'>User id: {userId}</span>
            {
                loading ?
                    <Spinner /> :
                    <div>
                        <input type="hidden" name="userId" value={roles?.userId} />
                        {
                            roles?.allRoles.map(role =>
                                <p className='text-16' key={role.id}>
                                    <Checkbox
                                        value={role.name}
                                        checked={roles.userRoles.includes(role.name) ? true : false}
                                        onChange={(e) => onChangeHandler(e)} 
                                    />
                                    {role.name}
                                </p>
                            )
                        }
                    </div>
            }
            <MuiButton variant="contained" type="submit">
                {loading && <CircularProgress size="1rem" sx={{ mr: '10px' }} />} <span className="text-14" style={{color: 'var(--lightgreywhite)'}}>Save</span>
            </MuiButton>
            <Snackbar
                open={message !== null}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                message={message}
            />
        </form>
    )
}
