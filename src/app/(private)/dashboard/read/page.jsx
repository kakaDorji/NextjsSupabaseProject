"use client";
import React,{useEffect,useState} from "react";
import client from "@/api/client";
import Auth from "@/components/auth/Auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

const AllBlogsPage= () => {
    const [blogs,setBlogs]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
       const fetchBlogs=async()=>{
           try{
             const {data,error}=await client.from("blogs").select("*").order("created_at", { ascending: false });//order by date
             if(!error){
                setBlogs(data);
                setLoading(false);
             }
         

           }
           catch(error){
            console.log("error fetching blogs:",error.message);
           }
           finally{
            setLoading(false);
           }
       };
       fetchBlogs();

    },[]);

    if(loading){
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>loading blogs...</p>
            </div>
        );
    }

    if(!blogs.length){
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>No blogs found</p>
            </div>
        );
    }

    const handleDelete=async(blogId)=>{
        try{
            await client.from("blogs").delete().eq("id",blogId);
            setBlogs(blogs.filter((blog)=>blog.id!==blogId));
            toast.success("Blog deleted successfully");
        }
        catch(error){
            console.log("error deleting blog:",error.message);
        }
    }
    return(
        <div className="max-w-4xl mx-auto py-12 px-4 mt-[60px]">
              <h1 className="text-3xl font-bold mb-8">All Blogs</h1>
            
              {
                blogs.map((blog)=>(
                    <div key={blog.id} className="mb-8 p-6 rounded-lg shadow hover:shadow-lg
                    transition
                    ">
                    
                    <h2 className="text-2xl font-semibold mb-2">{
                        blog.title
                        }</h2>


                        <p className="text-gray-800 line-clamp-3">
                            {blog.content.length>50 ?blog.content.slice(0,50)+"...":blog.content}
                        </p>
                         <p className="text-gray-600 text-sm mb-2">
            Posted on: {new Date(blog.created_at).toLocaleDateString()}
          </p>


                        <div className="flex justify-between mb-4">
  <div>
   <Link
  href={{
    pathname: "/dashboard/create",
    query: {
      id: blog.id,
    
    },
  }}
>
  <Button className="bg-blue-500 text-white hover:bg-red-600">Edit</Button>
</Link>

  </div>
  <div>
    <Button onClick={()=>handleDelete(blog.id)} className="bg-red-500  text-white hover:bg-red-600">Delete</Button>
  </div>
</div>



<Link href={`/dashboard/read/${blog.id}`} className="text-blue-600 hover:underline">View Blog</Link>

                    </div>
                ))
              }

        </div>
    )


  
}

export default AllBlogsPage