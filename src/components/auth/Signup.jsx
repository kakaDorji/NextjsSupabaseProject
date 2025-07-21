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
export const Signup =() => {
  const handleSignup=async(e)=>{
    e.preventDefault();
    const email=e.target.email?.value;
    const password=e.target.password?.value;
    
    if(!email || !password){
      toast.error("Please enter email and password");
      return;
    }
    
    const {data,error}=await client.auth.signUp({
      email,
      password
    });
    
    if (data) {
  toast.success("Signup successful. Please check your email to confirm.");
} else {
  toast.error(error?.message || "Unable to signup, please try again.");
}
  }


  return (
    <Card >
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Enter email and password to signup</CardDescription>
      </CardHeader>
      <CardContent>
       <form onSubmit={handleSignup}>
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

            <Button type="submit" className='w-full'>Signup</Button>
        </div>

       </form>


    </CardContent>

      
    </Card>
  )
}
export default Signup;