import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Wishlist from "@/app/models/Wishlist";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const item = await Wishlist.create(body);
  return NextResponse.json(item);
}

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const items = await Wishlist.find({ userId }).populate("productId");

  return NextResponse.json(items);
}

export async function DELETE(req: Request) {
  await connectDB();

  const body = await req.json();

  await Wishlist.findOneAndDelete({
    userId: body.userId,
    productId: body.productId,
  });

  return NextResponse.json({ success: true });
}