"use client";

import { useEffect,useState } from "react";

export default function CategoriesPage(){

const [categories,setCategories] = useState([])
const [name,setName] = useState("")
const [slug,setSlug] = useState("")

useEffect(()=>{
fetchCategories()
},[])

const fetchCategories = async()=>{

const res = await fetch("/api/categories")
const data = await res.json()

setCategories(data)

}

const addCategory = async(e:any)=>{

e.preventDefault()

await fetch("/api/categories",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name,
slug
})
})

setName("")
setSlug("")

fetchCategories()

}

const deleteCategory = async(id:any)=>{

await fetch(`/api/categories/${id}`,{
method:"DELETE"
})

fetchCategories()

}

return(

<div className="max-w-3xl">

<h1 className="text-3xl font-semibold mb-6">
Categories
</h1>

<form onSubmit={addCategory} className="flex gap-3 mb-6">

<input
placeholder="Category Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="border p-2 flex-1"
/>

<input
placeholder="Slug"
value={slug}
onChange={(e)=>setSlug(e.target.value)}
className="border p-2 flex-1"
/>

<button className="bg-black text-white px-4">
Add
</button>

</form>

<table className="w-full border bg-white">

<thead className="bg-gray-100">
<tr>
<th className="p-3 text-left">Name</th>
<th>Slug</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{categories.map((c:any)=>(
<tr key={c._id} className="border-t">

<td className="p-3">{c.name}</td>
<td>{c.slug}</td>

<td>

<button
onClick={()=>deleteCategory(c._id)}
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

)

}