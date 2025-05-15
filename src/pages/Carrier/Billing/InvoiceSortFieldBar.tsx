import React, { useState } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useActions } from '../../../hooks/useActions'
import { OrderType } from '../../../types/common/orderType'
import { SortFieldBarProps } from '../../../types/common/sortFieldBarProps'
import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import SortOutlinedIcon from '@mui/icons-material/SortOutlined'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

export default function InvoiceSortFieldBar({ fields }: SortFieldBarProps) {
    const { invoiceSearchParams } = useTypedSelector(state => state.invoice)
    const { setInvoiceSortfield, setInvoiceSort } = useActions()
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget)
    const handleClose = () => setAnchorElUser(null)

    const onSelectHandler = (field: string) => {
        if (field === invoiceSearchParams.sortField) {
            invoiceSearchParams.order === OrderType.Ascending ? setInvoiceSort(OrderType.Descending) : setInvoiceSort(OrderType.Ascending)
        } else {
            setInvoiceSortfield(field)
        }
    }

    return (
        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Sort">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <SortOutlinedIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)' }} />
                </IconButton>
            </Tooltip>
            <Menu sx={{ mt: '45px' }}id="menu-sortfield-bar" anchorEl={anchorElUser} keepMounted
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                transformOrigin={{ vertical: 'top', horizontal: 'left'}}
                open={Boolean(anchorElUser)}
                onClose={handleClose}
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
                                    field === invoiceSearchParams.sortField ?
                                    invoiceSearchParams.order === OrderType.Ascending ?
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
