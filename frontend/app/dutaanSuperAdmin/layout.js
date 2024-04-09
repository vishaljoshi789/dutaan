import { Inter } from "next/font/google";
import "@/app/globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      
      <body className={inter.className}>
        <AuthProvider>
          <Navbar/>
          <main className=" bg-[#F5f5dc] w-full">{children}</main>
          <Toaster richColors/>
        </AuthProvider>
      </body>
    </html>
  );
}