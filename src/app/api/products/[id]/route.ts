import { NextResponse } from "next/server";
import Product from "@/app/models/Product";
import { connectDB } from "@/app/lib/mongodb";

export async function GET(req: Request, { params }: any) {

  await connectDB();

  const { id } = await params;

  const product = await Product.findById(id);

  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: any) {

  await connectDB();

  const { id } = await params;

  const body = await req.json();

  const product = await Product.findByIdAndUpdate(
    id,
    {
      ...body,

      // ✅ AUTO SALE DETECTION
      isOnSale: Boolean(body.isOnSale || Number(body.salePrice) > 0),

      isActive: Boolean(body.isActive),

      price: Number(body.price),
      salePrice: Number(body.salePrice || 0),
      stock: Number(body.stock || 0),
    },
    { new: true }
  );

  return NextResponse.json(product);
}