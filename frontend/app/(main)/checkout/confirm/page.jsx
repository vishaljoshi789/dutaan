import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center flex-col gap-10 p-10">
      <Image src="/images/remove.png" width={100} height={100} alt="image" />
      <span className="text-xl font-bold">Order Placed Successfully</span>
    </div>
  );
}
