import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import Order from "@/app/models/Order";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  const user = await User.findById(id);
  const orders = await Order.find({ userId: id }).sort({
    createdAt: -1,
  });

  return NextResponse.json({ user, orders });
}