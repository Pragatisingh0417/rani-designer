"use client";

import Image from "next/image";
import Link from "next/link";


const bottomCards = [
  {
    title: "Heritage Jewels",
    image: "/images/jewellery-1.jpg",
  },
  {
    title: "Proudly Worn",
    image: "/images/jewellery-1.jpg",
  },
  {
    title: "Rare Discoveries",
    image: "/images/jewellery-1.jpg",
  },
];

export default function HeroGrid() {
  return (
    <section className=" px-4 md:px-8 py-6 bg-[#f8f3eb]">

      {/* ======= GRID CONTAINER ======= */}
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* ================= LEFT LARGE ================= */}
        <div className="relative group h-[300px] md:h-[300px] overflow-hidden rounded-2xl">

          <Image
            src="/images/banner-1.avif"   
            alt="Celebrate Collection"
            fill
            className="object-cover group-hover:scale-105 transition duration-700 rounded-2xl"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          {/* <div className="absolute left-8 bottom-10 text-white max-w-md">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#B9AA52]">
              Celebrate
            </h2>
            <p className="mt-2 text-lg">
              Unveil jewellery made to complement your every look
            </p>

            <Link
              href="/shop"
              className="inline-block mt-5 px-6 py-2 bg-[#B9AA52] text-black font-medium hover:bg-white transition"
            >
              SHOP NOW
            </Link>
          </div> */}
        </div>

        {/* ================= RIGHT LARGE ================= */}
        <div className="relative group h-[300px] md:h-[300px] overflow-hidden rounded-2xl">

          <Image
            src="/images/banner-1.avif"
            alt="Polki Collection"
            fill
            className="object-cover group-hover:scale-105 transition duration-700 rounded-2xl"
          />

          <div className="absolute inset-0 bg-black/30"></div>

          {/* <div className="absolute right-8 bottom-10 text-white text-right">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#B9AA52]">
              Polki, Kundan
            </h2>
            <p className="mt-2 text-lg">& more</p>

            <Link
              href="/shop"
              className="inline-block mt-5 px-6 py-2 bg-[#B9AA52] text-black font-medium hover:bg-white transition"
            >
              SHOP NOW
            </Link>
          </div> */}
        </div>

      </div>

      {/* ======= BOTTOM GRID ======= */}

       <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
  {bottomCards.map((item, index) => (
    <div
      key={index}
      className="relative group h-[250px] overflow-hidden rounded-2xl"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover group-hover:scale-105 transition duration-700 rounded-2xl"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      {/* <div className="absolute bottom-6 left-6 text-white">
        <h3 className="text-xl font-semibold text-[#B9AA52]">
          {item.title}
        </h3>
      </div> */}
    </div>
  ))}
</div>


    </section>
  );
}
