"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ShopByCatalogProps {
  limit?: number;
}

export default function ShopByCatalog({ limit }: ShopByCatalogProps) {

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {

    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();

  }, []);

  // Apply limit if provided
  const displayed = limit
    ? categories.slice(0, limit)
    : categories;

  return (

    <section className="py-16 bg-[#f8f3eb]">

      <h2 className="text-3xl md:text-5xl text-black mb-12 text-center">
        Shop By Category
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">

        {displayed.map((cat: any) => (

          <Link
            key={cat._id}
            href={`/products/${cat.slug}`}
            className="group relative overflow-hidden shadow-md rounded-2xl"
          >

            <div className="relative h-[300px] w-full">

              <Image
                src={cat.image || "/placeholder.png"}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
              />

            </div>

            <div className="absolute inset-0 group-hover:bg-black/50 transition flex items-end justify-center pb-6">

              <h3 className="text-white text-xl font-semibold">
                {cat.name}
              </h3>

            </div>

          </Link>

        ))}

      </div>

      {/* View More */}
      {limit && categories.length > limit && (
        <div className="text-center mt-12">
          <Link
            href="/shop-by-category"
            className="inline-block bg-[#B9AA52] text-white px-8 py-3 hover:bg-black transition"
          >
            View All Categories
          </Link>
        </div>
      )}

    </section>
  );
}