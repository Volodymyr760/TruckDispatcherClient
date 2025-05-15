import { Grid } from "@mui/material"
import { MessageProps } from "./types"
import './styles.css'

export default function ErrorMessage({ children, appearance }: MessageProps): JSX.Element {
    let cssClass: string;
    switch (appearance) {
        case "large":
            cssClass = 'error-message-large'
            break
        default:
            cssClass = 'error-message-regular'
    }

    return (
        <Grid container direction="row" justifyContent="center" sx={{margin: appearance === "large" ? 5 : 1 }}>
            <span className={cssClass}>{children}</span>
        </Grid>
    )
}