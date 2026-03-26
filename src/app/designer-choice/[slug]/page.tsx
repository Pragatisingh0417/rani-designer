"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductGrid from "@/app/components/ProductGrid";
import QuickViewDrawer from "@/app/components/QuickViewDrawer";

export default function DesignerChoicePage() {

  const params = useParams();
  const slug = params.slug;

  const [products, setProducts] = useState<any[]>([]);
  const [choice, setChoice] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(`/api/designer-choice/${slug}`);
    const data = await res.json();

    setChoice(data.choice);
    setProducts(data.products);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-16">

      {/* HEADER */}
      <div className="text-center mb-10">

        <h1 className="text-3xl md:text-4xl font-semibold">
          {choice?.name}
        </h1>

        <p className="text-gray-500 mt-2">
          Explore our curated collection
        </p>

      </div>

      {/* PRODUCTS */}
      <ProductGrid
        products={products}
        onQuickView={(product) => setSelectedProduct(product)}
      />

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