/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDb } from "@/dbConfig/db-config";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout Successful.",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
