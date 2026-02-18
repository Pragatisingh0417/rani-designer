"use client";

import Image from "next/image";

const testimonials = [
  {
    name: "Ananya Sharma",
    text: "Absolutely loved the craftsmanship. The jewellery feels premium and elegant.",
    image: "/images/client1.jpg",
  },
  {
    name: "Priya Verma",
    text: "Perfect wedding collection! Got so many compliments.",
    image: "/images/client2.jpg",
  },
  {
    name: "Megha Kapoor",
    text: "Beautiful designs and amazing service. Highly recommended!",
    image: "/images/client3.jpg",
  },
  {
    name: "Ritika Jain",
    text: "Dailywear collection is so classy and comfortable.",
    image: "/images/client4.jpg",
  },
];

export default function TestimonialMarquee() {
  return (
    <section className="py-16 bg-[#f8f3eb] overflow-hidden">
      <h2 className="text-4xl text-center mb-12 font-semibold">
        What Our Clients Say
      </h2>

      <div className="relative w-full overflow-hidden">
        <div className="flex gap-8 animate-marquee hover:[animation-play-state:paused]">

          {/* Duplicate array for infinite effect */}
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="min-w-[300px] md:min-w-[350px] bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold">{item.name}</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                "{item.text}"
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
