import { OrderType } from "./common/orderType"
import { ISearchParams } from "./common/searchParams"
import { IDriver } from "./driver"
import { ILoad } from "./load"
import { ITruck } from "./truck"

export interface IUser {
    id: string,
    firstName: string,
    lastName: string,
    companyName: string,
    mc?: string,
    dot?: string,
    avatar?: string,
    accountStatus: AccountStatus,
    email: string,
    emailConfirmed: boolean,
    phoneNumber?: string,
    startPayedPeriodDate: Date,
    finishPayedPeriodDate: Date,
    lastLoginDate: Date,
    createdAt: Date,
    searchDeadheads: number,
    searchMilesMin: number,
    searchMilesMax: number,
    searchSortField: string,
    searchSort: OrderType,
    drivers?: IDriver[],
    loads?: ILoad[],
    trucks?: ITruck[]
}

export interface IUserSearchSettings {
    userId: string,
    deadheads: number,
    milesMin: number,
    milesMax: number,
    sortField: string,
    sort: OrderType,
}

export enum AccountStatus {
    None,
    ActiveUser,
    InactiveUserToRemove,
    Warned
}

export interface IUserSearchParams extends ISearchParams<IUser> {
    accountStatus: AccountStatus
}

export interface UserState {
    userSearchParams: IUserSearchParams
    loading: boolean
    error: null | string
}

export enum UserActionTypes {
    GET_USERS = "GET_All_USERS",
    LOAD_MORE_USERS = "LOAD_MORE_USERS",
    SET_USER_PAGE = "SET_USER_PAGE",
    SET_USER_ERROR = "SET_USER_ERROR",
    SET_USER_LOADING = "SET_USER_LOADING",
    SET_USER_FILTER = "SET_USER_FILTER",
    SET_USER_SORTFIELD = "SET_USER_SORTFIELD",
    SET_USER_SORT = "SET_USER_SORT",
    SET_ACCOUNT_STATUS = "SET_ACCOUNT_STATUS",
    UPDATE_USER = "UPDATE_USER",
    REMOVE_USER_ACCOUNT = "REMOVE_USER_ACCOUNT"
}

interface GetUsersAction {
    type: UserActionTypes.GET_USERS
    payload: IUserSearchParams
}

interface LoadMoreUsersAction {
    type: UserActionTypes.LOAD_MORE_USERS
    payload: IUserSearchParams
}

interface SetUserPagesAction {
    type: UserActionTypes.SET_USER_PAGE
    payload: number
}

interface SetUserErrorAction {
    type: UserActionTypes.SET_USER_ERROR
    payload: null | string
}

interface SetUserLoadingAction {
    type: UserActionTypes.SET_USER_LOADING
    payload: boolean
}

interface SetUserFilterAction {
    type: UserActionTypes.SET_USER_FILTER
    payload: string
}

interface SetUserSortFieldAction {
    type: UserActionTypes.SET_USER_SORTFIELD
    payload: string
}

interface SetUserSortAction {
    type: UserActionTypes.SET_USER_SORT
    payload: OrderType
}

interface SetUserAccountStatusAction {
    type: UserActionTypes.SET_ACCOUNT_STATUS
    payload: AccountStatus
}

interface UpdateUserAction {
    type: UserActionTypes.UPDATE_USER
    payload: IUser
}

interface RemoveUserAccountAction {
    type: UserActionTypes.REMOVE_USER_ACCOUNT
    payload: string
}

export type UserAction = GetUsersAction |
    LoadMoreUsersAction |
    SetUserPagesAction |
    SetUserErrorAction |
    SetUserLoadingAction |
    SetUserFilterAction |
    SetUserSortFieldAction |
    SetUserSortAction |
    SetUserAccountStatusAction |
    UpdateUserAction |
    RemoveUserAccountAction

