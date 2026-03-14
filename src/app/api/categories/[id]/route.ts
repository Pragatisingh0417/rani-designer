import { NextResponse } from "next/server";
import Category from "@/app/models/Category";
import { connectDB } from "@/app/lib/mongodb";

export async function PUT(req:Request,{params}:any){

await connectDB()

const { id } = await params

const body = await req.json()

const category = await Category.findByIdAndUpdate(
id,
body,
{new:true}
)

return NextResponse.json(category)

}

export async function DELETE(req:Request,{params}:any){

await connectDB()

const { id } = await params

await Category.findByIdAndDelete(id)

return NextResponse.json({message:"Deleted"})

}