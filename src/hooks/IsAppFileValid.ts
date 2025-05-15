export function isAppFileValid(file: File | undefined) {
    if (file === undefined) return false
    return file.type === 'image/jpeg' || file.type === 'image/png'
}