import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Address from "@/app/models/Address";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } // ✅ FIXED TYPE
) {
  await connectDB();

  const { id } = await context.params; // ✅ MUST AWAIT

  console.log("Deleting ID:", id); // optional debug

  await Address.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}