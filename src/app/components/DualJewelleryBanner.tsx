"use client";

import Image from "next/image";

export default function DualJewelleryBanner() {
  return (
    <section className="w-full mx-auto py-20">

      <div className="grid md:grid-cols-2">

        {/* ================= LEFT BANNER ================= */}
        <div className="relative h-[520px] w-full overflow-hidden group border-r border-[#B9AA52]/40">

          <Image
            src="/images/wp-image-1.jpg"
            alt="Rings Collection"
            fill
            priority
            className="object-cover group-hover:scale-105 transition duration-700"
          />

          {/* Dark Overlay */}
          {/* <div className="absolute inset-0 bg-black/55"></div> */}

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">
            
            <p className="tracking-[6px] uppercase text-xs mb-6 text-gray-900">
              Circle Of Elegance
            </p>

            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-10 text-gray-900">
              Celebrate Life, One <br /> Ring At A Time.
            </h2>

            <button className="bg-black px-10 py-4 w-fit flex items-center gap-4 border border-white/20 hover:bg-white hover:text-black transition duration-300">
              Shop Now
              <span className="bg-white text-black rounded-full w-7 h-7 flex items-center justify-center text-sm">
                →
              </span>
            </button>

          </div>
        </div>


        {/* ================= RIGHT BANNER ================= */}
        <div className="relative h-[520px] w-full overflow-hidden group border-l border-[#B9AA52]/40">

          <Image
            src="/images/wp-image-2.jpg"
            alt="Jewellery Collection"
            fill
            priority
            className="object-cover object-bottom group-hover:scale-105 transition duration-700"
          />

          {/* Light Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-16">

            <p className="tracking-[6px] uppercase text-xs text-gray-200 mb-6">
              Illuminate Your Look
            </p>

            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-white mb-10">
              Every Jewellery Has Its <br /> Own Story
            </h2>

            <button className="bg-black text-white px-10 py-4 w-fit flex items-center gap-4 hover:bg-[#B9AA52] hover:text-black transition duration-300">
              Shop Now
              <span className="bg-white text-black rounded-full w-7 h-7 flex items-center justify-center text-sm">
                →
              </span>
            </button>

          </div>
        </div>

      </div>

      {/* Bottom Gold Accent Line */}
      <div className="h-[2px] w-full bg-[#B9AA52]/60"></div>

    </section>
  );
}