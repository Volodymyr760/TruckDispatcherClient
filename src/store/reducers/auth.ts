import { AuthAction, AuthActionTypes, AuthState } from "../../types/auth"

const initialState: AuthState = {
    auth: null,
    loading: false,
    error: null,
}

export const authReducer = (state: AuthState = initialState, action: AuthAction) => {
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
            return { ...state, auth: { ...state.auth, user: { ...state.auth.user, avatar: action.payload } } }
        case AuthActionTypes.UPDATE_AUTH_USER:
            return { ...state, auth: { ...state.auth, user: action.payload } }
        default: return state
    }
}