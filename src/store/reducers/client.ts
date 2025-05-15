import { ClientAction, ClientActionTypes, ClientState, ClientStatus, IClient } from "../../types/client"
import { AppRoles } from "../../types/common/appRoles"
import { OrderType } from "../../types/common/orderType"

const initialState: ClientState = {
    clientSearchParams: {
        pageSize: 10,
        currentPage: 1,
        searchCriteria: "",
        userId: "",
        sortField: "Name",
        order: OrderType.Ascending,
        includeNavProperties: false,
        itemList: [],
        pageCount: 0,
        totalItemsCount: 0,
        clientStatus: ClientStatus.Created,
        appRoles: AppRoles.Carrier
    },
    loading: true,
    error: null
}

export const clientReducer = (state: ClientState = initialState, action: ClientAction): ClientState => {
    switch (action.type) {
        case ClientActionTypes.GET_CLIENTS:
            return { ...state, clientSearchParams: action.payload }
        case ClientActionTypes.LOAD_MORE_CLIENTS:
            return { ...state, clientSearchParams: {
                        ...action.payload, itemList: state.clientSearchParams.itemList.concat(action.payload.itemList) } }              
        case ClientActionTypes.SET_CLIENT_ERROR:
            return { ...state, error: action.payload }
        case ClientActionTypes.SET_CLIENT_LOADING:
            return { ...state, loading: action.payload }
        case ClientActionTypes.SET_CLIENT_PAGE:
            return { ...state, clientSearchParams: { ...state.clientSearchParams, currentPage: action.payload } }
        case ClientActionTypes.SET_CLIENT_FILTER:
            return { ...state, clientSearchParams: { ...state.clientSearchParams, searchCriteria: action.payload } }
        case ClientActionTypes.SET_CLIENT_SORTFIELD:
            return { ...state, clientSearchParams: { ...state.clientSearchParams, sortField: action.payload } }
        case ClientActionTypes.SET_CLIENT_SORT:
            return { ...state, clientSearchParams: { ...state.clientSearchParams, order: action.payload } }
        case ClientActionTypes.SET_CLIENT_APPROLE:
            return { ...state, clientSearchParams: { ...state.clientSearchParams, appRoles: action.payload } }
        case ClientActionTypes.SET_CLIENT_STATUS:
            return { ...state, clientSearchParams: { ...state.clientSearchParams, clientStatus: action.payload } }
        case ClientActionTypes.CREATE_CLIENT:
            return { ...state, clientSearchParams: 
                { ...state.clientSearchParams, itemList: [action.payload, ...state.clientSearchParams.itemList] } }
        case ClientActionTypes.UPDATE_CLIENT:
            return { ...state, clientSearchParams: { ...state.clientSearchParams, itemList: updateClient(state, action.payload) } }
        case ClientActionTypes.REMOVE_CLIENT:
            return { ...state, clientSearchParams: { ...state.clientSearchParams, itemList: deleteClient(state, action) } }
        default: return state;
    }
}

function updateClient(state: ClientState, clientToUpdate: IClient): Array<IClient> {
    return state.clientSearchParams.itemList.map((client: IClient) => {
        if (client.id === clientToUpdate.id) return clientToUpdate
        return client
    })
}

function deleteClient(state: ClientState, action: ClientAction): Array<IClient> {
    return state.clientSearchParams.itemList.filter(client => client.id !== action.payload)
}