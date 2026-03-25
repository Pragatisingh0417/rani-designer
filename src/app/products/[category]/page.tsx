"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import QuickViewDrawer from "@/app/components/QuickViewDrawer";
import ProductGrid from "@/app/components/ProductGrid";
import { formatCurrency } from "@/app/lib/format";

export default function CategoryPage() {

  const params = useParams();

  const category = Array.isArray(params.category)
    ? params.category[0]
    : params.category;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [priceRange, setPriceRange] = useState([0, 36500]);

  // ✅ ADD THIS
  const [availability, setAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });

  // ✅ FETCH
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

      const filtered = data.filter(
  (p: any) =>
    p &&
    p.slug &&
    p.category &&
    p.category.slug === category
);

        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching category products", err);
      } finally {
        setLoading(false);
      }
    };

    if (category) fetchProducts();
  }, [category]);

  // ✅ FIXED FILTER
  const filteredProducts = products.filter((p: any) => {

    // 🔒 Only active
    if (!p.isActive) return false;

    // 💰 Use correct price
    const finalPrice = p.isOnSale ? p.salePrice : p.price;

    if (finalPrice < priceRange[0] || finalPrice > priceRange[1]) {
      return false;
    }

    // 📦 Stock logic
    const inStock = p.stock > 0;

    if (availability.inStock && !inStock) return false;
    if (availability.outOfStock && inStock) return false;

    return true;
  });

  return (
    <div className="max-w-8xl pt-40 mx-auto px-6 lg:px-10">

      {/* TITLE */}
      <h1 className="text-4xl mb-10 capitalize text-center">
        {category}
      </h1>

      <div className="flex gap-10">

        {/* SIDEBAR */}
        <aside className="hidden lg:block w-64">

          <div className="mb-8">

            <div className="flex items-center gap-2 font-medium mb-4">
              <SlidersHorizontal size={18} />
              Filter
            </div>

            {/* AVAILABILITY */}
            <div className="border-t pt-6">
              <h3 className="font-medium mb-3">Availability</h3>

              <div className="space-y-2 text-sm">

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={availability.inStock}
                    onChange={(e) =>
                      setAvailability({
                        ...availability,
                        inStock: e.target.checked,
                      })
                    }
                  />
                  In Stock
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={availability.outOfStock}
                    onChange={(e) =>
                      setAvailability({
                        ...availability,
                        outOfStock: e.target.checked,
                      })
                    }
                  />
                  Out Of Stock
                </label>

              </div>
            </div>

            {/* PRICE */}
            <div className="border-t pt-6 mt-6">
              <h3 className="font-medium mb-3">Price</h3>

              <input
                type="range"
                min={0}
                max={36500}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([0, parseInt(e.target.value)])
                }
                className="w-full"
              />

              <div className="flex justify-between mt-3 text-sm">
                <span>{formatCurrency(0)}</span>
                <span>{formatCurrency(priceRange[1])}</span>
              </div>
            </div>

          </div>
        </aside>

        {/* PRODUCTS */}
        <div className="flex-1">

          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : (
            <>
              {/* OPTIONAL COUNT */}
              <p className="text-sm text-gray-500 mb-4">
                Showing {filteredProducts.length} products
              </p>

              <ProductGrid
                products={filteredProducts}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            </>
          )}

        </div>

      </div>

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