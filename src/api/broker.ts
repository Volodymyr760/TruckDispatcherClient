import axios from 'axios'
import { ISearchParams } from '../types/common/searchParams'
import { IBroker } from '../types/broker'

/**
 * Search list of IBroker
 * @param brokerSearchParams<ISearchParams<IBroker>>> Brokers SearchParams
 */
export async function searchBrokersAxios(brokerSearchParams: ISearchParams<IBroker>): Promise<ISearchParams<IBroker>> {
    return (await axios.post(`/broker/search`, brokerSearchParams)).data
}

/**
 * Creates a new Broker
 * @param Broker<IBroker> object of type IBroker
 * @returns<IBroker> Created Broker
 */
export async function createBrokerAxios(broker: IBroker): Promise<IBroker> {
    return (await axios.post("/broker/create", broker)).data
}

/**
 * Updates the existing Broker
 * @param broker<IBroker> Object of type IBroker
 * @returns<IBroker> Updated Broker object
 */
export async function updateBrokerAxios(broker: IBroker): Promise<IBroker> {
    return (await axios.put("/broker/update", broker)).data
}

/**
 * Delete's the Broker specified by identifier
 * @param id<string> Identifier
 */
export async function deleteBrokerAxios(id: string): Promise<void> {
    return await axios.delete(`/broker/delete?id=${id}`)
}