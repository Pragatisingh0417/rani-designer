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

  const deleteProduct = async (id:any) => {

    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  return (
    <div>

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-semibold">
          Products
        </h1>

        <Link
          href="/admin/products/add"
          className="bg-black text-white px-4 py-2"
        >
          Add Product
        </Link>

      </div>

      <table className="w-full bg-white border">

        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {products.map((p:any)=>(
            <tr key={p._id} className="border-b">

              <td className="p-3">{p.name}</td>
              <td>£{p.price}</td>
              <td>{p.stock}</td>

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