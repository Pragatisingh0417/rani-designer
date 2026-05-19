import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {

  try {

    // ✅ GET DATA
    const { items, orderData } = await req.json();

    // ✅ CREATE STRIPE SESSION
    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      line_items: items.map((item: any) => ({

        price_data: {

          currency: "gbp",

          product_data: {
            name: item.name,
          },

          unit_amount: Math.round(item.price * 100),
        },

        quantity: item.quantity,
      })),

      mode: "payment",

      // ✅ SUCCESS PAGE
      success_url:
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

      // ✅ CANCEL PAGE
      cancel_url:
        `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,

      // ✅ SAVE ORDER DATA TEMPORARILY
     metadata: {

  userId: orderData.userId,

  customerName: orderData.customerName,

  customerEmail: orderData.customerEmail,

  paymentMethod: orderData.paymentMethod,

  total: String(orderData.total),

  items: JSON.stringify(orderData.items),

  shippingAddress: JSON.stringify(
    orderData.shippingAddress
  ),
},

    });

    return NextResponse.json({
      url: session.url,
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      { error: "Stripe session failed" },
      { status: 500 }
    );
  }
}