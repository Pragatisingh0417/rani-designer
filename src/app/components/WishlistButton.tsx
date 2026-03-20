"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/app/context/WishlistContext";

export default function WishlistButton({ productId }: any) {
  const { wishlist, toggleWishlist } = useWishlist();

  const isWishlisted = wishlist.includes(productId);

  return (
    <button
      onClick={() => toggleWishlist(productId)}
      className="flex items-center gap-2 border px-6 py-3 rounded hover:bg-gray-100 transition"
    >
      <Heart
        size={18}
        className={
          isWishlisted
            ? "fill-red-500 text-red-500"
            : "text-black"
        }
      />
      {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
    </button>
  );
}