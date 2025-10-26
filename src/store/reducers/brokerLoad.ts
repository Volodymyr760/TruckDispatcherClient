import { BrokerLoadAction, BrokerLoadActionTypes, BrokerLoadState } from "../../types/brokerLoad"
import { Equipment } from "../../types/common/equipment"
import { IImportLoad } from "../../types/importload"
import { OrderType } from "../../types/common/orderType"

const initialState: BrokerLoadState = {
    brokerLoadSearchParams: {
        pageSize: 10,
        currentPage: 1,
        searchCriteria: "",
        userId: localStorage.getItem("id") || "",
        sortField: "Pickup",
        order: OrderType.Descending,
        includeNavProperties: false,
        itemList: [],
        pageCount: 0,
        totalItemsCount: 0,
        equipment: Equipment.All
    },
    loading: true,
    error: null
}

export const brokerLoadReducer = (state: BrokerLoadState = initialState, action: BrokerLoadAction): BrokerLoadState => {
    switch (action.type) {
        case BrokerLoadActionTypes.GET_BROKERLOADS:
            return { ...state, brokerLoadSearchParams: action.payload }
        case BrokerLoadActionTypes.LOAD_MORE_BROKERLOADS:
            return { ...state, brokerLoadSearchParams: {
                        ...action.payload, itemList: state.brokerLoadSearchParams.itemList.concat(action.payload.itemList) } }
        case BrokerLoadActionTypes.SET_BROKERLOAD_ERROR:
            return { ...state, error: action.payload }
        case BrokerLoadActionTypes.SET_BROKERLOAD_LOADING:
            return { ...state, loading: action.payload }
        case BrokerLoadActionTypes.SET_BROKERLOAD_FILTER:
            return { ...state, brokerLoadSearchParams: { ...state.brokerLoadSearchParams, searchCriteria: action.payload } }
        case BrokerLoadActionTypes.SET_BROKERLOAD_PAGE:
            return { ...state, brokerLoadSearchParams: { ...state.brokerLoadSearchParams, currentPage: action.payload } }
        case BrokerLoadActionTypes.SET_BROKERLOAD_SORTFIELD:
            return { ...state, brokerLoadSearchParams: { ...state.brokerLoadSearchParams, sortField: action.payload } }
        case BrokerLoadActionTypes.SET_BROKERLOAD_SORT:
            return { ...state, brokerLoadSearchParams: { ...state.brokerLoadSearchParams, order: action.payload } }
        case BrokerLoadActionTypes.SET_BROKERLOAD_EQUIPMENT:
            return { ...state, brokerLoadSearchParams: { ...state.brokerLoadSearchParams, equipment: action.payload } }
        case BrokerLoadActionTypes.CREATE_BROKERLOAD:
            return { ...state, brokerLoadSearchParams: 
                { ...state.brokerLoadSearchParams, itemList: [action.payload, ...state.brokerLoadSearchParams.itemList] } }
        case BrokerLoadActionTypes.UPDATE_BROKERLOAD:
            return { ...state, brokerLoadSearchParams: { ...state.brokerLoadSearchParams, itemList: updateLoad(state, action.payload) } }
        case BrokerLoadActionTypes.REMOVE_BROKERLOAD:
            return { ...state, brokerLoadSearchParams: { ...state.brokerLoadSearchParams, itemList: deleteLoad(state, action) } }
        default: return state;
    }
}

function updateLoad(state: BrokerLoadState, loadToUpdate: IImportLoad): Array<IImportLoad> {
    return state.brokerLoadSearchParams.itemList.map((load: IImportLoad) => {
        if (load.id === loadToUpdate.id) return loadToUpdate
        return load
    })
}

function deleteLoad(state: BrokerLoadState, action: BrokerLoadAction): Array<IImportLoad> {
    return state.brokerLoadSearchParams.itemList.filter(load => load.id !== action.payload)
}