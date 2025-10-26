import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorStatus } from '../types/common/error'
import { logoutAxios, refreshTokenAxios } from './user'
import { RouteNames } from '../routing'

export function AxiosRoutesBoot() {
    axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_API_URL_PROD + "/api" :
        process.env.REACT_APP_BASE_API_URL_DEV + "/api"
}

export function AxiosMiddleWareBoot(accessToken: string, refreshToken: string, email: string) {
    let currentAccessToken = accessToken
    // Request interceptor for API calls
    axios.interceptors.request.use(
        async config => {
            config.headers = {
                'Authorization': `Bearer ${currentAccessToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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
                        // Get existing tokens from auth store and try to refresh
                        const authModel = await refreshTokenAxios(accessToken, refreshToken)
                        // current response contains all settings needed to retry request
                        currentAccessToken = authModel.tokens.accessToken
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + currentAccessToken
                        axios.defaults.headers.common['Content-Type'] = 'application/json'
                        return axios(error.config)
                    }
                } catch (error) {
                    if ({ error }.error.message === "Unable to refresh token.") {
                        await logoutAxios(email)
                        localStorage.removeItem("id");
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
