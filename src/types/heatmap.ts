import { Equipment } from "./common/equipment"
import { ISearchParams } from "./common/searchParams"

export interface IHeatmap{
    id: string
    dayType: string
    equipment: Equipment
    heatmapStates: IHeatmapState[]
    updatedAt: Date
}

export interface IHeatmapState {
    id: string
    heatmapId: string
    state: string
    pickupsAmount: number
    sumPickupRates: number
    averagePickupRate: number
    deliveriesAmount: number
    sumDeliveryRates: number
    averageDeliveryRate: number
    ranq: number
}

export interface HeatmapSearchParams extends ISearchParams<IHeatmap> {
    dayType: string
    equipment: Equipment
}