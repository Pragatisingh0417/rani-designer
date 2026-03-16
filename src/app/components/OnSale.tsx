import Image from "next/image";
import Link from "next/link";

export default function OnSale() {
  const catalogs = [
    {
      title: "Chandbali Eacrings",
      image: "/images/chaand-bali-1.jpg",
      link: "#",
    },
    {
      title: "Chokers",
      image: "/images/choker-1.jpg",
      link: "#",
    },
    {
      title: "Bangles",
      image: "/images/bangles.jpg",
      link: "#",
    },
   
     {
      title: "Bangles",
      image: "/images/bangles.jpg",
      link: "#",
    },
   
    
   
  ];

  return (
    <section className="py-16">
      {/* Heading */}
      <h2 className="text-3xl md:text-5xl  leading-tight text-black mb-5 text-center">
On Sale      </h2>
      <p className="text-center font-base text-3xl md:text-2xl mb-12">

        Jewellery pieces everyone’s eyeing right now

      </p>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {catalogs.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="group relative overflow-hidden shadow-md rounded-2xl"
          >
            {/* Image Container */}
            <div className="relative h-[300px] w-full ">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 group-hover:bg-black/50 transition duration-300 flex items-end justify-center pb-6">
              <h3 className="text-white text-xl font-semibold tracking-wide">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block bg-[#B9AA52] text-white px-8 py-3 hover:bg-black hover:text-white transition duration-300"
          >
Know More          </Link>
        </div>
    </section>
  );
}
