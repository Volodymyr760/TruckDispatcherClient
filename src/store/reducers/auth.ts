import { AuthAction, AuthActionTypes, AuthState, IAuth } from "../../types/auth"

const initialState: AuthState = {
    auth: JSON.parse(localStorage.getItem("auth")),
    loading: false,
    error: null,
}

export const authReducer = (state: AuthState = initialState, action: AuthAction) => {
    let authFromLocalstorage: IAuth = JSON.parse(localStorage.getItem("auth"));

    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return { ...state, auth: action.payload }
        case AuthActionTypes.LOGOUT:
            return { ...state, auth: null }
        case AuthActionTypes.SET_AUTH_ERROR:
            return { ...state, error: action.payload }
        case AuthActionTypes.SET_AUTH_LOADING:
            return { ...state, loading: action.payload }
        case AuthActionTypes.SET_USER_AVATAR:
            authFromLocalstorage.user.avatar = action.payload
            localStorage.setItem("auth", JSON.stringify(authFromLocalstorage))
            return { ...state, auth: { ...state.auth, user: { ...state.auth.user, avatar: action.payload } } }
        case AuthActionTypes.UPDATE_AUTH_USER:
            authFromLocalstorage.user = action.payload
            localStorage.setItem("auth", JSON.stringify(authFromLocalstorage))
            return { ...state, auth: { ...state.auth, user: action.payload } }
        default: return state
    }
}