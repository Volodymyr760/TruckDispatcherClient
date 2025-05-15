import axios from 'axios'
import { HeatmapSearchParams } from '../types/heatmap'

export async function getHeatmapAxios(heatmapSearchParams: HeatmapSearchParams): Promise<HeatmapSearchParams> {
    return (await axios.post(`/heatmap/search`, heatmapSearchParams)).data
}

export async function generateHeatmapAxios(): Promise<void> {
    return (await axios.get(`/heatmap/generate/`))
}