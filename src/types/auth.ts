import { IUser } from "./user"

export interface IAuth {
    user: IUser
    roles: Role[]
    tokens: {
        accessToken: string
        refreshToken: string
    }
}

export interface ILoginDto {
    email: string
    password: string
}

export interface IRegisterDto {
    companyName: string,
    role: Role,
    firstName: string
    lastName: string,
    email: string
    password: string
    confirmPassword: string
}

export interface IChangePasswordDto {
    email: string
    oldPassword: string
    newPassword: string
    confirmNewPassword: string
}

export interface IChangeEmailDto {
    existingEmail: string
    newEmail: string
    password: string
}

export interface IResetPasswordDto {
    code: string
    email: string
    password: string
    confirmPassword: string
}

export enum Role {
    Admin = "Admin",
    Broker = "Broker",
    Carrier = "Carrier"
}

export interface IdentityRole {
    id: string
    name: string
    normalizedName: string
    concurrencyStamp: string
}

export interface ChangeRolesDto {
    userId: string
    allRoles: IdentityRole[]
    userRoles: string[]
}

export interface AuthState {
    auth: null | IAuth
    loading: boolean
    error: null | string
}

export enum AuthActionTypes {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    SET_AUTH_ERROR = "SET_AUTH_ERROR",
    SET_AUTH_LOADING = "SET_AUTH_LOADING",
    SET_USER_AVATAR = "SET_USER_AVATAR",
    SET_USER_LOGO = "SET_USER_LOGO",
    UPDATE_AUTH_USER = "UPDATE_AUTH_USER",
}

interface Login {
    type: AuthActionTypes.LOGIN
    payload: IAuth
}

interface Logout {
    type: AuthActionTypes.LOGOUT
    payload: null
}

interface SetErrorAction {
    type: AuthActionTypes.SET_AUTH_ERROR
    payload: null | string
}

interface SetLoadingAction {
    type: AuthActionTypes.SET_AUTH_LOADING
    payload: boolean
}

interface SetUserAvatarAction {
    type: AuthActionTypes.SET_USER_AVATAR
    payload: null | string
}

interface SetUserLogoAction {
    type: AuthActionTypes.SET_USER_LOGO
    payload: null | string
}

interface UpdateAuthUserAction {
    type: AuthActionTypes.UPDATE_AUTH_USER
    payload: IUser
}

export type AuthAction = Login | Logout |
    SetErrorAction | SetLoadingAction | SetUserAvatarAction | SetUserLogoAction |
    UpdateAuthUserAction