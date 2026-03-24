import { connectDB } from "@/app/lib/mongodb";
import Product from "@/app/models/Product";
import Category from "@/app/models/Category";
import { notFound } from "next/navigation";
import ProductGallery from "@/app/components/ProductGallery";
import RelatedProducts from "@/app/components/RelatedProducts";
import WishlistButton from "@/app/components/WishlistButton";
import AddToCartButton from "@/app/components/AddToCartButton";
import { formatCurrency } from "@/app/lib/format";

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

  // ❌ Hidden product should not be accessible
  if (!product || !product.isActive) return notFound();

  const inStock = product.stock > 0;

  // ✅ FILTER RELATED PRODUCTS
  const relatedProducts = await Product.find({
    category: categoryDoc._id,
    _id: { $ne: product._id },
    isActive: true, // 🔥 important
  }).limit(8);

  return (
    <div className="max-w-7xl mx-auto pt-32 px-6 lg:px-10 pb-16">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

        {/* IMAGE */}
        <ProductGallery images={product.images} />

        {/* INFO */}
        <div className="flex flex-col">

          <h1 className="text-2xl lg:text-3xl font-semibold mb-3">
            {product.name}
          </h1>

          {/* 💰 PRICE */}
          <div className="mb-4">

            {product.isOnSale ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-red-600">
                  {formatCurrency(product.salePrice)}
                </span>

                <span className="text-lg line-through text-gray-400">
                  {formatCurrency(product.price)}
                </span>
              </div>
            ) : (
              <p className="text-2xl font-bold">
                {formatCurrency(product.price)}
              </p>
            )}

          </div>

          {/* 📦 STOCK STATUS */}
          <div className="mb-4">
            {inStock ? (
              <span className="text-green-600 font-medium text-sm">
                ● In Stock
              </span>
            ) : (
              <span className="text-red-500 font-medium text-sm">
                ● Out of Stock
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.longDescription}
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4">

            {/* 🔒 Disable if out of stock */}
            {inStock ? (
              <AddToCartButton
                product={JSON.parse(JSON.stringify(product))}
              />
            ) : (
              <button className="bg-gray-300 text-gray-500 px-6 py-3 rounded cursor-not-allowed">
                Out of Stock
              </button>
            )}

            <WishlistButton productId={product._id.toString()} />

          </div>

        </div>
      </div>

      {/* RELATED */}
      <RelatedProducts products={relatedProducts} />

    </div>
  );
}