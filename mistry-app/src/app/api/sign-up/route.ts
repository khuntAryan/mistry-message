import dbConnect from "@/app/lib/bdConnect";
import UserModel from "@/app/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/app/helpers/sendVerificationEmail";
import { apiResponse } from "@/app/types/apiResponse";
import { date } from "zod";

export async function registerUser(request: Request) {
    await dbConnect()

    try {
        const { username, email, password } = await request.json()
        const existedUserverifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })
        if (existedUserverifiedByUsername) {
            return Response.json({
                success: false,
                Message: "user with same username exist !!"
            }, { status: 201 })
        }

        const existinguserByEmail = await UserModel.findOne({ email })

        const verifyCode = Math.floor(100000 + Math.random() * 9000000).toString()
        if (existinguserByEmail) {
            if (existinguserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    Message: "user with same email exist !!"
                }, { status: 400 })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                existinguserByEmail.password = hashedPassword;
                existinguserByEmail.verifyCode = verifyCode;
                existinguserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existinguserByEmail.save()
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)

            const expirydate = new Date()
            expirydate.setHours(expirydate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expirydate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })
            await newUser.save()
        }

        //verification email
        const emailRespoonse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )

        if (!emailRespoonse.success) {
            return Response.json({
                success: false,
                Message: "failed to send verification email !!"
            }, { status: 500 })
        }
        return Response.json({
            success: true,
            Message: "user registered successfully verify using email!!"
        }, { status: 201 })

    } catch (error) {
        console.error("error while registering the user")
        return Response.json({
            success: false,
            Message: "erroe while registering the user !!"
        }, {
            status: 500
        })
    }
}