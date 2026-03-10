"use client";

export default function HomeBanner() {
  return (
    <section>
      {/* HERO SECTION */}
      <div className="relative py-28 md:py-30 border-b border-[#B9AA52]/30 overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/JWELLERY BANN  copy.webp"
            alt="Rani Designer Hut Jewellery"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black/60"></div> */}

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">

            {/* Small Tagline */}
            <p className="text-sm md:text-base text-white tracking-widest uppercase mb-3">
              Welcome To Rani Designer Hut
            </p>

            {/* Heading */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#B9AA52] leading-tight mb-6">
              Timeless Jewellery <br />
              For Every Celebration
            </h1>

            {/* Description */}
            <p className="text-gray-200 text-sm md:text-lg leading-relaxed mb-8">
              Discover handcrafted jewellery designed with elegance,
              tradition, and modern luxury. Perfect pieces for weddings,
              festivals, and everyday beauty.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">

              <a
                href="/shop-by-catalogs"
                className="bg-[#B9AA52] text-black px-6 py-3 font-medium hover:bg-[#a29345] transition"
              >
                Shop Collection
              </a>

              <a
                href="/shop-by-catalogs"
                className="border border-[#B9AA52] text-[#B9AA52] px-6 py-3 hover:bg-[#B9AA52] hover:text-black transition"
              >
                Explore Collections
              </a>

            </div>

            {/* Gold Accent Line */}
            <div className="w-20 h-[2px] bg-[#B9AA52] mt-10"></div>

          </div>
        </div>
      </div>
    </section>
  );
}