import { OrderType } from "./common/orderType"
import { ISearchParams } from "./common/searchParams"

export interface IBroker {
    id: string
    parserName: string
    name: string
    shortName: string
    logo?: string
    email: string
    phone: string
    dotNumber: string
    mcNumber: string
    notes?: string
}

export interface BrokersState {
    brokerSearchParams: ISearchParams<IBroker>
    loading: boolean
    error: null | string
}

export enum BrokerActionTypes {
    GET_BROKERS = "GET_BROKERS",
    LOAD_MORE_BROKERS = "LOAD_MORE_BROKERS",
    SET_BROKER_ERROR = "SET_BROKER_ERROR",
    SET_BROKER_LOADING = "SET_BROKER_LOADING",
    SET_BROKER_PAGE = "SET_BROKER_PAGE",
    SET_BROKER_FILTER = "SET_BROKER_FILTER",
    SET_BROKER_SORTFIELD = "SET_BROKER_SORTFIELD",
    SET_BROKER_SORT = "SET_BROKER_SORT",
    CREATE_BROKER = "CREATE_BROKER",
    UPDATE_BROKER = "UPDATE_BROKER",
    REMOVE_BROKER = "REMOVE_BROKER"
}

interface GetBrokersAction {
    type: BrokerActionTypes.GET_BROKERS
    payload: ISearchParams<IBroker>
}

interface LoadMoreBrokersAction {
    type: BrokerActionTypes.LOAD_MORE_BROKERS
    payload: ISearchParams<IBroker>
}

interface SetBrokerErrorAction {
    type: BrokerActionTypes.SET_BROKER_ERROR
    payload: null | string
}

interface SetBrokerLoadingAction {
    type: BrokerActionTypes.SET_BROKER_LOADING
    payload: boolean
}

interface SetBrokerPageAction {
    type: BrokerActionTypes.SET_BROKER_PAGE
    payload: number
}

interface SetBrokerFilterAction {
    type: BrokerActionTypes.SET_BROKER_FILTER
    payload: string
}

interface SetBrokerSortField {
    type: BrokerActionTypes.SET_BROKER_SORTFIELD
    payload: string
}

interface SetBrokerSort {
    type: BrokerActionTypes.SET_BROKER_SORT
    payload: OrderType
}

interface CreateBrokerAction {
    type: BrokerActionTypes.CREATE_BROKER
    payload: IBroker
}

interface UpdateBrokerAction {
    type: BrokerActionTypes.UPDATE_BROKER
    payload: IBroker
}

interface RemoveBrokerAction {
    type: BrokerActionTypes.REMOVE_BROKER
    payload: string
}

export type BrokerAction = GetBrokersAction |
    LoadMoreBrokersAction |
    SetBrokerErrorAction |
    SetBrokerLoadingAction |
    SetBrokerPageAction |
    SetBrokerFilterAction |
    SetBrokerSortField |
    SetBrokerSort |
    CreateBrokerAction |
    UpdateBrokerAction |
    RemoveBrokerAction