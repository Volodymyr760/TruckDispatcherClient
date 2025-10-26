import { OrderType } from "../../types/common/orderType"
import { PricepackageAction, PricepackageActionTypes, PricepackageState, IPricepackage } from "../../types/pricepackage"

const initialState: PricepackageState = {
    pricepackageSearchParams: {
        pageSize: 10,
        currentPage: 1,
        searchCriteria: "",
        userId: "",
        sortField: "Period",
        order: OrderType.Ascending,
        includeNavProperties: true,
        itemList: [],
        pageCount: 0,
        totalItemsCount: 0
    },
    loading: true,
    error: null
}

export const pricepackageReducer = (state: PricepackageState = initialState, action: PricepackageAction): PricepackageState => {
    switch (action.type) {
        case PricepackageActionTypes.GET_PRICEPACKAGES:
            return { ...state, pricepackageSearchParams: { ...state.pricepackageSearchParams, itemList: action.payload } }
        case PricepackageActionTypes.SET_PRICEPACKAGE_ERROR:
            return { ...state, error: action.payload }
        case PricepackageActionTypes.SET_PRICEPACKAGE_LOADING:
            return { ...state, loading: action.payload }
        case PricepackageActionTypes.SET_PRICEPACKAGE_PAGE:
            return { ...state, pricepackageSearchParams: { ...state.pricepackageSearchParams, currentPage: action.payload } }
        case PricepackageActionTypes.SET_PRICEPACKAGE_SORTFIELD:
            return { ...state, pricepackageSearchParams: { ...state.pricepackageSearchParams, sortField: action.payload } }
        case PricepackageActionTypes.SET_PRICEPACKAGE_SORT:
            return { ...state, pricepackageSearchParams: { ...state.pricepackageSearchParams, order: action.payload } }
        case PricepackageActionTypes.CREATE_PRICEPACKAGE:
            return { ...state, pricepackageSearchParams: { ...state.pricepackageSearchParams, itemList: [action.payload, ...state.pricepackageSearchParams.itemList] } }
        case PricepackageActionTypes.UPDATE_PRICEPACKAGE:
            return { ...state, pricepackageSearchParams: { ...state.pricepackageSearchParams, itemList: updatePricepackage(state, action.payload) } }
        case PricepackageActionTypes.REMOVE_PRICEPACKAGE:
            return { ...state, pricepackageSearchParams: { ...state.pricepackageSearchParams, itemList: deletePricepackage(state, action) } }
        default: return state;
    }
}

function updatePricepackage(state: PricepackageState, pricepackageToUpdate: IPricepackage): Array<IPricepackage> {
    return state.pricepackageSearchParams.itemList.map((pricepackage: IPricepackage) => {
        if (pricepackage.id === pricepackageToUpdate.id) return pricepackageToUpdate
        return pricepackage
    })
}

function deletePricepackage(state: PricepackageState, action: PricepackageAction): Array<IPricepackage> {
    return state.pricepackageSearchParams.itemList.filter(pricepackage => pricepackage.id !== action.payload)
}
