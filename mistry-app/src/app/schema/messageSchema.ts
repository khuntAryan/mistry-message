import { z } from "zod"

export const messageSchema = z.object({
    message: z
        .string()
        .min(10, { message: "must exid 9 char !!" })
        .max(300, { message: "must not exid 300 char !!" })
})