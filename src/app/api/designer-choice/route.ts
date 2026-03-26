import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import DesignerChoice from "@/app/models/DesignerChoice";

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ✅ GET ALL */
export async function GET() {
  await connectDB();

  const data = await DesignerChoice.find().sort({ createdAt: 1 });
    console.log("GET DATA 👉", data); // ✅ ADD THIS


  return NextResponse.json(data);
}

/* ✅ CREATE */
export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const newItem = await DesignerChoice.create({
    name: body.name,
    slug: generateSlug(body.name),
    image: body.image,
  });

  return NextResponse.json(newItem);
}