"use client";

import { useEffect } from "react";
import { useCart } from "@/app/context/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // simulate success
    clearCart();
  }, [clearCart]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">✅ Order Placed (Test Mode)</h1>
      <p>Your order flow is working. Payment integration pending.</p>
    </div>
  );
}