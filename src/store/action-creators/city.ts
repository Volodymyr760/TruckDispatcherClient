import { Dispatch } from "redux"
import { getCitiesAxios, getCityByIdAxios } from "../../api/city"
import { OrderType } from "../../types/common/orderType"
import { ICity, CityAction, CityActionTypes } from "../../types/city"
import { ISearchParams } from "../../types/common/searchParams"

export const getCities = ( citiesSearchParams: ISearchParams<ICity>) => {
    return async (dispatch: Dispatch<CityAction>) => {
        try {
            dispatch({ type: CityActionTypes.SET_CITY_LOADING, payload: true })
            dispatch({ type: CityActionTypes.SET_CITY_ERROR, payload: null })
            dispatch({ type: CityActionTypes.GET_CITIES, payload: await getCitiesAxios(citiesSearchParams) })
        } catch (error) {
            dispatch({ type: CityActionTypes.SET_CITY_ERROR, payload: error.message || "Error of loading cities." })
        } finally {
            dispatch({ type: CityActionTypes.SET_CITY_LOADING, payload: false })
        }
    }
}

export const getCityById = (id: string) => {
    return async (dispatch: Dispatch<CityAction>) => {
        try {
            dispatch({ type: CityActionTypes.SET_CITY_LOADING, payload: true })
            dispatch({ type: CityActionTypes.SET_CITY_ERROR, payload: null });
            dispatch({ type: CityActionTypes.GET_CITY_BY_ID, payload: await getCityByIdAxios(id) })
        } catch (error) {
            dispatch({ type: CityActionTypes.SET_CITY_ERROR, payload: error.message || "Error of loading choosed city." })
        } finally {
            dispatch({ type: CityActionTypes.SET_CITY_LOADING, payload: false })
        }
    }
}

export const setCityLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<CityAction>) =>
        dispatch({ type: CityActionTypes.SET_CITY_LOADING, payload: isLoading })
}

export const setCityError = (message: string) => {
    return async (dispatch: Dispatch<CityAction>) =>
        dispatch({ type: CityActionTypes.SET_CITY_ERROR, payload: message })
}

export const setCityPage = (page: number) => {
    return async (dispatch: Dispatch<CityAction>) =>
        dispatch({ type: CityActionTypes.SET_CITY_PAGE, payload: page })
}

export const setCitySearchCriteria = (search: string) => {
    return async (dispatch: Dispatch<CityAction>) =>
        dispatch({ type: CityActionTypes.SET_CITY_FILTER, payload: search })
}

export const setCitySortfield = (sortField: string) => {
    return async (dispatch: Dispatch<CityAction>) =>
        dispatch({ type: CityActionTypes.SET_CITY_SORTFIELD, payload: sortField })
}

export const setCitySort = (sort: OrderType) => {
    return async (dispatch: Dispatch<CityAction>) =>
        dispatch({ type: CityActionTypes.SET_CITY_SORT, payload: sort })
}

export const createCity = (city: ICity) => {
    return async (dispatch: Dispatch<CityAction>) =>
        dispatch({ type: CityActionTypes.CREATE_CITY, payload: city })
}

export const updateCity = (city: ICity) => {
    return async (dispatch: Dispatch<CityAction>) =>
        dispatch({ type: CityActionTypes.UPDATE_CITY, payload: city })
}

export const removeCity = (city: ICity) => {
    return async (dispatch: Dispatch<CityAction>) =>
        dispatch({ type: CityActionTypes.REMOVE_CITY, payload: city.id })
}