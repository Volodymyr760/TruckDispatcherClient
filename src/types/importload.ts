import { ICity } from "./city"
import { Equipment } from "./common/equipment"
import { OrderType } from "./common/orderType"
import { ISearchParams } from "./common/searchParams"
import { TruckDto } from "./truck"

export interface IImportLoad {
    id?: string,
    referenceId: string
    origin: string
    originLatitude: number
    originLongitude: number
    destination: string
    destinationLatitude: number
    destinationLongitude: number
    pickUp: Date,
    delivery: Date
    length: number
    weight: number
    equipment: Equipment
    shipperId?: string
    shipperName: string
    shipperLogo?: string
    shipperEmail?: string
    shipperPhone?: string
    shipperDotNumber: string
    shipperMcNumber: string
    miles: number
    deadheadOrigin: number
    deadheadDestination: number
    rate: number,
    ratePerMile: number
    profit: number
    profitPerMile: number
    requirements: string
}

export interface ImportLoadSearchParams extends ISearchParams<IImportLoad> {
    origin?: ICity,
    destination?: ICity,
    truck?: TruckDto,
    pickupStartDate: Date,
    deadhead: number,
    milesMin: number,
    milesMax: number
}

export interface ImportLoadState {
    importLoadSearchParams: ImportLoadSearchParams
    loading: boolean
    error: null | string
}

export enum ImportLoadActionTypes {
    RESET_IMPORTLOADS = "RESET_IMPORTLOADS",
    GET_IMPORTLOADS = "GET_IMPORTLOADS",
    LOAD_MORE_IMPORTLOADS = "LOAD_MORE_IMPORTLOADS",
    SET_IMPORTLOADS = "SET_IMPORTLOADS",
    SET_IMPORTLOAD_ERROR = "SET_IMPORTLOAD_ERROR",
    SET_IMPORTLOAD_LOADING = "SET_IMPORTLOAD_LOADING",
    SET_IMPORTLOAD_PAGE = "SET_IMPORTLOAD_PAGE",
    SET_IMPORTLOAD_SORTFIELD = "SET_IMPORTLOAD_SORTFIELD",
    SET_IMPORTLOAD_SORT = "SET_IMPORTLOAD_SORT",
    SET_IMPORTLOAD_TRUCK = "SET_IMPORTLOAD_TRUCK",
    SET_IMPORTLOAD_PICKUP_STARTDATE = "SET_IMPORTLOAD_PICKUP_STARTDATE",
    SET_IMPORTLOAD_ORIGIN = "SET_IMPORTLOAD_ORIGIN",
    SET_IMPORTLOAD_DESTINATION = "SET_IMPORTLOAD_DESTINATION",
    SET_IMPORTLOAD_DEADHEAD = "SET_IMPORTLOAD_DEADHEAD",
    SET_IMPORTLOAD_MILES_MIN = "SET_IMPORTLOAD_MILES_MIN",
    SET_IMPORTLOAD_MILES_MAX = "SET_IMPORTLOAD_MILES_MAX",
    REMOVE_IMPORTLOAD_FROM_SEARCH = "REMOVE_IMPORTLOAD_FROM_SEARCH"
}

interface ResetImportLoadsAction {
    type: ImportLoadActionTypes.RESET_IMPORTLOADS
    payload: ImportLoadSearchParams
}

interface GetImportLoadsAction {
    type: ImportLoadActionTypes.GET_IMPORTLOADS
    payload: ImportLoadSearchParams
}

interface LoadMoreImportLoadsAction {
    type: ImportLoadActionTypes.LOAD_MORE_IMPORTLOADS
    payload: ImportLoadSearchParams
}

interface SetImportLoadsAction {
    type: ImportLoadActionTypes.SET_IMPORTLOADS
    payload: IImportLoad[]
}

interface SetImportLoadErrorAction {
    type: ImportLoadActionTypes.SET_IMPORTLOAD_ERROR
    payload: null | string
}

interface SetImportLoadLoadingAction {
    type: ImportLoadActionTypes.SET_IMPORTLOAD_LOADING
    payload: boolean
}

interface SetImportLoadPageAction {
    type: ImportLoadActionTypes.SET_IMPORTLOAD_PAGE
    payload: number
}

interface SetImportLoadSortField {
    type: ImportLoadActionTypes.SET_IMPORTLOAD_SORTFIELD
    payload: string
}

interface SetImportLoadSort {
    type: ImportLoadActionTypes.SET_IMPORTLOAD_SORT
    payload: OrderType
}

interface SetImportLoadTruck {
    type: ImportLoadActionTypes.SET_IMPORTLOAD_TRUCK
    payload: TruckDto
}

interface SetImportLoadPickupStartDate {
    type: ImportLoadActionTypes.SET_IMPORTLOAD_PICKUP_STARTDATE
    payload: Date
}

interface SetImportLoadOrigin {
    type: ImportLoadActionTypes.SET_IMPORTLOAD_ORIGIN
    payload: ICity
}

interface SetImportLoadDestination {
    type: ImportLoadActionTypes.SET_IMPORTLOAD_DESTINATION
    payload: ICity
}

interface SetImportLoadDeadhead {
    type: ImportLoadActionTypes.SET_IMPORTLOAD_DEADHEAD
    payload: number
}

interface SetImportLoadMilesMin {
    type: ImportLoadActionTypes.SET_IMPORTLOAD_MILES_MIN
    payload: number
}

interface SetImportLoadMilesMax {
    type: ImportLoadActionTypes.SET_IMPORTLOAD_MILES_MAX
    payload: number
}

interface RemoveImportLoadFromSearch {
    type: ImportLoadActionTypes.REMOVE_IMPORTLOAD_FROM_SEARCH
    payload: string
}

export type ImportLoadAction = ResetImportLoadsAction |
    GetImportLoadsAction | 
    LoadMoreImportLoadsAction |
    SetImportLoadsAction |
    SetImportLoadErrorAction |
    SetImportLoadLoadingAction |
    SetImportLoadPageAction |
    SetImportLoadSortField |
    SetImportLoadSort |
    SetImportLoadTruck |
    SetImportLoadPickupStartDate |
    SetImportLoadOrigin |
    SetImportLoadDestination |
    SetImportLoadDeadhead |
    SetImportLoadMilesMin |
    SetImportLoadMilesMax |
    RemoveImportLoadFromSearch