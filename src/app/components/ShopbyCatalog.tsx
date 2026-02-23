import Image from "next/image";
import Link from "next/link";

export default function ShopByCatalog() {
  const catalogs = [
     {
      title: "New Arrivals",
      image: "/images/new-arrivals.jpg",
      link: "#",
    },
    {
      title: "Necklaces",
      image: "/images/necklace.jpg",
      link: "#",
    },
    {
      title: "Rings",
      image: "/images/rings.jpg",
      link: "#",
    },
    {
      title: "Earrings",
      image: "/images/earrings.jpg",
      link: "#",
    },
    {
      title: "Bracelets",
      image: "/images/bracelet.jpg",
      link: "#",
    },
    {
      title: "Pendants",
      image: "/images/Pendant.jpg",
      link: "#",
    },
   
    {
      title: "Choker",
      image: "/images/Choker.jpg",
      link: "#",
    },
    
   
  ];

  return (
    <section className="py-16 bg-[#f8f3eb]">
      {/* Heading */}
      <h2 className="text-center font-bold text-3xl md:text-4xl mb-12">
        Shop By Catalog
      </h2>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {catalogs.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="group relative overflow-hidden shadow-md rounded-2xl"
          >
            {/* Image Container */}
            <div className="relative h-[400px] w-full ">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0  group-hover:bg-black/50 transition duration-300 flex items-end justify-center pb-6">
              <h3 className="text-white text-xl font-semibold tracking-wide">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
