import Image from "next/image";
import Link from "next/link";

export default function VideoSection() {
  const catalogs = [
    {
      title: "Necklaces",
      video: "/videos/video-1.mp4",
      link: "#",
    },
    {
      title: "Rings",
      video: "/videos/video-2.mp4",
      link: "#",
    },
    {
      title: "Earrings",
      video: "/videos/video-3.mp4",
      link: "#",
    },
    {
      title: "Earrings",
      video: "/videos/video-4.mp4",
      link: "#",
    },
 

  ];

  return (
    <section className="py-20">
      {/* Heading */}
      {/* <h2 className="text-center font-bold text-3xl md:text-4xl mb-14">
        Shop By Catalog
      </h2> */}

      {/* Grid */}
      <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {catalogs.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="group relative overflow-hidden shadow-lg rounded-2xl"
          >
            {/* Media Container (Height Increased) */}
            <div className="relative h-[600px] w-full">

              {/* If Video Exists */}
             
                <video
                  src={item.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-2xl"
                />
            
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 group-hover:bg-black/50 transition duration-300 flex items-end justify-center pb-8">
              {/* <h3 className="text-white text-xl font-semibold tracking-wide">
                {item.title}
              </h3> */}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
