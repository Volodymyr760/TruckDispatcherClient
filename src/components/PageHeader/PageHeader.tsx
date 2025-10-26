import { Grid } from "@mui/material"
import { PageHeaderProps } from './types'

export default function PageHeader({ title, text, id }: PageHeaderProps): JSX.Element {
    return (
        <Grid container direction='column' alignItems={'center'} justifyContent={'center'} sx={{ margin: "40px 0" }}>
            <Grid item sx={{ paddingTop: '0 !important' }}>
                <p id={id} className="pt1" style={{ margin: "20px 0", lineHeight: 1.2, textAlign: 'center' }}>{title}</p>
            </Grid>
            {text && <span className="pt3">{text}</span>}
        </Grid>
    )
};