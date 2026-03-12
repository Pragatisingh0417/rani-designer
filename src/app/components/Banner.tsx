"use client";

export default function Banner() {
  return (
    <section>
      {/* HERO SECTION */}
      <div className="relative min-h-[700px] overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/image gwellery wsw.webp"
            alt="Rani Designer Hut Jewellery"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dark Right Overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/90 to-transparent"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 flex justify-end items-center min-h-[700px]">

          {/* TEXT BLOCK */}
          <div className="max-w-3xl text-right -mr-10">

            {/* Tagline */}
            <p className="text-white text-sm tracking-[3px] mb-6">
              Welcome To RaniDesignerHut,
            </p>

            {/* Heading */}
            <h1 className="text-white font-normal text-6xl md:text-7xl sm:text-7xl lg:text-7xl leading-[1.1] whitespace-nowrap mb-6">
              Shop by Rani's Choice
            </h1>

            {/* Description */}
            <p className="text-gray-200 text-lg  ml-auto tracking-widest ">
              Before you took look to our wider collection, why not shop by the
              sellers choice
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}