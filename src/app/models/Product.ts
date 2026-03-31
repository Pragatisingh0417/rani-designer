import mongoose from "mongoose";
import { CallbackWithoutResultAndOptionalError } from "mongoose";


const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    slug: { type: String, required: true },

    price: { type: Number, required: true },

    salePrice: Number,

    shortDescription: String,
    longDescription: String,

    images: [String],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,   // ✅ FIXED
      default: null,     // ✅ IMPORTANT
    },

    stock: {
      type: Number,
      default: 0,
    },

    material: String,
    stone: String,

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    designerChoices: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "DesignerChoice",
      default: [],   // ✅ better
    },
  },
  { timestamps: true }
);


// ✅ 👉 ADD THIS HERE (AFTER schema, BEFORE export)
ProductSchema.pre("save", function (this: any) {
  const hasCategory = !!this.category;
  const hasDesigner = this.designerChoices && this.designerChoices.length > 0;

  if (!hasCategory && !hasDesigner) {
    throw new Error("Product must have either category or designer choice");
  }

  if (hasCategory && hasDesigner) {
    throw new Error("Product cannot have both category and designer choice");
  }
});


// ✅ export
export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);