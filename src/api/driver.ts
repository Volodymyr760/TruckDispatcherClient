import axios from 'axios'
import { ISearchParams } from '../types/common/searchParams'
import { IDriver } from '../types/driver'

/**
 * Search list of Drivers
 * @param driversSearchParams<ISearchParams<IDriver>>> Drivers SearchParams
 */
export async function searchDriversAxios(driversSearchParams: ISearchParams<IDriver>): Promise<ISearchParams<IDriver>> {
    return (await axios.post(`/driver/search`, driversSearchParams)).data
}

/**
 * Get Driver specified by identifier
 * @param id<string> Driver identifier
 */
export async function getDriverByIdAxios(id: string): Promise<IDriver> {
    return (await axios.get(`/driver/get/${id}`)).data
}

/**
 * Creates a new Driver
 * @param driver<IDriver> object of type IDriver
 * @returns<IDriver> Created Driver
 */
export async function createDriverAxios(driver: IDriver): Promise<IDriver> {
    return (await axios.post("/driver/create", driver)).data
}

/**
 * Updates the existing Driver
 * @param driver<IDriver> Object of type IDriver
 * @returns<IDriver> Updated Driver object
 */
export async function updateDriverAxios(driver: IDriver): Promise<IDriver> {
    return (await axios.put("/driver/update", driver)).data
}

/**
 * Delete's the Driver specified by identifier
 * @param id<string> Identifier
 */
export async function deleteDriverAxios(id: string): Promise<void> {
    return await axios.delete(`/driver/delete?id=${id}`)
}