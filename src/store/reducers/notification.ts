import { IAuth } from "../../types/auth"
import { OrderType } from "../../types/common/orderType"
import { INotification, NotificationActionTypes, NotificationAction, NotificationState } from "../../types/notification"

const auth: IAuth = JSON.parse(localStorage.getItem("auth"))

const initialState: NotificationState = {
    notificationSearchParams: {
        pageSize: 25,
        currentPage: 1,
        searchCriteria: "",
        userId: auth ? auth.user.id : "",
        sortField: "CreatedAt",
        order: OrderType.Ascending,
        includeNavProperties: false,
        itemList: [],
        pageCount: 0,
        totalItemsCount: 0
    },
    loading: true,
    error: null
}

export const notificationReducer = (state: NotificationState = initialState, action: NotificationAction): NotificationState => {
    switch (action.type) {
        case NotificationActionTypes.GET_NOTIFICATIONS:
            return { ...state, notificationSearchParams: action.payload }
        case NotificationActionTypes.LOAD_MORE_NOTIFICATIONS:
            return {
                ...state,
                notificationSearchParams: { ...action.payload, itemList: state.notificationSearchParams.itemList.concat(action.payload.itemList) },
            }
        case NotificationActionTypes.SET_NOTIFICATION_ERROR:
            return { ...state, error: action.payload }
        case NotificationActionTypes.SET_NOTIFICATION_LOADING:
            return { ...state, loading: action.payload }
        case NotificationActionTypes.SET_NOTIFICATION_PAGE:
            return { ...state, notificationSearchParams: { ...state.notificationSearchParams, currentPage: action.payload } }
        case NotificationActionTypes.SET_NOTIFICATION_USERID:
            return { ...state, notificationSearchParams: { ...state.notificationSearchParams, userId: action.payload } }
        case NotificationActionTypes.CREATE_NOTIFICATION:
            return { ...state, notificationSearchParams: { ...state.notificationSearchParams, itemList: [action.payload, ...state.notificationSearchParams.itemList] } }
        case NotificationActionTypes.UPDATE_NOTIFICATION_ISREAD:
            return { ...state, notificationSearchParams: { ...state.notificationSearchParams, itemList: updateNotificationIsRead(state, action.payload) } }
        case NotificationActionTypes.REMOVE_NOTIFICATION:
            return { ...state, notificationSearchParams: { ...state.notificationSearchParams, itemList: deleteNotification(state, action) } }
        default: return state;
    }
}

function deleteNotification(state: NotificationState, action: NotificationAction): Array<INotification> {
    return state.notificationSearchParams.itemList.filter(notification => notification.id !== action.payload)
}

function updateNotificationIsRead(state: NotificationState, notificationToUpdate: INotification): Array<INotification> {
    return state.notificationSearchParams.itemList.map((notification: INotification) => {
        if (notification.id === notificationToUpdate.id) return notificationToUpdate
        return notification;
    })
}