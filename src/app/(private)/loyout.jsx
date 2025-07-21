"use client";
import React, { useEffect } from 'react'
//hooks :no need to rewrite the code again like passing and receigving prop right
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

 const PrivatePagesLayout = () => {

    const {user,loading}=useAuth();
    const router=useRouter();

    useEffect(()=>{
        if(!loading && !user){
            router.push("/");
        }
    },[])


    if(loading || !user){
        return null;
    }
  return (
    <div> PrivatePage</div>
  )
}

export default PrivatePagesLayout;