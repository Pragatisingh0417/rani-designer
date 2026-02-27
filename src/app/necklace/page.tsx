"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, SlidersHorizontal, Eye, X } from "lucide-react";

const products = [
    {
        id: 1,
        name: "Gulabi Rivaayat Choker with Dangler Earrings",
        price: 14850,
        oldPrice: 26500,
        discount: "43% OFF",
        image: "/images/necklace-1.jpg",
        rating: 5,
        reviews: 6,
    },
    {
        id: 2,
        name: "Gulbahar Emerald Drop Pearl Choker Set",
        price: 7850,
        image: "/images/necklace-1.jpg",
        rating: 4,
        reviews: 3,
    },
    {
        id: 3,
        name: "Gulabi Émeraude Jadau Choker Set",
        price: 9450,
        image: "/images/necklace-1.jpg",
        rating: 5,
        reviews: 6,
    },
    {
        id: 4,
        name: "Étoile Pearl Sparkle Necklace Set",
        price: 6950,
        image: "/images/necklace-1.jpg",
        rating: 5,
        reviews: 1,
    },
    {
        id: 5,
        name: "Elara Carved Stone Pendant Set",
        price: 3950,
        image: "/images/necklace-1.jpg",
        rating: 4,
        reviews: 2,
    },
];

export default function NecklacesPage() {
    const [priceRange, setPriceRange] = useState([0, 36500]);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    return (
        <div className="max-w-8xl mx-auto px-6 lg:px-10">

            {/* Header */}
            <div className="bg-[#e9e6e2] py-10 text-center">
                <h1 className="text-4xl font-serif">Necklaces</h1>
            </div>

            <div className="flex gap-10 py-8">

                {/* Sidebar */}
                <aside className="max-w-8xl mx-auto hidden lg:block">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 font-medium mb-4">
                            <SlidersHorizontal size={18} />
                            Filter
                        </div>

                        {/* Availability */}
                        <div className="border-t pt-6">
                            <h3 className="font-medium mb-3">Availability</h3>
                            <div className="space-y-2 text-sm">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" />
                                    In Stock (291)
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" />
                                    Out Of Stock (16)
                                </label>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="border-t pt-6 mt-6">
                            <h3 className="font-medium mb-3">Price</h3>
                            <input
                                type="range"
                                min={0}
                                max={36500}
                                value={priceRange[1]}
                                onChange={(e) =>
                                    setPriceRange([0, parseInt(e.target.value)])
                                }
                                className="w-full"
                            />
                            <div className="flex justify-between mt-3 text-sm">
                                <span>₹ 0</span>
                                <span>₹ {priceRange[1]}</span>
                            </div>
                        </div>

                        {/* Color (Placeholder) */}
                        <div className="border-t pt-6 mt-6">
                            <h3 className="font-medium mb-3">Color</h3>
                            <div className="flex gap-3">
                                <div className="w-5 h-5 bg-green-600 rounded-full cursor-pointer" />
                                <div className="w-5 h-5 bg-red-500 rounded-full cursor-pointer" />
                                <div className="w-5 h-5 bg-yellow-400 rounded-full cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Products */}
                <div className="flex-1 max-w-8xl mx-auto">

                    {/* Grid */}
                    <div className=" grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="group">

                                <div className="relative overflow-hidden group">
                                    {product.discount && (
                                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                            {product.discount}
                                        </span>
                                    )}

                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={300}
                                        height={400}
                                        className="w-full h-[300px] object-cover transition duration-500 group-hover:scale-105"
                                    />

                                    {/* Quick View Button */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center 
opacity-0 group-hover:opacity-100 transition duration-300">

                                        <button
                                            onClick={() => setSelectedProduct(product)}
                                            className="bg-white text-black p-3 rounded-full shadow-lg 
    hover:scale-110 transition duration-200"
                                        >
                                            <Eye size={18} />
                                        </button>

                                    </div>
                                </div>

                                <div className="mt-4 space-y-1">
                                    {/* <button
                                        onClick={() => setSelectedProduct(product)}
                                        className=" bottom-4 right-4 bg-red-700 p-20 rounded-full opacity-0 group-hover:opacity-100 transition shadow-md hover:scale-110"
                                    >
                                        <Eye size={18} />
                                    </button> */}
                                    <h3 className="text-sm font-medium">

                                        {product.name}
                                    </h3>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 text-green-600">
                                        {[...Array(product.rating)].map((_, i) => (
                                            <Star key={i} size={14} fill="currentColor" />
                                        ))}
                                        <span className="text-xs text-gray-500 ml-1">
                                            {product.reviews} reviews
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="font-semibold">
                                            Rs. {product.price.toLocaleString()}
                                        </span>
                                        {product.oldPrice && (
                                            <span className="line-through text-gray-400">
                                                Rs. {product.oldPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Quick View Drawer */}
            {/* Quick View Drawer */}
            <>
             

                {/* Drawer */}
                <div
                    className={`
      fixed top-0 right-0 h-full w-[400px] bg-white z-50 shadow-xl
      transform transition-transform duration-500 ease-in-out
      ${selectedProduct ? "translate-x-0" : "translate-x-full"}
    `}
                >
                    {selectedProduct && (
                        <div className="p-6 h-full overflow-y-auto relative">

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                            >
                                ✕
                            </button>

                            {/* Product Image */}
                            <div className="mb-6">
                                <Image
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    width={500}
                                    height={600}
                                    className="w-full h-[400px] object-cover rounded"
                                />
                            </div>

                            {/* Product Details */}
                            <h2 className="text-xl font-semibold mb-2">
                                {selectedProduct.name}
                            </h2>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-lg font-bold">
                                    ₹ {selectedProduct.price.toLocaleString()}
                                </span>

                                {selectedProduct.oldPrice && (
                                    <span className="line-through text-gray-400">
                                        ₹ {selectedProduct.oldPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            <p className="text-sm text-gray-600 mb-6">
                                Crafted with premium stones and intricate detailing,
                                this necklace is designed for elegance and timeless beauty.
                            </p>

                            <div className="space-y-3">
                                <button className="w-full bg-black text-white py-3 rounded">
                                    Add to Cart
                                </button>

                                <a
                                    href={`/necklaces/${selectedProduct.id}`}
                                    className="block text-center border py-3 rounded hover:bg-gray-100"
                                >
                                    View Full Details
                                </a>
                            </div>

                        </div>
                    )}
                </div>
            </>
        </div>


    );
}

