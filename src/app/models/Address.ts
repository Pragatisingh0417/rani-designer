import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    fullName: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,
  },
  { timestamps: true }
);

export default mongoose.models.Address ||
  mongoose.model("Address", AddressSchema);