"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductGrid from "@/app/components/ProductGrid";
import QuickViewDrawer from "@/app/components/QuickViewDrawer";

export default function DesignerChoicePage() {

  const params = useParams();

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();

      const filtered = data.filter((p: any) =>
        p.designerChoices?.some(
          (dc: any) => dc.slug === slug
        )
      );

      setProducts(filtered);
    };

    if (slug) fetchProducts();
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto pt-40 px-6 pb-16">

      <h1 className="text-4xl text-center mb-10 capitalize">
        {slug}
      </h1>

      <ProductGrid
        products={products}
        onQuickView={(p) => setSelectedProduct(p)}
      />

      {selectedProduct && (
        <QuickViewDrawer
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

    </div>
  );
}