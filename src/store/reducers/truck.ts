import { Equipment } from "../../types/common/equipment"
import { OrderType } from "../../types/common/orderType"
import { TruckAction, TruckActionTypes, TruckState, ITruck, TruckStatus } from "../../types/truck"

const initialState: TruckState = {
    truckSearchParams: {
        pageSize: 10,
        currentPage: 1,
        searchCriteria: "",
        userId: localStorage.getItem("id") || "",
        sortField: "Name",
        order: OrderType.Ascending,
        includeNavProperties: true,
        itemList: [],
        pageCount: 0,
        totalItemsCount: 0,
        equipment: Equipment.All,
        truckStatus: TruckStatus.All
    },
    loading: true,
    error: null
}

export const truckReducer = (state: TruckState = initialState, action: TruckAction): TruckState => {
    switch (action.type) {
        case TruckActionTypes.GET_TRUCKS:
            return { ...state, truckSearchParams: action.payload }
        case TruckActionTypes.LOAD_MORE_TRUCKS:
            return { ...state, truckSearchParams: {
                        ...action.payload, itemList: state.truckSearchParams.itemList.concat(action.payload.itemList) } }              
        case TruckActionTypes.SET_TRUCK_ERROR:
            return { ...state, error: action.payload }
        case TruckActionTypes.SET_TRUCK_LOADING:
            return { ...state, loading: action.payload }
        case TruckActionTypes.SET_TRUCK_PAGE:
            return { ...state, truckSearchParams: { ...state.truckSearchParams, currentPage: action.payload } }
        case TruckActionTypes.SET_TRUCK_FILTER:
            return { ...state, truckSearchParams: { ...state.truckSearchParams, searchCriteria: action.payload } }
        case TruckActionTypes.SET_TRUCK_SORTFIELD:
            return { ...state, truckSearchParams: { ...state.truckSearchParams, sortField: action.payload } }
        case TruckActionTypes.SET_TRUCK_SORT:
            return { ...state, truckSearchParams: { ...state.truckSearchParams, order: action.payload } }
        case TruckActionTypes.SET_TRUCK_EQUIPMENT:
            return { ...state, truckSearchParams: { ...state.truckSearchParams, equipment: action.payload } }
        case TruckActionTypes.SET_TRUCK_STATUS:
            return { ...state, truckSearchParams: { ...state.truckSearchParams, truckStatus: action.payload } }
        case TruckActionTypes.SET_TRUCK_USERID:
            return { ...state, truckSearchParams: { ...state.truckSearchParams, userId: action.payload } }
        case TruckActionTypes.CREATE_TRUCK:
            return { ...state, truckSearchParams: 
                { ...state.truckSearchParams, itemList: [action.payload, ...state.truckSearchParams.itemList] } }
        case TruckActionTypes.UPDATE_TRUCK:
            return { ...state, truckSearchParams: { ...state.truckSearchParams, itemList: updateTruck(state, action.payload) } }
        case TruckActionTypes.REMOVE_TRUCK:
            return { ...state, truckSearchParams: { ...state.truckSearchParams, itemList: deleteTruck(state, action) } }
        default: return state;
    }
}

function updateTruck(state: TruckState, truckToUpdate: ITruck): Array<ITruck> {
    return state.truckSearchParams.itemList.map((truck: ITruck) => {
        if (truck.id === truckToUpdate.id) return truckToUpdate
        return truck
    })
}

function deleteTruck(state: TruckState, action: TruckAction): Array<ITruck> {
    return state.truckSearchParams.itemList.filter(truck => truck.id !== action.payload)
}