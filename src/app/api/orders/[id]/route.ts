import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/models/Order";

// ✅ UPDATE ORDER STATUS
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // ✅ change
) {
  try {
    await connectDB();

    const { id } = await params; // ✅ FIX HERE
    const { status } = await req.json();

    const order = await Order.findByIdAndUpdate(
      id, // ✅ use id instead of params.id
      { status },
      { returnDocument: "after" } // ✅ updated (see below)
    );

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}

// ✅ GET SINGLE ORDER
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // 👈 change here
) {
  try {
    await connectDB();

    const { id } = await params; // 👈 IMPORTANT

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}