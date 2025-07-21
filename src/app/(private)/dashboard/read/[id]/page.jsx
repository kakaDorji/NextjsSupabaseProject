import { toast } from "sonner";
import client from "@/api/client";
import { notFound } from "next/navigation";
const SingleBlogPage = async({ params }) => {
    //pull the id out of params
    const {id}=await params;



    //fetch the specific blo using id
    const {data:blog,error}=await client.from('blogs').select("*").eq('id',id).single();

    //handle not found case
    if(error || !blog){
        //...stop and show the 404 page
        notFound();
    }

       
    return (
      <div className="mt-[120px] max-w-3xl mx-auto px-6 py-8 bg-white shadow-md rounded-lg">
    {/* Main Title of the Blog Post */}
    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
        {blog.title}
    </h1>

    {/* Metadata - like publish date or author */}
    <p className="text-sm text-gray-500 mb-8">
        Post ID: {id}
    </p>

    {/* The main content of the blog */}
    <div className="text-sm text-gray-700 leading-relaxed space-y-6">
        {/* We wrap content in a div to apply spacing to paragraphs inside */}
        <p>{blog.content}</p>
    </div>
    
</div>
    );
};

export default SingleBlogPage;