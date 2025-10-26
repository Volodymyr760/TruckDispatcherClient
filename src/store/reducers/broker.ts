import { OrderType } from "../../types/common/orderType"
import { BrokerAction, BrokerActionTypes, BrokersState, IBroker } from "../../types/broker"

const initialState: BrokersState = {
    brokerSearchParams: {
        pageSize: 10,
        currentPage: 1,
        searchCriteria: "",
        userId: localStorage.getItem("id") || "",
        sortField: "Name",
        order: OrderType.Ascending,
        includeNavProperties: false,
        itemList: [],
        pageCount: 0,
        totalItemsCount: 0
    },
    loading: true,
    error: null
}

export const brokerReducer = (state: BrokersState = initialState, action: BrokerAction): BrokersState => {
    switch (action.type) {
        case BrokerActionTypes.GET_BROKERS:
            return { ...state, brokerSearchParams: action.payload }
        case BrokerActionTypes.LOAD_MORE_BROKERS:
            return { ...state, brokerSearchParams: {
                        ...action.payload, itemList: state.brokerSearchParams.itemList.concat(action.payload.itemList) } }            
        case BrokerActionTypes.SET_BROKER_ERROR:
            return { ...state, error: action.payload }
        case BrokerActionTypes.SET_BROKER_LOADING:
            return { ...state, loading: action.payload }
        case BrokerActionTypes.SET_BROKER_PAGE:
            return { ...state, brokerSearchParams: { ...state.brokerSearchParams, currentPage: action.payload } }
        case BrokerActionTypes.SET_BROKER_FILTER:
            return { ...state, brokerSearchParams: { ...state.brokerSearchParams, searchCriteria: action.payload } }
        case BrokerActionTypes.SET_BROKER_SORTFIELD:
            return { ...state, brokerSearchParams: { ...state.brokerSearchParams, sortField: action.payload } }
        case BrokerActionTypes.SET_BROKER_SORT:
            return { ...state, brokerSearchParams: { ...state.brokerSearchParams, order: action.payload } }
        case BrokerActionTypes.CREATE_BROKER:
            return { ...state, brokerSearchParams: 
                { ...state.brokerSearchParams, itemList: [action.payload, ...state.brokerSearchParams.itemList] } }
        case BrokerActionTypes.UPDATE_BROKER:
            return { ...state, brokerSearchParams: { ...state.brokerSearchParams, itemList: updateBroker(state, action.payload) } }
        case BrokerActionTypes.REMOVE_BROKER:
            return { ...state, brokerSearchParams: { ...state.brokerSearchParams, itemList: deleteBroker(state, action) } }
        default: return state;
    }
}

function updateBroker(state: BrokersState, BrokerToUpdate: IBroker): Array<IBroker> {
    return state.brokerSearchParams.itemList.map((Broker: IBroker) => {
        if (Broker.id === BrokerToUpdate.id) return BrokerToUpdate;
        return Broker
    })
}

function deleteBroker(state: BrokersState, action: BrokerAction): Array<IBroker> {
    return state.brokerSearchParams.itemList.filter(Broker => Broker.id !== action.payload)
}