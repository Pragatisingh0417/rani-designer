export function BridalSection() {
  return (
    <section>
      {/* ================= HERO SECTION ================= */}
      <div className="relative py-20 sm:py-28 md:py-40 border-b border-[#B9AA52]/30 overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/bridal.webp"
            alt="Bridal Jewellery"
            className="w-full h-full  md:object-[center_top]"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl sm:max-w-2xl">

            {/* HEADING */}
            <h1 className="
              text-2xl 
              sm:text-4xl 
              md:text-6xl 
              lg:text-7xl 
              font-bold 
              text-[#B9AA52] 
              mb-4 sm:mb-6 
              leading-tight
            ">
              Rani Designer Bridal Sets
            </h1>

            {/* TEXT */}
            <p className="
              text-sm 
              sm:text-base 
              md:text-lg 
              text-gray-200 
              leading-relaxed
            ">
              A legacy of purity, craftsmanship, and timeless elegance.
              We create jewellery that reflects royalty, tradition,
              and unforgettable celebrations.
            </p>

            {/* BUTTON */}
            <div className="mt-6 sm:mt-8">
              <a
                href="/products"
                className="
                  inline-block 
                  bg-red-600 
                  text-white 
                  px-5 py-2.5 
                  sm:px-6 sm:py-3 
                  text-sm sm:text-base 
                  font-medium 
                  hover:bg-[#a29345] 
                  transition
                "
              >
                Shop Now
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}