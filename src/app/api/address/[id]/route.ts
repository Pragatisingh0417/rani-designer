import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Address from "@/app/models/Address";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } 
) {
  await connectDB();

  const { id } = await context.params; 

  console.log("Deleting ID:", id); 

  await Address.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}