export const dynamic = "force-dynamic";
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/app/context/CartContext"; // ✅ ADD THIS

export default function SuccessPage() {
  const params = useSearchParams();
  const { clearCart } = useCart(); // ✅ ADD THIS

  const orderId = params.get("orderId");
  const sessionId = params.get("session_id");

  useEffect(() => {
    if (!orderId || !sessionId) return;

    const verifyPayment = async () => {
      const res = await fetch("/api/verify-payment", {
        method: "POST",
        body: JSON.stringify({ orderId, sessionId }),
      });

      const data = await res.json();

      if (data.success) {
        clearCart(); // 🔥 CLEAR CART AFTER PAYMENT SUCCESS
      }
    };

    verifyPayment();
  }, [orderId, sessionId, clearCart]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">✅ Payment Successful</h1>
      <p>Your order has been placed successfully.</p>
    </div>
  );
}