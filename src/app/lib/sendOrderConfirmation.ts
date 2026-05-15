import { transporter } from "./mailer";

export const sendOrderConfirmation = async (
  email: string,
  order: any
) => {

  const itemsHtml = order.items
    .map(
      (item: any) => `
        <tr>
          <td style="padding:8px;">${item.name}</td>
          <td style="padding:8px;">${item.quantity}</td>
          <td style="padding:8px;">£${item.price}</td>
        </tr>
      `
    )
    .join("");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Order Has Been Placed Successfully ",

    html: `
      <div style="font-family:Arial;padding:20px;">

        <h2>Thank you for your order 💖</h2>

        <p>
          Hi ${order.customerName},
        </p>

        <p>
          Your order has been placed successfully.
        </p>

        <h3>Order Details</h3>

        <table border="1" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          <thead>
            <tr>
              <th style="padding:10px;">Product</th>
              <th style="padding:10px;">Qty</th>
              <th style="padding:10px;">Price</th>
            </tr>
          </thead>

          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <h3 style="margin-top:20px;">
          Total: £${order.total}
        </h3>

        <p>
          Payment Method:
          <b>${order.paymentMethod}</b>
        </p>

        <p>
          Shipping Address:
          <br/>
          ${order.shippingAddress.address},
          ${order.shippingAddress.city},
          ${order.shippingAddress.pincode}
        </p>

        <br/>

        <p>
          Thank you for shopping with Rani Designer ✨
        </p>

      </div>
    `,
  });
};