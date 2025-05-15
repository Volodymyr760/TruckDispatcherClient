import { Equipment } from "./common/equipment"
import { OrderType } from "./common/orderType"
import { ISearchParams } from "./common/searchParams"
import { TruckDto } from "./truck"

export interface ILoad {
    id?: string
    referenceId: string
    origin: string
    destination: string
    pickUp: Date
    delivery: Date
    length: number
    weight: number
    equipment: Equipment
    shipperName: string
    shipperLogo?: string
    shipperEmail?: string
    shipperPhone?: string
    miles: number
    deadheadOrigin: number
    deadheadDestination: number
    rate: number
    ratePerMile: number
    profit: number
    profitPerMile: number
    requirements: string
    loadStatus: LoadStatus
    truckId?: string
    truck?: TruckDto
    userId?: string
}

export enum LoadStatus
{
    All,
    Saved,
    Booked,
    InProgress,
    Completed,
    Payed
}

export interface ILoadSearchParams extends ISearchParams<ILoad> {
    equipment: Equipment,
    loadStatus: LoadStatus
}

export interface LoadState {
    loadSearchParams: ILoadSearchParams
    loading: boolean
    error: null | string
}

export enum LoadActionTypes {
    GET_LOADS = "GET_LOADS",
    GET_LOAD_BY_ID = "GET_LOAD_BY_ID",
    LOAD_MORE_LOADS = "LOAD_MORE_LOADS",
    SET_LOAD_ERROR = "SET_LOAD_ERROR",
    SET_LOAD_LOADING = "SET_LOAD_LOADING",
    SET_LOAD_PAGE = "SET_LOAD_PAGE",
    SET_LOAD_FILTER = "SET_LOAD_FILTER",
    SET_LOAD_SORTFIELD = "SET_LOAD_SORTFIELD",
    SET_LOAD_SORT = "SET_LOAD_SORT",
    SET_LOAD_EQUIPMENT = "SET_LOAD_EQUIPMENT",
    SET_LOAD_STATUS = "SET_LOAD_STATUS",
    SET_LOAD_USERID = "SET_LOAD_USERID",
    CREATE_LOAD = "CREATE_LOAD",
    UPDATE_LOAD = "UPDATE_LOAD",
    REMOVE_LOAD = "REMOVE_LOAD"
}

interface GetLoadsAction {
    type: LoadActionTypes.GET_LOADS
    payload: ILoadSearchParams
}

interface GetLoadByIdAction {
    type: LoadActionTypes.GET_LOAD_BY_ID
    payload: ILoad
}

interface LoadMoreLoadsAction {
    type: LoadActionTypes.LOAD_MORE_LOADS
    payload: ILoadSearchParams
}

interface SetLoadErrorAction {
    type: LoadActionTypes.SET_LOAD_ERROR
    payload: null | string
}

interface SetLoadLoadingAction {
    type: LoadActionTypes.SET_LOAD_LOADING
    payload: boolean
}

interface SetLoadPageAction {
    type: LoadActionTypes.SET_LOAD_PAGE
    payload: number
}

interface SetLoadFilterAction {
    type: LoadActionTypes.SET_LOAD_FILTER
    payload: string
}

interface SetLoadSortField {
    type: LoadActionTypes.SET_LOAD_SORTFIELD
    payload: string
}

interface SetLoadSort {
    type: LoadActionTypes.SET_LOAD_SORT
    payload: OrderType
}
interface SetLoadEquipment {
    type: LoadActionTypes.SET_LOAD_EQUIPMENT
    payload: Equipment
}

interface SetLoadStatus {
    type: LoadActionTypes.SET_LOAD_STATUS
    payload: LoadStatus
}

interface SetLoadUserld {
    type: LoadActionTypes.SET_LOAD_USERID
    payload: string
}

interface CreateLoadAction {
    type: LoadActionTypes.CREATE_LOAD
    payload: ILoad
}

interface UpdateLoadAction {
    type: LoadActionTypes.UPDATE_LOAD
    payload: ILoad
}

interface RemoveLoadAction {
    type: LoadActionTypes.REMOVE_LOAD
    payload: string
}

export type LoadAction = GetLoadsAction |
    GetLoadByIdAction |
    LoadMoreLoadsAction |
    SetLoadErrorAction |
    SetLoadLoadingAction |
    SetLoadPageAction |
    SetLoadFilterAction |
    SetLoadSortField |
    SetLoadSort |
    SetLoadEquipment |
    SetLoadStatus |
    SetLoadUserld |
    CreateLoadAction |
    UpdateLoadAction |
    RemoveLoadAction