import { connectDb } from "@/dbConfig/db-config";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/utils/mailer";

connectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { firstName, lastName, email, password } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already Exist" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    //send verification mail

    await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });

    console.log(savedUser);

    return NextResponse.json({
      message: "User Registered Successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }), { status: 500 };
  }
}
