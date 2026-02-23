"use client";

import Image from "next/image";

export default function CategoryCollage() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 py-10 ">
       <h2 className="text-center font-semibold text-3xl md:text-4xl mb-10 ">
         Rani Designer

      </h2>
      <p className="text-center font-base text-3xl md:text-2xl mb-12 max-w-4xl mx-auto">

 Discover timeless elegance with handcrafted jewellery designed
  to celebrate tradition and modern luxury.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">

          {/* Wedding (Small Top) */}
          <div className="relative h-[200px] md:h-[400px] rounded-2xl overflow-hidden group cursor-pointer">
            <Image
              src="/images/wedding-image.webp"
              alt="Wedding Jewellery"
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#7a1e1e]/80 to-transparent" />
            <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-3xl md:text-4xl font-semibold">
              Wedding
            </h2>
          </div>

          {/* Gold (Big Bottom) */}
          <div className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden group cursor-pointer">
            <Image
              src="/images/gold.webp"
              alt="Gold Jewellery"
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#7a1e1e]/80 to-transparent" />
            <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-3xl md:text-4xl font-semibold">
              Gold
            </h2>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">

          {/* Diamond (Small Top) */}
          <div className="relative h-[200px] md:h-[350px] rounded-2xl overflow-hidden group cursor-pointer">
            <Image
              src="/images/diamond.webp"
              alt="Diamond Jewellery"
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#7a1e1e]/80 to-transparent" />
            <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-3xl md:text-4xl font-semibold">
              Diamond
            </h2>
          </div>

          {/* Dailywear (Big Bottom) */}
          <div className="relative h-[350px] md:h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
            <Image
              src="/images/dailywear.webp"
              alt="Dailywear Jewellery"
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#7a1e1e]/80 to-transparent" />
            <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-3xl md:text-4xl font-semibold">
              Dailywear
            </h2>
          </div>

        </div>

      </div>
    </section>
  );
}
