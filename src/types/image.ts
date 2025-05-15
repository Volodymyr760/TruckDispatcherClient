export interface IImage {
    id?: string
    userId: string
    fileName: string
    fullPath: string
    extension: string
    mime: string
    fileSize: number
    latitude?: number
    longitude?: number
    createdAt: Date
}