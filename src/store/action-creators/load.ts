import { Dispatch } from "redux"
import { getLoadsAxios, getLoadByIdAxios, createLoadAxios, updateLoadAxios } from "../../api/load"
import { OrderType } from "../../types/common/orderType"
import { ILoad, ILoadSearchParams, LoadAction, LoadActionTypes, LoadStatus } from "../../types/load"
import { clonedObject } from "../../hooks/clonedObject"
import { TruckDto } from "../../types/truck"
import { Equipment } from "../../types/common/equipment"

export const searchLoads = ( loadsSearchParams: ILoadSearchParams) => {
    return async (dispatch: Dispatch<LoadAction>) => {
        try {
            dispatch({ type: LoadActionTypes.SET_LOAD_LOADING, payload: true })
            dispatch({ type: LoadActionTypes.SET_LOAD_ERROR, payload: null })
            dispatch({ type: LoadActionTypes.GET_LOADS, payload: 
                await getLoadsAxios({...loadsSearchParams, itemList: [], pageCount: 0, totalItemsCount: 0}) 
            })
        } catch (error) {
            dispatch({ type: LoadActionTypes.SET_LOAD_ERROR, payload: error.message || "Error of loading loads." })
        } finally {
            dispatch({ type: LoadActionTypes.SET_LOAD_LOADING, payload: false })
        }
    }
}

export const getLoadById = (id: string) => {
    return async (dispatch: Dispatch<LoadAction>) => {
        try {
            dispatch({ type: LoadActionTypes.SET_LOAD_LOADING, payload: true })
            dispatch({ type: LoadActionTypes.SET_LOAD_ERROR, payload: null })
            dispatch({ type: LoadActionTypes.GET_LOAD_BY_ID, payload: await getLoadByIdAxios(id) })
        } catch (error) {
            dispatch({ type: LoadActionTypes.SET_LOAD_ERROR, payload: error.message || "Error of loading choosed load." })
        } finally {
            dispatch({ type: LoadActionTypes.SET_LOAD_LOADING, payload: false })
        }
    }
}

export const loadMoreLoads = (loadsSearchParams: ILoadSearchParams) => {
    return async (dispatch: Dispatch<LoadAction>) => {
        try {
            dispatch({ type: LoadActionTypes.SET_LOAD_LOADING, payload: true })
            dispatch({ type: LoadActionTypes.SET_LOAD_ERROR, payload: null })
            dispatch({ type: LoadActionTypes.LOAD_MORE_LOADS, payload: await getLoadsAxios(loadsSearchParams) })
        } catch (error) {
            dispatch({ type: LoadActionTypes.SET_LOAD_ERROR, payload: error.message || "Error of loading loads." })
        } finally {
            dispatch({ type: LoadActionTypes.SET_LOAD_LOADING, payload: false })
        }
    }
}

export const setLoadLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<LoadAction>) =>
        dispatch({ type: LoadActionTypes.SET_LOAD_LOADING, payload: isLoading })
}

export const setLoadError = (message: string) => {
    return async (dispatch: Dispatch<LoadAction>) =>
        dispatch({ type: LoadActionTypes.SET_LOAD_ERROR, payload: message })
}

export const setLoadPage = (page: number) => {
    return async (dispatch: Dispatch<LoadAction>) =>
        dispatch({ type: LoadActionTypes.SET_LOAD_PAGE, payload: page })
}

export const setLoadSearchCriteria = (search: string) => {
    return async (dispatch: Dispatch<LoadAction>) =>
        dispatch({ type: LoadActionTypes.SET_LOAD_FILTER, payload: search })
}

export const setLoadSortfield = (sortField: string) => {
    return async (dispatch: Dispatch<LoadAction>) =>
        dispatch({ type: LoadActionTypes.SET_LOAD_SORTFIELD, payload: sortField })
}

export const setLoadSort = (sort: OrderType) => {
    return async (dispatch: Dispatch<LoadAction>) =>
        dispatch({ type: LoadActionTypes.SET_LOAD_SORT, payload: sort })
}

export const setLoadEquipment = (equipment: Equipment) => {
    return async (dispatch: Dispatch<LoadAction>) =>
        dispatch({ type: LoadActionTypes.SET_LOAD_EQUIPMENT, payload: equipment })
}

export const setLoadStatus = (loadStatus: LoadStatus) => {
    return async (dispatch: Dispatch<LoadAction>) =>
        dispatch({ type: LoadActionTypes.SET_LOAD_STATUS, payload: loadStatus })
}

export const setLoadUserld = (userId: string) => {
    return async (dispatch: Dispatch<LoadAction>) =>
        dispatch({ type: LoadActionTypes.SET_LOAD_USERID, payload: userId })
}

export const createLoad = (load: ILoad) => {
    return async (dispatch: Dispatch<LoadAction>) => {
        try {
            dispatch({ type: LoadActionTypes.SET_LOAD_LOADING, payload: true })
            dispatch({ type: LoadActionTypes.SET_LOAD_ERROR, payload: null })
            let truckToApply: TruckDto = null
            if(load.truck) truckToApply = clonedObject(load.truck)
            load.truck = null
            let loadToCreate = await createLoadAxios(load)
            if(loadToCreate.truckId) loadToCreate.truck = truckToApply
            dispatch({ type: LoadActionTypes.CREATE_LOAD, payload: loadToCreate })
        } catch (error) {
            dispatch({ type: LoadActionTypes.SET_LOAD_ERROR, payload: error.message || "Error of creating load." })
        } finally {
            dispatch({ type: LoadActionTypes.SET_LOAD_LOADING, payload: false })
        }
    }
}

export const createLoadFromImportLoad = (load: ILoad) => {
    return async (dispatch: Dispatch<LoadAction>) => 
        dispatch({ type: LoadActionTypes.CREATE_LOAD, payload: load })
}

export const updateLoad = (load: ILoad) => {
    return async (dispatch: Dispatch<LoadAction>) => {
        try {
            dispatch({ type: LoadActionTypes.SET_LOAD_LOADING, payload: true })
            dispatch({ type: LoadActionTypes.SET_LOAD_ERROR, payload: null })
            dispatch({ type: LoadActionTypes.UPDATE_LOAD, payload: await updateLoadAxios(load) })
        } catch (error) {
            dispatch({ type: LoadActionTypes.SET_LOAD_ERROR, payload: error.message || "Error of updating the load." })
        } finally {
            dispatch({ type: LoadActionTypes.SET_LOAD_LOADING, payload: false })
        }
    }
}

export const removeLoad = (id: string) => {
    return async (dispatch: Dispatch<LoadAction>) => {
        try {
            dispatch({ type: LoadActionTypes.SET_LOAD_ERROR, payload: null })
            dispatch({ type: LoadActionTypes.REMOVE_LOAD, payload: id })
        } catch (error) {
            dispatch({ type: LoadActionTypes.SET_LOAD_ERROR, payload: error.message || "Error while removing the load." })
        }
    }
}