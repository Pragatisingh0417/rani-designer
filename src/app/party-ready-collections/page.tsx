"use client";
import Image from "next/image";
import GroomJewellerySection from "../components/GroomJewellery";

export default function PartyReadyPage() {
  return (
    <section className=" text-white">
    

<GroomJewellerySection />


<div className=" py-20">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-serif text-[#B9AA52] mb-4">
        Featured Party Pieces
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Statement jewellery designed to make you shine at every celebration.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

      {[
        {
          title: "Royal Kundan Set",
          image: "/images/banner-4.jpg",
        },
        {
          title: "Emerald Party Necklace",
          image: "/images/banner-4.jpg",
        },
        {
          title: "Gold Temple Earrings",
          image: "/images/banner-4.jpg",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-xl border border-[#B9AA52]/30"
        >
          <div className="relative h-[400px]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-110 transition duration-700"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition duration-500"></div>

          {/* Text */}
          <div className="absolute bottom-6 left-6 z-10">
            <h3 className="text-xl font-semibold text-white">
              {item.title}
            </h3>
            <button className="mt-3 text-sm text-[#B9AA52] border-b border-[#B9AA52]">
              View Details
            </button>
          </div>
        </div>
      ))}

    </div>
  </div>
</div>
    </section>
  );
}