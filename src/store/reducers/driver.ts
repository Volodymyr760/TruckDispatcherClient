import { OrderType } from "../../types/common/orderType"
import { DriverAction, DriverActionTypes, DriverState, IDriver } from "../../types/driver"

const initialState: DriverState = {
    driverSearchParams: {
        pageSize: 10,
        currentPage: 1,
        searchCriteria: "",
        userId: localStorage.getItem("id") || "",
        sortField: "First Name",
        order: OrderType.Ascending,
        includeNavProperties: true,
        itemList: [],
        pageCount: 0,
        totalItemsCount: 0
    },
    loading: true,
    error: null
}

export const driverReducer = (state: DriverState = initialState, action: DriverAction): DriverState => {
    switch (action.type) {
        case DriverActionTypes.GET_DRIVERS:
            return { ...state, driverSearchParams: action.payload }
        case DriverActionTypes.LOAD_MORE_DRIVERS:
            return { ...state, driverSearchParams: {
                        ...action.payload, itemList: state.driverSearchParams.itemList.concat(action.payload.itemList) } }            
        case DriverActionTypes.SET_DRIVER_ERROR:
            return { ...state, error: action.payload }
        case DriverActionTypes.SET_DRIVER_LOADING:
            return { ...state, loading: action.payload }
        case DriverActionTypes.SET_DRIVER_PAGE:
            return { ...state, driverSearchParams: { ...state.driverSearchParams, currentPage: action.payload } }
        case DriverActionTypes.SET_DRIVER_FILTER:
            return { ...state, driverSearchParams: { ...state.driverSearchParams, searchCriteria: action.payload } }
        case DriverActionTypes.SET_DRIVER_SORTFIELD:
            return { ...state, driverSearchParams: { ...state.driverSearchParams, sortField: action.payload } }
        case DriverActionTypes.SET_DRIVER_SORT:
            return { ...state, driverSearchParams: { ...state.driverSearchParams, order: action.payload } }
        case DriverActionTypes.SET_DRIVER_USERID:
            return { ...state, driverSearchParams: { ...state.driverSearchParams, userId: action.payload } }
        case DriverActionTypes.CREATE_DRIVER:
            return { ...state, driverSearchParams: 
                { ...state.driverSearchParams, itemList: [action.payload, ...state.driverSearchParams.itemList] } }
        case DriverActionTypes.UPDATE_DRIVER:
            return { ...state, driverSearchParams: { ...state.driverSearchParams, itemList: updateDriver(state, action.payload) } }
        case DriverActionTypes.REMOVE_DRIVER:
            return { ...state, driverSearchParams: { ...state.driverSearchParams, itemList: deleteDriver(state, action) } }
        default: return state;
    }
}

function updateDriver(state: DriverState, driverToUpdate: IDriver): Array<IDriver> {
    return state.driverSearchParams.itemList.map((driver: IDriver) => {
        if (driver.id === driverToUpdate.id) return driverToUpdate;
        return driver
    })
}

function deleteDriver(state: DriverState, action: DriverAction): Array<IDriver> {
    return state.driverSearchParams.itemList.filter(driver => driver.id !== action.payload)
}