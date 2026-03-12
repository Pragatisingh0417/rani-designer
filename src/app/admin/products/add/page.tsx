"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    salePrice: "",
    shortDescription: "",
    longDescription: "",
    stock: "",
  });

  const handleSubmit = async (e:any) => {

    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    router.push("/admin/products");
  };

  return (
    <div className="max-w-xl mx-auto">

      <h1 className="text-2xl mb-6">
        Add Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input placeholder="Name" className="border p-2 w-full"
        onChange={(e)=>setForm({...form,name:e.target.value})} />

        <input placeholder="Slug" className="border p-2 w-full"
        onChange={(e)=>setForm({...form,slug:e.target.value})} />

        <input placeholder="Price (£)" className="border p-2 w-full"
        onChange={(e)=>setForm({...form,price:e.target.value})} />

        <input placeholder="Sale Price (£)" className="border p-2 w-full"
        onChange={(e)=>setForm({...form,salePrice:e.target.value})} />

        <textarea placeholder="Short Description"
        className="border p-2 w-full"
        onChange={(e)=>setForm({...form,shortDescription:e.target.value})} />

        <textarea placeholder="Long Description"
        className="border p-2 w-full"
        onChange={(e)=>setForm({...form,longDescription:e.target.value})} />

        <input placeholder="Stock" className="border p-2 w-full"
        onChange={(e)=>setForm({...form,stock:e.target.value})} />

        <button className="bg-black text-white px-6 py-2">
          Add Product
        </button>

      </form>

    </div>
  );
}