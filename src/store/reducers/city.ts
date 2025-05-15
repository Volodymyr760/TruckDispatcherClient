import { OrderType } from "../../types/common/orderType"
import { CityAction, CityActionTypes, CityState, ICity } from "../../types/city"
import { IAuth } from "../../types/auth"

const auth: IAuth = JSON.parse(localStorage.getItem("auth"))

const initialState: CityState = {
    citySearchParams: {
        pageSize: 10,
        currentPage: 1,
        searchCriteria: "",
        userId: auth ? auth.user.id : "",
        sortField: "First Name",
        order: OrderType.Ascending,
        includeNavProperties: false,
        itemList: [],
        pageCount: 0,
        totalItemsCount: 0
    },
    loading: true,
    error: null
}

export const cityReducer = (state: CityState = initialState, action: CityAction): CityState => {
    switch (action.type) {
        case CityActionTypes.GET_CITIES:
            return { ...state, citySearchParams: action.payload }
        case CityActionTypes.SET_CITY_ERROR:
            return { ...state, error: action.payload }
        case CityActionTypes.SET_CITY_LOADING:
            return { ...state, loading: action.payload }
        case CityActionTypes.SET_CITY_PAGE:
            return { ...state, citySearchParams: { ...state.citySearchParams, currentPage: action.payload } }
        case CityActionTypes.SET_CITY_FILTER:
            return { ...state, citySearchParams: { ...state.citySearchParams, searchCriteria: action.payload } }
        case CityActionTypes.SET_CITY_SORTFIELD:
            return { ...state, citySearchParams: { ...state.citySearchParams, sortField: action.payload } }
        case CityActionTypes.SET_CITY_SORT:
            return { ...state, citySearchParams: { ...state.citySearchParams, order: action.payload } }
        case CityActionTypes.CREATE_CITY:
            return { ...state, citySearchParams: 
                { ...state.citySearchParams, itemList: [action.payload, ...state.citySearchParams.itemList] } }
        case CityActionTypes.UPDATE_CITY:
            return { ...state, citySearchParams: { ...state.citySearchParams, itemList: updateCity(state, action.payload) } }
        case CityActionTypes.REMOVE_CITY:
            return { ...state, citySearchParams: { ...state.citySearchParams, itemList: deleteCity(state, action) } };
        default: return state;
    }
}

function updateCity(state: CityState, cityToUpdate: ICity): Array<ICity> {
    return state.citySearchParams.itemList.map((city: ICity) => {
        if (city.id === cityToUpdate.id) return cityToUpdate
        return city
    })
}

function deleteCity(state: CityState, action: CityAction): Array<ICity> {
    return state.citySearchParams.itemList.filter(city => city.id !== action.payload)
}