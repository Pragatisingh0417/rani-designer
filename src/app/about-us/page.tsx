"use client";
import Image from "next/image";

export default function About() {
  return (
    <section className=" text-white">

      {/* ================= HERO SECTION ================= */}
      <div className="relative py-40 border-b border-[#B9AA52]/30 overflow-hidden">

  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/images/jwellery image .webp" // replace with your image
      alt="About Background"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/70"></div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6">
    <div className="max-w-2xl text-left">

      <h1 className="text-4xl md:text-6xl font-bold text-[#B9AA52] mb-6 tracking-wide">
        About Rani Jewellers
      </h1>

      <p className="text-lg text-gray-300 leading-relaxed">
        A legacy of purity, craftsmanship, and timeless elegance.
        We create jewellery that reflects royalty, tradition,
        and unforgettable celebrations.
      </p>

      {/* Optional Gold Accent Line */}
      <div className="w-24 h-[2px] bg-[#B9AA52] mt-8"></div>

    </div>
  </div>
</div>


<div className="py-15">
  <h1 className="text-black text-center md:text-3xl mb-6">
    We Believe Timeless Elegance Is Forever
  </h1>
  <p className=" max-w-5xl mx-auto  text-gray-900 leading-relaxed mb-6 text-center">
    Rani Designer Hut was created with a vision to bring refined craftsmanship and accessible luxury to modern women. Our jewellery blends tradition with contemporary style, allowing every woman to express her grace with confidence.

We design pieces that celebrate individuality, enhance everyday elegance, and make every special moment even more meaningful.
  </p>
</div>
      {/* ================= OUR STORY ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#B9AA52] mb-6">
            Our Royal Journey
          </h2>

          <p className="text-gray-900 leading-relaxed mb-6">
           Rani Jewellers was founded with a vision to craft jewellery that celebrates life’s most precious moments. What began as a passion for fine craftsmanship has grown into a legacy of elegance, trust, and timeless design.
          </p>

          <p className="text-gray-900 leading-relaxed mb-6">
           Every piece we create reflects meticulous attention to detail, certified purity, and an unwavering commitment to excellence. From the selection of the finest materials to the final polish, our artisans ensure that each creation embodies sophistication and grace.
          </p>
          <p className="text-gray-900 leading-relaxed mb-6">
            We believe jewellery is more than adornment — it is a symbol of love, celebration, heritage, and individuality. Whether it is a bridal masterpiece passed down through generations or an elegant everyday design that enhances your daily confidence, our collections are designed to make you feel extraordinary.
          </p>
          <button className="bg-[#B9AA52] text-white px-10 py-4 w-fit flex items-center gap-4 hover:bg-black hover:text-white transition duration-300">
              Shop Now
              <span className="bg-white text-black rounded-full w-7 h-7 flex items-center justify-center text-sm">
                →
              </span>
            </button>
        </div>

        <div className="border border-[#B9AA52]/40 rounded-2xl h-96 flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-black shadow-2xl">
          <div className="relative h-[500px] w-full ">
                        <Image
                          src="/images/banner-3.jpg"
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
                        />
                      </div>
        </div>
      </div>

        {/* ================= OUR visson and mission ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
         <div className="border border-[#B9AA52]/40 rounded-2xl h-96 flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-black shadow-2xl">
          <div className="relative h-[500px] w-full ">
                        <Image
                          src="/images/jhumka.jpg"
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
                        />
                      </div>
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#B9AA52] mb-6">
            Our Vission & Mission
          </h2>

          <p className="text-gray-900 leading-relaxed mb-6">
To become a distinguished symbol of trust, purity, and royal craftsmanship — creating jewellery that transcends generations and becomes a cherished part of every family’s legacy.          </p>

          <p className="text-gray-900 leading-relaxed mb-6">
We envision a brand where timeless elegance meets uncompromising quality, and every creation reflects heritage, sophistication, and enduring beauty.          </p>
          <p className="text-gray-900 leading-relaxed mb-6">

Our mission is to deliver jewellery of certified purity and exceptional craftsmanship, designed to celebrate life’s most meaningful moments.
          </p>
          <p className="text-gray-900 leading-relaxed mb-6">
            We are committed to offering exclusive designs, personalized service, and an unforgettable luxury experience — ensuring that every customer feels valued, confident, and truly royal.
          </p>
          <button className="bg-[#B9AA52] text-white px-10 py-4 w-fit flex items-center gap-4 hover:bg-black hover:text-white  transition duration-300">
              Shop Now
              <span className="bg-white text-black rounded-full w-7 h-7 flex items-center justify-center text-sm">
                →
              </span>
            </button>
        </div>

       
      </div>

     

     {/* ================= LUXURY CTA ================= */}
<section className="relative py-24 bg-gradient-to-r from-black via-[#111] to-black overflow-hidden">

  {/* Subtle Gold Glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(185,170,82,0.15),_transparent_70%)]"></div>

  <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">

    {/* Left Content */}
    <div className="max-w-xl">
      <p className="tracking-[6px] text-xs uppercase text-gray-400 mb-4">
        Step Into Luxury
      </p>

      <h2 className="text-4xl md:text-5xl font-bold text-[#B9AA52] leading-tight mb-6">
        Experience Royal Elegance
      </h2>

      <p className="text-gray-300 leading-relaxed">
        Discover jewellery crafted with precision, passion, and timeless beauty.
        Let every piece reflect your grace and individuality.
      </p>
    </div>

    {/* Right Button */}
    <div>
      <button className="group relative inline-flex items-center gap-4 border border-[#B9AA52] px-10 py-4 text-[#B9AA52] font-semibold transition duration-300 hover:bg-[#B9AA52] hover:text-black">

        Visit Our Store

        <span className="w-8 h-8 flex items-center justify-center border border-[#B9AA52] rounded-full group-hover:border-black transition">
          →
        </span>

      </button>
    </div>

  </div>

  {/* Bottom Gold Accent Line */}
  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B9AA52]/60"></div>

</section>

     

    

    </section>
  );
}