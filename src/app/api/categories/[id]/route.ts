import { NextResponse } from "next/server";
import Category from "@/app/models/Category";
import { connectDB } from "@/app/lib/mongodb";

export async function PUT(req: Request, { params }: any) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const existingCategory = await Category.findById(id);

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // 👉 OPTIONAL (if using Cloudinary)
    // If image is changing → delete old image
    // if (body.image && existingCategory.imagePublicId) {
    //   await cloudinary.uploader.destroy(existingCategory.imagePublicId);
    // }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      body,
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


export async function DELETE(req: Request, { params }: any) {
  try {
    await connectDB();

    const { id } = await params;

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // 👉 OPTIONAL (Cloudinary cleanup)
    // if (category.imagePublicId) {
    //   await cloudinary.uploader.destroy(category.imagePublicId);
    // }

    await Category.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted successfully" });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}