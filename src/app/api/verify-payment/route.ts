import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/models/Order";

export async function POST(req: Request) {
  try {
    // ✅ Initialize Stripe INSIDE function
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Stripe key missing");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    await connectDB();

    const { sessionId, orderId } = await req.json();

    if (!sessionId || !orderId) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // 🔍 Get session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      // ✅ Update order
      const order = await Order.findById(orderId);

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      order.isPaid = true;
      order.stripePaymentIntentId = session.payment_intent as string;

      await order.save();

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Payment not completed" }, { status: 400 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}