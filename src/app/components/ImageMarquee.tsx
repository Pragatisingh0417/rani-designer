"use client";

import Image from "next/image";

const images = [
  "/images/testimonial-image.webp",
  "/images/testimonial-image.webp",
  "/images/testimonial-image.webp",
  "/images/testimonial-image.webp",
  "/images/testimonial-image.webp",
];

export default function ImageMarquee() {
  return (
    <section className="py-12 bg-[#f8f3eb] overflow-hidden">
      <div className="relative w-full overflow-hidden">

        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">

          {[...images, ...images].map((src, index) => (
            <div
              key={index}
              className="relative min-w-[250px] md:min-w-[280px] h-[420px] md:h-[400px] rounded-2xl overflow-hidden"
            >
              <Image
                src={src}
                alt="Gallery Image"
                fill
                className="object-cover"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
