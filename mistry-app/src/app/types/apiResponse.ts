import { message } from "../models/User"
export interface apiResponse {
    success: boolean,
    Message: String,
    isAcceptingMessage?: boolean,
    messages?: Array<message>
}