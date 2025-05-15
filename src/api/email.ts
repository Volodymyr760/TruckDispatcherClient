import axios from 'axios'
import { IEmail } from '../types/common/email'

export async function sendEmailAxios(email: IEmail) {
    return await axios.post("/email/send", email)
}