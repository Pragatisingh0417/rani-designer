import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {

  try {

    const { items, orderId } = await req.json();

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

      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,

      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
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