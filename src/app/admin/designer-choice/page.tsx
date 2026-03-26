"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DesignerChoicePage() {

  const [designerChoices, setDesignerChoices] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchDesignerChoices();
  }, []);

  const fetchDesignerChoices = async () => {
    const res = await fetch("/api/designer-choice");
    const data = await res.json();
    setDesignerChoices(data);
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

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      if (editingId) {
        await fetch(`/api/designer-choice/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, image })
        });

        toast.success("Updated successfully ✏️");

      } else {
        await fetch("/api/designer-choice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, image })
        });

        toast.success("Added successfully ✅");
      }

      resetForm();
      fetchDesignerChoices();

    } catch (error) {
      toast.error("Something went wrong ❌");
    }
  };

  /* DELETE */
  const deleteChoice = async (id: string) => {

    if (!confirm("Delete this designer choice?")) return;

    try {
      const res = await fetch(`/api/designer-choice/${id}`, {
        method: "DELETE"
      });

      const data = await res.json();

      toast.success(data.message || "Deleted successfully 🗑️");

      fetchDesignerChoices();

    } catch (error) {
      toast.error("Delete failed ❌");
    }
  };

  /* EDIT */
  const editChoice = (item: any) => {
    setEditingId(item._id);
    setName(item.name);
    setImage(item.image);
  };

  /* RESET */
  const resetForm = () => {
    setName("");
    setImage("");
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl">

      <h1 className="text-3xl font-semibold mb-6">
        Designer Choice
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">

        <input
          placeholder="Designer Choice Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 w-full rounded"
        />

        <label className="block border-2 border-dashed border-gray-400 p-6 text-center cursor-pointer hover:border-black transition">
          <p className="text-gray-600 font-medium">
            Click to upload image
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
          <button className="bg-black text-white px-6 py-2 rounded">
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 px-6 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>

      </form>

      {/* TABLE */}
      <table className="w-full border bg-white">

        <thead className="bg-gray-100 text-black">
          <tr>
            <th className="p-3">Image</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {designerChoices.map((c: any) => (
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
                  onClick={() => editChoice(c)}
                  className="text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteChoice(c._id)}
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