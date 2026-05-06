"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("orderId");

  const { clearCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            orderId,
          }),
        });

        const data = await res.json();

        if (data.success) {
          clearCart();
          setSuccess(true);
        }
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    if (sessionId && orderId) {
      verifyPayment();
    }
  }, [sessionId, orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Verifying payment...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">

      {success ? (
        <>
          <h1 className="text-4xl font-bold mb-4">
            Payment Successful 🎉
          </h1>

          <p className="text-gray-600 mb-6">
            Your order has been placed successfully.
          </p>

          <a
            href="/"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </a>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-4 text-red-500">
            Payment Failed
          </h1>

          <p className="text-gray-600">
            Something went wrong while verifying payment.
          </p>
        </>
      )}

    </div>
  );
}