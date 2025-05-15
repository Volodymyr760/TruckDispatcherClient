import { Dispatch } from "redux"
import { searchImportLoadsAxios } from "../../api/importload"
import { OrderType } from "../../types/common/orderType"
import { IImportLoad, ImportLoadAction, ImportLoadActionTypes } from "../../types/importload"
import { ImportLoadSearchParams } from "../../types/importload"
import { TruckDto } from "../../types/truck"
import { ICity } from "../../types/city"

export const resetImportLoads = (importLoadSearchParams: ImportLoadSearchParams) => {
    return async (dispatch: Dispatch<ImportLoadAction>) =>
        dispatch({ type: ImportLoadActionTypes.RESET_IMPORTLOADS, payload: importLoadSearchParams })
}

export const searchImportLoads = ( importLoadSearchParams: ImportLoadSearchParams, pickupDate: Date) => {
    return async (dispatch: Dispatch<ImportLoadAction>) => {
        try {
            dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_LOADING, payload: true })
            dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_ERROR, payload: null })
            const result = await searchImportLoadsAxios({
                pageSize: importLoadSearchParams.pageSize,
                currentPage: importLoadSearchParams.currentPage,
                searchCriteria: '',
                userId: '',
                includeNavProperties: true,
                sortField: importLoadSearchParams.sortField,
                order: importLoadSearchParams.order,
                itemList: [],
                pageCount: 0,
                totalItemsCount: 0,
                origin: importLoadSearchParams.origin,
                destination: importLoadSearchParams.destination,
                truck: importLoadSearchParams.truck,
                pickupStartDate: pickupDate,
                deadhead: importLoadSearchParams.deadhead,
                milesMin: importLoadSearchParams.milesMin,
                milesMax: importLoadSearchParams.milesMax,
            })
            dispatch({ type: ImportLoadActionTypes.GET_IMPORTLOADS, payload: result })
        } catch (error) {
            dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_ERROR, payload: error.message || "Error of searching loads." })
        } finally {
            dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_LOADING, payload: false })
        }
    }
}

export const loadMoreImportLoads = (importLoadSearchParams: ImportLoadSearchParams) => {
    return async (dispatch: Dispatch<ImportLoadAction>) => {
        try {
            dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_LOADING, payload: true })
            dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_ERROR, payload: null })
            dispatch({ type: ImportLoadActionTypes.LOAD_MORE_IMPORTLOADS, payload: await searchImportLoadsAxios(importLoadSearchParams) })
        } catch (error) {
            dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_ERROR, payload: error.message || "Error of searching loads." })
        } finally {
            dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_LOADING, payload: false })
        }
    }
}

export const setImportLoads = (importLoads: IImportLoad[]) => {
    return async (dispatch: Dispatch<ImportLoadAction>) =>
        dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOADS, payload: importLoads })
}

export const setImportLoadLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<ImportLoadAction>) =>
        dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_LOADING, payload: isLoading })
}

export const setImportLoadError = (message: string) => {
    return async (dispatch: Dispatch<ImportLoadAction>) =>
        dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_ERROR, payload: message })
}

export const setImportLoadPage = (page: number) => {
    return async (dispatch: Dispatch<ImportLoadAction>) =>
        dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_PAGE, payload: page })
}

export const setImportLoadSortfield = (sortField: string) => {
    return async (dispatch: Dispatch<ImportLoadAction>) =>
        dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_SORTFIELD, payload: sortField })
}

export const setImportLoadSort = (sort: OrderType) => {
    return async (dispatch: Dispatch<ImportLoadAction>) =>
        dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_SORT, payload: sort })
}

export const setImportLoadTruck = (truck: TruckDto) => {
    return async (dispatch: Dispatch<ImportLoadAction>) =>
        dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_TRUCK, payload: truck })
}

export const setImportLoadPickupStartDate = (pickupDate: Date) => {
    return async (dispatch: Dispatch<ImportLoadAction>) =>
        dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_PICKUP_STARTDATE, payload: pickupDate })
}

export const setImportLoadOrigin = (city: ICity) => {
    return async (dispatch: Dispatch<ImportLoadAction>) =>
        dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_ORIGIN, payload: city })
}

export const setImportLoadDestination = (city: ICity) => {
    return async (dispatch: Dispatch<ImportLoadAction>) =>
        dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_DESTINATION, payload: city })
}

export const setImportLoadDeadhead = (deadhead: number) => {
    return async (dispatch: Dispatch<ImportLoadAction>) =>
        dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_DEADHEAD, payload: deadhead })
}

export const setImportLoadMilesMin = (milesMin: number) => {
    return async (dispatch: Dispatch<ImportLoadAction>) =>
        dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_MILES_MIN, payload: milesMin })
}

export const setImportLoadMilesMax = (milesMax: number) => {
    return async (dispatch: Dispatch<ImportLoadAction>) =>
        dispatch({ type: ImportLoadActionTypes.SET_IMPORTLOAD_MILES_MAX, payload: milesMax })
}

export const removeImportLoadFromSearch = (id: string) => {
    return async (dispatch: Dispatch<ImportLoadAction>) =>
        dispatch({ type: ImportLoadActionTypes.REMOVE_IMPORTLOAD_FROM_SEARCH, payload: id })
}