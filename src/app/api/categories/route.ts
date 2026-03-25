import { NextResponse } from "next/server";
import Category from "@/app/models/Category";
import { connectDB } from "@/app/lib/mongodb";

export async function GET() {

  await connectDB();

  const categories = await Category.find().sort({ createdAt: 1 });

  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, image } = await req.json();

    if (!name || !image) {
      return NextResponse.json(
        { error: "Name and image are required" },
        { status: 400 }
      );
    }

    const category = await Category.create({ name, image });

    return NextResponse.json(category);

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(req: Request) {
  try {
    await connectDB();

    const data = await req.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return NextResponse.json(updatedCategory);

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // 👉 OPTIONAL: delete image from storage
    // if (category.imagePublicId) {
    //   await cloudinary.uploader.destroy(category.imagePublicId);
    // }

    await Category.findByIdAndDelete(id);

    return NextResponse.json({ message: "Category deleted" });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}