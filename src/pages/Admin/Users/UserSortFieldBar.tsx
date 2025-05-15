import React, { useState } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useActions } from '../../../hooks/useActions'
import { OrderType } from '../../../types/common/orderType'
import { SortFieldBarProps } from '../../../types/common/sortFieldBarProps'
import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import SortOutlinedIcon from '@mui/icons-material/SortOutlined'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

export default function UserSortFieldBar({ fields }: SortFieldBarProps) {
    const { userSearchParams } = useTypedSelector(state => state.user)
    const { setUserPage, setUserSortfield, setUserSort } = useActions()
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget)
    const handleClose = () => setAnchorElUser(null)

    const onSelectHandler = (field: string) => {
        if (field === userSearchParams.sortField) {
            userSearchParams.order === OrderType.Ascending ? setUserSort(OrderType.Descending) : setUserSort(OrderType.Ascending)
        } else {
            setUserSortfield(field)
        }
        setUserPage(1)
    }

    return (
        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Sort">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <SortOutlinedIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)' }} />
                    <span className="text-14">Sort</span>
                </IconButton>
            </Tooltip>
            <Menu sx={{ mt: '45px' }} id="menu-sortfield-bar" anchorEl={anchorElUser} keepMounted
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right'}}
                open={Boolean(anchorElUser)} onClose={handleClose}
            >
                {
                    fields.map(field =>
                        <MenuItem key={field} 
                            sx={{fontSize: "16px", fontFamily: "Mulish", padding: "2px 10px"}}
                            onClick={() => {
                                onSelectHandler(field)
                                handleClose();
                            }}>
                                {field}
                                &nbsp;
                                {
                                    field === userSearchParams.sortField ?
                                        userSearchParams.order === OrderType.Ascending ?
                                            <ArrowUpwardIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--orange)' }} />
                                            :
                                            <ArrowDownwardIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--orange)' }} />
                                        : null
                                }
                        </MenuItem>
                    )
                }
            </Menu>
        </Box>
    )
}
