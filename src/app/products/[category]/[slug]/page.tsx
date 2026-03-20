import { connectDB } from "@/app/lib/mongodb";
import Product from "@/app/models/Product";
import Category from "@/app/models/Category";
import { notFound } from "next/navigation";
import ProductGallery from "@/app/components/ProductGallery";
import RelatedProducts from "@/app/components/RelatedProducts";
import WishlistButton from "@/app/components/WishlistButton";
import AddToCartButton from "@/app/components/AddToCartButton";

export default async function ProductSlugPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  await connectDB();

  const categoryDoc = await Category.findOne({
    slug: category,
  });

  if (!categoryDoc) return notFound();

  const product = await Product.findOne({
    slug: slug,
    category: categoryDoc._id,
  });

  if (!product) return notFound();

// after fetching product

const relatedProducts = await Product.find({
  category: categoryDoc._id,
  _id: { $ne: product._id }, // exclude current product
})
.limit(8); // optional limit

  return (
    <div className="max-w-7xl mx-auto pt-32 px-6 lg:px-10 pb-16">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

        {/* 🔥 IMAGE SECTION */}
        <ProductGallery images={product.images} />

        {/* 🔥 PRODUCT INFO */}
        <div className="flex flex-col">

          <h1 className="text-2xl lg:text-3xl font-semibold mb-3">
            {product.name}
          </h1>

          <p className="text-2xl font-bold mb-4">
            £{product.price}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            {product.longDescription}
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
           <AddToCartButton product={JSON.parse(JSON.stringify(product))} />
           

           <WishlistButton productId={product._id.toString()} />
          </div>

        </div>
      </div>

{/* 🔥 RELATED PRODUCTS */}
<RelatedProducts products={relatedProducts} />  
  </div>
  );
}


