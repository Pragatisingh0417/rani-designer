"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import QuickViewDrawer from "../components/QuickViewDrawer";
import ProductGrid from "../components/ProductGrid";
import { formatCurrency } from "@/app/lib/format";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [priceRange, setPriceRange] = useState([0, 36500]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [availability, setAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });

  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState("");

  // ✅ Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ FILTERING
  let filteredProducts = products?.filter((p: any) => {
    if (!p || !p.slug) return false;
    if (!p.isActive) return false;

    const finalPrice = p.isOnSale ? p.salePrice : p.price;

    if (finalPrice < priceRange[0] || finalPrice > priceRange[1]) {
      return false;
    }

    const inStock = p.stock > 0;

    if (availability.inStock && !inStock) return false;
    if (availability.outOfStock && inStock) return false;

    return true;
  });

  // ✅ SORTING
  if (sort === "low") {
    filteredProducts.sort(
      (a, b) =>
        (a.isOnSale ? a.salePrice : a.price) -
        (b.isOnSale ? b.salePrice : b.price)
    );
  }

  if (sort === "high") {
    filteredProducts.sort(
      (a, b) =>
        (b.isOnSale ? b.salePrice : b.price) -
        (a.isOnSale ? a.salePrice : a.price)
    );
  }

  return (
    <div>
      <div className="max-w-8xl pt-[150px] md:pt-[50px] mx-auto px-6 lg:px-10">

        {/* TITLE */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif">All Products</h1>
        </div>

        {/* ✅ FILTER + SORT BAR (ALL SCREENS) */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4 ">

          {/* FILTER BUTTON */}
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 border px-4 py-2 text-sm hover:bg-black hover:text-white transition md:hidden"
          >
            <SlidersHorizontal size={16} />
            Filter
          </button>

          {/* SORT */}
          <select
            className="border px-4 py-2 text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>

        </div>

        {/* MAIN LAYOUT */}
        <div className="flex gap-10 py-8">

          {/* SIDEBAR (DESKTOP ONLY) */}
          <aside className="hidden lg:block w-64">
            <div className="mb-8">

              <div className="flex items-center gap-2 font-medium mb-4">
                <SlidersHorizontal size={18} />
                Filter
              </div>

              {/* Availability */}
              <div className="border-t pt-6">
                <h3 className="font-medium mb-3">Availability</h3>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={availability.inStock}
                    onChange={(e) =>
                      setAvailability({ ...availability, inStock: e.target.checked })
                    }
                  />
                  In Stock
                </label>

                <label className="flex items-center gap-2 text-sm mt-2">
                  <input
                    type="checkbox"
                    checked={availability.outOfStock}
                    onChange={(e) =>
                      setAvailability({ ...availability, outOfStock: e.target.checked })
                    }
                  />
                  Out Of Stock
                </label>
              </div>

              {/* Price */}
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
              <ProductGrid
                products={filteredProducts}
                onQuickView={(p) => setSelectedProduct(p)}
              />
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

      {/* ✅ MOBILE FILTER DRAWER */}
      {filterOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setFilterOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed left-0 top-0 h-full w-[80%] max-w-[320px] bg-[#F5F0E6] z-50 p-6 overflow-y-auto shadow-xl">

            <button
              onClick={() => setFilterOpen(false)}
              className="mb-6 text-sm"
            >
              Close
            </button>

            <div className="space-y-6">

              {/* Availability */}
              <div>
                <h3 className="font-medium mb-3">Availability</h3>

                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={availability.inStock}
                    onChange={(e) =>
                      setAvailability({ ...availability, inStock: e.target.checked })
                    }
                  />
                  In Stock
                </label>

                <label className="flex gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={availability.outOfStock}
                    onChange={(e) =>
                      setAvailability({ ...availability, outOfStock: e.target.checked })
                    }
                  />
                  Out Of Stock
                </label>
              </div>

              {/* Price */}
              <div>
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

                <div className="flex justify-between text-sm mt-2">
                  <span>{formatCurrency(0)}</span>
                  <span>{formatCurrency(priceRange[1])}</span>
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
}