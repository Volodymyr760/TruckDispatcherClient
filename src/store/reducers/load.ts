import { Equipment } from "../../types/common/equipment"
import { OrderType } from "../../types/common/orderType"
import { LoadAction, LoadActionTypes, LoadState, ILoad, LoadStatus } from "../../types/load"

const initialState: LoadState = {
    loadSearchParams: {
        pageSize: 10,
        currentPage: 1,
        searchCriteria: "",
        userId: localStorage.getItem("id") || "",
        sortField: "Pickup",
        order: OrderType.Descending,
        includeNavProperties: true,
        itemList: [],
        pageCount: 0,
        totalItemsCount: 0,
        equipment: Equipment.All,
        loadStatus: LoadStatus.All
    },
    loading: true,
    error: null
}

export const loadReducer = (state: LoadState = initialState, action: LoadAction): LoadState => {
    switch (action.type) {
        case LoadActionTypes.GET_LOADS:
            return { ...state, loadSearchParams: action.payload }
        case LoadActionTypes.LOAD_MORE_LOADS:
            return { ...state, loadSearchParams: {
                        ...action.payload, itemList: state.loadSearchParams.itemList.concat(action.payload.itemList) } }
        case LoadActionTypes.SET_LOAD_ERROR:
            return { ...state, error: action.payload }
        case LoadActionTypes.SET_LOAD_LOADING:
            return { ...state, loading: action.payload }
        case LoadActionTypes.SET_LOAD_PAGE:
            return { ...state, loadSearchParams: { ...state.loadSearchParams, currentPage: action.payload } }
        case LoadActionTypes.SET_LOAD_FILTER:
            return { ...state, loadSearchParams: { ...state.loadSearchParams, searchCriteria: action.payload } }
        case LoadActionTypes.SET_LOAD_SORTFIELD:
            return { ...state, loadSearchParams: { ...state.loadSearchParams, sortField: action.payload } }
        case LoadActionTypes.SET_LOAD_SORT:
            return { ...state, loadSearchParams: { ...state.loadSearchParams, order: action.payload } }
        case LoadActionTypes.SET_LOAD_EQUIPMENT:
            return { ...state, loadSearchParams: { ...state.loadSearchParams, equipment: action.payload } }
        case LoadActionTypes.SET_LOAD_STATUS:
            return { ...state, loadSearchParams: { ...state.loadSearchParams, loadStatus: action.payload } }
        case LoadActionTypes.SET_LOAD_USERID:
            return { ...state, loadSearchParams: { ...state.loadSearchParams, userId: action.payload } }  
        case LoadActionTypes.CREATE_LOAD:
            return { ...state, loadSearchParams: 
                { ...state.loadSearchParams, itemList: [action.payload, ...state.loadSearchParams.itemList] } }
        case LoadActionTypes.UPDATE_LOAD:
            return { ...state, loadSearchParams: { ...state.loadSearchParams, itemList: updateLoad(state, action.payload) } }
        case LoadActionTypes.REMOVE_LOAD:
            return { ...state, loadSearchParams: { ...state.loadSearchParams, itemList: deleteLoad(state, action) } }
        default: return state;
    }
}

function updateLoad(state: LoadState, loadToUpdate: ILoad): Array<ILoad> {
    return state.loadSearchParams.itemList.map((load: ILoad) => {
        if (load.id === loadToUpdate.id) return loadToUpdate
        return load
    })
}

function deleteLoad(state: LoadState, action: LoadAction): Array<ILoad> {
    return state.loadSearchParams.itemList.filter(load => load.id !== action.payload)
}