import { connectDB } from "@/app/lib/mongodb";
import Product from "@/app/models/Product";
import Category from "@/app/models/Category";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{category:string,slug:string}> }) {

  const { category, slug } = await params;

  await connectDB();

  const categoryDoc = await Category.findOne({
    slug: category
  });

  if (!categoryDoc) return notFound();

  const product = await Product.findOne({
    slug: slug,
    category: categoryDoc._id
  });

  if (!product) return notFound();

  return (

    <div className="max-w-7xl mx-auto pt-40 grid grid-cols-2 gap-10 mb-10 ">

      <img
        src={product.images?.[0] || "/placeholder.png"}
        className="w-full object-cover"
      />

      <div>

        <h1 className="text-3xl font-semibold mb-4">
          {product.name}
        </h1>

        <p className="text-2xl font-bold mb-4">
          £{product.price}
        </p>

        <p className="mb-6">
          {product.longDescription}
        </p>

        <button className="bg-black text-white px-6 py-3">
          Add to Cart
        </button>

      </div>

    </div>
  );
}