import { Dispatch } from "redux"
import { logoutAxios } from "../../api/user"
import { AuthAction, AuthActionTypes, IAuth } from "../../types/auth"
import { IUser } from "../../types/user"

export const login = (authModel: IAuth) => {
    return async (dispatch: Dispatch<AuthAction>) => dispatch({ type: AuthActionTypes.LOGIN, payload: authModel })
}

export const logout = (email: string, token: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.SET_AUTH_LOADING, payload: true })
            dispatch({ type: AuthActionTypes.SET_AUTH_ERROR, payload: null })
            localStorage.removeItem("id");
            dispatch({ type: AuthActionTypes.LOGOUT, payload: null })
            await logoutAxios(email);
        } catch (error) {
            dispatch({ type: AuthActionTypes.SET_AUTH_ERROR, payload: error.message || 'Unknown error.' })
        } finally {
            dispatch({ type: AuthActionTypes.SET_AUTH_LOADING, payload: false })
        }
    }
}

export const setAuthError = (message: string) => {
    return async (dispatch: Dispatch<AuthAction>) =>
        dispatch({ type: AuthActionTypes.SET_AUTH_ERROR, payload: message })
}

export const setAuthLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<AuthAction>) =>
        dispatch({ type: AuthActionTypes.SET_AUTH_LOADING, payload: isLoading })
}

export const setUserAvatar = (avatar: null | string) => {
    return async (dispatch: Dispatch<AuthAction>) => dispatch({ type: AuthActionTypes.SET_USER_AVATAR, payload: avatar })
}

export const setUserLogo = (logo: null | string) => {
    return async (dispatch: Dispatch<AuthAction>) => dispatch({ type: AuthActionTypes.SET_USER_LOGO, payload: logo })
}

export const updateAuthUser = (user: IUser) => {
    return async (dispatch: Dispatch<AuthAction>) => dispatch({ type: AuthActionTypes.UPDATE_AUTH_USER, payload: user })
}


