"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ product }: any) {

  const { addToCart, cart } = useCart();
  const router = useRouter();

  const isInCart = cart.some(
    (item: any) => item._id === product._id
  );

  return (
    <button
      onClick={() => {
        if (isInCart) {
          router.push("/cart");
        } else {
          addToCart(product);
        }
      }}
      className={`px-6 py-3 rounded transition ${
        isInCart
          ? "bg-[#D4AF37] text-white"
          : "bg-black text-white hover:bg-gray-800"
      }`}
    >
      {isInCart ? "Go to Cart" : "Add to Cart"}
    </button>
  );
}