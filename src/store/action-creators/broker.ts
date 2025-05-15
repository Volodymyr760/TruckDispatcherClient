import { Dispatch } from "redux"
import { searchBrokersAxios, updateBrokerAxios, createBrokerAxios } from "../../api/broker"
import { OrderType } from "../../types/common/orderType"
import { IBroker, BrokerAction, BrokerActionTypes } from "../../types/broker"
import { ISearchParams } from "../../types/common/searchParams"

export const searchBrokers = ( BrokersSearchParams: ISearchParams<IBroker>) => {
    return async (dispatch: Dispatch<BrokerAction>) => {
        try {
            dispatch({ type: BrokerActionTypes.SET_BROKER_LOADING, payload: true })
            dispatch({ type: BrokerActionTypes.SET_BROKER_ERROR, payload: null })
            dispatch({ type: BrokerActionTypes.GET_BROKERS, payload: await searchBrokersAxios(BrokersSearchParams) })
        } catch (error) {
            dispatch({ type: BrokerActionTypes.SET_BROKER_ERROR, payload: error.message || "Error of loading Brokers." })
        } finally {
            dispatch({ type: BrokerActionTypes.SET_BROKER_LOADING, payload: false })
        }
    }
}

export const loadMoreBrokers = ( BrokersSearchParams: ISearchParams<IBroker>) => {
    return async (dispatch: Dispatch<BrokerAction>) => {
        try {
            dispatch({ type: BrokerActionTypes.SET_BROKER_LOADING, payload: true })
            dispatch({ type: BrokerActionTypes.SET_BROKER_ERROR, payload: null })
            dispatch({ type: BrokerActionTypes.LOAD_MORE_BROKERS, payload: await searchBrokersAxios(BrokersSearchParams) })
        } catch (error) {
            dispatch({ type: BrokerActionTypes.SET_BROKER_ERROR, payload: error.message || "Error of loading Brokers." })
        } finally {
            dispatch({ type: BrokerActionTypes.SET_BROKER_LOADING, payload: false })
        }
    }
}

export const setBrokerLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<BrokerAction>) =>
        dispatch({ type: BrokerActionTypes.SET_BROKER_LOADING, payload: isLoading })
}

export const setBrokerError = (message: string) => {
    return async (dispatch: Dispatch<BrokerAction>) =>
        dispatch({ type: BrokerActionTypes.SET_BROKER_ERROR, payload: message })
}

export const setBrokerPage = (page: number) => {
    return async (dispatch: Dispatch<BrokerAction>) =>
        dispatch({ type: BrokerActionTypes.SET_BROKER_PAGE, payload: page })
}

export const setBrokerSearchCriteria = (search: string) => {
    return async (dispatch: Dispatch<BrokerAction>) =>
        dispatch({ type: BrokerActionTypes.SET_BROKER_FILTER, payload: search })
}

export const setBrokerSortfield = (sortField: string) => {
    return async (dispatch: Dispatch<BrokerAction>) =>
        dispatch({ type: BrokerActionTypes.SET_BROKER_SORTFIELD, payload: sortField })
}

export const setBrokerSort = (sort: OrderType) => {
    return async (dispatch: Dispatch<BrokerAction>) =>
        dispatch({ type: BrokerActionTypes.SET_BROKER_SORT, payload: sort })
}

export const createBroker = (Broker: IBroker) => {
    return async (dispatch: Dispatch<BrokerAction>) => {
        try {
            dispatch({ type: BrokerActionTypes.SET_BROKER_LOADING, payload: true })
            dispatch({ type: BrokerActionTypes.SET_BROKER_ERROR, payload: null })
            const BrokerToCreate = await createBrokerAxios(Broker)
            dispatch({ type: BrokerActionTypes.CREATE_BROKER, payload: BrokerToCreate })
        } catch (error) {
            dispatch({ type: BrokerActionTypes.SET_BROKER_ERROR, payload: error.message || "Error of creating the Broker." })
        } finally {
            dispatch({ type: BrokerActionTypes.SET_BROKER_LOADING, payload: false })
        }
    }
}

export const updateBroker = (Broker: IBroker) => {
    return async (dispatch: Dispatch<BrokerAction>) => {
        try {
            dispatch({ type: BrokerActionTypes.SET_BROKER_LOADING, payload: true })
            dispatch({ type: BrokerActionTypes.SET_BROKER_ERROR, payload: null })
            const BrokerToUpdate = await updateBrokerAxios(Broker)
            dispatch({ type: BrokerActionTypes.UPDATE_BROKER, payload: BrokerToUpdate })
        } catch (error) {
            dispatch({ type: BrokerActionTypes.SET_BROKER_ERROR, payload: error.message || "Error of updating the Broker." })
        } finally {
            dispatch({ type: BrokerActionTypes.SET_BROKER_LOADING, payload: false })
        }
    }
}

export const removeBroker = (id: string) => {
    return async (dispatch: Dispatch<BrokerAction>) => {
        try {
            dispatch({ type: BrokerActionTypes.SET_BROKER_ERROR, payload: null })
            dispatch({ type: BrokerActionTypes.REMOVE_BROKER, payload: id })
        } catch (error) {
            dispatch({ type: BrokerActionTypes.SET_BROKER_ERROR, payload: error.message || "Error while removing the Broker." })
        }
    }
}