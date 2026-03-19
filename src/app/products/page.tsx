"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import QuickViewDrawer from "../components/QuickViewDrawer";
import ProductGrid from "../components/ProductGrid";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [priceRange, setPriceRange] = useState([0, 36500]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

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

  // ✅ Wishlist toggle
  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // ✅ Add to Cart (no duplicates)
  const addToCart = (product: any) => {
    setCart((prev) => {
      if (prev.includes(product._id)) return prev;
      return [...prev, product._id];
    });
  };

  // ✅ Price filter
  const filteredProducts = products.filter((p: any) => {
    return p.price >= priceRange[0] && p.price <= priceRange[1];
  });

  return (
    <div className="w-full">
      <div className="max-w-8xl pt-40 mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-serif">All Products</h1>
        </div>

        <div className="flex gap-10 py-8">

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
                  onChange={(e) =>
                    setPriceRange([0, parseInt(e.target.value)])
                  }
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
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
              />
            )}

          </div>
        </div>

        {/* Quick View Drawer */}
        {selectedProduct && (
          <QuickViewDrawer
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

      </div>
    </div>
  );
}