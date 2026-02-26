"use client";

import Image from "next/image";

export default function NecklaceShowcase() {
  return (
    <section className="bg-[#e8dccb] py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT IMAGE */}
        <div className="relative">
          <div className="overflow-hidden rounded-lg shadow-xl">
            <Image
              src="/images/chaand-bali-1.jpg"  // replace with your image path
              alt="Luxury Necklace"
              width={500}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <p className="tracking-[4px] uppercase text-sm text-gray-600 mb-4">
            Radiate Beauty With Necklaces
          </p>

          <h2 className="text-3xl md:text-5xl  leading-tight text-black mb-6">
            A Symbol Of Love, Beauty, And Sophistication,
            Beautifully Showcased Around Your Neck
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            Discover timeless elegance crafted with precision and passion.
            Each necklace is designed to enhance your grace and reflect
            your inner royalty.
          </p>

          <button className="bg-[#B9AA52] text-white px-8 py-4 font-medium hover:bg-black transition duration-300 flex items-center gap-3">
            Know More
            <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm">
              →
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}