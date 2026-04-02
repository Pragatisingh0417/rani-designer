import { NextResponse } from "next/server";
import Product from "@/app/models/Product";
import { connectDB } from "@/app/lib/mongodb";
import "@/app/models/DesignerChoice";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {

  await connectDB();

  const products = await Product.find()
    .populate("category")
    .populate("designerChoices"); // ✅ ADD THIS
  return NextResponse.json(products);
}

// export async function POST(req: Request) {

//   await connectDB();

//   const data = await req.json();

//   data.slug = generateSlug(data.name);

//   const product = await Product.create({
//     ...data,

// // category: data.category || null,

//     // ✅ AUTO SALE DETECTION
//     isOnSale: Boolean(data.isOnSale || Number(data.salePrice) > 0),

//     isActive: Boolean(data.isActive),

//     price: Number(data.price),
//     salePrice: Number(data.salePrice || 0),
//     stock: Number(data.stock || 0),
//   });

//   return NextResponse.json(product);
// }



export async function POST(req: Request) {
  await connectDB();

  const data = await req.json();

  data.slug = generateSlug(data.name);

  // ✅ FIX: clean incoming data
  const productData: any = {
    ...data,

    isOnSale: Boolean(data.isOnSale || Number(data.salePrice) > 0),
    isActive: Boolean(data.isActive),

    price: Number(data.price),
    salePrice: Number(data.salePrice || 0),
    stock: Number(data.stock || 0),
  };

  // ✅ VERY IMPORTANT FIX
  if (!data.category) {
    delete productData.category;   // ❌ remove empty string
  }

  // (optional but recommended for your setup)
  if (!data.designerChoices) {
    delete productData.designerChoices;
  }

  const product = await Product.create(productData);

  return NextResponse.json(product);
}