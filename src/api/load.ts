import axios from 'axios'
import { ILoad, ILoadSearchParams } from '../types/load'
import { EquipmentProfitability, LoadsByStatus, WeekResults } from '../pages/Carrier/Dashboard/types'
import { IPatchDocumentItem } from '../types/common/patchDocument'

/**
 * Get list of Loads
 * @param loadsSearchParams<ILoadSearchParams> Loads SearchParams
 */
export async function getLoadsAxios(loadsSearchParams: ILoadSearchParams): Promise<ILoadSearchParams> {
    return (await axios.post(`/load/search`, loadsSearchParams)).data
}

export async function getEquipmentProfitabilityAxios(userId: string): Promise<EquipmentProfitability> {
    return (await axios.get(`/load/getEquipmentProfitability/${userId}`)).data
}

export async function getLoadsNumbersByStatusAxios(userId: string): Promise<LoadsByStatus> {
    return (await axios.get(`/load/getLoadsNumbersByStatus/${userId}`)).data
}

/**
 * Get Week Results of Loads for all load types (excluding Saved) for last week
 */
export async function getWeekResultsAxios(userId: string): Promise<WeekResults> {
    return (await axios.get(`/load/getWeekResults/${userId}`)).data
}

/**
 * Get Load specified by identifier
 * @param id<string> Load identifier
 */
export async function getLoadByIdAxios(id: string): Promise<ILoad> {
    return (await axios.get(`/load/get/${id}`)).data
}

/**
 * Creates a new Load
 * @param load<ILoad> object of type ILoad
 * @returns<ILoad> Created Load
 */
export async function createLoadAxios(load: ILoad): Promise<ILoad> {
    return (await axios.post("/load/create", load)).data
}

/**
 * Updates the existing Load
 * @param load<ILoad> Object of type ILoad
 * @returns<ILoad> Updated Load object
 */
export async function updateLoadAxios(load: ILoad): Promise<ILoad> {
    return (await axios.put("/load/update", load)).data
}

/**
 * Delete's the Load specified by identifier
 * @param id<string> Identifier
 */
export async function deleteLoadAxios(id: string): Promise<void> {
    return await axios.delete(`/load/delete/${id}`)
}

/**
 * @param id<string> Load identifier
 * @param patchDocument<IPatchDocument> Patch document to update ILoad field
 * @returns<ILoad> Updated ILoad object
 */
export async function partialupdateLoadAxios(id: string, patchDocument: IPatchDocumentItem): Promise<ILoad> {
    return (await axios.patch(`/load/partialupdate/${id}`, [patchDocument])).data
}