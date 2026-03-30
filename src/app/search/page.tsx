"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!query) return;

    const fetchProducts = async () => {
      const res = await fetch(`/api/products?search=${query}`);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="p-10">
      <h1 className="text-xl mb-6">
        Search Results for "{query}"
      </h1>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {products.map((p) => (
            <Link key={p._id} href={`/product/${p.slug}`}>
              <div className="border p-3 hover:shadow">
                <img src={p.images?.[0]} alt={p.name} />
                <h2>{p.name}</h2>
                <p>₹{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}