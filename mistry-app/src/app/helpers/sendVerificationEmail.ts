import { resend } from "../lib/initilizeEmail";
import OtpEmail from "../../../email/verificationEmailTemplate";
import { apiResponse } from "../types/apiResponse";


export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<apiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'misrty-app | verification code',
            react: OtpEmail({username, otp: verifyCode}),
        });
        return { success: true, Message: "verification email sent successfully !!" }
    } catch (emailerror) {
        console.error("problem while send the verification email", emailerror)
        return { success: false, Message: "problem while sending the verification email !!" }
    }
}