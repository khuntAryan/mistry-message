import { Html } from '@react-email/html';
import { Tailwind } from '@react-email/tailwind';

interface OtpEmailProps {
  username: string;
  otp: string;
}

export default function OtpEmail({ username, otp }: OtpEmailProps) {
  return (
    <Html>
      <Tailwind>
        <div className="bg-gray-100 p-4">
          <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
            <div className="bg-green-600 text-white text-center py-4 rounded-t-lg">
              <h1 className="text-xl font-bold">OTP Verification</h1>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-700">Hello <strong>{username}</strong>,</p>
              <p className="text-gray-700 mt-4">
                We received a request to verify your email address. Please use the following OTP to complete your verification:
              </p>
              <div className="bg-gray-100 text-2xl font-bold text-gray-800 py-4 my-6 rounded-md">
                {otp}
              </div>
              <p className="text-gray-600">
                If you did not request this, please ignore this email.
              </p>
            </div>
            <div className="text-center text-gray-500 text-sm py-6">
              <p>Thank you for using our service!</p>
              <p>&copy; 2024 Your Company</p>
            </div>
          </div>
        </div>
      </Tailwind>
    </Html>
  );
}
