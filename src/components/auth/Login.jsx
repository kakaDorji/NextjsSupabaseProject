"use client";
import React from 'react'
import {
  Card,
  CardHeader,   
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import client from '../../api/client';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Toaster,toast } from 'sonner';

export const Login =() => {
  // const handleLogin=async(e)=>{
  //   e.preventDefault();
  //   const email=e.target.email?.value;
  //   const password=e.target.password?.value;
  //   console.log(email,password);
  //   if(!email || !password){
  //     toast.error("Please enter email and password");
  //     return;
  //   }
    
  //   const {data,error}=await client.auth.signInWithPassword({
  //     email,
  //     password
  //   });
    
  //   if(data){
  //     toast.success("Login successful");
  //   }else{
  //     toast.error("unable to login please try again ");
  //   }
  // }

const handleLogin = async (e) => {
  e.preventDefault();
  const email = e.target.email?.value;
  const password = e.target.password?.value;
  
  if (!email || !password) {
    toast.error("Please enter email and password");
    return;
  }
  
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    toast.error(error.message);
  } else {
    toast.success("Login successful");
  e.target.reset();

  }
};

  return (
    <Card >
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter email and password to login</CardDescription>
      </CardHeader>
      <CardContent>
       <form onSubmit={handleLogin}>
        <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
            
                <Label>Email</Label>
                <Input name="email" id="email" placeholder="karma@gmail.com" type="email"
                required
                />
              
            </div>


             <div className='grid gap-2'>
              
                <Label>Password</Label>
                <Input id="password" placeholder="password" name="password" type="password"
                required
                />
              
            </div>

            <Button type="submit" className='w-full'>Login</Button>
        </div>

       </form>


    </CardContent>

      
    </Card>
  )
}
export default Login;