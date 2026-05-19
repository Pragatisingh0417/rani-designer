import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/models/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find({});

    // 💰 Total Revenue
    const paidOrders = orders.filter(
      (order) =>
        order.isPaid &&
        order.status !== "Cancelled"
    );

    const totalRevenue = paidOrders.reduce(
      (acc, order) => acc + (order.total || 0),
      0
    );

    const totalOrders = orders.filter(
      (o) => o.status !== "Cancelled"
    ).length;

    const paidOrdersCount = orders.filter(
  (o) =>
    o.isPaid &&
    o.status !== "Cancelled"
).length;

const codOrders = orders.filter(
  (o) =>
    o.paymentMethod === "COD" &&
    o.status !== "Cancelled"
).length;

const cancelledOrders = orders.filter(
  (o) => o.status === "Cancelled"
).length;


    // 📊 Monthly revenue
    const monthlyMap: any = {};

    paidOrders.forEach((order) => {
      const date = new Date(order.createdAt);
      const month = date.toLocaleString("default", { month: "short" });

      if (!monthlyMap[month]) {
        monthlyMap[month] = 0;
      }

      monthlyMap[month] += order.total || 0;
    });

    const monthsOrder = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthlyRevenue = monthsOrder.map((m) => ({
      name: m,
      revenue: monthlyMap[m] || 0,
    }));

    // 📈 Growth (last 2 months)
    const currentMonth = monthlyRevenue[new Date().getMonth()].revenue;
    const lastMonth =
      monthlyRevenue[new Date().getMonth() - 1]?.revenue || 0;

    const growth =
      lastMonth === 0
        ? 100
        : ((currentMonth - lastMonth) / lastMonth) * 100;

    // 🛍️ Top Products
    const productMap: any = {};

    paidOrders.forEach((order) => {
      order.items?.forEach((item: any) => {
        if
          (!productMap[item.productId]) {
          productMap[item.productId] = {
            productId: item.productId,
            name: item.name,
            image: item.image || item.images?.[0] || "", // ✅ FIX
            sales: 0,
          };
        }

        productMap[item.productId].sales += item.quantity;
      });
    });

    const topProducts = Object.values(productMap)
      .sort((a: any, b: any) => b.sales - a.sales)
      .slice(0, 5);

    return NextResponse.json({

  totalRevenue,

  totalOrders,

  paidOrders: paidOrdersCount,

  codOrders,

  cancelledOrders,

  totalVisitors: 1200,

  growth: Math.round(growth),

  monthlyRevenue,

  topProducts,
});

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}