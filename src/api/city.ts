import axios from 'axios'
import { ISearchParams } from '../types/common/searchParams'
import { ICity } from '../types/city'

/**
 * Get list of Cities
 * @param citiesSearchParams<ISearchParams<ICity>>> Cities SearchParams
 */
export async function getCitiesAxios(citiesSearchParams: ISearchParams<ICity>): Promise<ISearchParams<ICity>> {
    return (await axios.post(`/city/search`, citiesSearchParams)).data
}

/**
 * Get City specified by identifier
 * @param id<string> City identifier
 */
export async function getCityByIdAxios(id: string): Promise<ICity> {
    return (await axios.get(`/city/get/${id}`)).data
}

/**
 * Get City specified by full name (including state)
 * @param name<string>Full name of the city
 */
export async function getCityByFullnameAxios(name: string): Promise<ICity> {
    return (await axios.get(`/city/getByName/${name}`)).data
}

/**
 * Creates a new City
 * @param city<ICity> object of type ICity
 * @returns<ICity> Created City
 */
export async function createCityAxios(city: ICity): Promise<ICity> {
    return (await axios.post("/city/create", city)).data
}

/**
 * Updates the existing City
 * @param city<ICity> Object of type ICity
 * @returns<ICity> Updated City object
 */
export async function updateCityAxios(city: ICity): Promise<ICity> {
    return (await axios.put("/city/update", city)).data
}

/**
 * Delete's the City specified by identifier
 * @param id<string> Identifier
 */
export async function deleteCityAxios(id: string): Promise<void> {
    return await axios.delete(`/city/delete?id=${id}`)
}