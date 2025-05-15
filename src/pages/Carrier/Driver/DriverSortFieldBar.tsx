import { useState } from "react"
import { SortFieldBarProps } from "../../../types/common/sortFieldBarProps"
import { OrderType } from "../../../types/common/orderType"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import SortOutlinedIcon from '@mui/icons-material/SortOutlined'

export default function DriverSortFieldBar({ fields }: SortFieldBarProps): JSX.Element {
    const { driverSearchParams } = useTypedSelector(state => state.driver)
    const { setDriverPage, setDriverSort, setDriverSortfield } = useActions()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const onSelectHandler = (field: string) => {
        setDriverPage(1)
        if (field === driverSearchParams.sortField) {
            driverSearchParams.order === OrderType.Ascending ? setDriverSort(OrderType.Descending) : setDriverSort(OrderType.Ascending)
        } else {
            setDriverSortfield(field)
        }
    }

    return (
        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Sort">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <SortOutlinedIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'var(--lightGrey)' }} />
                    <span className="text-14">Sort</span>
                </IconButton>
            </Tooltip>
            <Menu sx={{ mt: '45px' }} id="menu-sortfield-bar" anchorEl={anchorEl} keepMounted
                anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={Boolean(anchorEl)} onClose={handleClose}
            >
                {
                    fields.map(field =>
                        <MenuItem key={field}
                            sx={{fontSize: "16px", fontFamily: "Mulish", padding: "2px 10px"}}
                            onClick={() => {
                                onSelectHandler(field)
                                handleClose()
                            }}
                        >
                            {field}&nbsp;
                            {
                                field === driverSearchParams.sortField ?
                                    driverSearchParams.order === OrderType.Ascending ?
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
