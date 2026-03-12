import { NextResponse } from "next/server";
import Product from "@/app/models/Product";
import { connectDB } from "@/app/lib/mongodb";

export async function GET() {

  await connectDB();

  const products = await Product.find().populate("category");

  return NextResponse.json(products);
}

export async function POST(req: Request) {

  await connectDB();

  const data = await req.json();

  const product = await Product.create(data);

  return NextResponse.json(product);
}