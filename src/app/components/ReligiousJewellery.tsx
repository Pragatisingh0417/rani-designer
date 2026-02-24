"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

const productData = {
    "Temple Jewellery": [
        {
            title: "Dhanteras special-Kubera Pendant",
            image: "/images/temple-jewellery-1.webp",
            price: "2850",
            discount: "23% OFF",
        },
        {
            title: "Heritage Nakshi Gold Beaded Mala Set",
            image: "/images/Heritage Nakshi Gold Beaded Mala Set-1.webp",
            price: "12,850",
            discount: "23% OFF",
        },
        {
            title: "The Ganesha Temple Necklace Set",
            image: "/images/The Ganesha Temple Necklace Set-1.webp",
            price: "12,850",
            discount: "23% OFF",
        },

        {
            title: "Lalbaugcha Raja Inspired Pendant",
            image: "/images/Lalbaugcha Raja Inspired Pendant-1.webp",
            price: "12,850",
            discount: "23% OFF",
        },
        {
            title: "Ruby Diamond Necklace Set",
            image: "/images/ruby-diamond.webp",
            price: "12,850",
            discount: "23% OFF",
        },
        {
            title: "Ruby Diamond Necklace Set",
            image: "/images/ruby-diamond.webp",
            price: "12,850",
            discount: "23% OFF",
        },

    ],
    "Peacock Royale": [
        {
            title: "Emerald Statement Ring",
            image: "/images/p3.jpg",
            price: "6,550",
            discount: "30% OFF",
        },
        {
            title: "Ruby and Gold Plated Flower Earrings",
            image: "/images/Ruby-Gold-Plated-Flower-Earrings.webp",
            price: "6,550",
            discount: "30% OFF",
        },
        {
            title: "Emerald Statement Ring",
            image: "/images/p3.jpg",
            price: "6,550",
            discount: "30% OFF",
        },
        {
            title: "Emerald Pendant Set",
            image: "/images/p4.jpg",
            price: "9,250",
            discount: "40% OFF",
        },
    ],
    "Lord Ganesha": [
        {
            title: "Multicolor Floral Earrings",
            image: "/images/p5.jpg",
            price: "5,450",
            discount: "20% OFF",
        },
        {
            title: "Multicolor Floral Earrings",
            image: "/images/p5.jpg",
            price: "5,450",
            discount: "20% OFF",
        },
        {
            title: "Multicolor Floral Earrings",
            image: "/images/p5.jpg",
            price: "5,450",
            discount: "20% OFF",
        },
        {
            title: "Multicolor Luxe Necklace",
            image: "/images/p6.jpg",
            price: "14,250",
            discount: "35% OFF",
        },
    ],
};

export default function ReligiousJewellery() {
    const [activeCategory, setActiveCategory] =
        useState<keyof typeof productData>("Temple Jewellery");

    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;

        const container = scrollRef.current;
        const cardWidth =
            container.firstElementChild?.clientWidth || 300;

        container.scrollBy({
            left: direction === "left" ? -cardWidth * 2 : cardWidth * 2,
            behavior: "smooth",
        });
    };

    return (
        <section className="bg-[#f4f1ea] py-12">
            <div className="max-w-7xl mx-auto relative">
                {/* CATEGORY BUTTONS */}
                <div className="flex justify-center gap-6 mb-12">
                    {Object.keys(productData).map((category) => (
                        <button
                            key={category}
                            onClick={() =>
                                setActiveCategory(category as keyof typeof productData)
                            }
                            className={`px-6 py-2 rounded-full border transition text-sm ${activeCategory === category
                                    ? "bg-black text-white"
                                    : "border-black hover:bg-black hover:text-white"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* ARROWS */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-20 hover:scale-105 transition"
                >
                    <ArrowLeft size={20} />
                </button>

                <button
                    onClick={() => scroll("right")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-20 hover:scale-105 transition"
                >
                    <ArrowRight size={20} />
                </button>

                {/* CAROUSEL */}
                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto scroll-smooth px-12 no-scrollbar"
                >
                    {productData[activeCategory].map((product, index) => (
                        <div
                            key={index}
                            className="min-w-[280px] shrink-0 bg-white rounded-xl shadow-sm p-6 relative"
                        >
                            <span className="absolute top-4 left-4 bg-[#D4AF37] text-white text-xs px-2 py-1 rounded z-1">
                                SALE
                            </span>

                            <div className="relative w-full h-[300px] mb-4">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>

                            {/* <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                                {product.discount}
                            </span> */}

                            <h3 className="mt-3 font-medium text-[16px]">
                                {product.title}
                            </h3>

                            <div className="flex items-center gap-1 mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className="fill-green-600 text-green-600"
                                    />
                                ))}
                                <span className="text-xs text-gray-500 ml-2">
                                    25 reviews
                                </span>
                            </div>

                            <div className="mt-3 text-lg font-semibold">
                                Rs. {product.price}
                            </div>

                            <button className="mt-4 bg-[#B9AA52] text-white px-4 py-2 rounded text-sm hover:opacity-90 transition">
                                Buy on EMI
                            </button>
                        </div>
                    ))}
                </div>

            </div>

            {/* VIEW ALL */}
            <div className="flex justify-center mt-14">
                <button className="bg-[#B9AA52] text-white px-10 py-3 rounded hover:opacity-90 transition">
                    VIEW ALL
                </button>
            </div>
        </section>
    );
}