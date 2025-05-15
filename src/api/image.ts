import axios from 'axios'
import { IImage } from '../types/image'

/**
 * Creates a new Image
 * @param picture<File> file to upload
 * @returns<IImage> Created Image
 */
export async function uploadImageAxios(picture: File): Promise<IImage> {
    let formData: FormData = new FormData()
    formData.append('formFile', picture)
    return (await axios.post<IImage>(`image/upload`, formData)).data
}

/**
 * Deletes the Image specified by unique filename for autherized users
 * @param fileName<string> file name
 */
export async function removeImageAxios(fileName: string): Promise<void> {
    return await axios.delete(`/image/delete?fileName=${fileName}`)
}