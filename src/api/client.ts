import axios from 'axios'
import { IClient, ClientSearchParams } from '../types/client'

/**
 * Get list of Clients
 * @param clientSearchParams<ClientSearchParams> ClientsSearchParams
 */
export async function getClientsAxios(clientSearchParams: ClientSearchParams): Promise<ClientSearchParams> {
    return (await axios.post(`/client/search`, clientSearchParams)).data
}

/**
 * Get Client specified by identifier
 * @param id<string> Client identifier
 */
export async function getClientByIdAxios(id: string): Promise<IClient> {
    return (await axios.get(`/client/get/${id}`)).data
}

/**
 * Creates a new Client
 * @param client<IClient> object of type IClient
 * @returns<IClient> Created Client
 */
export async function createClientAxios(client: IClient): Promise<IClient> {
    return (await axios.post("/client/create", client)).data
}

/**
 * Sends invitation email to the Client specified by identifier
 * @param id<string> Client identifier
 */
export async function getSendInvitationAxios(id: string): Promise<IClient> {
    return (await axios.get(`/client/sendInvitation/${id}`)).data
}

/**
 * Updates the existing Client
 * @param client<IClient> Object of type IClient
 * @returns<IClient> Updated Client object
 */
export async function updateClientAxios(client: IClient): Promise<IClient> {
    return (await axios.put("/client/update", client)).data
}

/**
 * Delete's the Client specified by identifier
 * @param id<string> Identifier
 */
export async function deleteClientAxios(id: string): Promise<void> {
    return await axios.delete(`/client/delete/${id}`)
}