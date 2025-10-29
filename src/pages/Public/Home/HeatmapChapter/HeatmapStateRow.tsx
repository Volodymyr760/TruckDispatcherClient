import { Grid } from "@mui/material";
import { HeatmapCardRowProps } from "../types";

export default function HeatmapStateRow({ text1, text2 }: HeatmapCardRowProps): JSX.Element {
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ margin: "10px 0" }} >
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span className='heatmap-small'>
                    {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <div className="heatmap-state" style={{ backgroundColor: text1 }}></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span className='heatmap-small'>
                    {(new Date(new Date().getTime() + 86400000)).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <div className="heatmap-state" style={{ backgroundColor: text2 }}></div>
            </div>
        </Grid>
    )
}
