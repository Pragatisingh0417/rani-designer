import { transporter } from "@/app/lib/mailer";

export const sendStatusMail = async (
  customerEmail: string,
  customerName: string,
  status: string,
  order: any
) => {

  // ✅ PRODUCTS HTML
  const productsHtml = order.items
    ?.map(
      (item: any) => `
      <tr>
        <td style="padding:10px;border:1px solid #eee;">
          ${item.name}
        </td>

        <td style="padding:10px;border:1px solid #eee;text-align:center;">
          ${item.quantity}
        </td>

        <td style="padding:10px;border:1px solid #eee;text-align:right;">
          £${item.price}
        </td>
      </tr>
    `
    )
    .join("");

  let subject = "";
  let heading = "";
  let description = "";

  // ✅ CONFIRMED
  if (status === "Confirmed") {
    subject = "Your Order Has Been Confirmed ✨";
    heading = "Order Confirmed";
    description =
      "Your order has been confirmed successfully.";
  }

  // ✅ SHIPPED
  if (status === "Shipped") {
    subject = "Your Order Has Been Shipped 🚚";
    heading = "Order Shipped";
    description =
      "Your order is now on the way.";
  }

  // ✅ DELIVERED
  if (status === "Delivered") {
    subject = "Order Delivered Successfully 💖";
    heading = "Order Delivered";
    description =
      "Your order has been delivered successfully.";
  }

  // ✅ CANCELLED
  if (status === "Cancelled") {
    subject = "Your Order Has Been Cancelled";
    heading = "Order Cancelled";
    description =
      "Your order has been cancelled.";
  }

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: customerEmail,

    subject,

    html: `
      <div style="font-family:Arial;padding:20px;max-width:700px;margin:auto;">

        <h2>${heading}</h2>

        <p>Hi ${customerName},</p>

        <p>${description}</p>

        <p>
          <strong>Order ID:</strong>
          ${order._id}
        </p>

        <table
          style="
            width:100%;
            border-collapse:collapse;
            margin-top:20px;
          "
        >
          <thead>
            <tr style="background:#f5f5f5;">
              <th style="padding:10px;border:1px solid #eee;text-align:left;">
                Product
              </th>

              <th style="padding:10px;border:1px solid #eee;">
                Qty
              </th>

              <th style="padding:10px;border:1px solid #eee;text-align:right;">
                Price
              </th>
            </tr>
          </thead>

          <tbody>
            ${productsHtml}
          </tbody>
        </table>

        <div style="margin-top:20px;text-align:right;">
          <h3>Total: £${order.total}</h3>
        </div>

        <div
          style="
            margin-top:30px;
            padding-top:20px;
            border-top:1px solid #eee;
            font-size:14px;
            color:#666;
          "
        >
          Thank you for shopping with us 💖
        </div>

      </div>
    `,
  });
};