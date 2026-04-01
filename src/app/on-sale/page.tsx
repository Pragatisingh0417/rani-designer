"use client";

import { useEffect, useState } from "react";
import ProductGrid from "@/app/components/ProductGrid";
import QuickViewDrawer from "@/app/components/QuickViewDrawer";

export default function OnSalePage() {

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        // ✅ FILTER ONLY SALE PRODUCTS
        const saleProducts = data.filter(
          (p: any) => Number(p.salePrice) > 0 && p.isActive
        );

        setProducts(saleProducts);

      } catch (err) {
        console.error("Error fetching sale products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 
                pt-40 sm:pt-24 lg:pt-28 
                pb-10 sm:pb-14 lg:pb-20">
    {/* HEADER */}
    <div className="text-center mb-8 sm:mb-10">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif">
        On Sale 🔥
      </h1>
      <p className="text-gray-500 mt-2 text-sm sm:text-base">
        Grab the best deals before they’re gone
      </p>
    </div>

    {/* PRODUCTS */}
    {loading ? (
      <p className="text-center">Loading sale products...</p>
    ) : products.length === 0 ? (
      <p className="text-center text-gray-500">
        No products on sale right now
      </p>
    ) : (
      <ProductGrid
        products={products}
        onQuickView={(p) => setSelectedProduct(p)}
      />
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