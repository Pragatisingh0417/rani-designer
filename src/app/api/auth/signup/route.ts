import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import User from "@/app/models/User";
import { connectDB } from "@/app/lib/mongodb";
import { transporter } from "@/app/lib/mailer";

export async function POST(req: Request) {

  await connectDB();

  const { name, email, password } = await req.json();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json({
      error: "User already exists",
    });
  }

  // ✅ hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ token
  const verificationToken = crypto.randomBytes(32).toString("hex");

  // ✅ create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    verificationToken,
    isVerified: false,
  });

  // ✅ verification link
  const verifyLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${verificationToken}`;

  // ✅ send email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email - Rani Designer",
    html: `
      <h2>Welcome to Rani Designer ✨</h2>

      <p>Thank you for signing up.</p>

      <p>Please verify your email by clicking below:</p>

      <a href="${verifyLink}">
        <button style="
          background:black;
          color:white;
          padding:12px 20px;
          border:none;
          border-radius:6px;
          cursor:pointer;
        ">
          Verify Email
        </button>
      </a>
    `,
  });

  return NextResponse.json({
    success: true,
    message: "Signup successful. Please verify your email.",
  });
}