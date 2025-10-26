import { OrderType } from "../../types/common/orderType"
import { ImportLoadAction, ImportLoadActionTypes, ImportLoadState, IImportLoad } from "../../types/importload"

const initialState: ImportLoadState = {
    importLoadSearchParams: {
        pageSize: 25,
        currentPage: 1,
        searchCriteria: '',
        userId: localStorage.getItem("id") || "",
        includeNavProperties: true,
        origin: null,
        destination: null,
        truck: null,
        pickupStartDate: null,
        deadhead: 150,
        milesMin: 200,
        milesMax: 3000,
        sortField: "Profit Per Mile",
        order: OrderType.Descending,
        itemList: [],
        pageCount: 0,
        totalItemsCount: 0
    },
    loading: false,
    error: null
}

export const importLoadReducer = (state: ImportLoadState = initialState, action: ImportLoadAction): ImportLoadState => {
    switch (action.type) {
        case ImportLoadActionTypes.RESET_IMPORTLOADS:
            return { ...state, importLoadSearchParams: action.payload }
        case ImportLoadActionTypes.GET_IMPORTLOADS:
            return { ...state, importLoadSearchParams: action.payload }
        case ImportLoadActionTypes.LOAD_MORE_IMPORTLOADS:
            return { ...state, importLoadSearchParams: {
                ...action.payload, itemList: state.importLoadSearchParams.itemList.concat(action.payload.itemList) }, }
        case ImportLoadActionTypes.SET_IMPORTLOADS:
            return { ...state, importLoadSearchParams: { ...state.importLoadSearchParams, itemList: action.payload } }
        case ImportLoadActionTypes.SET_IMPORTLOAD_ERROR:
            return { ...state, error: action.payload }
        case ImportLoadActionTypes.SET_IMPORTLOAD_LOADING:
            return { ...state, loading: action.payload }
        case ImportLoadActionTypes.SET_IMPORTLOAD_PAGE:
            return { ...state, importLoadSearchParams: { ...state.importLoadSearchParams, currentPage: action.payload } }
        case ImportLoadActionTypes.SET_IMPORTLOAD_SORTFIELD:
            return { ...state, importLoadSearchParams: { ...state.importLoadSearchParams, sortField: action.payload } }
        case ImportLoadActionTypes.SET_IMPORTLOAD_SORT:
            return { ...state, importLoadSearchParams: { ...state.importLoadSearchParams, order: action.payload } }
        case ImportLoadActionTypes.SET_IMPORTLOAD_TRUCK:
            return { ...state, importLoadSearchParams: { ...state.importLoadSearchParams, truck: action.payload } }
        case ImportLoadActionTypes.SET_IMPORTLOAD_PICKUP_STARTDATE:
                return { ...state, importLoadSearchParams: { ...state.importLoadSearchParams, pickupStartDate: action.payload } }
        case ImportLoadActionTypes.SET_IMPORTLOAD_ORIGIN:
            return { ...state, importLoadSearchParams: { ...state.importLoadSearchParams, origin: action.payload } }
        case ImportLoadActionTypes.SET_IMPORTLOAD_DESTINATION:
            return { ...state, importLoadSearchParams: { ...state.importLoadSearchParams, destination: action.payload } }
        case ImportLoadActionTypes.SET_IMPORTLOAD_DEADHEAD:
                return { ...state, importLoadSearchParams: { ...state.importLoadSearchParams, deadhead: action.payload } }
        case ImportLoadActionTypes.SET_IMPORTLOAD_MILES_MIN:
                return { ...state, importLoadSearchParams: { ...state.importLoadSearchParams, milesMin: action.payload } }
        case ImportLoadActionTypes.SET_IMPORTLOAD_MILES_MAX:
                return { ...state, importLoadSearchParams: { ...state.importLoadSearchParams, milesMax: action.payload } }
        case ImportLoadActionTypes.REMOVE_IMPORTLOAD_FROM_SEARCH:
            return { ...state, importLoadSearchParams: { ...state.importLoadSearchParams, itemList: deleteImportLoad(state, action) } };
        default: return state;
    }
}

function deleteImportLoad(state: ImportLoadState, action: ImportLoadAction): Array<IImportLoad> {
    return state.importLoadSearchParams.itemList.filter(importLoad => importLoad.id !== action.payload)
}