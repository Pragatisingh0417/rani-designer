import { NextResponse } from "next/server";
import Category from "@/app/models/Category";
import { connectDB } from "@/app/lib/mongodb";

export async function POST(req: Request) {

  await connectDB();

  const { name } = await req.json();

  const category = await Category.create({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
  });

  return NextResponse.json(category);
}

export async function GET() {

  await connectDB();

  const categories = await Category.find();

  return NextResponse.json(categories);
}