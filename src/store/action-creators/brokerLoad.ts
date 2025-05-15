import { Dispatch } from "redux"
import { BrokerLoadAction, BrokerLoadActionTypes, BrokerLoadSearchParams } from "../../types/brokerLoad"
import { createImportLoadAxios, deleteImportLoadAxios, getBrokerLoadsAxios, updateImportLoadAxios } from "../../api/importload"
import { Equipment } from "../../types/common/equipment"
import { OrderType } from "../../types/common/orderType"
import { IImportLoad } from "../../types/importload"

export const getBrokerLoads = ( brokerLoadsSearchParams: BrokerLoadSearchParams) => {
    return async (dispatch: Dispatch<BrokerLoadAction>) => {
        try {
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_LOADING, payload: true })
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_ERROR, payload: null })
            dispatch({ type: BrokerLoadActionTypes.GET_BROKERLOADS, payload: 
                await getBrokerLoadsAxios({...brokerLoadsSearchParams, itemList: [], pageCount: 0, totalItemsCount: 0}) 
            })
        } catch (error) {
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_ERROR, payload: error.message || "Error of loading loads." })
        } finally {
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_LOADING, payload: false })
        }
    }
}

export const loadMoreBrokerLoads = (brokerloadsSearchParams: BrokerLoadSearchParams) => {
    return async (dispatch: Dispatch<BrokerLoadAction>) => {
        try {
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_LOADING, payload: true })
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_ERROR, payload: null })
            dispatch({ type: BrokerLoadActionTypes.LOAD_MORE_BROKERLOADS, payload: await getBrokerLoadsAxios(brokerloadsSearchParams) })
        } catch (error) {
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_ERROR, payload: error.message || "Error of loading loads." })
        } finally {
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_LOADING, payload: false })
        }
    }
}

export const setBrokerLoadLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<BrokerLoadAction>) =>
        dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_LOADING, payload: isLoading })
}

export const setBrokerLoadError = (message: string) => {
    return async (dispatch: Dispatch<BrokerLoadAction>) =>
        dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_ERROR, payload: message })
}

export const setBrokerLoadPage = (page: number) => {
    return async (dispatch: Dispatch<BrokerLoadAction>) =>
        dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_PAGE, payload: page })
}

export const setBrokerLoadSearchCriteria = (search: string) => {
    return async (dispatch: Dispatch<BrokerLoadAction>) =>
        dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_FILTER, payload: search })
}

export const setBrokerLoadSortfield = (sortField: string) => {
    return async (dispatch: Dispatch<BrokerLoadAction>) =>
        dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_SORTFIELD, payload: sortField })
}

export const setBrokerLoadSort = (sort: OrderType) => {
    return async (dispatch: Dispatch<BrokerLoadAction>) =>
        dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_SORT, payload: sort })
}

export const setBrokerLoadEquipment = (equipment: Equipment) => {
    return async (dispatch: Dispatch<BrokerLoadAction>) =>
        dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_EQUIPMENT, payload: equipment })
}

export const createBrokerLoad = (load: IImportLoad) => {
    return async (dispatch: Dispatch<BrokerLoadAction>) => {
        try {
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_LOADING, payload: true })
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_ERROR, payload: null })
            dispatch({ type: BrokerLoadActionTypes.CREATE_BROKERLOAD, payload: await createImportLoadAxios(load) })
        } catch (error) {
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_ERROR, payload: error.message || "Error of creating load." })
        } finally {
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_LOADING, payload: false })
        }
    }
}

export const updateBrokerLoad = (load: IImportLoad) => {
    return async (dispatch: Dispatch<BrokerLoadAction>) => {
        try {
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_LOADING, payload: true })
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_ERROR, payload: null })
            dispatch({ type: BrokerLoadActionTypes.UPDATE_BROKERLOAD, payload: await updateImportLoadAxios(load) })
        } catch (error) {
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_ERROR, payload: error.message || "Error of updating the load." })
        } finally {
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_LOADING, payload: false })
        }
    }
}

export const removeBrokerLoad = (id: string) => {
    return async (dispatch: Dispatch<BrokerLoadAction>) => {
        try {
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_ERROR, payload: null })
            dispatch({ type: BrokerLoadActionTypes.REMOVE_BROKERLOAD, payload: id })
            await deleteImportLoadAxios(id);
        } catch (error) {
            dispatch({ type: BrokerLoadActionTypes.SET_BROKERLOAD_ERROR, payload: error.message || "Error while removing the load." })
        }
    }
}