"use client";

import ProductGrid from "@/app/components/ProductGrid";
import { useState } from "react";

export default function RelatedProducts({ products }: any) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const addToCart = (product: any) => {
    setCart((prev) => {
      if (prev.includes(product._id)) return prev;
      return [...prev, product._id];
    });
  };

  return (
    <div className="mt-16">

      <h2 className="text-2xl font-semibold mb-6">
        Related Products
      </h2>

      <ProductGrid
        products={products}
        onQuickView={(p) => setSelectedProduct(p)}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        addToCart={addToCart}
      />
    </div>
  );
}