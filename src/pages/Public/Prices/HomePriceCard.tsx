
import { IPricepackage } from '../../../types/pricepackage' // '../../types/pricepackage';
import { Grid, Paper, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';

export interface HomePriceCardProps {
    pricepackage: IPricepackage;
}

export default function HomePriceCard({ pricepackage }: HomePriceCardProps) {

    const options: string[] = pricepackage.posibilities.split('|');

    return (
        <Paper elevation={6} className='price-card' sx={{ overflow: 'hidden', padding: "20px 14px" }}>
            <Typography component='p' sx={{ fontSize: "20px", lineHeight: "28px", textAlign: "center" }}>
                {/* {PricePackageType[pricepackage.pricePackageType]} */}
                {pricepackage.name}
            </Typography>
            <Typography component='p' sx={{ color: "#3b78e7", margin: "16px 0 22px", fontSize: "36px", lineHeight: "44px", textAlign: "center" }}>
                ${pricepackage.price}
            </Typography>
            <Typography component='p' sx={{ color: "#5f7c78", margin: "16px 0 22px", fontSize: "13px", lineHeight: "18px", textAlign: "center" }}>
                {pricepackage.description}
            </Typography>
            {
                options.map((option, index) =>
                    <Grid container key={index} direction="row" justifyContent="flex-start" alignItems="center" gap='15px' sx={{ margin: "10px 20px" }} >
                        <Grid item>
                            <CheckIcon sx={{ fill: '#5F7C78' }} />
                        </Grid>
                        <Grid item sx={{ width: "calc(100% - 70px)" }}>
                            <Typography component={'span'} sx={{ fontSize: "14px", lineHeight: "18px" }}>
                                {option}
                            </Typography>
                        </Grid>
                    </Grid>
                )
            }
        </Paper>
    )
}
