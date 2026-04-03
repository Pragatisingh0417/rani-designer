import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import Order from "@/app/models/Order";

export async function GET() {
  await connectDB();

  const users = await User.find().lean();

  // 🔥 attach order data
  const usersWithStats = await Promise.all(
    users.map(async (user) => {
      const orders = await Order.find({ userId: user._id });

      const totalOrders = orders.length;
      const totalSpend = orders.reduce(
        (acc, o) => acc + (o.total || 0),
        0
      );

      return {
        ...user,
        totalOrders,
        totalSpend,
      };
    })
  );

  return NextResponse.json(usersWithStats);
}