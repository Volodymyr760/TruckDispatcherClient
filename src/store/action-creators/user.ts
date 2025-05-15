import { Dispatch } from "redux"
import { getUsersAxios, updateUserAxios } from "../../api/user"
import { AccountStatus, IUser, IUserSearchParams, UserAction, UserActionTypes } from "../../types/user"
import { OrderType } from "../../types/common/orderType"

// const delay = async (ms) => new Promise(resolve => setTimeout(resolve, ms)); // usage: await delay(3000)

export const searchUsers = (searchParams: IUserSearchParams) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionTypes.SET_USER_LOADING, payload: true })
            dispatch({ type: UserActionTypes.SET_USER_ERROR, payload: null })
            dispatch({ type: UserActionTypes.GET_USERS, payload: await getUsersAxios(searchParams) })
        } catch (error) {
            dispatch({ type: UserActionTypes.SET_USER_ERROR, payload: error.message || "Error of loading users." })
        } finally {
            dispatch({ type: UserActionTypes.SET_USER_LOADING, payload: false })
        }
    }
}

export const loadMoreUsers = (searchParams: IUserSearchParams) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionTypes.SET_USER_LOADING, payload: true })
            dispatch({ type: UserActionTypes.SET_USER_ERROR, payload: null })
            dispatch({ type: UserActionTypes.LOAD_MORE_USERS, payload: await getUsersAxios(searchParams) })
        } catch (error) {
            dispatch({ type: UserActionTypes.SET_USER_ERROR, payload: error.message || "Error of loading users." })
        } finally {
            dispatch({ type: UserActionTypes.SET_USER_LOADING, payload: false })
        }
    }
}

export const setUserPage = (page: number) => {
    return async (dispatch: Dispatch<UserAction>) => dispatch({ type: UserActionTypes.SET_USER_PAGE, payload: page })
}

export const setUserError = (message: string) => {
    return async (dispatch: Dispatch<UserAction>) => dispatch({ type: UserActionTypes.SET_USER_ERROR, payload: message })
}

export const setUserSearchCriteria = (search: string) => {
    return async (dispatch: Dispatch<UserAction>) => dispatch({ type: UserActionTypes.SET_USER_FILTER, payload: search })
}

export const setUserSortfield = (sortField: string) => {
    return async (dispatch: Dispatch<UserAction>) => dispatch({ type: UserActionTypes.SET_USER_SORTFIELD, payload: sortField })
}

export const setUserSort = (sort: OrderType) => {
    return async (dispatch: Dispatch<UserAction>) => dispatch({ type: UserActionTypes.SET_USER_SORT, payload: sort })
}

export const setUserAccountStatus = (accountStatus: AccountStatus) => {
    return async (dispatch: Dispatch<UserAction>) => dispatch({ type: UserActionTypes.SET_ACCOUNT_STATUS, payload: accountStatus })
}

export const updateUser = (user: IUser) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionTypes.SET_USER_LOADING, payload: true })
            dispatch({ type: UserActionTypes.SET_USER_ERROR, payload: null })
            dispatch({ type: UserActionTypes.UPDATE_USER, payload: await updateUserAxios(user) })
        } catch (error) {
            dispatch({ type: UserActionTypes.SET_USER_ERROR, payload: error.message || "Error of updating the user." })
        } finally {
            dispatch({ type: UserActionTypes.SET_USER_LOADING, payload: false })
        }
    }
}

export const removeUserAccount = (user: IUser) => {
    return async (dispatch: Dispatch<UserAction>) => dispatch({ type: UserActionTypes.REMOVE_USER_ACCOUNT, payload: user.id })
}