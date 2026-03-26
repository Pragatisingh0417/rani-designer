"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function CategoriesPage() {

  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  /* IMAGE UPLOAD */
  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/uploads", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setImage(data.url);
  };

  /* ADD OR UPDATE */
 const handleSubmit = async (e: any) => {
  e.preventDefault();

  // ✅ VALIDATION
  if (!name.trim()) {
    alert("Category name is required");
    return;
  }

  if (!image) {
    alert("Please upload an image");
    return;
  }

  if (editingId) {
    await fetch(`/api/categories/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, image })
    });
  } else {
    await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, image })
    });
  }

  resetForm();
  fetchCategories();
};

  /* DELETE */
  const deleteCategory = async (id: string) => {

  if (!confirm("Delete category + ALL products?")) return;

  const res = await fetch(`/api/categories/${id}`, {
    method: "DELETE"
  });

  const data = await res.json();

  toast.success(data.message || "Deleted successfully");

  fetchCategories();
};

  /* EDIT CLICK */
  const editCategory = (category: any) => {
    setEditingId(category._id);
    setName(category.name);
    setImage(category.image);
  };

  /* RESET FORM */
  const resetForm = () => {
    setName("");
    setImage("");
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl">

      <h1 className="text-3xl font-semibold mb-6">
        Categories
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">

        <input
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 w-full"
        />

<label className="block border-2 border-dashed border-gray-400 p-6 text-center cursor-pointer hover:border-black transition">

  <p className="text-gray-600 font-medium">
    Click to upload image
  </p>

  <p className="text-sm text-gray-400">
    JPG, PNG supported
  </p>

  <input
    type="file"
    onChange={uploadImage}
    className="hidden"
  />
</label>
        {image && (
          <img
            src={image}
            className="w-20 h-20 object-cover rounded"
          />
        )}

        <div className="flex gap-3">
          <button className="bg-black text-white px-6 py-2">
            {editingId ? "Update Category" : "Add Category"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 px-6 py-2"
            >
              Cancel
            </button>
          )}
        </div>

      </form>

      {/* TABLE */}
      <table className="w-full border bg-white">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Image</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c: any) => (
            <tr key={c._id} className="border-t text-center">

              <td className="p-3">
                <img
                  src={c.image || "/placeholder.png"}
                  className="w-12 h-12 object-cover mx-auto rounded"
                />
              </td>

              <td>{c.name}</td>
              <td>{c.slug}</td>

              <td className="space-x-3">

                <button
                  onClick={() => editCategory(c)}
                  className="text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCategory(c._id)}
                  className="text-red-600"
                  
                >
                  Delete
                </button>
                

              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}