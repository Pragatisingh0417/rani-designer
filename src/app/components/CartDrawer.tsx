"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const pathname = usePathname();

  // FIX: close drawer on route change
  useEffect(() => {
    setIsCartOpen(false);
  }, [pathname]);

  // ✅ Total price
  const total = cart.reduce(
    (acc: number, item: any) =>
      acc + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] bg-white z-[1000] shadow-2xl
        transform transition-transform duration-500
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 h-full flex flex-col">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)}>
              <X />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cart.map((item: any) => (
                <div
                  key={item._id}
                  className="flex gap-3 border-b pb-3"
                >
                  <img
                    src={item.images?.[0]}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div className="flex-1">
                    <p className="text-sm">{item.name}</p>

                    <p className="font-semibold">
                      £{item.price}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="px-2 border"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="px-2 border"
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
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="mt-4">

              <div className="flex justify-between font-semibold mb-4">
                <span>Total:</span>
                <span>£{total}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
  <Link
    href="/checkout"
    className="flex-1 text-center bg-black text-white py-5 px-6 rounded-lg hover:bg-gray-800 transition duration-300"
  >
    Checkout
  </Link>

  <Link
    href="/products"
    className="flex-1 text-center border border-black text-black py-3 px-6 rounded-lg hover:bg-black hover:text-white transition duration-300"
  >
    Continue Shopping
  </Link>
</div>


            </div>
          )}

        </div>
      </div>
    </>
  );
}