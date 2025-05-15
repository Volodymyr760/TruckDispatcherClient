import { ISearchParams } from "./common/searchParams"

export interface INotification {
    id?: string
    senderAvatarUrl: string
    senderFullName: string
    message: string
    isRead: boolean
    callBackUrl?: string
    createdAt: Date
    recipientId: string
    recipientEmail: string
}

export interface NotificationState {
    notificationSearchParams: ISearchParams<INotification>
    loading: boolean
    error: null | string
}

export enum NotificationActionTypes {
    GET_NOTIFICATIONS = "GET_NOTIFICATIONS",
    LOAD_MORE_NOTIFICATIONS = "LOAD_MORE_NOTIFICATIONS",
    SET_NOTIFICATION_ERROR = "SET_NOTIFICATION_ERROR",
    SET_NOTIFICATION_LOADING = "SET_NOTIFICATION_LOADING",
    SET_NOTIFICATION_PAGE = "SET_NOTIFICATION_PAGE",
    SET_NOTIFICATION_USERID = "SET_NOTIFICATION_USERID",
    CREATE_NOTIFICATION = "CREATE_NOTIFICATION",
    UPDATE_NOTIFICATION_ISREAD = "UPDATE_NOTIFICATION_ISREAD",
    REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION"
}

interface GetNotificationsAction { type: NotificationActionTypes.GET_NOTIFICATIONS, payload: ISearchParams<INotification> }
interface LoadMoreNotificationsAction { type: NotificationActionTypes.LOAD_MORE_NOTIFICATIONS, payload: ISearchParams<INotification> }
interface SetNotificationErrorAction { type: NotificationActionTypes.SET_NOTIFICATION_ERROR; payload: null | string; }
interface SetNotificationLoadingAction { type: NotificationActionTypes.SET_NOTIFICATION_LOADING; payload: boolean; }
interface SetNotificationPageAction { type: NotificationActionTypes.SET_NOTIFICATION_PAGE; payload: number; }
interface SetNotificationUserIdAction { type: NotificationActionTypes.SET_NOTIFICATION_USERID; payload: string }
interface CreateNotificationAction { type: NotificationActionTypes.CREATE_NOTIFICATION, payload: INotification }
interface UpdateNotificationIsReadAction { type: NotificationActionTypes.UPDATE_NOTIFICATION_ISREAD, payload: INotification }
interface RemoveNotificationAction { type: NotificationActionTypes.REMOVE_NOTIFICATION; payload: string; }

export type NotificationAction = GetNotificationsAction | LoadMoreNotificationsAction |
    SetNotificationErrorAction |
    SetNotificationLoadingAction |
    SetNotificationPageAction |
    SetNotificationUserIdAction |
    CreateNotificationAction |
    UpdateNotificationIsReadAction |
    RemoveNotificationAction