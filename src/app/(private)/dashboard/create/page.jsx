"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";
import client from "@/api/client";
import { useRouter, useSearchParams } from "next/navigation";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogId, setBlogId] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Pre-fill form if query params exist
  useEffect(() => {
  const idParam = searchParams.get("id");
  if (idParam) {
    setBlogId(idParam);
    // fetch blog data by idParam
    client
      .from("blogs")
      .select("title, content")
      .eq("id", idParam)
      .single()
      .then(({ data, error }) => {
        if (!error && data) {
          setTitle(data.title);
          setContent(data.content);
        }
      });
  }
}, [searchParams]);

  

  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error("Please enter title and content");
      return;
    }

    if (blogId) {
      // Update existing blog
      const { error } = await client
        .from("blogs")
        .update({ title, content })
        .eq("id", blogId);

      if (!error) {
        toast.success("Blog updated successfully");
        router.push("/dashboard/read");
      } else {
        toast.error("Unable to update blog");
      }
    } else {
      // Create new blog
      const { error } = await client
        .from("blogs")
        .insert({ title, content });

      if (!error) {
        toast.success("Blog created successfully");
        setTitle("");
        setContent("");
        router.push("/dashboard/read");
      } else {
        toast.error("Unable to create blog");
      }
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-9 mt-[120px]">
        <h1 className="text-2xl font-bold mb-4">
          {blogId ? "Edit Blog" : "Create New Blog"}
        </h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="content" className="mb-2">
              Content
            </Label>
            <Textarea
              id="content"
              placeholder="Write your blog content here..."
              value={content}
              rows={6}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button
  onClick={handleSubmit}
  className={blogId ? "bg-blue-600 text-white px-4 py-2 rounded" : "bg-green-600 text-white px-4 py-2 rounded"}
>
  {blogId ? "Update Blog" : "Create Blog"}
</Button>

        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Create;
