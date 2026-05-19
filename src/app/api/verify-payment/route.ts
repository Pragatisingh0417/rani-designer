import { NextResponse } from "next/server";
import Stripe from "stripe";

import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/models/Order";

export async function POST(req: Request) {

  try {

    // ✅ STRIPE
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Stripe key missing");
    }

    const stripe = new Stripe(
      process.env.STRIPE_SECRET_KEY
    );

    // ✅ CONNECT DB
    await connectDB();

    // ✅ GET SESSION ID
    const { sessionId } = await req.json();

    if (!sessionId) {

      return NextResponse.json(
        { error: "Missing sessionId" },
        { status: 400 }
      );
    }

    // ✅ GET STRIPE SESSION
    const session =
      await stripe.checkout.sessions.retrieve(sessionId);

    // ❌ PAYMENT NOT COMPLETED
    if (session.payment_status !== "paid") {

      return NextResponse.json(
        {
          error: "Payment not completed",
        },
        {
          status: 400,
        }
      );
    }

    // ✅ GET ORDER DATA FROM STRIPE METADATA
    const orderData = {

  userId: session.metadata?.userId,

  customerName: session.metadata?.customerName,

  customerEmail: session.metadata?.customerEmail,

  paymentMethod: session.metadata?.paymentMethod,

  total: Number(session.metadata?.total),

  items: JSON.parse(
    session.metadata?.items || "[]"
  ),

  shippingAddress: JSON.parse(
    session.metadata?.shippingAddress || "{}"
  ),
};

    // ✅ AVOID DUPLICATE ORDERS
    const existingOrder = await Order.findOne({
      stripeSessionId: sessionId,
    });

    if (existingOrder) {

      return NextResponse.json({
        success: true,
      });
    }

    // ✅ CREATE ORDER ONLY AFTER SUCCESSFUL PAYMENT
    const newOrder = await Order.create({

      ...orderData,

      isPaid: true,

      status: "Confirmed",

      stripeSessionId: sessionId,

      stripePaymentIntentId:
        session.payment_intent as string,
    });

    return NextResponse.json({
      success: true,
      order: newOrder,
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        error: "Verification failed",
      },
      {
        status: 500,
      }
    );
  }
}