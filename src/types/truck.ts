import { Equipment } from "./common/equipment"
import { OrderType } from "./common/orderType"
import { ISearchParams } from "./common/searchParams"
import { IDriver } from "./driver"
import { ILoad } from "./load"

export interface ITruck {
    id: string
    name: string
    licensePlate: string
    equipment: Equipment
    costPerMile: number
    avatar?: string
    drivers?: IDriver[]
    loads?: ILoad[]
    truckStatus: TruckStatus
    notes?: string
    userId: string
}

export interface TruckDto {
    id?: string
    name: string
    licensePlate: string
    equipment: Equipment
    avatar?: string
    userId: string
    truckStatus: TruckStatus
    notes?: string
}

export enum TruckStatus {
    All,
    OnRoad,
    Pending,
    Repair
}

export interface ITruckSearchParams extends ISearchParams<ITruck> {
    equipment: Equipment,
    truckStatus: TruckStatus
}

export interface TruckState {
    truckSearchParams: ITruckSearchParams
    loading: boolean
    error: null | string
}

export enum TruckActionTypes {
    GET_TRUCKS = "GET_TRUCKS",
    LOAD_MORE_TRUCKS = "LOAD_MORE_TRUCKS",
    SET_TRUCK_ERROR = "SET_TRUCK_ERROR",
    SET_TRUCK_LOADING = "SET_TRUCK_LOADING",
    SET_TRUCK_PAGE = "SET_TRUCK_PAGE",
    SET_TRUCK_FILTER = "SET_TRUCK_FILTER",
    SET_TRUCK_SORTFIELD = "SET_TRUCK_SORTFIELD",
    SET_TRUCK_SORT = "SET_TRUCK_SORT",
    SET_TRUCK_EQUIPMENT = "SET_TRUCK_EQUIPMENT",
    SET_TRUCK_STATUS = "SET_TRUCK_STATUS",
    SET_TRUCK_USERID = "SET_TRUCK_USERID",
    CREATE_TRUCK = "CREATE_TRUCK",
    UPDATE_TRUCK = "UPDATE_TRUCK",
    REMOVE_TRUCK = "REMOVE_TRUCK"
}

interface GetTrucksAction {
    type: TruckActionTypes.GET_TRUCKS
    payload: ITruckSearchParams
}

interface LoadMoreTrucksAction {
    type: TruckActionTypes.LOAD_MORE_TRUCKS
    payload: ITruckSearchParams
}

interface SetTruckErrorAction {
    type: TruckActionTypes.SET_TRUCK_ERROR
    payload: null | string
}

interface SetTruckLoadingAction {
    type: TruckActionTypes.SET_TRUCK_LOADING
    payload: boolean
}

interface SetTruckPageAction {
    type: TruckActionTypes.SET_TRUCK_PAGE
    payload: number
}

interface SetTruckFilterAction {
    type: TruckActionTypes.SET_TRUCK_FILTER
    payload: string
}

interface SetTruckSortField {
    type: TruckActionTypes.SET_TRUCK_SORTFIELD
    payload: string
}

interface SetTruckSort {
    type: TruckActionTypes.SET_TRUCK_SORT
    payload: OrderType
}

interface SetTruckEquipment {
    type: TruckActionTypes.SET_TRUCK_EQUIPMENT
    payload: Equipment
}

interface SetTruckStatus {
    type: TruckActionTypes.SET_TRUCK_STATUS
    payload: TruckStatus
}

interface SetTruckUserId {
    type: TruckActionTypes.SET_TRUCK_USERID
    payload: string
}


interface CreateTruckAction {
    type: TruckActionTypes.CREATE_TRUCK
    payload: ITruck
}

interface UpdateTruckAction {
    type: TruckActionTypes.UPDATE_TRUCK
    payload: ITruck
}

interface RemoveTruckAction {
    type: TruckActionTypes.REMOVE_TRUCK
    payload: string
}

export type TruckAction = GetTrucksAction |
    LoadMoreTrucksAction |
    SetTruckErrorAction |
    SetTruckLoadingAction |
    SetTruckPageAction |
    SetTruckFilterAction |
    SetTruckSortField |
    SetTruckSort |
    SetTruckEquipment |
    SetTruckStatus |
    SetTruckUserId |
    CreateTruckAction |
    UpdateTruckAction |
    RemoveTruckAction