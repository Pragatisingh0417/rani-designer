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
    body,
    { new: true }
  );

  return NextResponse.json(product);
}

export async function DELETE(req: Request, { params }: any) {

  await connectDB();

  const { id } = await params;

  await Product.findByIdAndDelete(id);

  return NextResponse.json({ message: "Product deleted" });
}