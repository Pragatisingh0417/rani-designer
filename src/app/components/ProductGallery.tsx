"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ images = [] }: any) {
  const imgs = images?.length ? images : ["/placeholder.png"];

  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) =>
      prev === imgs.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? imgs.length - 1 : prev - 1
    );
  };

  return (
    <div className="flex gap-4">

      {/* Thumbnails */}
      <div className="hidden md:flex flex-col gap-3">
        {imgs.map((img: string, i: number) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`border rounded overflow-hidden ${
              activeIndex === i ? "border-black" : ""
            }`}
          >
            <Image
              src={img}
              alt=""
              width={70}
              height={80}
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative">

        <Image
          src={imgs[activeIndex]}
          alt="product"
          width={600}
          height={700}
          className="w-full h-[450px] lg:h-[400px] object-cover rounded"
        />

        {/* Left */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Right */}
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          <ChevronRight size={18} />
        </button>

      </div>
    </div>
  );
}