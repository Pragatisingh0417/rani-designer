"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProduct() {

  const router = useRouter();
  const params = useParams();

  const [product,setProduct] = useState<any>(null);

  useEffect(()=>{
    fetchProduct();
  },[]);

  const fetchProduct = async ()=>{

    const res = await fetch(`/api/products/${params.id}`);
    const data = await res.json();

    setProduct(data);
  };

  const handleSubmit = async (e:any)=>{

    e.preventDefault();

    await fetch(`/api/products/${params.id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(product)
    });

    router.push("/admin/products");
  };

  if(!product) return <p>Loading...</p>;

  return(

    <div className="max-w-xl">

      <h1 className="text-2xl mb-6">
        Edit Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          value={product.name}
          className="border p-2 w-full"
          onChange={(e)=>setProduct({...product,name:e.target.value})}
        />

        <input
          value={product.price}
          className="border p-2 w-full"
          onChange={(e)=>setProduct({...product,price:e.target.value})}
        />

        <textarea
          value={product.shortDescription}
          className="border p-2 w-full"
          onChange={(e)=>setProduct({...product,shortDescription:e.target.value})}
        />

        <button className="bg-black text-white px-6 py-2">
          Update Product
        </button>

      </form>

    </div>
  );
}