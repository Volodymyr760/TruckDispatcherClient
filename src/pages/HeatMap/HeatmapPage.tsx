import { Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { IHeatmap } from "../../types/heatmap"
import { getHeatmapAxios } from "../../api/heatmap"
import { Equipment } from "../../types/common/equipment"
import HeatmapCard from "./HeatmapCard"
import { OrderType } from "../../types/common/orderType"
import { muiTextFieldStyle } from "../../types/common/muiTextFieldStyle"

export default function HeatmapPage(): JSX.Element {
    const [todayHeatmap, setTodayHeatmap] = useState<IHeatmap>(null)
    const [tomorrowHeatmap, setTomorrowHeatmap] = useState<IHeatmap>(null)
    const [equipment, setEquipment] = useState<Equipment>(Equipment.Van)
    const equipments: Equipment[] = [Equipment.Van, Equipment.Flatbed, Equipment.Reefer]
    
    const loadHeatmap = async () =>{
        let heatmaSearchResult = {
            pageSize: 25,
            currentPage: 1,
            searchCriteria: '',
            userId: '',
            includeNavProperties: true,
            sortField: "State",
            order: OrderType.Ascending,
            itemList: [],
            pageCount: 0,
            totalItemsCount: 0,
            dayType: "Today",
            equipment: equipment
        }
        const todayResult = await getHeatmapAxios(heatmaSearchResult)
        setTodayHeatmap(todayResult.itemList[0])

        heatmaSearchResult.dayType = "Tomorrow"
        const tomorrowResult = await getHeatmapAxios(heatmaSearchResult)
        setTomorrowHeatmap(tomorrowResult.itemList[0])
    };

    useEffect(() => { 
        loadHeatmap()
        // eslint-disable-next-line
    }, [equipment])

    const onEquipmentFilterChanged = async (event: SelectChangeEvent<Equipment>) => {
        setEquipment(event.target.value as Equipment)
    }
        
    return (
        <>
            <Helmet>
                <title>Truckdispatcher.top - Heatmap</title>
                <meta name="description" content="Advanced truck loads search engine for owner operators and dispatchers - Truckdispatcher.top" />
            </Helmet>
            <Container maxWidth="lg" className='layout-container-searchpage' sx={{minHeight: 200}} >
                <p className="text-20" style={{ textAlign: "center", fontWeight: 600 }}>Supply and Demand Heatmap</p>
                <p className="text-16" >
                    The heatmap displays supply and demand trends across all states based on the number of loads, 
                    their prices and distances published for today and tomorrow.
                </p>
                <p>
                    <span style={{ float: "left", width: '15px', height: '15px', backgroundColor: "var(--darkBlue)" }}></span>
                    <span style={{ float: "left", width: '15px', height: '15px', marginLeft: 10, backgroundColor: "var(--blue)" }}></span>
                    <span style={{ float: "left", width: '15px', height: '15px', marginLeft: 10, backgroundColor: "var(--lightyellow)" }}></span>
                    <span style={{ float: "left", width: '15px', height: '15px', marginLeft: 10, backgroundColor: "var(--orange)" }}></span>
                    <span style={{ float: "left", width: '15px', height: '15px', marginLeft: 10, backgroundColor: "var(--red)" }}></span>
                    <span className="text-16" style={{marginLeft: 10}}> - from a smaller number of loads (with low price and short distance) 
                        to a larger number (with high price and long distance)
                    </span>
                </p>
                <Grid container spacing={2} direction='row' justifyContent={'space-between'} alignItems={'center'}>
                    <Grid item>
                        <p className="text-16" >Equipment:</p>
                    </Grid>
                    <Grid item>
                        <FormControl sx={{minWidth: 100}} fullWidth>
                            <InputLabel id="equipment-label">Equipment</InputLabel>
                            <Select label="Equipment"
                                defaultValue={equipments[0]}
                                onChange={(e) => onEquipmentFilterChanged(e)}
                                sx={{"& .MuiOutlinedInput-input": muiTextFieldStyle}}
                            >
                                {equipments.map((equipment, index) =>
                                <MenuItem key={index} value={equipment} 
                                    sx={{fontSize: "16px", fontFamily: "Mulish", padding: "2px 10px"}}
                                >
                                    {Equipment[equipment]}
                                </MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>
            <Grid container>
                {
                    (todayHeatmap && tomorrowHeatmap) &&
                    todayHeatmap.heatmapStates.map((heatmapState, index) =>
                        <Grid item  xs={12} md={4} 
                            sx={{ padding: "0 !important", marginBottom: "15px" }}
                            display="flex" justifyContent="center" alignItems="center"
                            key={heatmapState.id}
                        >
                            <HeatmapCard key={heatmapState.id} 
                                todayHeatmapState={heatmapState} 
                                tomorrowHeatmapState={tomorrowHeatmap.heatmapStates[index]} 
                            />
                        </Grid>
                    )
                }
            </Grid>
        </>
    )
}
