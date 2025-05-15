import { Equipment } from "./common/equipment";
import { IImportLoad } from "./importload";
import { OrderType } from "./common/orderType";
import { ISearchParams } from "./common/searchParams";

export interface BrokerLoadSearchParams extends ISearchParams<IImportLoad> {
    equipment: Equipment
}

export interface BrokerLoadState {
    brokerLoadSearchParams: BrokerLoadSearchParams
    loading: boolean
    error: null | string
}

export enum BrokerLoadActionTypes {
    GET_BROKERLOADS = "GET_BROKERLOADS",
    LOAD_MORE_BROKERLOADS = "LOAD_MORE_BROKERLOADS",
    SET_BROKERLOAD_ERROR = "SET_BROKERLOAD_ERROR",
    SET_BROKERLOAD_LOADING = "SET_BROKERLOAD_LOADING",
    SET_BROKERLOAD_FILTER = "SET_BROKERLOAD_FILTER",
    SET_BROKERLOAD_EQUIPMENT = "SET_BROKERLOAD_EQUIPMENT",
    SET_BROKERLOAD_PAGE = "SET_BROKERLOAD_PAGE",
    SET_BROKERLOAD_SORTFIELD = "SET_BROKERLOAD_SORTFIELD",
    SET_BROKERLOAD_SORT = "SET_BROKERLOAD_SORT",
    CREATE_BROKERLOAD = "CREATE_BROKERLOAD",
    UPDATE_BROKERLOAD = "UPDATE_BROKERLOAD",
    REMOVE_BROKERLOAD = "REMOVE_BROKERLOAD"
}

interface GetBrokerLoadsAction {
    type: BrokerLoadActionTypes.GET_BROKERLOADS
    payload: BrokerLoadSearchParams
}

interface LoadMoreBrokerLoadsAction {
    type: BrokerLoadActionTypes.LOAD_MORE_BROKERLOADS
    payload: BrokerLoadSearchParams
}

interface SetBrokerLoadErrorAction {
    type: BrokerLoadActionTypes.SET_BROKERLOAD_ERROR
    payload: null | string
}

interface SetBrokerLoadLoadingAction {
    type: BrokerLoadActionTypes.SET_BROKERLOAD_LOADING
    payload: boolean
}

interface SetBrokerLoadFilterAction {
    type: BrokerLoadActionTypes.SET_BROKERLOAD_FILTER
    payload: string
}

interface SetBrokerLoadEquipmentAction {
    type: BrokerLoadActionTypes.SET_BROKERLOAD_EQUIPMENT
    payload: Equipment
}

interface SetBrokerLoadPageAction {
    type: BrokerLoadActionTypes.SET_BROKERLOAD_PAGE
    payload: number
}

interface SetBrokerLoadSortField {
    type: BrokerLoadActionTypes.SET_BROKERLOAD_SORTFIELD
    payload: string
}

interface SetBrokerLoadSort {
    type: BrokerLoadActionTypes.SET_BROKERLOAD_SORT
    payload: OrderType
}

interface CreateBrokerLoadAction {
    type: BrokerLoadActionTypes.CREATE_BROKERLOAD
    payload: IImportLoad
}

interface UpdateBrokerLoadAction {
    type: BrokerLoadActionTypes.UPDATE_BROKERLOAD
    payload: IImportLoad
}

interface RemoveBrokerLoadAction {
    type: BrokerLoadActionTypes.REMOVE_BROKERLOAD
    payload: string
}

export type BrokerLoadAction = GetBrokerLoadsAction |
    LoadMoreBrokerLoadsAction |
    SetBrokerLoadErrorAction |
    SetBrokerLoadLoadingAction |
    SetBrokerLoadFilterAction |
    SetBrokerLoadEquipmentAction |
    SetBrokerLoadPageAction |
    SetBrokerLoadSortField |
    SetBrokerLoadSort |
    CreateBrokerLoadAction |
    UpdateBrokerLoadAction |
    RemoveBrokerLoadAction