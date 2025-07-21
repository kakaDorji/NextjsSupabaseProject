"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../../hooks/useAuth'; // Adjust path if needed
import { Button } from '../../../components/ui/button'; // Adjust path if needed
import client from '../../../api/client'; // Adjust path if needed

// A layout function MUST accept { children }
const DashboardLayout = ({ children }) => {
  const route = useRouter();
  const { user, loading } = useAuth();

  // This auth check protects ALL pages inside the dashboard folder
  useEffect(() => {
    if (!loading && !user) {
      route.push('/'); // Redirect to login if not authenticated
    }
  }, [loading, user, route]);

  const handleLogout = async () => {
    await client.auth.signOut();
    route.push("/");
  };

  // While checking for a user, show a loading message
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If a user exists, show the shared layout and the page content
  if (user) {
    return (
      <div className="min-h-screen bg-slate-50">
  <header className="fixed top-0 left-0 right-0 z-50 bg-blue-50 px-6 py-4 shadow-sm border-b min-h-[60px] flex flex-col md:flex-row items-center justify-between gap-4">
  <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
     karso
  </h1>

  <div className="flex space-x-3">
    <Button variant="destructive"
     onClick={handleLogout} className="cursor-pointer bg-red-500 text-white hover:bg-red-600">
      Logout
    </Button>
    <Button variant="outline" onClick={() => route.back()} className="cursor-pointer bg-black text-white hover:bg-black-600">
      Back
    </Button>
  </div>
</header>


        <main className="p-8">
          {children} {/* THIS IS THE MOST IMPORTANT PART */}
        </main>
      </div>
    );
  }

  // If not loading and no user, the redirect is happening, so show nothing
  return null;
};

export default DashboardLayout;