"use client";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import  Auth  from "../components/auth/Auth";
import { useEffect } from "react";



export default function Home() {
  const {user,loading}=useAuth();
  const router=useRouter();

 useEffect(() => {
  if (!loading && user) {
    router.push("/dashboard");
  }
}, [loading, user,router]);
//
if(!loading && user) return null;
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
     {loading?<h1>loading...</h1>:<Auth />}

    </div>
  );
}
