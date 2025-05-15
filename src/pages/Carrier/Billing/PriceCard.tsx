import { PriceCardProps } from './types'
import { Grid, Paper } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import MuiButton from '../../../components/Button/MuiButton'

export default function PriceCard(props: PriceCardProps) {

    const options: string[] = props.pricepackage.posibilities.split('|')

    return (
        <Paper elevation={6} className='price-card' sx={{ overflow: 'hidden', padding: "20px 14px", marginBottom: "30px" }}>
            <p className='text-20' style={{ textAlign: "center" }}>
                {props.pricepackage.name}
            </p>
            <p style={{ color: "var(--blue)", margin: "16px 0 22px", fontSize: "36px", fontFamily: "Mulish", lineHeight: "44px", textAlign: "center" }}>
                ${props.pricepackage.price}
            </p>
            <p className='text-14' style={{ color: "var(--lightGrey)", margin: "16px 0 22px", lineHeight: "18px", textAlign: "center" }}>
                {props.pricepackage.description}
            </p>
            <p style={{ textAlign: "center" }}>
                <MuiButton disabled={props.pricepackage.name === "Trial"}
                    size='medium' variant='contained'
                    onClickHandler={() => props.onOrder(props.pricepackage)}
                >
                    <span className='text-16' style={{color: "var(--lightgreywhite)"}}>Order</span>
                </MuiButton>
            </p>
            {
                options.map((option, index) =>
                    <Grid container key={index} direction="row" justifyContent="flex-start" alignItems="center" gap='15px' sx={{ margin: "10px 0" }} >
                        <Grid item>
                            <CheckIcon sx={{ fill: 'var(--lightGrey)' }} />
                        </Grid>
                        <Grid item sx={{ width: "calc(100% - 70px)" }}>
                            <span className='text-14'>{option}</span>
                        </Grid>
                    </Grid>
                )
            }
        </Paper>
    )
}
