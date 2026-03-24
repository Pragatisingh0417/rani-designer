"use client";

export default function Banner() {
  return (
    <section>
      {/* HERO SECTION */}
      <div className="relative h-[500px] sm:h-[600px] md:h-[650px] lg:h-[680px] overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/jwellery image 6 copy 1.webp"
            alt="Rani Designer Hut Jewellery"
className="w-full h-full object-cover object-left md:object-right"
/>
        </div>

        {/* Optional Overlay (better readability) */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center md:justify-end h-full">

          {/* TEXT BLOCK */}
          <div className="max-w-xl md:max-w-2xl text-center md:text-right">

            {/* Tagline */}
            <p className="text-gray-200 text-sm sm:text-base md:text-lg tracking-wide sm:tracking-widest">
              Welcome To RaniDesignerHut,
            </p>

            {/* Heading */}
            <h1 className="text-white font-normal 
              text-2xl sm:text-4xl md:text-5xl lg:text-6xl 
              leading-tight mb-4 sm:mb-6">
              Shop by Rani's Choice
            </h1>

            {/* Description */}
            <p className="text-gray-200 text-sm sm:text-base md:text-lg tracking-wide sm:tracking-widest">
              Before you take a look at our wider collection <br className="hidden sm:block" />
              why not shop by the seller's choice
            </p>

            {/* <a
                href="/shop-by-catalogs"
                className="bg-red-600 text-black px-6 py-3 font-medium hover:bg-[#a29345] transition mt-10"
              >
                Shop Collection
              </a> */}

  <div className="mt-10 gap-4">

              <a
                href="/products"
                className="bg-red-600 text-white px-6 py-3 font-medium hover:bg-[#a29345] transition"
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