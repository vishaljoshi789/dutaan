import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div>
      <a
        className="card p-5 flex flex-col gap-5 items-center w-11/12 m-auto md:w-1/2 lg:1/4 shadow-lg my-5 hover:bg-[#F5f5dc]"
        href="/dutaanSuperAdmin/users/"
      >
        <Image
          width={100}
          height={50}
          src="/images/multiple-users.png"
          alt="users"
        />
        <span className="font-bold text-xl">Users</span>
      </a>
      <a
        className="card p-5 flex flex-col gap-5 items-center w-11/12 m-auto md:w-1/2 lg:1/4 shadow-lg my-5 hover:bg-[#F5f5dc]"
        href="/dutaanSuperAdmin/products/"
      >
        <Image width={100} height={50} src="/images/cubes.png" alt="products" />
        <span className="font-bold text-xl">Products</span>
      </a>
    </div>
  );
}
