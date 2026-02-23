import Image from "next/image";
import Link from "next/link";


export default function PerfectMatch() {
const match = 
[

    {
title: "Necklaces",
      image: "/images/necklace-1.jpg",
      link: "#",
    },
     {
title: "Rings",
      image: "/images/rings-1.webp",
      link: "#",
    },
     {
title: "Earings",
      image: "/images/earrings-2.jpg",
      link: "#",
    },
    {
title: "Jhumkas",
      image: "/images/jhumka.jpg",
      link: "#",
    }
]
    return (
<section className="py-16 ">
     <h2 className="text-center font-semibold text-3xl md:text-4xl mb-12 ">
       FIND YOUR PERFECT MATCH
      </h2>
<div className="max-w-7xl grid grid-cols-1 sm:grid-cols-2 md-grid-cols-2 mx-auto gap-4">
  {match.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="group relative overflow-hidden shadow-md rounded-2xl"
          >
            {/* Image Container */}
            <div className="relative h-[550px] w-full ">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 transition duration-300 flex items-end justify-center pb-6">
              <h3 className="text-white text-xl font-semibold tracking-wide">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}

</div>


</section>

    )
}
