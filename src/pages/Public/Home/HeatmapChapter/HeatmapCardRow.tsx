import { Grid } from "@mui/material";
import { HeatmapCardRowProps } from "../types";

export default function HeatmapCardRow({ text1, text2 }: HeatmapCardRowProps): JSX.Element {
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ margin: "10px 0" }} >
            <span className='heatmap-small'>{text1}</span>
            <span className='heatmap-small'>{text2}</span>
        </Grid>
    )
}
