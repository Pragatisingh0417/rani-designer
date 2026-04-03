import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // ✅ Validation
    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "No items" }, { status: 400 });
    }

    if (!body.total) {
      return NextResponse.json({ error: "Total missing" }, { status: 400 });
    }

    // ✅ CREATE ORDER (you forgot this)
const order = await Order.create({
  ...body,
  userId: body.userId, // 🔥 MUST EXIST
});

console.log("BODY RECEIVED:", body);

    // ✅ Return order
    return NextResponse.json(order);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Order failed" }, { status: 500 });
  }
}




export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching orders" }, { status: 500 });
  }
}