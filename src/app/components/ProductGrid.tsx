"use client";

import Link from "next/link";
import { Eye, Heart } from "lucide-react";
import { useWishlist } from "@/app/context/WishlistContext";
import { useCart } from "@/app/context/CartContext";
import { formatCurrency } from "@/app/lib/format";

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

  const visibleProducts = products?.filter(
    (p: any) => p && p.slug && p.isActive
  );
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

      {visibleProducts.map((product: any) => {
        if (!product || !product.slug) return null;

        const isInCart = cart.some(
          (item: any) => item._id === product._id
        );

        const inStock = product.stock > 0;

        // ✅ SAFE SALE LOGIC
        const isOnSale = Number(product.salePrice) > 0;

        const discount =
          isOnSale
            ? Math.round(
              ((product.price - product.salePrice) / product.price) * 100
            )
            : 0;

        return (
          <div
            key={product._id}
            className="bg-amber-50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 group mb-6"
          >

            {/* IMAGE */}
            <div className="relative overflow-hidden">

              <Link
                href={
                  product?.category?.slug
                    ? `/products/${product.category.slug}/${product.slug}`
                    : `/products/${product.slug}` // fallback
                }
                className="block"
              >
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  className="w-full h-[260px] object-cover transition duration-500 group-hover:scale-105"
                  alt={product.name}
                />
              </Link>

              {/* 🔥 % OFF BADGE */}
              {isOnSale && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded font-medium">
                  {discount}% OFF
                </span>
              )}

              {/* ❌ OUT OF STOCK */}
              {!inStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-medium">
                  Out of Stock
                </div>
              )}

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
              {inStock && (
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
              )}

            </div>

            {/* INFO */}
            <div className="p-4">

              <h3 className="text-sm font-medium text-center line-clamp-2 min-h-[40px]">
                {product.name}
              </h3>
              <div className="flex gap-12">
                {/* 💰 PRICE */}
                <div className="mt-2 text-center">

                  {isOnSale ? (
                    <div className="flex flex-col items-center">
<div className="flex gap-2">{/* SALE PRICE */}
                      <span className="text-[14px] text-lg font-semibold text-red-600">
                        {formatCurrency(product.salePrice)}
                      </span>

                      {/* ORIGINAL PRICE */}
                      <span className="text-[12px] line-through text-gray-400">
                        {formatCurrency(product.price)}
                      </span>
                      
                       </div>
                      
{/* SAVE */}
                      <span className="text-[10px] text-green-600">
                        Save {formatCurrency(product.price - product.salePrice)}
                      </span>
                      

                    </div>
                  ) : (
                    <span className="text-lg font-semibold">
                      {formatCurrency(product.price)}
                    </span>
                  )}

                </div>

                {/* 🛒 BUTTON */}
                <button
                  disabled={!inStock}
                  onClick={() => {
                    if (!inStock) return;

                    if (isInCart) {
                      setIsCartOpen(true);
                    } else {
                      addToCart(product);
                    }
                  }}
                  className={` w-30 py-2 rounded-lg text-sm transition ${!inStock
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : isInCart
                      ? "bg-red-600 text-white"
                      : "bg-black text-white hover:bg-gray-800"
                    }`}
                >
                  {!inStock
                    ? "Out of Stock"
                    : isInCart
                      ? "Go to Cart"
                      : "Add to Cart"}
                </button>
              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}