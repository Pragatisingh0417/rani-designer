"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/app/lib/format";
import toast from "react-hot-toast";




export default function ProductsPage() {

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteProduct = async (id: string) => {
    try {
      setDeletingId(id);

      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.error || "Delete failed ❌");
        return;
      }

      // ✅ instant UI update
      setProducts((prev) => prev.filter((p) => p._id !== id));

      toast.success("Product deleted 🗑️");

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ⚠️");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleStatus = async (product: any) => {
    await fetch(`/api/products/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isActive: !product.isActive
      })
    });

    fetchProducts();
  };

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showSaleOnly, setShowSaleOnly] = useState(false);


  return (
    <div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Products</h1>

        <Link
          href="/admin/products/add"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </Link>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4 mb-6">

        {/* 🔍 SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 w-72 rounded-lg"
        />

        {/* 🏷 CATEGORY FILTER */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">All Categories</option>

          {[...new Set(products.map((p) => p.category?.name))].map(
            (cat, i) =>
              cat && (
                <option key={i} value={cat}>
                  {cat}
                </option>
              )
          )}
        </select>

        {/* 🔥 SALE FILTER */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showSaleOnly}
            onChange={(e) => setShowSaleOnly(e.target.checked)}
          />
          On Sale Only
        </label>

      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="text-left">Category</th>
              <th className="text-left">Type</th>   {/* ✅ NEW */}
              <th className="text-left">Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th className="text-right pr-6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products
              .filter((p: any) => {

                const matchesSearch = p.name
                  .toLowerCase()
                  .includes(search.toLowerCase());

                const matchesCategory = selectedCategory
                  ? p.category?.name === selectedCategory
                  : true;

                const isOnSale = Number(p.salePrice) > 0;

                const matchesSale = showSaleOnly ? isOnSale : true;

                return matchesSearch && matchesCategory && matchesSale;
              })
              .map((p: any) => {



                const inStock = p.stock > 0;

                const isOnSale = Number(p.salePrice) > 0;

                const discount = isOnSale
                  ? Math.round(((p.price - p.salePrice) / p.price) * 100)
                  : 0;

                return (
                  <tr key={p._id} className="border-t hover:bg-gray-50 transition">

                    {/* PRODUCT */}
                    <td className="p-4 flex items-center gap-4">

                      <img
                        src={p.images?.[0] || "/placeholder.png"}
                        className="w-14 h-14 object-cover rounded-lg border"
                      />

                      <div>
                        <p className="font-medium flex items-center gap-2">
                          {p.name}

                          {isOnSale && (
                            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                              SALE
                            </span>
                          )}
                        </p>

                        {!inStock && (
                          <p className="text-xs text-red-500">
                            Out of stock
                          </p>
                        )}
                      </div>

                    </td>

                    {/* 🏷 CATEGORY */}
                    <td className="text-sm text-gray-600">
                      {p.category?.name || "—"}
                    </td>
                    {/* 🧩 TYPE */}
                    <td className="text-sm">
                      {p.category ? (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded font-medium">
                          Category
                        </span>
                      ) : p.designerChoices?.length > 0 ? (
                        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded font-medium">
                          Designer-choice
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>

                    {/* 💰 PRICE */}
                    <td>
                      {isOnSale ? (
                        <div className="flex flex-col">

                          <span className="font-semibold text-red-600">
                            {formatCurrency(p.salePrice)}
                          </span>

                          <span className="text-xs line-through text-gray-400">
                            {formatCurrency(p.price)}
                          </span>

                          <span className="text-xs text-green-600 font-medium">
                            {discount}% OFF
                          </span>

                        </div>
                      ) : (
                        <span className="font-medium">
                          {formatCurrency(p.price)}
                        </span>
                      )}
                    </td>

                    {/* 📦 STOCK */}
                    <td className="text-center">
                      {inStock ? (
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700 font-medium">
                          In Stock ({p.stock})
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600 font-medium">
                          Out of Stock
                        </span>
                      )}
                    </td>

                    {/* STATUS */}
                    <td className="text-center">
                      <button
                        onClick={() => toggleStatus(p)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition mx-auto ${p.isActive ? "bg-green-600" : "bg-gray-300"
                          }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow transform transition ${p.isActive ? "translate-x-6" : ""
                            }`}
                        />
                      </button>
                    </td>

                    {/* ACTIONS */}
                    <td className="text-right pr-6 space-x-4 text-sm">

                      <Link
                        href={`/products/${p.slug}`}
                        className="text-green-600 hover:underline"
                      >
                        View
                      </Link>

                      <Link
                        href={`/admin/products/edit/${p._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        disabled={deletingId === p._id}
                        onClick={() => {
                          if (confirm("Delete this product?")) {
                            deleteProduct(p._id);
                          }
                        }}
                        className="text-red-600 hover:underline disabled:opacity-50"
                      >
                        {deletingId === p._id ? "Deleting..." : "Delete"}
                      </button>

                    </td>

                  </tr>
                );
              })}
          </tbody>

        </table>

      </div>

    </div>
  );
}