"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const deleteProduct = async (id: any) => {

    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };


  const toggleStatus = async (product: any) => {

    await fetch(`/api/products/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isActive: !product.isActive
      })
    })

    fetchProducts()

  }


  const toggleFeatured = async (product: any) => {

    await fetch(`/api/products/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isFeatured: !product.isFeatured
      })
    })

    fetchProducts()

  }
  return (
    <div>

     <div className="flex items-center justify-between mb-4">

<h1 className="text-3xl font-semibold">
Products
</h1>

<Link
href="/admin/products/add"
className="bg-black text-white px-4 py-2 rounded"
>
Add Product
</Link>

</div>

<div className="flex gap-4 mb-6">

<input
type="text"
placeholder="Search products..."
className="border px-3 py-2 w-72 rounded"
/>

<select className="border px-3 py-2 rounded">
<option>Status</option>
<option>Active</option>
<option>Hidden</option>
</select>

<select className="border px-3 py-2 rounded">
<option>Featured</option>
<option>Not Featured</option>
</select>

</div>



<table className="w-full bg-white border rounded overflow-hidden">
      <thead className="bg-gray-100">
<tr>
<th className="p-3 text-left">Image</th>
<th className="text-left">Name</th>
<th>Price</th>
<th>Stock</th>
<th>Status</th>
<th>Featured</th>
<th>Actions</th>
</tr>
</thead>


        <tbody>

          {products.map((p: any) => (
<tr key={p._id} className="border-b">

<td className="p-3">
<img
src={p.images?.[0] || "/placeholder.png"}
className="w-14 h-14 object-cover rounded border"
/>
</td>

<td className="p-3">{p.name}</td>

<td>£{p.price}</td>

<td>{p.stock}</td>

<td>
<button
onClick={()=>toggleStatus(p)}
className={`px-3 py-1 text-xs rounded font-medium
${p.isActive ? "bg-green-500 text-white":"bg-gray-400 text-white"}
`}
>
{p.isActive ? "Active":"Hidden"}
</button>
</td>

<td>
<button
onClick={()=>toggleFeatured(p)}
className={`px-2 py-1 text-xs rounded
${p.isFeatured ? "bg-yellow-500":"bg-gray-300"}
`}
>
{p.isFeatured ? "Featured":"No"}
</button>
</td>

<td className="space-x-4">

<Link
href={`/products/${p.slug}`}
className="text-green-600"
>
View
</Link>

<Link
href={`/admin/products/edit/${p._id}`}
className="text-blue-600"
>
Edit
</Link>

<button
onClick={()=>deleteProduct(p._id)}
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