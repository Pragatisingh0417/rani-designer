"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/app/lib/format";

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

  const deleteProduct = async (id: string) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
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
      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search products..."
          className="border px-3 py-2 w-72 rounded-lg"
        />

        <select className="border px-3 py-2 rounded-lg">
          <option>Status</option>
          <option>Active</option>
          <option>Hidden</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="text-left">Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th className="text-right pr-6">Actions</th>
            </tr>
          </thead>

          <tbody>

            {products.map((p: any) => {

              const inStock = p.stock > 0;

              // ✅ SALE LOGIC (SAFE)
           const isOnSale = Number(p.salePrice) > 0;

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

                        {/* 🔥 SALE BADGE */}
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

                  {/* 💰 PRICE */}
                  <td>
                    {isOnSale ? (
                      <div className="flex flex-col">

                        {/* SALE PRICE */}
                        <span className="font-semibold text-red-600">
                          {formatCurrency(p.salePrice)}
                        </span>

                        {/* ORIGINAL PRICE */}
                        <span className="text-xs line-through text-gray-400">
                          {formatCurrency(p.price)}
                        </span>

                        {/* DISCOUNT */}
                        <span className="text-xs text-green-600 font-medium">
                          {Math.round(
                            ((p.price - p.salePrice) / p.price) * 100
                          )}% OFF
                        </span>

                      </div>
                    ) : (
                      <span>{formatCurrency(p.price)}</span>
                    )}
                  </td>

                  {/* STOCK */}
                  <td className="text-center">
                    {inStock ? (
                      <span className="text-green-600 text-sm font-medium">
                        ● In Stock
                      </span>
                    ) : (
                      <span className="text-red-500 text-sm font-medium">
                        ● Out
                      </span>
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="text-center">

                    <button
                      onClick={() => toggleStatus(p)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition mx-auto ${
                        p.isActive ? "bg-green-600" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                          p.isActive ? "translate-x-6" : ""
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
                      onClick={() => deleteProduct(p._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
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