import Image from "next/image";
import Link from "next/link";

export default function RaniDesignerChoice() {
  const catalogs = [
    {
      title: "Brass/Rajwadi Choice",
      image: "/images/wedding-image.webp",
      link: "#",
    },
    {
      title: "Meenakari Choice",
      image: "/images/gold.webp",
      link: "#",
    },
    {
      title: "Kangan Choice",
      image: "/images/diamond.webp",
      link: "#",
    },
    {
      title: "Punjabi Traditional Choice",
      image: "/images/dailywear.webp",
      link: "#",
    },
   
    
   
  ];

  return (
    <section className="py-16">
      {/* Heading */}
     <h2 className="text-3xl md:text-5xl leading-tight text-black mb-5 text-center">
Rani’s Designer Choice

      </h2>
      <p className="text-center font-base text-3xl md:text-2xl mb-12 max-w-4xl mx-auto">

Our jewellery is inspired by the beauty of Indian traditions, with a touch of modern
elegance and uncompromising quality.      </p>

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
    </section>
  );
}
