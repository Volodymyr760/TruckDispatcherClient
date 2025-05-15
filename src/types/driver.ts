import { OrderType } from "./common/orderType"
import { ISearchParams } from "./common/searchParams"
import { TruckDto } from "./truck"

export interface IDriver {
    id?: string
    userId: string
    firstName: string
    lastName: string
    phone: string
    email: string
    avatar?: string
    truckId?: string
    truck?: TruckDto
    notes?: string
}

export interface DriverState {
    driverSearchParams: ISearchParams<IDriver>
    loading: boolean
    error: null | string
}

export enum DriverActionTypes {
    GET_DRIVERS = "GET_DRIVERS",
    LOAD_MORE_DRIVERS = "LOAD_MORE_DRIVERS",
    SET_DRIVER_ERROR = "SET_DRIVER_ERROR",
    SET_DRIVER_LOADING = "SET_DRIVER_LOADING",
    SET_DRIVER_PAGE = "SET_DRIVER_PAGE",
    SET_DRIVER_FILTER = "SET_DRIVER_FILTER",
    SET_DRIVER_SORTFIELD = "SET_DRIVER_SORTFIELD",
    SET_DRIVER_SORT = "SET_DRIVER_SORT",
    SET_DRIVER_USERID = "SET_DRIVER_USERID",
    CREATE_DRIVER = "CREATE_DRIVER",
    UPDATE_DRIVER = "UPDATE_DRIVER",
    REMOVE_DRIVER = "REMOVE_DRIVER"
}

interface GetDriversAction {
    type: DriverActionTypes.GET_DRIVERS
    payload: ISearchParams<IDriver>
}

interface LoadMoreDriversAction {
    type: DriverActionTypes.LOAD_MORE_DRIVERS
    payload: ISearchParams<IDriver>
}

interface SetDriverErrorAction {
    type: DriverActionTypes.SET_DRIVER_ERROR
    payload: null | string
}

interface SetDriverLoadingAction {
    type: DriverActionTypes.SET_DRIVER_LOADING
    payload: boolean
}

interface SetDriverPageAction {
    type: DriverActionTypes.SET_DRIVER_PAGE
    payload: number
}

interface SetDriverFilterAction {
    type: DriverActionTypes.SET_DRIVER_FILTER
    payload: string
}

interface SetDriverSortField {
    type: DriverActionTypes.SET_DRIVER_SORTFIELD
    payload: string
}

interface SetDriverSort {
    type: DriverActionTypes.SET_DRIVER_SORT
    payload: OrderType
}

interface SetDriverUserId {
    type: DriverActionTypes.SET_DRIVER_USERID
    payload: string
}

interface CreateDriverAction {
    type: DriverActionTypes.CREATE_DRIVER
    payload: IDriver
}

interface UpdateDriverAction {
    type: DriverActionTypes.UPDATE_DRIVER
    payload: IDriver
}

interface RemoveDriverAction {
    type: DriverActionTypes.REMOVE_DRIVER
    payload: string
}

export type DriverAction = GetDriversAction |
    LoadMoreDriversAction |
    SetDriverErrorAction |
    SetDriverLoadingAction |
    SetDriverPageAction |
    SetDriverFilterAction |
    SetDriverSortField |
    SetDriverSort |
    SetDriverUserId |
    CreateDriverAction |
    UpdateDriverAction |
    RemoveDriverAction