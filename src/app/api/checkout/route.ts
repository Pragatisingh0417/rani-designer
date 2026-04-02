import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();

    // ✅ SAFE: initialize inside function
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Stripe key missing");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const body = await req.json();

    // 1. Create Order (pending)
    const order = await Order.create({
      ...body,
      isPaid: false,
      paymentMethod: "ONLINE",
    });

    // 2. Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: body.items.map((item: any) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?orderId=${order._id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    });

    // 3. Save session ID
    order.stripeSessionId = session.id;
    await order.save();

    return NextResponse.json({ url: session.url });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}