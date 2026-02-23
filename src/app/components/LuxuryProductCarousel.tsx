"use client";

import Image from "next/image";
import { useRef } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

const products = [
  {
    title: "Ruby Diamond Necklace set",
    image: "/images/p1.jpg",
    price: "12,850",
    discount: "23% OFF",
  },
  {
    title: "Ruby and Gold Plated Flower Earrings",
    image: "/images/p2.jpg",
    price: "4,350",
    oldPrice: "5,650",
    discount: "23% OFF",
  },
  {
    title: "Premium Ruby Micron Gold Ring",
    image: "/images/p3.jpg",
    price: "4,550",
    oldPrice: "7,000",
    discount: "35% OFF",
  },
  {
    title: "Gold Plated Ring with Rubies",
    image: "/images/p4.jpg",
    price: "3,650",
    oldPrice: "5,700",
    discount: "35% OFF",
  },
  {
    title: "Vilandi Luxe Ruby Hoops",
    image: "/images/p5.jpg",
    price: "8,250",
    oldPrice: "14,550",
    discount: "43% OFF",
  },
  
];

export default function LuxuryProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#f4f1ea] py-14 relative">

      {/* CATEGORY PILLS */}
      <div className="flex justify-center gap-4 mb-10">
        {["Ruby Radiance", "Emerald Envy", "Multicolor Magic"].map(
          (item) => (
            <button
              key={item}
              className="px-6 py-2 border border-black rounded-full text-sm hover:bg-black hover:text-white transition"
            >
              {item}
            </button>
          )
        )}
      </div>

      {/* ARROWS */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow p-3 rounded-full z-10"
      >
        <ArrowLeft size={20} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow p-3 rounded-full z-10"
      >
        <ArrowRight size={20} />
      </button>

      {/* PRODUCT SCROLLER */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-14"
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="min-w-[260px] bg-white rounded-xl shadow-sm p-4 relative"
          >
            {/* SALE BADGE */}
            <span className="absolute top-3 left-3 bg-[#D4AF37] text-white text-xs px-2 py-1 rounded">
              SALE
            </span>

            {/* PRODUCT IMAGE */}
            <div className="relative w-full h-[220px] mb-4">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* DISCOUNT BADGE */}
            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
              {product.discount}
            </span>

            {/* TITLE */}
            <h3 className="mt-3 text-sm font-medium leading-snug">
              {product.title}
            </h3>

            {/* RATING */}
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-green-600 text-green-600" />
              ))}
              <span className="text-xs text-gray-500 ml-2">
                25 reviews
              </span>
            </div>

            {/* PRICE */}
            <div className="mt-2">
              <span className="font-semibold text-lg">
                Rs. {product.price}
              </span>
              {product.oldPrice && (
                <span className="text-sm line-through text-gray-400 ml-2">
                  Rs. {product.oldPrice}
                </span>
              )}
            </div>

            {/* EMI */}
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-600">
                or ₹1088/Month
              </span>
              <button className="bg-[#690303] text-white text-xs px-3 py-1 rounded hover:opacity-90">
                Buy on EMI
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW ALL */}
      <div className="flex justify-center mt-10">
        <button className="bg-[#690303] text-white px-10 py-3 rounded hover:opacity-90 transition">
          VIEW ALL
        </button>
      </div>
    </section>
  );
}