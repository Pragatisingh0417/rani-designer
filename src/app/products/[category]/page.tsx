"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import QuickViewDrawer from "@/app/components/QuickViewDrawer";
import ProductGrid from "@/app/components/ProductGrid";

export default function CategoryPage() {
  const params = useParams();

  // ✅ FIX: ensure string
  const category = Array.isArray(params.category)
    ? params.category[0]
    : params.category;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [priceRange, setPriceRange] = useState([0, 36500]);

  // ✅ Wishlist
  // const toggleWishlist = (id: string) => {
  //   setWishlist((prev) =>
  //     prev.includes(id)
  //       ? prev.filter((item) => item !== id)
  //       : [...prev, id]
  //   );
  // };

  // ✅ Fetch + category filter
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        const filtered = data.filter((p: any) => p.category.slug === category);

        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching category products", err);
      } finally {
        setLoading(false);
      }
    };

    if (category) fetchProducts();
  }, [category]);

  // ✅ Cart (no duplicates)
  // const addToCart = (product: any) => {
  //   setCart((prev) => {
  //     if (prev.includes(product._id)) return prev;
  //     return [...prev, product._id];
  //   });
  // };

  // ✅ Price filter
  const filteredProducts = products.filter((p: any) => {
    return p.price >= priceRange[0] && p.price <= priceRange[1];
  });

  return (
    <div className="max-w-8xl pt-40 mx-auto px-6 lg:px-10">
      {/* Title */}
      <h1 className="text-4xl mb-10 capitalize text-center">{category}</h1>

      <div className="flex gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64">
          <div className="mb-8">
            <div className="flex items-center gap-2 font-medium mb-4">
              <SlidersHorizontal size={18} />
              Filter
            </div>

            {/* Availability */}
            <div className="border-t pt-6">
              <h3 className="font-medium mb-3">Availability</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  In Stock
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Out Of Stock
                </label>
              </div>
            </div>

            {/* Price */}
            <div className="border-t pt-6 mt-6">
              <h3 className="font-medium mb-3">Price</h3>
              <input
                type="range"
                min={0}
                max={36500}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between mt-3 text-sm">
                <span>£ 0</span>
                <span>£ {priceRange[1]}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : (
            <ProductGrid
              products={filteredProducts}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          )}
        </div>
      </div>

      {/* Quick View */}
      {selectedProduct && (
        <QuickViewDrawer
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
