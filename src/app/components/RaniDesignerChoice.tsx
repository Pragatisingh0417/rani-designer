"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RaniDesignerChoice() {

  const [choices, setChoices] = useState([]);

  useEffect(() => {
    fetch("/api/designer-choice")
      .then(res => res.json())
      .then(setChoices);
  }, []);

  return (
    <section className="py-15">

      <h2 className="text-3xl md:text-5xl text-black mb-5 text-center">
        Rani’s Designer Choice
      </h2>
      <p className="max-w-4xl mx-auto text-sm sm:text-base md:text-lg text-center mb-8 text-gray-700">
        Our jewellery is inspired by the beauty of Indian traditions, with a touch of modern elegance and uncompromising quality.


      </p>

<div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">

        {choices.length === 0 ? (
          <p className="text-center col-span-4">Loading...</p>
        ) : (
          choices.map((c: any) => (
            <Link
              key={c._id}
              href={`/designer-choice/${c.slug}`}
              className="relative group rounded-xl overflow-hidden"
            >
            <div className="relative h-[300px] sm:h-[220px] md:h-[300px]  w-full">
  <img
    src={c.image}
    alt={c.name}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 md:group-hover:scale-110"
  />
</div>


              <div className="absolute inset-0 bg-black/30 flex items-end justify-center pb-4">
                <h3 className="text-white font-semibold">
                  {c.name}
                </h3>
              </div>
            </Link>
          ))
        )}

      </div>

    </section>
  );
}