import { z } from "zod"

export const usernameValidation = z
    .string()
    .min(2, "username must be atleast 2 char. long !!")
    .max(20, "username must not exid 20 char !!")
    .regex(/^\w+@\w+\.\w{2,}$/, "email id must be valid !!")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: " email is invalid !!" }),
    password: z.string().min(6, { message: "atleast 6 char !!" }).max(10, {message: "should not exid 10 char !!"})
})
