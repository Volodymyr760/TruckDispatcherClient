import { EMAIL_REG_EXP } from "../types/common/RegularExpressions"

export function isEmailValid(email: string): boolean {
    if (!email) return false // is a required field
    if (EMAIL_REG_EXP.test(email)) return true
    if (email.length > 256) return false
    return false
}