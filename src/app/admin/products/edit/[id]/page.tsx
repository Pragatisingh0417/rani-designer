"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProduct() {

  const router = useRouter();
  const params = useParams();

  const [form,setForm] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [categories,setCategories] = useState<any[]>([]);

  /* FETCH PRODUCT */
  useEffect(()=>{
    fetchProduct();
    fetchCategories();
  },[]);

  const fetchProduct = async ()=>{
    const res = await fetch(`/api/products/${params.id}`);
    const data = await res.json();

    setForm({
      ...data,
      price: data.price || "",
      salePrice: data.salePrice || "",
      stock: data.stock || "",
    });

    setImages(data.images || []);
  };

  const fetchCategories = async()=>{
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  /* HANDLE CHANGE */
  const handleChange = (e:any)=>{
    const { name, value } = e.target;
    setForm({...form,[name]:value});
  };

  /* IMAGE UPLOAD */
  const uploadImage = async (e:any)=>{
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/uploads", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setImages((prev)=>[...prev,data.url]);
  };

  const removeImage = (index:number)=>{
    setImages((prev)=>prev.filter((_,i)=>i !== index));
  };

  /* SUBMIT */
  const handleSubmit = async (e:any)=>{
    e.preventDefault();

    // ✅ validation
    if (form.isOnSale && Number(form.salePrice) >= Number(form.price)) {
      alert("Sale price must be less than original price");
      return;
    }

    await fetch(`/api/products/${params.id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        ...form,
        price: Number(form.price),
        salePrice: Number(form.salePrice || 0),
        stock: Number(form.stock),
        images
      })
    });

    router.push("/admin/products");
  };

  if(!form) return <p>Loading...</p>;

  return(

    <div className="max-w-6xl mx-auto">

      <h1 className="text-3xl font-semibold mb-8">
        Edit Product
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="col-span-2 space-y-6">

          <input
            name="name"
            value={form.name}
            className="border p-3 w-full rounded"
            onChange={handleChange}
          />

          <textarea
            name="shortDescription"
            value={form.shortDescription}
            className="border p-3 w-full rounded"
            onChange={handleChange}
          />

          <textarea
            name="longDescription"
            value={form.longDescription}
            className="border p-3 w-full rounded"
            rows={6}
            onChange={handleChange}
          />

          {/* IMAGES */}
          <div>
            <input type="file" onChange={uploadImage} />

            <div className="flex gap-3 mt-4 flex-wrap">
              {images.map((img,i)=>(
                <div key={i} className="relative">
                  <img src={img} className="w-20 h-20 rounded border" />
                  <button
                    type="button"
                    onClick={()=>removeImage(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* PRICING */}
          <div className="bg-white border rounded-xl p-5 space-y-4">

            <input
              name="price"
              value={form.price}
              placeholder="Price"
              className="border p-2 w-full rounded"
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={()=>setForm({
                ...form,
                isOnSale: !form.isOnSale,
                salePrice: form.isOnSale ? "" : form.salePrice
              })}
              className={`w-12 h-6 rounded-full ${
                form.isOnSale ? "bg-red-500" : "bg-gray-300"
              }`}
            />

            <input
              name="salePrice"
              value={form.salePrice}
              disabled={!form.isOnSale}
              className="border p-2 w-full rounded"
              onChange={handleChange}
            />

          </div>

          {/* STOCK */}
          <div className="bg-white border rounded-xl p-5 space-y-4">

            <input
              name="stock"
              value={form.stock}
              type="number"
              className="border p-2 w-full rounded"
              onChange={handleChange}
            />

            <p>
              {Number(form.stock) > 0 ? "In Stock" : "Out of Stock"}
            </p>

          </div>

          {/* CATEGORY */}
          <select
            name="category"
            value={form.category}
            className="border p-2 w-full rounded"
            onChange={handleChange}
          >
            {categories.map((c:any)=>(
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* STATUS */}
          <button
            type="button"
            onClick={()=>setForm({...form,isActive:!form.isActive})}
            className={`w-12 h-6 rounded-full ${
              form.isActive ? "bg-green-500" : "bg-gray-300"
            }`}
          />

          <button className="w-full bg-black text-white py-3 rounded">
            Update Product
          </button>

        </div>

      </form>

    </div>
  );
}