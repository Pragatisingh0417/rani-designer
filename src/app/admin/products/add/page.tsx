"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {

const router = useRouter();

const [form,setForm] = useState({
name:"",
price:"",
salePrice:"",
shortDescription:"",
longDescription:"",
stock:"",
material:"",
stone:"",
category:"",
isFeatured:false,
isActive:true
})

const handleChange = (e:any)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const handleSubmit = async(e:any)=>{
e.preventDefault()

await fetch("/api/products",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
...form,
images
})
})

router.push("/admin/products")
}

const [images, setImages] = useState<string[]>([]);

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

  console.log("Uploaded:", data);   // 👈 add this

  setImages((prev) => [...prev, data.url]);
  e.target.value = ""   // reset input

};

/* CATEGORY */

const [categories,setCategories] = useState<any[]>([]);

useEffect(()=>{

const fetchCategories = async()=>{

const res = await fetch("/api/categories");
const data = await res.json();

setCategories(data);

}

fetchCategories()

},[])

// remove image funtion
const removeImage = (index:number) => {

setImages((prev)=>prev.filter((_,i)=>i !== index))

}


return (

<div className="max-w-6xl mx-auto">

<h1 className="text-3xl font-semibold mb-8">
Add Product
</h1>

<form onSubmit={handleSubmit} className="grid grid-cols-3 gap-8">

{/* LEFT SIDE */}

<div className="col-span-2 space-y-6">

<div>
<label className="block mb-1 font-medium">
Product Name
</label>
<input
name="name"
className="border p-3 w-full rounded"
onChange={handleChange}
/>
</div>



<div>
<label className="block mb-1 font-medium">
Short Description
</label>
<textarea
name="shortDescription"
className="border p-3 w-full rounded"
rows={3}
onChange={handleChange}
/>
</div>

<div>
<label className="block mb-1 font-medium">
Long Description
</label>
<textarea
name="longDescription"
className="border p-3 w-full rounded"
rows={6}
onChange={handleChange}
/>
</div>

<div>

<label className="block mb-2 font-medium">
Product Images
</label>

<input type="file" onChange={uploadImage} />

<div className="flex gap-3 mt-4 flex-wrap">

{images.map((img,i)=>(
<div key={i} className="relative">

<img
src={img}
className="w-20 h-20 object-cover rounded border"
/>

<button
type="button"
onClick={()=>removeImage(i)}
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

<div className="bg-white border p-4 rounded space-y-4">

<h3 className="font-semibold">
Pricing
</h3>

<input
name="price"
placeholder="Price (£)"
className="border p-2 w-full rounded"
onChange={handleChange}
/>

<input
name="salePrice"
placeholder="Sale Price (£)"
className="border p-2 w-full rounded"
onChange={handleChange}
/>

</div>

{/* INVENTORY */}

<div className="bg-white border p-4 rounded space-y-4">

<h3 className="font-semibold">
Inventory
</h3>

<input
name="stock"
placeholder="Stock"
className="border p-2 w-full rounded"
onChange={handleChange}
/>

</div>

{/* PRODUCT DETAILS */}

<div className="bg-white border p-4 rounded space-y-4">

<h3 className="font-semibold">
Product Details
</h3>

<input
name="material"
placeholder="Material"
className="border p-2 w-full rounded"
onChange={handleChange}
/>

<input
name="stone"
placeholder="Stone"
className="border p-2 w-full rounded"
onChange={handleChange}
/>

</div>

{/* CATEGORY */}

<div className="bg-white border p-4 rounded space-y-4">

<h3 className="font-semibold">
Category
</h3>

<select
name="category"
className="border p-2 w-full rounded"
onChange={handleChange}
>

<option value="">Select Category</option>

{categories.map((c:any)=>(
<option key={c._id} value={c._id}>
{c.name}
</option>
))}

</select>

</div>

{/* SETTINGS */}

<div className="bg-white border p-4 rounded space-y-3">

<h3 className="font-semibold">
Settings
</h3>

<label className="flex items-center gap-2">
<input
type="checkbox"
onChange={(e)=>setForm({...form,isFeatured:e.target.checked})}
/>
Featured Product
</label>

<label className="flex items-center gap-2">
<input
type="checkbox"
defaultChecked
onChange={(e)=>setForm({...form,isActive:e.target.checked})}
/>
Active Product
</label>

</div>

<button
className="w-full bg-black text-white py-3 rounded mt-4"
>
Save Product
</button>

</div>

</form>

</div>

)
}