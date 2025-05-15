import { OrderType } from "./common/orderType"
import { ISearchParams } from "./common/searchParams"

export interface ICity {
    id?: string
    name: string
    state: string
    fullName: string
    latitude: number
    longitude: number
}

export interface CityState {
    citySearchParams: ISearchParams<ICity>
    loading: boolean
    error: null | string
}

export enum CityActionTypes {
    GET_CITIES = "GET_CITIES",
    GET_CITY_BY_ID = "GET_CITY_BY_ID",
    SET_CITY_ERROR = "SET_CITY_ERROR",
    SET_CITY_LOADING = "SET_CITY_LOADING",
    SET_CITY_PAGE = "SET_CITY_PAGE",
    SET_CITY_FILTER = "SET_CITY_FILTER",
    SET_CITY_SORTFIELD = "SET_CITY_SORTFIELD",
    SET_CITY_SORT = "SET_CITY_SORT",
    CREATE_CITY = "CREATE_CITY",
    UPDATE_CITY = "UPDATE_CITY",
    REMOVE_CITY = "REMOVE_CITY"
}

interface GetCitysAction {
    type: CityActionTypes.GET_CITIES
    payload: ISearchParams<ICity>
}

interface GetCityByIdAction {
    type: CityActionTypes.GET_CITY_BY_ID
    payload: ICity
}

interface SetCityErrorAction {
    type: CityActionTypes.SET_CITY_ERROR
    payload: null | string
}

interface SetCityLoadingAction {
    type: CityActionTypes.SET_CITY_LOADING
    payload: boolean
}

interface SetCityPageAction {
    type: CityActionTypes.SET_CITY_PAGE
    payload: number
}

interface SetCityFilterAction {
    type: CityActionTypes.SET_CITY_FILTER
    payload: string
}

interface SetCitySortField {
    type: CityActionTypes.SET_CITY_SORTFIELD
    payload: string
}

interface SetCitySort {
    type: CityActionTypes.SET_CITY_SORT
    payload: OrderType
}

interface CreateCityAction {
    type: CityActionTypes.CREATE_CITY
    payload: ICity
}

interface UpdateCityAction {
    type: CityActionTypes.UPDATE_CITY
    payload: ICity
}

interface RemoveCityAction {
    type: CityActionTypes.REMOVE_CITY
    payload: string
}

export type CityAction = GetCitysAction |
    GetCityByIdAction |
    SetCityErrorAction |
    SetCityLoadingAction |
    SetCityPageAction |
    SetCityFilterAction |
    SetCitySortField |
    SetCitySort |
    CreateCityAction |
    UpdateCityAction |
    RemoveCityAction