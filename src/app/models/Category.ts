import mongoose from "mongoose";

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const CategorySchema = new mongoose.Schema({

  name: {
    type: String,
  },

  slug: {
    type: String,
    unique: true
  },

  image: {
    type: String   // 👈 NEW FIELD
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

/* AUTO SLUG BEFORE SAVE */
CategorySchema.pre("save", async function () {

  if (!this.slug && this.name) {

    let baseSlug = this.name
      .toLowerCase()
      .replace(/\s+/g, "-");

    let slug = baseSlug;
    let count = 1;

    // ✅ FIX: always get model safely
    const Category =
      mongoose.models.Category ||
      mongoose.model("Category", CategorySchema);

    while (await Category.findOne({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    this.slug = slug;
  }

});

export default mongoose.models.Category ||
mongoose.model("Category", CategorySchema);