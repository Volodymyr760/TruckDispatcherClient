import { Dispatch } from "redux"
import { getClientsAxios, deleteClientAxios, updateClientAxios, createClientAxios } from "../../api/client"
import { OrderType } from "../../types/common/orderType"
import { IClient, ClientSearchParams, ClientAction, ClientActionTypes, ClientStatus } from "../../types/client"
import { AppRoles } from "../../types/common/appRoles"

export const searchClients = ( clientsSearchParams: ClientSearchParams) => {
    return async (dispatch: Dispatch<ClientAction>) => {
        try {
            dispatch({ type: ClientActionTypes.SET_CLIENT_LOADING, payload: true })
            dispatch({ type: ClientActionTypes.SET_CLIENT_ERROR, payload: null })
            dispatch({ type: ClientActionTypes.GET_CLIENTS, payload: await getClientsAxios(clientsSearchParams) })
        } catch (error) {
            dispatch({ type: ClientActionTypes.SET_CLIENT_ERROR, payload: error.message || "Error of loading clients." })
        } finally {
            dispatch({ type: ClientActionTypes.SET_CLIENT_LOADING, payload: false })
        }
    }
}

export const loadMoreClients = ( clientsSearchParams: ClientSearchParams) => {
    return async (dispatch: Dispatch<ClientAction>) => {
        try {
            dispatch({ type: ClientActionTypes.SET_CLIENT_LOADING, payload: true })
            dispatch({ type: ClientActionTypes.SET_CLIENT_ERROR, payload: null })
            dispatch({ type: ClientActionTypes.LOAD_MORE_CLIENTS, payload: await getClientsAxios(clientsSearchParams) })
        } catch (error) {
            dispatch({ type: ClientActionTypes.SET_CLIENT_ERROR, payload: error.message || "Error of loading clients." })
        } finally {
            dispatch({ type: ClientActionTypes.SET_CLIENT_LOADING, payload: false })
        }
    }
}

export const setClientLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<ClientAction>) =>
        dispatch({ type: ClientActionTypes.SET_CLIENT_LOADING, payload: isLoading })
}

export const setClientError = (message: string) => {
    return async (dispatch: Dispatch<ClientAction>) =>
        dispatch({ type: ClientActionTypes.SET_CLIENT_ERROR, payload: message })
}

export const setClientPage = (page: number) => {
    return async (dispatch: Dispatch<ClientAction>) =>
        dispatch({ type: ClientActionTypes.SET_CLIENT_PAGE, payload: page })
}

export const setClientSearchCriteria = (search: string) => {
    return async (dispatch: Dispatch<ClientAction>) =>
        dispatch({ type: ClientActionTypes.SET_CLIENT_FILTER, payload: search })
}

export const setClientSortfield = (sortField: string) => {
    return async (dispatch: Dispatch<ClientAction>) =>
        dispatch({ type: ClientActionTypes.SET_CLIENT_SORTFIELD, payload: sortField })
}

export const setClientSort = (sort: OrderType) => {
    return async (dispatch: Dispatch<ClientAction>) =>
        dispatch({ type: ClientActionTypes.SET_CLIENT_SORT, payload: sort })
}

export const setClientAppRole = (appRole: AppRoles) => {
    return async (dispatch: Dispatch<ClientAction>) =>
        dispatch({ type: ClientActionTypes.SET_CLIENT_APPROLE, payload: appRole })
}

export const setClientStatus = (clientStatus: ClientStatus) => {
    return async (dispatch: Dispatch<ClientAction>) =>
        dispatch({ type: ClientActionTypes.SET_CLIENT_STATUS, payload: clientStatus })
}

export const createClient = (client: IClient) => {
    return async (dispatch: Dispatch<ClientAction>) => {
        try {
            dispatch({ type: ClientActionTypes.SET_CLIENT_LOADING, payload: true })
            dispatch({ type: ClientActionTypes.SET_CLIENT_ERROR, payload: null })
            dispatch({ type: ClientActionTypes.CREATE_CLIENT, payload: await createClientAxios(client) })
        } catch (error) {
            dispatch({ type: ClientActionTypes.SET_CLIENT_ERROR, payload: error.message || "Error of creating the client." })
        } finally {
            dispatch({ type: ClientActionTypes.SET_CLIENT_LOADING, payload: false })
        }
    }
}

export const updateClient = (client: IClient) => {
    return async (dispatch: Dispatch<ClientAction>) => {
        try {
            dispatch({ type: ClientActionTypes.SET_CLIENT_LOADING, payload: true })
            dispatch({ type: ClientActionTypes.SET_CLIENT_ERROR, payload: null })
            dispatch({ type: ClientActionTypes.UPDATE_CLIENT, payload: await updateClientAxios(client) })
        } catch (error) {
            dispatch({ type: ClientActionTypes.SET_CLIENT_ERROR, payload: error.message || "Error of updating the client." })
        } finally {
            dispatch({ type: ClientActionTypes.SET_CLIENT_LOADING, payload: false })
        }
    }
}

export const removeClient = (id: string) => {
    return async (dispatch: Dispatch<ClientAction>) => {
        try {
            dispatch({ type: ClientActionTypes.SET_CLIENT_ERROR, payload: null })
            await deleteClientAxios(id)
            dispatch({ type: ClientActionTypes.REMOVE_CLIENT, payload: id })
        } catch (error) {
            dispatch({ type: ClientActionTypes.SET_CLIENT_ERROR, payload: error.message || "Error while removing the client." })
        } 
    }
}