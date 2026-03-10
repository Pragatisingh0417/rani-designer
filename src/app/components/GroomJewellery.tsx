"use client";

import Image from "next/image";
import Link from "next/link";

const products = [
  {
    image: "/images/rings-1.webp",
    link: "/product/necklace-1",
  },
  {
    image: "/images/earrings-2.jpg",
    link: "/product/necklace-2",
  },
  {
    image: "/images/choker-1.jpg",
    link: "/product/necklace-3",
  },
  {
    image: "/images/bracelet.jpg",
    link: "/product/necklace-4",
  },
  {
    image: "/images/bangles.jpg",
    link: "/product/necklace-5",
  },
];

export default function GroomJewellerySection() {
  return (
    <section className="max-w-8xl mx-auto py-12 px-10 bg-black">
      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT IMAGE */}
        <div className="relative h-[600px]">
          <Image
            src="/images/bride.jpg"
            alt="Groom Jewellery"
            fill
            className="object-cover rounded-lg"
          />

          <h2 className="absolute bottom-6 left-6 text-white text-4xl font-serif tracking-wider">
            BRIDE
          </h2>
        </div>

        {/* RIGHT PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          {products.map((item, index) => (
            <Link key={index} href={item.link} className="relative h-48 group">
              
              <Image
                src={item.image}
                alt="Jewellery Product"
                fill
                className="object-cover rounded-lg group-hover:scale-105 transition duration-300"
              />

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}