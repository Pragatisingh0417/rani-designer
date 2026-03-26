import mongoose from "mongoose";

const DesignerChoiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true, // ✅ correct
  }
);

export default mongoose.models.DesignerChoice ||
  mongoose.model("DesignerChoice", DesignerChoiceSchema);