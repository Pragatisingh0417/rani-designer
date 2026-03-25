"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductGrid from "@/app/components/ProductGrid";
import QuickViewDrawer from "@/app/components/QuickViewDrawer";

export default function OnSale() {

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();

      // ✅ ONLY SALE PRODUCTS
      const saleProducts = data
        .filter((p: any) => Number(p.salePrice) > 0 && p.isActive)
        .slice(0, 8); // show limited on homepage

      setProducts(saleProducts);
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-10 sm:py-14 md:py-16">

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-5xl text-black mb-3 text-center">
        On Sale 🔥
      </h2>

      <p className="text-sm sm:text-base md:text-lg text-center mb-8 text-gray-700">
        Jewellery pieces everyone’s eyeing right now
      </p>

      {/* ✅ USE PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ProductGrid
          products={products}
          onQuickView={(p) => setSelectedProduct(p)}
        />
      </div>

      {/* CTA */}
      <div className="text-center mt-8 sm:mt-10">
        <Link
          href="/on-sale"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-black transition"
        >
          See More 🔥
        </Link>
      </div>

{selectedProduct && (
  <QuickViewDrawer
    product={selectedProduct}
    onClose={() => setSelectedProduct(null)}
  />
)}
    </section>

    
  );
}