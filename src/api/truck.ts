import axios from 'axios'
import { ITruck, ITruckSearchParams } from '../types/truck'
import { TrucksByStatus } from '../pages/Carrier/Dashboard/types'

/**
 * Get list of Trucks
 * @param trucksSearchParams<ITruckSearchParams> TrucksSearchParams
 */
export async function getTrucksAxios(trucksSearchParams: ITruckSearchParams): Promise<ITruckSearchParams> {
    return (await axios.post(`/truck/search`, trucksSearchParams)).data
}

/**
 * Get Trucks amount By each TruckStatus
 */
export async function getTrucksNumbersByStatusAxios(userId: string): Promise<TrucksByStatus> {
    return (await axios.get(`/truck/getTrucksNumbersByStatus/${userId}`)).data
}

/**
 * Get Truck specified by identifier
 * @param id<string> Truck identifier
 */
export async function getTruckByIdAxios(id: string): Promise<ITruck> {
    return (await axios.get(`/truck/get/${id}`)).data
}

/**
 * Creates a new Truck
 * @param truck<ITruck> object of type ITruck
 * @returns<ITruck> Created Truck
 */
export async function createTruckAxios(truck: ITruck): Promise<ITruck> {
    return (await axios.post("/truck/create", truck)).data
}

/**
 * Updates the existing Truck
 * @param truck<ITruck> Object of type ITruck
 * @returns<ITruck> Updated Truck object
 */
export async function updateTruckAxios(truck: ITruck): Promise<ITruck> {
    return (await axios.put("/truck/update", truck)).data
}

/**
 * Delete's the Truck specified by identifier
 * @param id<string> Identifier
 */
export async function deleteTruckAxios(id: string): Promise<void> {
    return await axios.delete(`/truck/delete/${id}`)
}