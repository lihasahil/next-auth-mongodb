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
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "api",
        pass: "aaa169d8e612667d16fae0e78086259b",
      },
    });

    const mailOption = {
      from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset your Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">Here</a> to ${
        emailType === "VERIFY" ? "Verify your Email" : "Reset your Password"
      } or copy paste the link below in your browser.<br>${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOption);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
