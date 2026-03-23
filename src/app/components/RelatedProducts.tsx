"use client";

import ProductGrid from "@/app/components/ProductGrid";
import { useState } from "react";

export default function RelatedProducts({ products }: any) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div className="mt-16">

      <h2 className="text-2xl font-semibold mb-6">
        Related Products
      </h2>

      <ProductGrid
        products={products}
        onQuickView={(p) => setSelectedProduct(p)}
      />

    </div>
  );
}