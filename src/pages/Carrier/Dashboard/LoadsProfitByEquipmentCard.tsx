import { Bar } from 'react-chartjs-2'
import { Equipment } from '../../../types/common/equipment'
import { EquipmentProfitabilityCardProps } from './types'
import { Grid, Paper, Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

export default function LoadsProfitByEquipmentCard({equipmentProfotability} : EquipmentProfitabilityCardProps) {
    
    return (
        <Paper elevation={6} className='price-card' sx={{ overflow: 'hidden', padding: "20px 14px" }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                <Grid item>
                    <span className='text-16' style={{ color: "var(--blue)", fontWeight: 800 }}>PROFIT</span>
                </Grid>
                <Grid item>
                    <Tooltip title="Profit / Gross of loads in percentage" placement="bottom">
                        <HelpOutlineIcon sx={{ cursor: 'pointer', fill: 'var(--lightGrey)' }}/>
                    </Tooltip>
                </Grid>
            </Grid>
            <div style={{textAlign: "center", margin: "15px 0"}}>
                <span className='text-14' style={{ fontWeight: "bold"  }}>
                    Equipment Profitability, %
                </span>
            </div>
            <div>
                <Bar
                    data={{
                        labels: [Equipment[1], Equipment[2], Equipment[3]],
                        datasets: [
                            {
                                label: "Equipment Profitability",
                                data: [
                                    equipmentProfotability ? equipmentProfotability.flatbed : 0, 
                                    equipmentProfotability ? equipmentProfotability.reefer : 0, 
                                    equipmentProfotability ? equipmentProfotability.van : 0
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
