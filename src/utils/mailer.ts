/* eslint-disable @typescript-eslint/no-explicit-any */
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import nodemailer from "nodemailer";

interface sendMailProps {
  email: string;
  emailType: string;
  userId: string;
}

export const sendMail = async ({ email, emailType, userId }: sendMailProps) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "krista99@ethereal.email",
        pass: "jk9KYH7gX6fvxTxzFV",
      },
    });

    const mailOptions = {
      from: `"AUTH_APP" <${testAccount.user}>`,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset your Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">Here</a> to ${
        emailType === "VERIFY" ? "Verify your Email" : "Reset your Password"
      } or copy paste the link below:<br>${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
