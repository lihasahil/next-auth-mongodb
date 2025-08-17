/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDb } from "@/dbConfig/db-config";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/get-data-from-token";

connectDb();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ message: "No user found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User Found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching user", error: error.message },
      { status: 500 }
    );
  }
}
