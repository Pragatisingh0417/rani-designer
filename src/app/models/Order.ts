import mongoose, { Schema, models } from "mongoose";

const OrderItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: String,
    price: Number,
    quantity: Number,
    image: String,
  },
  { _id: false }
);

const AddressSchema = new Schema(
  {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    // 👤 Customer Info
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: String,

    // 🛍️ Items
    items: [OrderItemSchema],

    // 💰 Pricing
    total: {
      type: Number,
      required: true,
    },

    // 💳 Payment
    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    stripeSessionId: {
      type: String,
    },
    stripePaymentIntentId: {
      type: String,
    },

    // 📦 Order Status
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    // 📍 Shipping Address
    shippingAddress: AddressSchema,
  },
  {
    timestamps: true,
  }
);

const Order = models.Order || mongoose.model("Order", OrderSchema);

export default Order;