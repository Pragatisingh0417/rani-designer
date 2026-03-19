import Image from "next/image";
import Link from "next/link";

export default function OnSale() {
  const catalogs = [
    {
      title: "Chandbali Earrings",
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
      title: "Rings",
      image: "/images/rings-1.webp",
      link: "#",
    },
  ];

  return (
    <section className="py-10 sm:py-14 md:py-16">

      {/* Heading */}
      <h2 className="
        text-2xl 
        sm:text-3xl 
        md:text-5xl 
        text-black 
        mb-3 sm:mb-5 
        text-center
      ">
        On Sale
      </h2>

      <p className="
        text-sm 
        sm:text-base 
        md:text-lg 
        text-center 
        mb-8 sm:mb-10 md:mb-12 
        text-gray-700
      ">
        Jewellery pieces everyone’s eyeing right now
      </p>

      {/* Grid */}
      <div className="
        max-w-7xl mx-auto 
        grid grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-4 sm:gap-6 
        px-4 sm:px-6
      ">
        {catalogs.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="
              relative w-full 
              h-[220px] 
              sm:h-[260px] 
              md:h-[280px] 
              lg:h-[300px]
            ">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Overlay */}
            <div className="
              absolute inset-0 
              flex items-end justify-center 
              pb-4 sm:pb-6 
              bg-black/20 
              group-hover:bg-black/50 
              transition
            ">
              <h3 className="
                text-white 
                text-base 
                sm:text-lg 
                md:text-xl 
                font-semibold 
                tracking-wide 
                text-center px-2
              ">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA BUTTON */}
      <div className="text-center mt-8 sm:mt-10 md:mt-12">
        <Link
          href="/"
          className="
            inline-block 
            bg-[#B9AA52] 
            text-white 
            px-5 py-2.5 
            sm:px-6 sm:py-3 
            md:px-8 md:py-3 
            text-sm sm:text-base 
            hover:bg-black 
            transition
          "
        >
          Know More
        </Link>
      </div>
    </section>
  );
}