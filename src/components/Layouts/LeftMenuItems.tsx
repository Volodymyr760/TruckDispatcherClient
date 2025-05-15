import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { RouteNames } from "../../routing"
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Role } from "../../types/auth"
import { Collapse, Tooltip } from "@mui/material"
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import Badge from '@mui/material/Badge'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import InventoryIcon from '@mui/icons-material/Inventory'
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PeopleIcon from '@mui/icons-material/People'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'

const style = { fontFamily: "Mulish", fontWeight: 800, fontSize: '16px', lineHeight: '1.1rem', color: 'var(--lightGrey)'}

export default function LeftMenuItems() {
    const [adminOpen, setAdminOpen] = useState<boolean>(true)
    const { invoiceSearchParams } = useTypedSelector(state => state.invoice)
    const { auth } = useTypedSelector(state => state.auth)
    
    return (
        <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {
                auth.roles.includes(Role.Admin) &&
                <Fragment>
                    <Tooltip title="Admin" placement="right">
                        <ListItemButton onClick={() => setAdminOpen(!adminOpen)}>
                            <ListItemIcon>
                                <AdminPanelSettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Admin" primaryTypographyProps={style} />
                            {adminOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </Tooltip>
                    <Collapse in={adminOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Tooltip title="Clients" placement="right">
                                <Link to={RouteNames.ADMIN_CLIENTS} style={{textDecoration: 'none'}}>
                                    <ListItemButton sx={{ pl: 3 }}>
                                        <ListItemIcon>
                                            <PeopleAltIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Clients" primaryTypographyProps={style} />
                                    </ListItemButton>
                                </Link>
                            </Tooltip>
                            <Tooltip title="Brokers" placement="right">
                                <Link to={RouteNames.ADMIN_BROKER} style={{textDecoration: 'none'}}>
                                    <ListItemButton sx={{ pl: 3 }}>
                                        <ListItemIcon>
                                            <PointOfSaleIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Brokers" primaryTypographyProps={style} />
                                    </ListItemButton>
                                </Link>
                            </Tooltip>
                            <Tooltip title="Invoices" placement="right">
                                <Link to={RouteNames.ADMIN_INVOICES} style={{textDecoration: 'none'}}>
                                    <ListItemButton sx={{ pl: 3 }}>
                                        <ListItemIcon>
                                            <ShoppingCartIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Invoices" primaryTypographyProps={style}/>
                                    </ListItemButton>
                                </Link>
                            </Tooltip>
                            <Tooltip title="Loads" placement="right">
                                <Link to={RouteNames.ADMIN_LOADS} style={{textDecoration: 'none'}}>
                                    <ListItemButton sx={{ pl: 3 }}>
                                        <ListItemIcon>
                                            <InventoryIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Loads" primaryTypographyProps={style}/>
                                    </ListItemButton>
                                </Link>
                            </Tooltip>
                            <Tooltip title="Users" placement="right">
                                <Link to={RouteNames.ADMIN_USERS} style={{textDecoration: 'none'}}>
                                    <ListItemButton sx={{ pl: 3 }}>
                                        <ListItemIcon>
                                            <PeopleAltIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Users" primaryTypographyProps={style}/>
                                    </ListItemButton>
                                </Link>
                            </Tooltip>
                        </List>
                    </Collapse>
                </Fragment>
            }
            {
                auth.roles.includes(Role.Carrier) &&
                <Fragment>
                    <Tooltip title="Dashboard" placement="right">
                        <Link to={RouteNames.DASHBOARD} style={{textDecoration: 'none'}}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" primaryTypographyProps={style} />
                            </ListItemButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Search" placement="right">
                        <Link to={RouteNames.SEARCH} style={{textDecoration: 'none'}}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SearchIcon />
                                </ListItemIcon>
                                <ListItemText primary="Search" primaryTypographyProps={style}/>
                            </ListItemButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Loads" placement="right">
                        <Link to={RouteNames.LOAD} style={{textDecoration: 'none'}}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InventoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Loads" primaryTypographyProps={style}/>
                            </ListItemButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Trucks" placement="right">
                        <Link to={RouteNames.TRUCK} style={{textDecoration: 'none'}}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LocalShippingIcon />
                                </ListItemIcon>
                                <ListItemText primary="Trucks" primaryTypographyProps={style}/>
                            </ListItemButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Drivers" placement="right">
                        <Link to={RouteNames.DRIVER} style={{textDecoration: 'none'}}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Drivers" primaryTypographyProps={style}/>
                            </ListItemButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Heatmap" placement="right">
                        <Link to={RouteNames.HEATMAP} style={{textDecoration: 'none'}}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TravelExploreIcon />
                                </ListItemIcon>
                                <ListItemText primary="Heatmap" primaryTypographyProps={style}/>
                            </ListItemButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Billing" placement="right">
                        <Link to={RouteNames.INVOICES} style={{textDecoration: 'none'}}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Badge color="primary"
                                        badgeContent={
                                            invoiceSearchParams.itemList.filter(i => i.isRead === false).length > 0 ?
                                                invoiceSearchParams.itemList.filter(i => i.isRead === false).length : 0}
                                    >
                                        <AccountBalanceIcon />
                                    </Badge>
                                </ListItemIcon>
                                <ListItemText primary="Billing" primaryTypographyProps={style}/>
                            </ListItemButton>
                        </Link>
                    </Tooltip>
                </Fragment>
            }
            {
                auth.roles.includes(Role.Broker) &&
                <Fragment>
                    <Tooltip title="Search" placement="right">
                        <Link to={RouteNames.SEARCH} style={{textDecoration: 'none'}}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SearchIcon />
                                </ListItemIcon>
                                <ListItemText primary="Search" primaryTypographyProps={style}/>
                            </ListItemButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Loads" placement="right">
                        <Link to={RouteNames.BROKER_LOADS} style={{textDecoration: 'none'}}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InventoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Loads" primaryTypographyProps={style}/>
                            </ListItemButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Heatmap" placement="right">
                        <Link to={RouteNames.HEATMAP} style={{textDecoration: 'none'}}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TravelExploreIcon />
                                </ListItemIcon>
                                <ListItemText primary="Heatmap" primaryTypographyProps={style}/>
                            </ListItemButton>
                        </Link>
                    </Tooltip>
                </Fragment>
            }
        </List>
    );
}
