import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "sonner";

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
          <Navbar />
          <main className="  min-h-[100vh]">{children}</main>
          <Toaster richColors/>
        </AuthProvider>
      </body>
    </html>
  );
}
