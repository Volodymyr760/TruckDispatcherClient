import { AppRoles } from "./common/appRoles";
import { OrderType } from "./common/orderType";
import { ISearchParams } from "./common/searchParams";

export interface IClient {
    id: string,
    name: string,
    email: string,
    city: string,
    clientStatus: ClientStatus,
    appRoles: AppRoles,
    dotNumber: string,
    createdAt: Date,
    invitedAt?: Date,
    notes?: string
}

export enum ClientStatus {
    Created,
    Invited,
    Stopped
}

export interface ClientSearchParams extends ISearchParams<IClient> {
    clientStatus: ClientStatus,
    appRoles: AppRoles
}

export interface ClientState {
    clientSearchParams: ClientSearchParams
    loading: boolean
    error: null | string
}

export enum ClientActionTypes {
    GET_CLIENTS = "GET_CLIENTS",
    LOAD_MORE_CLIENTS = "LOAD_MORE_CLIENTS",
    SET_CLIENT_ERROR = "SET_CLIENT_ERROR",
    SET_CLIENT_LOADING = "SET_CLIENT_LOADING",
    SET_CLIENT_PAGE = "SET_CLIENT_PAGE",
    SET_CLIENT_FILTER = "SET_CLIENT_FILTER",
    SET_CLIENT_SORTFIELD = "SET_CLIENT_SORTFIELD",
    SET_CLIENT_SORT = "SET_CLIENT_SORT",
    SET_CLIENT_APPROLE = "SET_CLIENT_APPROLE",
    SET_CLIENT_STATUS = "SET_CLIENT_STATUS",
    SET_CLIENT_USERID = "SET_CLIENT_USERID",
    CREATE_CLIENT = "CREATE_CLIENT",
    UPDATE_CLIENT = "UPDATE_CLIENT",
    REMOVE_CLIENT = "REMOVE_CLIENT"
}

interface GetClientsAction {
    type: ClientActionTypes.GET_CLIENTS
    payload: ClientSearchParams
}

interface LoadMoreClientsAction {
    type: ClientActionTypes.LOAD_MORE_CLIENTS
    payload: ClientSearchParams
}

interface SetClientErrorAction {
    type: ClientActionTypes.SET_CLIENT_ERROR
    payload: null | string
}

interface SetClientLoadingAction {
    type: ClientActionTypes.SET_CLIENT_LOADING
    payload: boolean
}

interface SetClientPageAction {
    type: ClientActionTypes.SET_CLIENT_PAGE
    payload: number
}

interface SetClientFilterAction {
    type: ClientActionTypes.SET_CLIENT_FILTER
    payload: string
}

interface SetClientSortField {
    type: ClientActionTypes.SET_CLIENT_SORTFIELD
    payload: string
}

interface SetClientSort {
    type: ClientActionTypes.SET_CLIENT_SORT
    payload: OrderType
}

interface SetClientAppRole {
    type: ClientActionTypes.SET_CLIENT_APPROLE
    payload: AppRoles
}

interface SetClientStatus {
    type: ClientActionTypes.SET_CLIENT_STATUS
    payload: ClientStatus
}

interface CreateClientAction {
    type: ClientActionTypes.CREATE_CLIENT
    payload: IClient
}

interface UpdateClientAction {
    type: ClientActionTypes.UPDATE_CLIENT
    payload: IClient
}

interface RemoveClientAction {
    type: ClientActionTypes.REMOVE_CLIENT
    payload: string
}

export type ClientAction = GetClientsAction |
    LoadMoreClientsAction |
    SetClientErrorAction |
    SetClientLoadingAction |
    SetClientPageAction |
    SetClientFilterAction |
    SetClientSortField |
    SetClientSort |
    SetClientAppRole |
    SetClientStatus |
    CreateClientAction |
    UpdateClientAction |
    RemoveClientAction