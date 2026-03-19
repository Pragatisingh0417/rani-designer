"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function QuickViewDrawer({ product, onClose }: any) {

  const images = product?.images?.length
    ? product.images
    : ["/placeholder.png"];

  // ✅ use index instead of image
  const [activeIndex, setActiveIndex] = useState(0);

  const nextImage = () => {
    setActiveIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[480px] bg-white z-[1000] shadow-2xl
        transform transition-transform duration-500 ease-in-out
        ${product ? "translate-x-0" : "translate-x-full"}`}
      >

        <div className="p-6 h-full overflow-y-auto relative">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-gray-600 hover:text-black"
          >
            <X size={22} />
          </button>

          {/* Image Gallery */}
          <div className="flex gap-4">

            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {images.map((img: string, i: number) => (
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
                src={images[activeIndex]}
                alt={product.name}
                width={400}
                height={500}
                className="w-full h-[420px] object-cover rounded"
              />

              {/* Prev Button */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-110"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-110"
              >
                <ChevronRight size={18} />
              </button>

            </div>

          </div>

          {/* Product Info */}
          <div className="mt-6">

            <h2 className="text-xl font-semibold mb-2">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-lg font-bold">
                ₹{product.price}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">

              <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-900 transition">
                Add to Cart
              </button>

              <a
                href={`/products/${product.category.slug}/${product.slug}`}
                className="flex-1 text-center border py-3 rounded hover:bg-gray-100"
              >
                View Full Details
              </a>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}