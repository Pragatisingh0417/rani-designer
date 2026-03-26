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

export async function PUT(req: Request, { params }: any) {
  await connectDB();

  const { id } = await params;
  const body = await req.json();

  const updated = await DesignerChoice.findByIdAndUpdate(
    id,
    {
      name: body.name,
      slug: generateSlug(body.name), // ✅ FIX
      image: body.image,
    },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: any) {
  await connectDB();

  const { id } = await params;

  await DesignerChoice.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted" });
}