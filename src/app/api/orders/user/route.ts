import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/models/Order";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json([], { status: 200 });
    }
console.log("QUERY USER ID:", userId);

   const orders = await Order.find({
  userId: userId.toString(), // 🔥 fix
}).sort({ createdAt: -1 });
console.log("FOUND ORDERS:", orders.length);
    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}