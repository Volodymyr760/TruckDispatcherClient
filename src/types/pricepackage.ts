import { OrderType } from "./common/orderType";
import { ISearchParams } from "./common/searchParams";

export interface IPricepackage {
    id?: string,
    name: string,
    price: number,
    period: number,
    description: string,
    posibilities: string
}

export interface PricepackageState {
    pricepackageSearchParams: ISearchParams<IPricepackage>,
    loading: boolean,
    error: null | string
}

export enum PricepackageActionTypes {
    GET_PRICEPACKAGES = "GET_PRICEPACKAGES",
    GET_PRICEPACKAGE_BY_ID = "GET_PRICEPACKAGE_BY_ID",
    SET_PRICEPACKAGE_ERROR = "SET_PRICEPACKAGE_ERROR",
    SET_PRICEPACKAGE_LOADING = "SET_PRICEPACKAGE_LOADING",
    SET_PRICEPACKAGE_PAGE = "SET_PRICEPACKAGE_PAGE",
    SET_PRICEPACKAGE_SORTFIELD = "SET_PRICEPACKAGE_SORTFIELD",
    SET_PRICEPACKAGE_SORT = "SET_PRICEPACKAGE_SORT",
    CREATE_PRICEPACKAGE = "CREATE_PRICEPACKAGE",
    UPDATE_PRICEPACKAGE = "UPDATE_PRICEPACKAGE",
    REMOVE_PRICEPACKAGE = "REMOVE_PRICEPACKAGE"
}

interface GetPricepackagesAction {
    type: PricepackageActionTypes.GET_PRICEPACKAGES
    payload: IPricepackage[]
}

interface GetPricepackageByIdAction {
    type: PricepackageActionTypes.GET_PRICEPACKAGE_BY_ID
    payload: IPricepackage
}

interface SetPricepackageErrorAction {
    type: PricepackageActionTypes.SET_PRICEPACKAGE_ERROR
    payload: null | string
}

interface SetPricepackageLoadingAction {
    type: PricepackageActionTypes.SET_PRICEPACKAGE_LOADING
    payload: boolean
}

interface SetPricepackagePageAction {
    type: PricepackageActionTypes.SET_PRICEPACKAGE_PAGE
    payload: number
}

interface SetPricepackageSortField {
    type: PricepackageActionTypes.SET_PRICEPACKAGE_SORTFIELD
    payload: string
}

interface SetPricepackageSort {
    type: PricepackageActionTypes.SET_PRICEPACKAGE_SORT
    payload: OrderType
}

interface CreatePricepackageAction {
    type: PricepackageActionTypes.CREATE_PRICEPACKAGE
    payload: IPricepackage
}

interface UpdatePricepackageAction {
    type: PricepackageActionTypes.UPDATE_PRICEPACKAGE
    payload: IPricepackage
}

interface RemovePricepackageAction {
    type: PricepackageActionTypes.REMOVE_PRICEPACKAGE
    payload: string
}

export type PricepackageAction = GetPricepackagesAction |
    GetPricepackageByIdAction |
    SetPricepackageErrorAction |
    SetPricepackageLoadingAction |
    SetPricepackagePageAction |
    SetPricepackageSortField |
    SetPricepackageSort |
    CreatePricepackageAction |
    UpdatePricepackageAction |
    RemovePricepackageAction