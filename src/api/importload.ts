import axios from 'axios'
import { AverageRates } from '../pages/Carrier/Dashboard/types'
import { BrokerLoadSearchParams } from '../types/brokerLoad'
import { ImportLoadSearchParams } from '../types/importload'
import { IImportLoad } from '../types/importload'

/**
 * Gets search list of ImportLoads
 * @param brokerLoadsSearchParams<Search BrokerLoadParams> SearchImportLoad Params
 */
export async function getBrokerLoadsAxios(brokerLoadsSearchParams: BrokerLoadSearchParams): Promise<BrokerLoadSearchParams> {
    return (await axios.post(`/importLoad/get`, brokerLoadsSearchParams)).data
}

/**
 * Gets search list of ImportLoads
 * @param importLoadsSearchParams Search ImportLoad Params
 */
export async function searchImportLoadsAxios(importLoadsSearchParams: ImportLoadSearchParams): Promise<ImportLoadSearchParams> {
    return (await axios.post(`/importLoad/search`, importLoadsSearchParams)).data
}

/**
 * Get average rates of ImportLoads for all equipment types for today
 */
export async function getAverageRatesAxios(): Promise<AverageRates> {
    return (await axios.get("/importLoad/getAverageRates")).data
}

/**
 * Uploads TruckSmarter Loads
 * @param importLoads<File> file to upload
 * @returns<void>
 */
export async function uploadLoadCentralLoadsAxios(importLoads: File): Promise<void> {
    let formData: FormData = new FormData()
    formData.append('file', importLoads)
    return await axios.post(`importLoad/importLoadCentralLoads`, formData)
}

/**
 * Uploads TruckSmarter Loads
 * @param importLoads<File> file to upload
 * @returns<void>
 */
export async function uploadTruckSmarterLoadsAxios(importLoads: File): Promise<void> {
    let formData: FormData = new FormData()
    formData.append('file', importLoads)
    return await axios.post(`importLoad/importTruckSmarterLoads`, formData)
}

/**
 * Creates a new ImportLoad
 * @param importLoad<IImportLoad> object of type IImportLoad
 * @returns<IImportLoad> Created ImportLoad
 */
export async function createImportLoadAxios(importLoad: IImportLoad): Promise<IImportLoad> {
    return (await axios.post("/importLoad/create", importLoad)).data
}

/**
 * Updates the existing ImportLoad
 * @param importLoad<IImportLoad> Object of type IImportLoad
 * @returns<IImportLoad> Updated ImportLoad object
 */
export async function updateImportLoadAxios(importLoad: IImportLoad): Promise<IImportLoad> {
    return (await axios.put("/importLoad/update", importLoad)).data
}

/**
 * Delete's the ImportLoad specified by identifier
 * @param id<string> Identifier
 */
export async function deleteImportLoadAxios(id: string): Promise<void> {
    return await axios.delete(`/importLoad/delete?id=${id}`)
}

/**
 * Delete's ImportLoads duplicated by ReferenceId & Equipment
 */
export async function deleteDuplicatedImportLoadAxios(): Promise<void> {
    return await axios.delete(`/importLoad/deleteDuplicates`)
}

/**
 * Delete's all ImportLoads with pickup before current datetime
 */
export async function deleteLegacyImportLoadAxios(): Promise<void> {
    return await axios.delete(`/importLoad/deleteLegacy`)
}