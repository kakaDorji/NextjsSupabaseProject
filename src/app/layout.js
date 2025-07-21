"use client";
import "./globals.css";
import { AuthProvider } from "../components/context/AuthProvider";
import { Toaster } from "sonner";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
       
      >
        <AuthProvider>
              {children}
        </AuthProvider>
        <Toaster />

      
      </body>
    </html>
  );
}
