import { Dispatch } from "redux"
import { searchDriversAxios, updateDriverAxios, createDriverAxios } from "../../api/driver"
import { OrderType } from "../../types/common/orderType"
import { IDriver, DriverAction, DriverActionTypes } from "../../types/driver"
import { ISearchParams } from "../../types/common/searchParams"

export const searchDrivers = ( driversSearchParams: ISearchParams<IDriver>) => {
    return async (dispatch: Dispatch<DriverAction>) => {
        try {
            dispatch({ type: DriverActionTypes.SET_DRIVER_LOADING, payload: true })
            dispatch({ type: DriverActionTypes.SET_DRIVER_ERROR, payload: null })
            dispatch({ type: DriverActionTypes.GET_DRIVERS, payload: await searchDriversAxios(driversSearchParams) })
        } catch (error) {
            dispatch({ type: DriverActionTypes.SET_DRIVER_ERROR, payload: error.message || "Error of loading drivers." })
        } finally {
            dispatch({ type: DriverActionTypes.SET_DRIVER_LOADING, payload: false })
        }
    }
}

export const loadMoreDrivers = ( driversSearchParams: ISearchParams<IDriver>) => {
    return async (dispatch: Dispatch<DriverAction>) => {
        try {
            dispatch({ type: DriverActionTypes.SET_DRIVER_LOADING, payload: true })
            dispatch({ type: DriverActionTypes.SET_DRIVER_ERROR, payload: null })
            dispatch({ type: DriverActionTypes.LOAD_MORE_DRIVERS, payload: await searchDriversAxios(driversSearchParams) })
        } catch (error) {
            dispatch({ type: DriverActionTypes.SET_DRIVER_ERROR, payload: error.message || "Error of loading drivers." })
        } finally {
            dispatch({ type: DriverActionTypes.SET_DRIVER_LOADING, payload: false })
        }
    }
}

export const setDriverLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<DriverAction>) =>
        dispatch({ type: DriverActionTypes.SET_DRIVER_LOADING, payload: isLoading })
}

export const setDriverError = (message: string) => {
    return async (dispatch: Dispatch<DriverAction>) =>
        dispatch({ type: DriverActionTypes.SET_DRIVER_ERROR, payload: message })
}

export const setDriverPage = (page: number) => {
    return async (dispatch: Dispatch<DriverAction>) =>
        dispatch({ type: DriverActionTypes.SET_DRIVER_PAGE, payload: page })
}

export const setDriverSearchCriteria = (search: string) => {
    return async (dispatch: Dispatch<DriverAction>) =>
        dispatch({ type: DriverActionTypes.SET_DRIVER_FILTER, payload: search })
}

export const setDriverSortfield = (sortField: string) => {
    return async (dispatch: Dispatch<DriverAction>) =>
        dispatch({ type: DriverActionTypes.SET_DRIVER_SORTFIELD, payload: sortField })
}

export const setDriverSort = (sort: OrderType) => {
    return async (dispatch: Dispatch<DriverAction>) =>
        dispatch({ type: DriverActionTypes.SET_DRIVER_SORT, payload: sort })
}

export const setDriverUserId = (userId: string) => {
    return async (dispatch: Dispatch<DriverAction>) =>
        dispatch({ type: DriverActionTypes.SET_DRIVER_USERID, payload: userId })
}

export const createDriver = (driver: IDriver) => {
    return async (dispatch: Dispatch<DriverAction>) => {
        try {
            dispatch({ type: DriverActionTypes.SET_DRIVER_LOADING, payload: true })
            dispatch({ type: DriverActionTypes.SET_DRIVER_ERROR, payload: null })
            const driverToCreate = await createDriverAxios(driver)
            dispatch({ type: DriverActionTypes.CREATE_DRIVER, payload: driverToCreate })
        } catch (error) {
            dispatch({ type: DriverActionTypes.SET_DRIVER_ERROR, payload: error.message || "Error of creating the driver." })
        } finally {
            dispatch({ type: DriverActionTypes.SET_DRIVER_LOADING, payload: false })
        }
    }
}

export const updateDriver = (driver: IDriver) => {
    return async (dispatch: Dispatch<DriverAction>) => {
        try {
            dispatch({ type: DriverActionTypes.SET_DRIVER_LOADING, payload: true })
            dispatch({ type: DriverActionTypes.SET_DRIVER_ERROR, payload: null })
            const driverToUpdate = await updateDriverAxios(driver)
            dispatch({ type: DriverActionTypes.UPDATE_DRIVER, payload: driverToUpdate })
        } catch (error) {
            dispatch({ type: DriverActionTypes.SET_DRIVER_ERROR, payload: error.message || "Error of updating the driver." })
        } finally {
            dispatch({ type: DriverActionTypes.SET_DRIVER_LOADING, payload: false })
        }
    }
}

export const removeDriver = (id: string) => {
    return async (dispatch: Dispatch<DriverAction>) => {
        try {
            dispatch({ type: DriverActionTypes.SET_DRIVER_ERROR, payload: null })
            dispatch({ type: DriverActionTypes.REMOVE_DRIVER, payload: id })
        } catch (error) {
            dispatch({ type: DriverActionTypes.SET_DRIVER_ERROR, payload: error.message || "Error while removing the driver." })
        }
    }
}