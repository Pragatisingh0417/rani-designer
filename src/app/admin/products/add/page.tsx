"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {

  const router = useRouter();

  const [form, setForm] = useState<any>({
    name: "",
    price: "",
    salePrice: "",
    shortDescription: "",
    longDescription: "",
    stock: "",
    stone: "",
    category: "",
    sku: "",
    designerChoices: [], // ✅ ADD THIS

    isOnSale: false,
    isActive: true
  });

  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [designerChoices, setDesignerChoices] = useState([]);

  /* HANDLE CHANGE */
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  /* SUBMIT */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (form.isOnSale && Number(form.salePrice) >= Number(form.price)) {
      alert("Sale price must be less than original price");
      return;
    }

    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,

        price: Number(form.price),
        salePrice: Number(form.salePrice || 0),
        stock: Number(form.stock),

        // ✅ AUTO SALE
        isOnSale: Number(form.salePrice) > 0,

        isActive: Boolean(form.isActive),

        designerChoices: form.designerChoices || [], // ✅ IMPORTANT


        shortDescription: form.shortDescription || "",
        images
      })
    });

    router.push("/admin/products");
  };

  /* IMAGE UPLOAD */
  const uploadImage = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/uploads", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setImages((prev) => [...prev, data.url]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  /* FETCH CATEGORY */
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);



  useEffect(() => {
    fetch("/api/designer-choice")
      .then(res => res.json())
      .then(setDesignerChoices);
  }, []);


  return (

    <div className="max-w-6xl mx-auto">

      <h1 className="text-3xl font-semibold mb-8">
        Add Product
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="col-span-2 space-y-6">

          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              name="name"
              className="border p-3 w-full rounded"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Short Description (optional)
            </label>
            <textarea
              name="shortDescription"
              className="border p-3 w-full rounded"
              rows={3}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Long Description</label>
            <textarea
              name="longDescription"
              className="border p-3 w-full rounded"
              rows={6}
              onChange={handleChange}
              required
            />
          </div>

          {/* IMAGES */}
          <div>
            <label className="block mb-2 font-medium">Product Images</label>

            <input type="file" onChange={uploadImage} />

            <div className="flex gap-3 mt-4 flex-wrap">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* PRICING */}
          <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg">Pricing</h3>

            <input
              name="price"
              placeholder="Original Price (£)"
              className="border p-3 w-full rounded-lg"
              onChange={handleChange}
              required
            />

            {/* TOGGLE */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">On Sale</span>

              <button
                type="button"
                onClick={() =>
                  setForm((prev: any) => ({
                    ...prev,
                    isOnSale: !prev.isOnSale,
                    salePrice: prev.isOnSale ? "" : prev.salePrice
                  }))
                }
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${form.isOnSale ? "bg-red-500" : "bg-gray-300"
                  }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow transform transition ${form.isOnSale ? "translate-x-6" : ""
                    }`}
                />
              </button>
            </div>

            <input
              name="salePrice"
              placeholder="Sale Price (£)"
              className="border p-3 w-full rounded-lg"
              onChange={(e) => {
                const value = e.target.value;

                setForm({
                  ...form,
                  salePrice: value,
                  isOnSale: Number(value) > 0
                });
              }}


            />

            {/* DISCOUNT */}
            {form.isOnSale && form.price && form.salePrice && (
              <p className="text-green-600 text-sm font-medium">
                Discount: {Math.round(((Number(form.price) - Number(form.salePrice)) / Number(form.price)) * 100)}%
              </p>
            )}
          </div>

          {/* INVENTORY */}
          <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg">Inventory</h3>

            <input
              name="stock"
              placeholder="Stock Quantity"
              type="number"
              className="border p-3 w-full rounded-lg"
              onChange={handleChange}
              required
            />

            <div className="text-sm font-medium">
              {Number(form.stock) > 0 ? "In Stock ✅" : "Out of Stock ❌"}
            </div>
          </div>

          {/* DETAILS */}
          <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg">Product Details</h3>

            <input
              name="stone"
              placeholder="Stone"
              className="border p-3 w-full rounded-lg"
              onChange={handleChange}
            />

            <input
              name="sku"
              placeholder="SKU (e.g. RN-001)"
              className="border p-3 w-full rounded-lg"
              onChange={handleChange}
            />
          </div>

          {/* CATEGORY */}
          <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg">Category</h3>

            <select
              name="category"
              className="border p-3 w-full rounded-lg"
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((c: any) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>


          <div className="bg-white border rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-lg">Designer Choice</h3>

            <div className="space-y-2 max-h-40 overflow-y-auto">

              {designerChoices.map((dc: any) => (
                <label key={dc._id} className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    value={dc._id}
                    checked={form.designerChoices.includes(dc._id)} // ✅ ADD THIS
                    onChange={(e) => {
                      const value = e.target.value;

                      setForm((prev: any) => {
                        if (e.target.checked) {
                          return {
                            ...prev,
                            designerChoices: [...(prev.designerChoices || []), value]
                          };
                        } else {
                          return {
                            ...prev,
                            designerChoices: prev.designerChoices.filter((id: string) => id !== value)
                          };
                        }
                      });
                    }}
                  />

                  {dc.name}

                </label>
              ))}

            </div>
          </div>
          {/* STATUS */}
          <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg">Status</h3>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {form.isActive ? "Active (Visible)" : "Hidden"}
              </span>

              <button
                type="button"
                onClick={() => setForm({ ...form, isActive: !form.isActive })}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${form.isActive ? "bg-green-600" : "bg-gray-300"
                  }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow transform transition ${form.isActive ? "translate-x-6" : ""
                    }`}
                />
              </button>
            </div>
          </div>



          <button
            className="w-full bg-red-500 hover:bg-blue-900 text-white py-3 rounded-xl mt-4 transition font-medium"
          >
            Save Product
          </button>

        </div>

      </form>

    </div>
  );
}