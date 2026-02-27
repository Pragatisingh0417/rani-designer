import Image from "next/image";
import Link from "next/link";

interface ShopByCatalogProps {
  limit?: number;
}

export default function ShopByCatalog({ limit }: ShopByCatalogProps) {
  const catalogs = [
    { title: "New Arrivals", image: "/images/new-arrivals.jpg", link: "#" },
    { title: "Best Seller", image: "/images/Choker.jpg", link: "#" },

    { title: "Necklaces", image: "/images/necklace.jpg", link: "necklace" },
    { title: "Rings", image: "/images/rings.jpg", link: "#" },
    { title: "Earrings", image: "/images/earrings.jpg", link: "#" },
    { title: "Bracelets", image: "/images/bracelet.jpg", link: "#" },
    { title: "Pendants", image: "/images/Pendant.jpg", link: "#" },
    { title: "Choker", image: "/images/Choker.jpg", link: "#" },
    { title: "Anklets", image: "/images/Choker.jpg", link: "#" },

  ];

  // Apply limit if provided
  const displayedCatalogs = limit
    ? catalogs.slice(0, limit)
    : catalogs;

  return (
    <section className="py-16 bg-[#f8f3eb]">
      <h2 className="text-3xl md:text-5xl leading-tight text-black mb-12 text-center">
        Shop By Catalogs
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {displayedCatalogs.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="group relative overflow-hidden shadow-md rounded-2xl"
          >
            <div className="relative h-[400px] w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
              />
            </div>

            <div className="absolute inset-0 group-hover:bg-black/50 transition duration-300 flex items-end justify-center pb-6">
              <h3 className="text-white text-xl font-semibold tracking-wide">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* View More Button (Only if limited) */}
      {limit && catalogs.length > limit && (
        <div className="text-center mt-12">
          <Link
            href="/catalogs"
            className="inline-block bg-[#B9AA52] text-white px-8 py-3 hover:bg-black hover:text-white transition duration-300"
          >
            View All Catalogs
          </Link>
        </div>
      )}
    </section>
  );
}