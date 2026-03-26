import { NextResponse } from "next/server";
import Product from "@/app/models/Product";
import { connectDB } from "@/app/lib/mongodb";

// ✅ GET
export async function GET(req: Request, { params }: any) {

  await connectDB();

  const { id } = await params;

  const product = await Product.findById(id);

  return NextResponse.json(product);
}

// ✅ PUT
export async function PUT(req: Request, { params }: any) {

  await connectDB();

  const { id } = await params;

  const body = await req.json();

  const product = await Product.findByIdAndUpdate(
    id,
    {
      ...body,

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

// ✅ DELETE (FIXED)
export async function DELETE(req: Request, { params }: any) {

  await connectDB();

  const { id } = await params; // ✅ FIX HERE

  const deleted = await Product.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Deleted successfully" });
}