import { Link } from 'react-router-dom'
import { RouteNames } from '../../routing'
import { Divider, Grid } from '@mui/material'

export default function Footer(): JSX.Element {
    return (
        <Grid container className='footer' direction="row" justifyContent="space-around" alignItems="center">
            <Grid item>
                <Grid container direction="row" gap="10px" justifyContent="flex-start" alignItems="center">
                    <Link to={RouteNames.HOME} className="pt3" style={{ textDecoration: 'none' }}>TruckDispatcher</Link>
                    <Divider orientation="vertical" flexItem />
                    <Link to={RouteNames.TERMS_CONDITIONS} className="pt3" style={{ textDecoration: 'none', color: "var(--darkGrey)", fontSize: 14 }}>Conditions</Link>
                    <Divider orientation="vertical" flexItem />
                    <Link to={RouteNames.PRIVACY_POLICY} className="pt3" style={{ textDecoration: 'none', color: "var(--darkGrey)", fontSize: 14 }}>Privacy Policy</Link>
                </Grid>
            </Grid>
            <Grid item>
                <p className='text-12'>Copyright © {new Date().getFullYear()} TruckDispatcher, inc. All Rights Reserved.</p>
            </Grid>
        </Grid>
    )
};
