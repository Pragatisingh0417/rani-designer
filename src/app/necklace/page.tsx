"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Star, SlidersHorizontal, Eye, X } from "lucide-react";
import QuickViewDrawer from "../components/QuickViewDrawer";
import { Heart, ShoppingBag } from "lucide-react";
const products = [
    {
        id: 1,
        name: "Gulabi Rivaayat Choker with Dangler Earrings",
        price: 14850,
        oldPrice: 26500,
        discount: "43% OFF",
        image: "/images/necklace-1.jpg",
        hoverImage: "/images/necklace.jpg",

        rating: 5,
        reviews: 6,
    },
    {
        id: 2,
        name: "Gulbahar Emerald Drop Pearl Choker Set",
        price: 7850,
        image: "/images/necklace-1.jpg",
        hoverImage: "/images/necklace.jpg",

        rating: 4,
        reviews: 3,
    },
    {
        id: 3,
        name: "Gulabi Émeraude Jadau Choker Set",
        price: 9450,
        image: "/images/necklace-1.jpg",
        hoverImage: "/images/necklace.jpg",

        rating: 5,
        reviews: 6,
    },
    {
        id: 4,
        name: "Étoile Pearl Sparkle Necklace Set",
        price: 6950,
        image: "/images/necklace-1.jpg",
        hoverImage: "/images/necklace.jpg",

        rating: 5,
        reviews: 1,
    },
    {
        id: 5,
        name: "Elara Carved Stone Pendant Set",
        price: 3950,
        image: "/images/necklace-1.jpg",
        hoverImage: "/images/necklace-1.jpg",

        rating: 4,
        reviews: 2,
    },
];

export default function NecklacesPage() {
    const [priceRange, setPriceRange] = useState([0, 36500]);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [cart, setCart] = useState<number[]>([]);

    const toggleWishlist = (id: number) => {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const addToCart = (product: any) => {
        setCart((prev) => [...prev, product.id]);
        alert("Product added to cart");
    };

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
                        {/* <div className="border-t pt-6 mt-6">
                            <h3 className="font-medium mb-3">Color</h3>
                            <div className="flex gap-3">
                                <div className="w-5 h-5 bg-green-600 rounded-full cursor-pointer" />
                                <div className="w-5 h-5 bg-red-500 rounded-full cursor-pointer" />
                                <div className="w-5 h-5 bg-yellow-400 rounded-full cursor-pointer" />
                            </div>
                        </div> */}
                    </div>
                </aside>

                {/* Products */}
                <div className="flex-1 max-w-8xl mx-auto">

                    {/* Grid */}
                    <div className=" grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="group">


                                <div className="relative overflow-hidden group">

                                    {product.discount && (
                                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                                            {product.discount}
                                        </span>
                                    )}
                                    {/* Wishlist */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleWishlist(product.id);
                                        }}
                                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition z-20"
                                    >
                                        <Heart
                                            size={16}
                                            className={wishlist.includes(product.id) ? "text-red-500 fill-red-500" : "text-gray-500"}
                                        />
                                    </button>

                                    <Link href={`/necklaces/${product.id}`}>

                                        {/* Main Image */}
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={300}
                                            height={400}
                                            className="w-full h-[400px] object-cover transition duration-500 group-hover:opacity-0"
                                        />

                                        {/* Hover Image */}
                                        {product.hoverImage && (
                                            <Image
                                                src={product.hoverImage}
                                                alt={product.name}
                                                width={300}
                                                height={400}
                                                className="absolute inset-0 w-full h-[400px] object-cover opacity-0 group-hover:opacity-100 transition duration-500"
                                            />
                                        )}

                                    </Link>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
                                        <div className="flex gap-3">

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedProduct(product);
                                                }}
                                                className="bg-white text-black p-3 rounded-full shadow-lg hover:scale-110 transition"
                                            >
                                                <Eye size={18} />
                                            </button>

                                            <button
                                                onClick={() => addToCart(product)}
                                                className="flex items-center gap-2 bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800 transition"
                                            >
                                                <ShoppingBag size={16} />
                                                Add to Cart
                                            </button>

                                        </div>

                                    </div>

                                </div>
                                <div className="mt-4 space-y-1">

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
            <>


                {selectedProduct && (
                    <QuickViewDrawer
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </>
        </div>


    );
}

