"use client";
import useAxios from "@/app/hooks/useAxios";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function page() {
  let api = useAxios();
  let clearCart = async () => {
    let response = await api.post("/clearCart/");
    if (response.status == 200) {
      toast.success("Order Placed!!!");
    }
  };
  useEffect(() => {
    clearCart();
  }, []);
  return (
    <div className="font-[sans-serif] bg-white p-6">
      <div className="max-w-4xl mx-auto w-full">
        <div>
          <h2 className="text-2xl font-extrabold text-[#333] inline-block">
            Checkout
          </h2>
        </div>
        <div className="flex items-start mt-12">
          <div className="w-full">
            <div className="flex items-center w-full">
              <div className="w-8 h-8 shrink-0 mx-[-1px] bg-[#333] p-1.5 flex items-center justify-center rounded-full">
                <span className="text-base text-white font-bold">1</span>
              </div>
              <div className="w-full h-[3px] mx-4 rounded-lg bg-[#333]"></div>
            </div>
            <div className="mt-2 mr-4 max-sm:hidden">
              <h6 className="text-base font-bold text-[#333]">Shipping</h6>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-center w-full">
              <div className="w-8 h-8 shrink-0 mx-[-1px] bg-[#333] p-1.5 flex items-center justify-center rounded-full">
                <span className="text-base text-white font-bold">2</span>
              </div>
              <div className="w-full h-[3px] mx-4 rounded-lg bg-[#333]"></div>
            </div>
            <div className="mt-2 mr-4 max-sm:hidden">
              <h6 className="text-base font-bold text-[#333]">Billing</h6>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-center w-full">
              <div className="w-8 h-8 shrink-0 mx-[-1px] bg-[#333] p-1.5 flex items-center justify-center rounded-full">
                <span className="text-base text-white font-bold">2</span>
              </div>
              <div className="w-full h-[3px] mx-4 rounded-lg bg-[#333]"></div>
            </div>
            <div className="mt-2 mr-4 max-sm:hidden">
              <h6 className="text-base font-bold text-[#333]">Confirm</h6>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <div className="w-8 h-8 shrink-0 mx-[-1px] bg-[#333] p-1.5 flex items-center justify-center rounded-full">
                <span className="text-base text-white font-bold">3</span>
              </div>
            </div>
            <div className="mt-2 max-sm:hidden">
              <h6 className="text-base font-bold text-[#333]">Finish</h6>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col gap-10 p-10">
          <Image
            src="/images/accept.png"
            width={100}
            height={100}
            alt="image"
          />
          <span className="text-sm md:text-xl font-bold w-screen text-center">
            Order Placed Successfully
          </span>
          <Link href="/orders">
            <Button>Check your Orders</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
