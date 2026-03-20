"use client";

import Link from "next/link";
import { Eye, Heart } from "lucide-react";
import { useWishlist } from "@/app/context/WishlistContext";
import { useCart } from "@/app/context/CartContext";

interface Props {
  products: any[];
  onQuickView: (product: any) => void;
}

export default function ProductGrid({
  products,
  onQuickView,
}: Props) {

  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart, cart, setIsCartOpen } = useCart();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      
      {products.map((product: any) => {

        // ✅ Check if already in cart
        const isInCart = cart.some(
          (item: any) => item._id === product._id
        );

        return (
          <div
            key={product._id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 group"
          >

            {/* 🔥 Image */}
            <div className="relative overflow-hidden">

              <Link
                href={`/products/${product.category.slug}/${product.slug}`}
                className="block"
              >
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  className="w-full h-[260px] object-cover transition duration-500 group-hover:scale-105"
                  alt={product.name}
                />
              </Link>

              {/* ❤️ Wishlist */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product._id);
                }}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition z-20"
              >
                <Heart
                  size={16}
                  className={
                    wishlist.includes(product._id)
                      ? "fill-red-500 text-red-500"
                      : "text-black"
                  }
                />
              </button>

              {/* 👁 Quick View */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickView(product);
                  }}
                  className="bg-white px-4 py-2 text-sm rounded-full shadow hover:scale-105 transition pointer-events-auto"
                >
                  <Eye size={16} />
                </button>
              </div>

            </div>

            {/* 🔥 Info */}
            <div className="p-4">

              <h3 className="text-sm font-medium text-center line-clamp-2 min-h-[40px]">
                {product.name}
              </h3>

              <div className="mt-2 text-lg font-semibold text-center">
                £{product.price}
              </div>

              {/* 🛒 Cart Button */}
              <button
                onClick={() => {
                  if (isInCart) {
                    setIsCartOpen(true); // open cart drawer
                  } else {
                    addToCart(product);
                  }
                }}
                className={`mt-4 w-full py-2 rounded-lg text-sm transition ${
                  isInCart
                    ? "bg-[#D4AF37] text-white"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {isInCart ? "Go to Cart" : "Add to Cart"}
              </button>

            </div>

          </div>
        );
      })}

    </div>
  );
}