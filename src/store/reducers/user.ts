import { OrderType } from "../../types/common/orderType"
import { AccountStatus, IUser, UserAction, UserActionTypes, UserState } from "../../types/user"

const initialState: UserState = {
    userSearchParams: {
        pageSize: 10,
        currentPage: 1,
        searchCriteria: "",
        userId: localStorage.getItem("id") || "",
        sortField: "First name",
        order: OrderType.Ascending,
        includeNavProperties: false,
        itemList: [],
        pageCount: 0,
        totalItemsCount: 0,
        accountStatus: AccountStatus.None
    },    
    loading: true,
    error: null
}

export const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.GET_USERS:
            return { ...state, userSearchParams: action.payload }
        case UserActionTypes.LOAD_MORE_USERS:
            return { ...state, userSearchParams: {
                    ...action.payload, itemList: state.userSearchParams.itemList.concat(action.payload.itemList) }}
        case UserActionTypes.SET_USER_PAGE:
            return { ...state, userSearchParams: { ...state.userSearchParams, currentPage: action.payload } }
        case UserActionTypes.SET_USER_ERROR:
            return { ...state, error: action.payload }
        case UserActionTypes.SET_USER_LOADING:
            return { ...state, loading: action.payload }
        case UserActionTypes.SET_USER_FILTER:
            return { ...state, userSearchParams: { ...state.userSearchParams, searchCriteria: action.payload } }
        case UserActionTypes.SET_USER_SORTFIELD:
            return { ...state, userSearchParams: { ...state.userSearchParams, sortField: action.payload } }
        case UserActionTypes.SET_USER_SORT:
            return { ...state, userSearchParams: { ...state.userSearchParams, order: action.payload } }
        case UserActionTypes.SET_ACCOUNT_STATUS:
            return { ...state, userSearchParams: { ...state.userSearchParams, accountStatus: action.payload } }
        case UserActionTypes.UPDATE_USER:
            return { ...state, userSearchParams: { ...state.userSearchParams, itemList: updateUser(state, action.payload) } }
        case UserActionTypes.REMOVE_USER_ACCOUNT:
            return { ...state, userSearchParams: { ...state.userSearchParams, itemList: deleteUserAccount(state, action) } };
        default: return state;
    }
}

function updateUser(state: UserState, userToUpdate: IUser): Array<IUser> {
    return state.userSearchParams.itemList.map((user: IUser) => {
        if (user.id === userToUpdate.id) return userToUpdate
        return user
    })
}

function deleteUserAccount(state: UserState, action: UserAction): Array<IUser> {
    return state.userSearchParams.itemList.filter(user => user.id !== action.payload)
}