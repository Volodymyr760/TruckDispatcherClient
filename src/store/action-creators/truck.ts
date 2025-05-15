import { Dispatch } from "redux"
import { getTrucksAxios, deleteTruckAxios, updateTruckAxios, createTruckAxios } from "../../api/truck"
import { OrderType } from "../../types/common/orderType"
import { ITruck, ITruckSearchParams, TruckAction, TruckActionTypes, TruckStatus } from "../../types/truck"
import { Equipment } from "../../types/common/equipment"

export const searchTrucks = ( trucksSearchParams: ITruckSearchParams) => {
    return async (dispatch: Dispatch<TruckAction>) => {
        try {
            dispatch({ type: TruckActionTypes.SET_TRUCK_LOADING, payload: true })
            dispatch({ type: TruckActionTypes.SET_TRUCK_ERROR, payload: null })
            dispatch({ type: TruckActionTypes.GET_TRUCKS, payload: await getTrucksAxios(trucksSearchParams) })
        } catch (error) {
            dispatch({ type: TruckActionTypes.SET_TRUCK_ERROR, payload: error.message || "Error of loading trucks." })
        } finally {
            dispatch({ type: TruckActionTypes.SET_TRUCK_LOADING, payload: false })
        }
    }
}

export const loadMoreTrucks = ( trucksSearchParams: ITruckSearchParams) => {
    return async (dispatch: Dispatch<TruckAction>) => {
        try {
            dispatch({ type: TruckActionTypes.SET_TRUCK_LOADING, payload: true })
            dispatch({ type: TruckActionTypes.SET_TRUCK_ERROR, payload: null })
            dispatch({ type: TruckActionTypes.LOAD_MORE_TRUCKS, payload: await getTrucksAxios(trucksSearchParams) })
        } catch (error) {
            dispatch({ type: TruckActionTypes.SET_TRUCK_ERROR, payload: error.message || "Error of loading trucks." })
        } finally {
            dispatch({ type: TruckActionTypes.SET_TRUCK_LOADING, payload: false })
        }
    }
}

export const setTruckLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<TruckAction>) =>
        dispatch({ type: TruckActionTypes.SET_TRUCK_LOADING, payload: isLoading })
}

export const setTruckError = (message: string) => {
    return async (dispatch: Dispatch<TruckAction>) =>
        dispatch({ type: TruckActionTypes.SET_TRUCK_ERROR, payload: message })
}

export const setTruckPage = (page: number) => {
    return async (dispatch: Dispatch<TruckAction>) =>
        dispatch({ type: TruckActionTypes.SET_TRUCK_PAGE, payload: page })
}

export const setTruckSearchCriteria = (search: string) => {
    return async (dispatch: Dispatch<TruckAction>) =>
        dispatch({ type: TruckActionTypes.SET_TRUCK_FILTER, payload: search })
}

export const setTruckSortfield = (sortField: string) => {
    return async (dispatch: Dispatch<TruckAction>) =>
        dispatch({ type: TruckActionTypes.SET_TRUCK_SORTFIELD, payload: sortField })
}

export const setTruckSort = (sort: OrderType) => {
    return async (dispatch: Dispatch<TruckAction>) =>
        dispatch({ type: TruckActionTypes.SET_TRUCK_SORT, payload: sort })
}

export const setTruckEquipment = (equipment: Equipment) => {
    return async (dispatch: Dispatch<TruckAction>) =>
        dispatch({ type: TruckActionTypes.SET_TRUCK_EQUIPMENT, payload: equipment })
}

export const setTruckStatus = (truckStatus: TruckStatus) => {
    return async (dispatch: Dispatch<TruckAction>) =>
        dispatch({ type: TruckActionTypes.SET_TRUCK_STATUS, payload: truckStatus })
}

export const setTruckUserId = (userId: string) => {
    return async (dispatch: Dispatch<TruckAction>) =>
        dispatch({ type: TruckActionTypes.SET_TRUCK_USERID, payload: userId })
}

export const createTruck = (truck: ITruck) => {
    return async (dispatch: Dispatch<TruckAction>) => {
        try {
            dispatch({ type: TruckActionTypes.SET_TRUCK_LOADING, payload: true })
            dispatch({ type: TruckActionTypes.SET_TRUCK_ERROR, payload: null })
            dispatch({ type: TruckActionTypes.CREATE_TRUCK, payload: await createTruckAxios(truck) })
        } catch (error) {
            dispatch({ type: TruckActionTypes.SET_TRUCK_ERROR, payload: error.message || "Error of creating the truck." })
        } finally {
            dispatch({ type: TruckActionTypes.SET_TRUCK_LOADING, payload: false })
        }
    }
}

export const updateTruck = (truck: ITruck) => {
    return async (dispatch: Dispatch<TruckAction>) => {
        try {
            dispatch({ type: TruckActionTypes.SET_TRUCK_LOADING, payload: true })
            dispatch({ type: TruckActionTypes.SET_TRUCK_ERROR, payload: null })
            dispatch({ type: TruckActionTypes.UPDATE_TRUCK, payload: await updateTruckAxios(truck) })
        } catch (error) {
            dispatch({ type: TruckActionTypes.SET_TRUCK_ERROR, payload: error.message || "Error of updating the truck." })
        } finally {
            dispatch({ type: TruckActionTypes.SET_TRUCK_LOADING, payload: false })
        }
    }
}

export const removeTruck = (id: string) => {
    return async (dispatch: Dispatch<TruckAction>) => {
        try {
            dispatch({ type: TruckActionTypes.SET_TRUCK_ERROR, payload: null })
            await deleteTruckAxios(id)
            dispatch({ type: TruckActionTypes.REMOVE_TRUCK, payload: id })
        } catch (error) {
            dispatch({ type: TruckActionTypes.SET_TRUCK_ERROR, payload: error.message || "Error while removing the truck." })
        } 
    }
}