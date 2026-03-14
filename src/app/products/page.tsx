"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, SlidersHorizontal, Eye, X } from "lucide-react";
import QuickViewDrawer from "../components/QuickViewDrawer";
import { Heart, ShoppingBag } from "lucide-react";



export default function ProductsPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {

            const res = await fetch("/api/products");
            const data = await res.json();

            setProducts(data);

        }

        fetchProducts()

    }, [])


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
setCart((prev) => [...prev, product._id]);
        alert("Product added to cart");
    };

    return (

        <div className="w-full ">


 <div className="max-w-8xl pt-40 mx-auto px-6 lg:px-10">

            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-serif">Products</h1>
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
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

{products.map((product:any)=>(
<div key={product._id} className="group">

<div className="relative overflow-hidden">

{/* Product Image */}
<Link href={`/products/${product.category.slug}/${product.slug}`}>

<img
src={product.images?.[0] || "/placeholder.png"}
className="w-full h-[380px] object-cover transition duration-500 group-hover:scale-105"
/>

</Link>

{/* Overlay Buttons */}
<div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition">

<div className="flex gap-3">

<button
onClick={()=>setSelectedProduct(product)}
className="bg-white p-3 rounded-full shadow hover:scale-110 transition"
>
<Eye size={18}/>
</button>

<button
onClick={()=>addToCart(product)}
className="bg-black text-white px-4 py-2 text-sm rounded"
>
Add to Cart
</button>

</div>

</div>

</div>

{/* Product Info */}

<div className="mt-3">

<h3 className="text-sm font-medium">
{product.name}
</h3>

<div className="text-lg font-semibold">
£{product.price}
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
        </div>

        

    )
}