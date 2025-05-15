import axios from 'axios'
import { ISearchParams } from '../types/common/searchParams'
import { IPricepackage } from '../types/pricepackage'

/**
 * Get list of Pricepackages
 * @param pricepackagesSearchParams<ISearchParams<IPricepackage>>> Pricepackages SearchParams
 */
export async function getPricepackagesAxios(pricepackagesSearchParams: ISearchParams<IPricepackage>): Promise<ISearchParams<IPricepackage>> {
    return (await axios.post(`/pricepackage/search`, pricepackagesSearchParams)).data
}

/**
 * Get Pricepackage specified by identifier
 * @param id<string> Pricepackage identifier
 */
export async function getPricepackageByIdAxios(id: number): Promise<IPricepackage> {
    return (await axios.get(`/pricepackage/get/${id.toString()}`)).data
}

/**
 * Creates a new Pricepackage
 * @param Pricepackage<IPricepackage> object of type IPricepackage
 * @returns<IPricepackage> Created pricepackage
 */
export async function createPricepackageAxios(Pricepackage: IPricepackage): Promise<IPricepackage> {
    return (await axios.post("/pricepackage/create", Pricepackage)).data
}

/**
 * Updates the existing Pricepackage
 * @param Pricepackage<IPricepackage> Object of type IPricepackage
 * @returns<IPricepackage> Updated Pricepackage object
 */
export async function updatePricepackageAxios(Pricepackage: IPricepackage): Promise<IPricepackage> {
    return (await axios.put("/pricepackage/update", Pricepackage)).data
}

/**
 * Delete's the Pricepackage specified by identifier
 * @param id<string> Identifier
 */
export async function removePricepackageAxios(id: string): Promise<void> {
    return await axios.delete(`/pricepackage/delete?id=${id}`)
}