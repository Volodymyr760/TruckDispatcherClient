import axios from 'axios'
import { INotification } from '../types/notification'
import { ISearchParams } from '../types/common/searchParams'
import { IPatchDocumentItem } from '../types/common/patchDocument'

/**
 * Get list of Notifications
 * @param limit<number> Page size
 * @param page<number> Current page
 */
export async function getNotificationsAxios(notificationSearchParams: ISearchParams<INotification>): Promise<ISearchParams<INotification>> {
    return (
        await axios.post(`/notification/search`, notificationSearchParams)).data
}

/**
 * Creates a new Notification
 * @param Notification<INotification> object of type INotification
 * @returns<INotification> Created Notification
 */
export async function createNotificationAxios(notification: INotification): Promise<INotification> {
    return (await axios.post("/notification/create", notification)).data
}

/**
 * @param id<string> Notification identifier
 * @param patchDocument<IPatchDocument> Patch document to update Notification field
 * @returns<INotification> Updated notification object
 */
export async function partialUpdateNotificationAxios(id: string, patchDocument: IPatchDocumentItem): Promise<INotification> {
    return (await axios.patch(`/notification/partialupdate/${id}`, [patchDocument])).data
}

/**
 * Delete's the Notification specified by identifier
 * @param id<string> Identifier
 */
export async function removeNotificationAxios(id: string): Promise<void> {
    return await axios.delete(`/notification/delete/${id}`)
}