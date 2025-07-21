"use client";
import React from 'react'
import { Button } from '../../../components/ui/button';
import client from '../../../api/client';
import { useRouter } from 'next/navigation';
import useAuth from '../../../hooks/useAuth';
import { useEffect } from 'react';

 const Dashboard  = () => {
  const route=useRouter();
const {user,loading}=useAuth();

useEffect(() => {
    if (!loading && !user) {
      route.push('/'); // redirect to login if not logged in
    }
  }, [loading, user, route]);
  if(loading || !user){
    return null;
  }


 
  const goToCreateBlog = () => {
    route.push("/dashboard/create");
  };
const showBlog = () => {
    route.push("/dashboard/read");
  };

  return (
   <div className='flex flex-col items-center justify-center min-h-2/4 p-[20px] gap-6 mt-[120px]'>
  <h1 className="text-3xl text-gray-900">Dashboard</h1>

  <Button onClick={goToCreateBlog} className="bg-blue-600 text-white px-4 py-2 rounded">
    Create New Blog
  </Button>

  <Button onClick={showBlog} className="bg-green-600 text-white px-4 py-2 rounded">
    Show Blog
  </Button>
</div>

    
  )
}

export default Dashboard;
