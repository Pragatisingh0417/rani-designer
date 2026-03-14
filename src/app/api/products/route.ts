import { NextResponse } from "next/server";
import Product from "@/app/models/Product";
import { connectDB } from "@/app/lib/mongodb";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {

  await connectDB();

  const products = await Product.find().populate("category");

  return NextResponse.json(products);
}

export async function POST(req: Request) {

  await connectDB();

  const data = await req.json();

  // auto generate slug
  data.slug = generateSlug(data.name);

  const product = await Product.create(data);

  return NextResponse.json(product);
}