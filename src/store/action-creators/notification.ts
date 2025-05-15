import { Dispatch } from "redux"
import { INotification, NotificationActionTypes, NotificationAction } from "../../types/notification"
import { createNotificationAxios, getNotificationsAxios, partialUpdateNotificationAxios, removeNotificationAxios } from "../../api/notification"
import { ISearchParams } from "../../types/common/searchParams"

export const getNotifications = (notificationSearchParams: ISearchParams<INotification>) => {
    return async (dispatch: Dispatch<NotificationAction>) => {
        try {
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_LOADING, payload: true })
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_ERROR, payload: null })
            dispatch({ type: NotificationActionTypes.GET_NOTIFICATIONS, payload: await getNotificationsAxios(notificationSearchParams) })
        } catch (error) {
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_ERROR, payload: error.message || "Error of loading notifications." })
        } finally {
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_LOADING, payload: false })
        }
    }
}

export const loadMoreNotifications = (notificationSearchParams: ISearchParams<INotification>) => {
    return async (dispatch: Dispatch<NotificationAction>) => {
        try {
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_LOADING, payload: true })
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_ERROR, payload: null })
            dispatch({ type: NotificationActionTypes.LOAD_MORE_NOTIFICATIONS, 
                payload: await getNotificationsAxios(notificationSearchParams) })
        } catch (error) {
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_ERROR, 
                payload: error.message || "Error of loading notifications." })
        } finally {
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_LOADING, payload: false })
        }
    }
}

export const setNotificationError = (message: string) => {
    return async (dispatch: Dispatch<NotificationAction>) =>
        dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_ERROR, payload: message })
}

export const setNotificationLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<NotificationAction>) =>
        dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_LOADING, payload: isLoading })
}

export const setNotificationPage = (page: number) => {
    return async (dispatch: Dispatch<NotificationAction>) =>
        dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_PAGE, payload: page })
}

export const setNotificationUserId = (userId: string) => {
    return async (dispatch: Dispatch<NotificationAction>) =>
        dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_USERID, payload: userId })
}


export const createNotification = (notification: INotification) => {
    return async (dispatch: Dispatch<NotificationAction>) => {
        try {
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_LOADING, payload: true })
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_ERROR, payload: null })
            dispatch({ type: NotificationActionTypes.CREATE_NOTIFICATION, payload: await createNotificationAxios(notification) })
        } catch (error) {
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_ERROR, 
                payload: error.message || "Error while creating the notification." })
        } finally {
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_LOADING, payload: false })
        }
    }
}

export const updateNotificationIsRead = (notification: INotification) => {
    return async (dispatch: Dispatch<NotificationAction>) => {
        try {
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_LOADING, payload: true })
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_ERROR, payload: null })
            await partialUpdateNotificationAxios(notification.id, { op: "replace", path: "/IsRead", value: notification.isRead })
            
            dispatch({ type: NotificationActionTypes.UPDATE_NOTIFICATION_ISREAD, payload: notification })
        } catch (error) {
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_ERROR, 
                payload: error.message || "Error while updating the isRead." })
        } finally {
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_LOADING, payload: false })
        }
    }
}

export const removeNotification = (id: string) => {
    return async (dispatch: Dispatch<NotificationAction>) => {
        try {
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_LOADING, payload: true })
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_ERROR, payload: null })
            await removeNotificationAxios(id);
            dispatch({ type: NotificationActionTypes.REMOVE_NOTIFICATION, payload: id })
        } catch (error) {
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_ERROR, 
                payload: error.message || "Error while removing the notification." })
        } finally {
            dispatch({ type: NotificationActionTypes.SET_NOTIFICATION_LOADING, payload: false })
        }
    }
}

