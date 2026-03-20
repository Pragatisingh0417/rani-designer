"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const total = cart.reduce(
    (acc: number, item: any) =>
      acc + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <div className="max-w-6xl mx-auto pt-32 px-6 lg:px-10 pb-16">

      <h1 className="text-3xl font-semibold mb-10">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* 🛒 Items */}
          <div className="lg:col-span-2 space-y-6">

            {cart.map((item: any) => (
              <div
                key={item._id}
                className="flex gap-4 border-b pb-4"
              >

                <img
                  src={item.images?.[0]}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">

                  <h3 className="font-medium">{item.name}</h3>

                  <p className="font-semibold mt-1">
                    £{item.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="px-3 py-1 border"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      className="px-3 py-1 border"
                    >
                      +
                    </button>
                  </div>

                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>

              </div>
            ))}

          </div>

          {/* 💰 Summary */}
          <div className="border p-6 rounded-lg h-fit">

            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3">
              <span>Total</span>
              <span className="font-semibold">£{total}</span>
            </div>

            <button className="w-full bg-black text-white py-3 rounded mt-4">
              Proceed to Checkout
            </button>

          </div>

        </div>
      )}
    </div>
  );
}