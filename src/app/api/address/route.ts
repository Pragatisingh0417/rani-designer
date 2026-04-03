import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Address from "@/app/models/Address";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const address = await Address.create(body);
  return NextResponse.json(address);
}

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const addresses = await Address.find({ userId });

  return NextResponse.json(addresses);
}