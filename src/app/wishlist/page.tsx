"use client";

import { useEffect, useState } from "react";
import { useWishlist } from "@/app/context/WishlistContext";
import ProductGrid from "@/app/components/ProductGrid";
import QuickViewDrawer from "@/app/components/QuickViewDrawer";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();

      const filtered = data.filter((p: any) =>
        wishlist.includes(p._id)
      );

      setProducts(filtered);
    };

    if (wishlist.length) fetchWishlistProducts();
    else setProducts([]);
  }, [wishlist]);

  return (
    <div className="max-w-7xl mx-auto pt-32 px-6 lg:px-10">

      <h1 className="text-3xl font-semibold mb-8">
        Your Wishlist
      </h1>

      {products.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <ProductGrid
          products={products}
          onQuickView={(p) => setSelectedProduct(p)} // ✅ FIX
        />
      )}

      {/* ✅ QUICK VIEW DRAWER */}
      {selectedProduct && (
        <QuickViewDrawer
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

    </div>
  );
}