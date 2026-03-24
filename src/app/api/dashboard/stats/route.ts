import { NextResponse } from "next/server";
import Order from "@/app/models/Order";
import Product from "@/app/models/Product";
import { connectDB } from "@/app/lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    // 🔹 Total Revenue
    const revenueResult = await Order.aggregate([
      { $match: { status: "Delivered" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
        },
      },
    ]);

    const totalRevenue: number = revenueResult[0]?.total || 0;

    // 🔹 Total Orders
    const totalOrders = await Order.countDocuments();

    // 🔹 Visitors
    const totalVisitors = 1200;

    // 🔥 Top Products
    const products = await Product.find()
      .sort({ sales: -1 })
      .limit(4);

    const topProducts = products.map((p: any) => ({
      _id: p._id,
      name: p.name,
      sales: p.sales,
      image: p.images?.[0] || null,
    }));

    // 🔥 Growth (FIXED)
    const lastMonthRevenue: number = 50000; // temporary

    const growth =
      lastMonthRevenue === 0
        ? 0
        : ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;

    return NextResponse.json({
      totalRevenue,
      totalOrders,
      totalVisitors,
      topProducts,
      growth: Number(growth.toFixed(1)),
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching dashboard" },
      { status: 500 }
    );
  }
}