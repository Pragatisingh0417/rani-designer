"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useWishlist } from "@/app/context/WishlistContext";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function QuickViewDrawer({ product, onClose }: any) {

  const images = product?.images?.length
    ? product.images
    : ["/placeholder.png"];

  const [activeIndex, setActiveIndex] = useState(0);
  const [added, setAdded] = useState(false);

  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart, cart, setIsCartOpen } = useCart();
  const router = useRouter();

  // ✅ Check if already in cart
  const isInCart = cart.some(
    (item: any) => item._id === product?._id
  );

  const isWishlisted = wishlist.includes(product?._id);

  const nextImage = () => {
    setActiveIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[480px] bg-amber-50 z-[1000] shadow-2xl
        transform transition-transform duration-500 ease-in-out
        ${product ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 h-full overflow-y-auto relative mt-4">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-gray-600 hover:text-black"
          >
            <X size={22} />
          </button>

          {/* ❤️ Wishlist */}
          <button
            onClick={() => toggleWishlist(product._id)}
            className="absolute top-4 left-4 bg-white p-2 rounded-full shadow hover:scale-110 transition z-10"
          >
            <Heart
              size={18}
              className={
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-black"
              }
            />
          </button>

          <h1 className="absolute top-4 left-1/2 -translate-x-1/2 text-xl font-semibold">
            Quick View
          </h1>

          {/* Image */}
          <div className="flex gap-4 mt-16">

            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`border rounded overflow-hidden ${
                    activeIndex === i ? "border-black" : ""
                  }`}
                >
                  <Image src={img} alt="" width={70} height={80} />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative">
              <Image
                src={images[activeIndex]}
                alt={product.name}
                width={400}
                height={500}
                className="w-full h-[420px] object-cover rounded"
              />

              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="mt-6">

            <h2 className="text-xl font-semibold mb-2">
              {product.name}
            </h2>

            <div className="text-lg font-bold mb-4">
              £{product.price}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">

              <button
                onClick={() => {
                  if (isInCart) {
                    // 👉 Already in cart → go to cart
                    onClose();
                    setIsCartOpen(false);
                    router.push("/cart");
                  } else {
                    // 👉 Add + redirect
                    addToCart(product, false); // ❗ don't open drawer
                    setAdded(true);

                    setTimeout(() => {
                      onClose();
                      setIsCartOpen(false);
                      router.push("/cart");
                    }, 1000);
                  }
                }}
                className={`px-6 py-3 rounded transition ${
                  isInCart
                    ? "bg-green-600 text-white"
                    : "bg-black text-white hover:bg-gray-900"
                }`}
              >
                {isInCart
                  ? "Go to Cart"
                  : added
                  ? "Added ✓"
                  : "Add to Cart"}
              </button>

              <a
                href={`/products/${product.category.slug}/${product.slug}`}
                className="flex-1 text-center border py-3 rounded hover:bg-gray-100"
              >
                View Full Details
              </a>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}