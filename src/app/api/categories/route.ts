import { NextResponse } from "next/server";
import Category from "@/app/models/Category";
import { connectDB } from "@/app/lib/mongodb";

export async function GET(){

await connectDB()

const categories = await Category.find()

return NextResponse.json(categories)

}

export async function POST(req:Request){

await connectDB()

const data = await req.json()

const category = await Category.create(data)

return NextResponse.json(category)

}