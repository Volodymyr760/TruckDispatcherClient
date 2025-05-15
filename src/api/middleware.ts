import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorStatus } from '../types/common/error'
import { logoutAxios, refreshTokenAxios } from './user'
import { RouteNames } from '../routing'

export class AxiosMiddleware {
    static boot(): void {
        axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_API_URL_PROD + "/api" :
            process.env.REACT_APP_BASE_API_URL_DEV + "/api"
        
        // Request interceptor for API calls
        axios.interceptors.request.use(
            async config => {
                const authFromLocalStorage = localStorage.getItem("auth");
                if (authFromLocalStorage) {
                    const keys = JSON.parse(authFromLocalStorage);
                    config.headers = {
                        'Authorization': `Bearer ${keys.tokens.accessToken}`,
                        'Accept': 'application/json'
                    }
                }
                return config;
            },
            error => {
                Promise.reject(error)
            });

        // Response interceptor for API calls
        axios.interceptors.response.use(function (response: AxiosResponse): AxiosResponse {
            return response
        },
            async function (error: AxiosError) {
                if (!error.status) {
                    try {
                        if (error.response.status === ErrorStatus.Forbidden) {
                            throw new Error("You are not allowed to this action.")
                        }
                        if (error.response.status === ErrorStatus.Unauthorized) {
                            // Get existing tokens from localStorage and try to refresh
                            const authFromLocalStorage = JSON.parse(localStorage.getItem("auth"));
                            if (authFromLocalStorage) {
                                const authModel = await refreshTokenAxios(authFromLocalStorage.tokens.accessToken, authFromLocalStorage.tokens.refreshToken)
                                localStorage.setItem("auth", JSON.stringify(authModel))
                                // current response contains all settings needed to retry request
                                axios.defaults.headers.common['Authorization'] = 'Bearer ' + authModel.tokens.accessToken
                                return axios(error.config)
                            } else {
                                window.location.href = process.env.PUBLIC_URL + RouteNames.LOGIN
                            }
                        }
                    } catch (error) {
                        if ({ error }.error.message === "Unable to refresh token.") {
                            const auth = JSON.parse(localStorage.getItem("auth"))
                            await logoutAxios(auth.user.email, auth.tokens.accessToken)
                            localStorage.removeItem("auth");
                            window.location.href = process.env.PUBLIC_URL + RouteNames.LOGIN
                            throw new Error("Unable to refresh token, please Sign In.")
                        }
                    }
                }
                switch (error.status) {
                    case ErrorStatus['Bad Request']:
                        if (error.response) {
                            if (error.response.data) {
                                throw new Error(error.response.data['title'])
                            }
                            throw new Error('Network unavailable or server is not running.')
                        }
                        throw new Error("Bad Request Error");
                    case ErrorStatus.Forbidden.toString():
                        return
                    case ErrorStatus['Not Found']:
                        throw new Error(error.response.data['title'] || 'Not Found Error');
                    default:
                        throw new Error('Internal server error.')
                }
            });
    }
}
