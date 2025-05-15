import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { AverageRates } from './types'
import { Equipment } from '../../../types/common/equipment'
import { getAverageRatesAxios } from '../../../api/importload'
import { Grid, Paper, Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

// Charts are based on https://www.youtube.com/watch?v=6q5d3Z1-5kQ&ab_channel=CodeComplete
export default function AverageRatesCard() {
    const [averageRates, setAverageRates] = useState<AverageRates>(null)

    const averageRatesFromdb = async () =>{
        const result = await getAverageRatesAxios()
        setAverageRates(result)
    };
    
    useEffect(() => { averageRatesFromdb() }, [])

    var startDateTime = new Date()
    var finalDateTime = new Date(startDateTime.getTime() + 86400000); // + 1 day in ms
    
    return (
        <Paper elevation={6} className='price-card' sx={{ overflow: 'hidden', padding: "20px 14px" }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                <Grid item>
                    <span className='text-16' style={{ color: "var(--blue)", fontWeight: 800 }}>AVERAGE RATES</span>
                </Grid>
                <Grid item>
                    <Tooltip title="Average freight rates available today" placement="bottom">
                        <HelpOutlineIcon sx={{ cursor: 'pointer', fill: 'var(--lightGrey)' }}/>
                    </Tooltip>
                </Grid>
            </Grid>
            <div style={{textAlign: "center", margin: "15px 0"}}>
                <span className='text-14' style={{ fontWeight: "bold"  }}>
                    {new Date(Date.now()).toLocaleDateString("en-US", {month: "short", day: "numeric"})} - {finalDateTime.toLocaleDateString("en-US", {month: "short", day: "numeric"})}
                </span>
            </div>
            <div>
                <Bar
                    data={{
                        labels: [Equipment[1], Equipment[2], Equipment[3]],
                        datasets: [
                            {
                                label: "Average Rates, $/mile",
                                data: [
                                    averageRates ? averageRates.flatbedRate : 0, 
                                    averageRates ? averageRates.reeferRate : 0, 
                                    averageRates ? averageRates.vanRate : 0
                                ],
                                backgroundColor: [ "rgba(8, 145, 75, 0.8)", "rgba(255, 180, 0, 0.8)", "rgba(211, 47, 47, 0.8)" ],
                                borderRadius: 5
                            }
                        ]
                    }}
                />
            </div>
        </Paper>
    )
}
