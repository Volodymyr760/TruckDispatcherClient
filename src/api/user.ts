import axios from 'axios'
import {
    ChangeRolesDto, IAuth, IChangeEmailDto, IChangePasswordDto,
    ILoginDto, IRegisterDto, IResetPasswordDto
} from '../types/auth'
import { IUser, IUserSearchParams, IUserSearchSettings } from '../types/user'
import { IPatchDocumentItem } from '../types/common/patchDocument'

/**
 * Changes the email of current user
 * @param changeEmailDto<IChangeEmailDto> Object of type IChangeEmailDto
 * @returns<string> Success confirmation message
 */
export async function changeEmailAxios(changeEmailDto: IChangeEmailDto): Promise<string> {
    return (await axios.post<string>("/user/changeemail", changeEmailDto)).data
}

/**
 * Changes roles for user
 * @param ChangeRolesDto<ChangeRolesDto> Object of type ChangeRolesDto
 * @returns<void>
 */
export async function changeUserRolesAxios(changeRolesDto: ChangeRolesDto) {
    await axios.post<string>("/user/changeuserroles", changeRolesDto)
}

/**
 * Changes the password of current user
 * @param changePasswordDto<IChangePasswordDto> Object of type IChangePasswordDto
 * @returns<string> Success confirmation message
 */
export async function changePasswordAxios(changePasswordDto: IChangePasswordDto): Promise<string> {
    return (await axios.post<string>("/user/changepassword", changePasswordDto)).data
}

export async function confirmEmailAxios(code: string, email: string) {
    await axios.get(`/user/confirmemail?code=${code}&email=${email}`)
}

export async function forgotPasswordAxios(email: string) {
    await axios.get(`/user/forgotpassword?email=${email}`)
}

/**
 * Get's users list
 * @param usersSearchParams: Users Search Params
 */
export async function getUsersAxios(searchParams: IUserSearchParams): Promise<IUserSearchParams> {
    return (await axios.post("/user/search", searchParams)).data
}

/**
 * Get user by id
 * @param id<number> Identifier
 * @returns<IUser> user object
 */
export async function getUserByIdAxios(id: string): Promise<IUser> {
    return (await axios.get(`/user/get/${id}`)).data
}

/**
 * Get roles list specified by user id
 * @param id<string> User's identifier
 * @returns<string> ChangeRolesDto object
 */
export async function getRolesByIdAxios(id: string): Promise<ChangeRolesDto> {
    return (await axios.get(`/user/getRoles/${id}`)).data
}

/**
 * Get user by id
 * @param id<number> User's identifier
 * @returns<IUserSearchSettings> IUserSearchSettings object
 */
export async function getSearchSettinsAxios(id: string): Promise<IUserSearchSettings> {
    return (await axios.get(`/user/getSearchSettins/${id}`)).data
}

export async function loginAxios(loginDto: ILoginDto): Promise<IAuth> {
    return (await axios.post<IAuth>("/user/login", loginDto)).data
}

export async function logoutAxios(email: string) {
    // await axios.get(`/user/logout/${email}`, { headers: { Authorization: `Bearer ${token}` } })
    await axios.get(`/user/logout/${email}`)
}

export async function getAuthModelAxios(id: string): Promise<IAuth> {
    // await axios.get(`/user/logout/${email}`, { headers: { Authorization: `Bearer ${token}` } })
    return (await axios.get(`/user/getAuthModel?id=${id}`)).data
}

/**
 * @param id<string> User identifier
 * @param patchDocument<IPatchDocument> Patch document to update User's field
 * @returns<IUser> Updated IUser object
 */
export async function partialUpdateUserAxios(id: string, patchDocument: IPatchDocumentItem): Promise<IUser> {
    return (await axios.patch(`/user/partialUpdate/${id}`, [patchDocument])).data
}

export async function refreshTokenAxios(accessToken: string, refreshToken: string): Promise<IAuth> {
    return (await axios.post<IAuth>("/user/refreshtoken", { accessToken, refreshToken })).data
}

export async function registerAxios(registerDto: IRegisterDto): Promise<IRegisterDto> {
    return (await axios.post<IRegisterDto>("/user/register", registerDto)).data
}

/**
 * Delete's the User specified by identifier
 * @param id<string> Identifier
 */
export async function removeUserAxios(id: string): Promise<void> {
    return await axios.delete(`/user/delete/${id}`)
}

export async function resetPasswordAxios(resetPasswordDto: IResetPasswordDto): Promise<string> {
    return (await axios.post<string>("/user/resetPassword", resetPasswordDto)).data
}

/**
 * Updates the existing user
 * @param user<IUser> Object of type IUser
 * @returns<IUser> Updated user object
 */
export async function updateUserAxios(user: IUser): Promise<IUser> {
    return (await axios.post("/user/update", user)).data
}
