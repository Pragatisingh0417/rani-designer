import { NextResponse } from "next/server";
import User from "@/app/models/User";
import { connectDB } from "@/app/lib/mongodb";

export async function POST(req: Request) {

  await connectDB();

  const { token } = await req.json();

  const user = await User.findOne({
    verificationToken: token,
  });

  if (!user) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 400 }
    );
  }

  user.isVerified = true;
  user.verificationToken = "";

  await user.save();

  return NextResponse.json({
    success: true,
    message: "Email verified",
  });
}