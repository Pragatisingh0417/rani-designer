"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";
import QuickViewDrawer from "@/app/components/QuickViewDrawer";
import { formatCurrency } from "@/app/lib/format";

export default function WishlistPage() {
  const { user } = useAuth();
  const { addToCart, cart, setIsCartOpen } = useCart();

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // 🔥 Fetch wishlist from DB
  useEffect(() => {
    if (!user?._id) return;

    fetch(`/api/wishlist?userId=${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        const prods = data.map((item: any) => item.productId);
        setProducts(prods);
      });
  }, [user]);

  // 🔥 Remove from wishlist
  const removeFromWishlist = async (productId: string) => {
    if (!user?._id) return;

    setLoadingId(productId);

    await fetch("/api/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        productId,
      }),
    });

    setProducts((prev) => prev.filter((p) => p._id !== productId));
    setLoadingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto pt-32 px-6 lg:px-10 mb-10">

      <h1 className="text-3xl font-semibold mb-8">Your Wishlist ❤️</h1>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-3">
            Your wishlist is empty 💔
          </p>
          <a href="/products" className="text-black underline">
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

          {products.map((product: any) => {
            const isInCart = cart.some(
              (item: any) => item._id === product._id
            );

            const inStock = product.stock > 0;

            const isOnSale = Number(product.salePrice) > 0;

            return (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-3"
              >

                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={product.images?.[0] || "/placeholder.png"}
                    className="w-full h-48 object-cover rounded-lg cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  />

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    disabled={loadingId === product._id}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow text-red-500 hover:scale-110"
                  >
                    ✕
                  </button>
                </div>

                {/* INFO */}
                <div className="mt-3">

                  <p className="text-sm font-medium line-clamp-2">
                    {product.name}
                  </p>

                  {/* PRICE */}
                  <div className="mt-1">
                    {isOnSale ? (
                      <div className="flex gap-2 items-center">
                        <span className="text-red-600 font-semibold text-sm">
                          {formatCurrency(product.salePrice)}
                        </span>
                        <span className="text-xs line-through text-gray-400">
                          {formatCurrency(product.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-semibold">
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>

                  {/* BUTTONS */}
                  <div className="mt-3 flex gap-2">

                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 border py-2 rounded text-sm"
                    >
                      View
                    </button>

                    <button
                      disabled={!inStock}
                      onClick={() => {
                        if (isInCart) {
                          setIsCartOpen(true);
                        } else {
                          addToCart(product);
                        }
                      }}
                      className={`flex-1 py-2 rounded text-sm ${
                        !inStock
                          ? "bg-gray-300 text-gray-500"
                          : isInCart
                          ? "bg-red-600 text-white"
                          : "bg-black text-white"
                      }`}
                    >
                      {!inStock
                        ? "Out"
                        : isInCart
                        ? "Go to Cart"
                        : "Add"}
                    </button>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* QUICK VIEW */}
      {selectedProduct && (
        <QuickViewDrawer
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}