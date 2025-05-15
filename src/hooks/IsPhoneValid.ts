import { PHONE_REG_EXP } from "../types/common/RegularExpressions"

export function isPhoneValid(phone: string): boolean {
    if (!phone) return true // is not a required field
    if (PHONE_REG_EXP.test(phone)) return true
    if (phone.length > 13) return false
    return false
}