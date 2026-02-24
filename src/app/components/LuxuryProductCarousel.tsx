"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const productData = {
  "Ruby Radiance": [
    {
      title: "Ruby Diamond Necklace Set",
      image: "/images/ruby-diamond.webp",
      price: "12,850",
      discount: "23% OFF",
    },
    {
      title: "Ruby and Gold Plated Flower Earrings",
      image: "/images/Ruby-Gold-Plated-Flower-Earrings.webp",
      price: "4,350",
      discount: "23% OFF",
    },
     {
      title: "Premium Ruby Micron gold plated ring-Free Size",
      image: "/images/Premium-Ruby.webp",
      price: "12,850",
      discount: "23% OFF",
    },
     {
      title: "Vilandi Luxe Ruby Statement Hoops",
      image: "/images/Vilandi-Luxe-Ruby-Statement-Hoops.jpg",
      price: "12,850",
      discount: "23% OFF",
    },
    
  ],
  "Emerald Envy": [
    {
      title: "Emerald Statement Ring",
      image: "/images/p3.jpg",
      price: "6,550",
      discount: "30% OFF",
    },
    {
      title: "Ruby and Gold Plated Flower Earrings",
      image: "/images/Ruby-Gold-Plated-Flower-Earrings.webp",
      price: "6,550",
      discount: "30% OFF",
    },
    {
      title: "Emerald Statement Ring",
      image: "/images/p3.jpg",
      price: "6,550",
      discount: "30% OFF",
    },
    {
      title: "Emerald Pendant Set",
      image: "/images/p4.jpg",
      price: "9,250",
      discount: "40% OFF",
    },
  ],
  "Multicolor Magic": [
    {
      title: "Multicolor Floral Earrings",
      image: "/images/p5.jpg",
      price: "5,450",
      discount: "20% OFF",
    },
     {
      title: "Multicolor Floral Earrings",
      image: "/images/p5.jpg",
      price: "5,450",
      discount: "20% OFF",
    },
     {
      title: "Multicolor Floral Earrings",
      image: "/images/p5.jpg",
      price: "5,450",
      discount: "20% OFF",
    },
    {
      title: "Multicolor Luxe Necklace",
      image: "/images/p6.jpg",
      price: "14,250",
      discount: "35% OFF",
    },
  ],
};

export default function LuxuryProductSection() {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof productData>("Ruby Radiance");

  return (
    <section className="bg-[#f4f1ea] py-10">

      {/* CATEGORY BUTTONS */}
      <div className="flex justify-center gap-6 mb-12">
        {Object.keys(productData).map((category) => (
          <button
            key={category}
            onClick={() =>
              setActiveCategory(category as keyof typeof productData)
            }
            className={`px-6 py-2 rounded-full border transition text-sm ${
              activeCategory === category
                ? "bg-black text-white"
                : "border-black hover:bg-black hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID (2 CARDS ONLY) */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 px-6 ">
        {productData[activeCategory].map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 relative"
          >
            <span className="absolute top-4 left-4 bg-[#D4AF37] text-white text-xs px-2 py-1 rounded z-11111">
              SALE
            </span>

            <div className="relative w-full h-[200px] mb-4">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
              {product.discount}
            </span>

            <h3 className="mt-3 font-medium text-[16px]">
              {product.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="fill-green-600 text-green-600"
                />
              ))}
              <span className="text-xs text-gray-500 ml-2">
                25 reviews
              </span>
            </div>

            <div className="mt-3 text-lg font-semibold">
              Rs. {product.price}
            </div>

            <button className="mt-4 bg-[#B9AA52] text-white px-4 py-2 rounded text-sm hover:opacity-90">
              Buy on EMI
            </button>
          </div>
        ))}
      </div>

      {/* VIEW ALL */}
      <div className="flex justify-center mt-12">
        <button className="bg-[#B9AA52] text-white px-10 py-3 rounded hover:opacity-90 transition">
          VIEW ALL
        </button>
      </div>
    </section>
  );
}