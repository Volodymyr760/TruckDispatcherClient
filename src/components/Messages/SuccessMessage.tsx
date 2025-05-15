import { Grid } from "@mui/material"
import { MessageProps } from "./types"
import './styles.css'

export default function SuccessMessage({ children, appearance }: MessageProps): JSX.Element {
    let cssClass: string
    switch (appearance) {
        case "large":
            cssClass = 'success-message-large'
            break
        default:
            cssClass = 'success-message-regular'
    }

    return (
        <Grid container direction="row" justifyContent="center" my={appearance === "large" ? 5 : 1}>
            <span className={cssClass}>{children}</span>
        </Grid>
    )
}