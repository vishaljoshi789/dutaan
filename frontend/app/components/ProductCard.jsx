import React from "react";
import { Separator } from "@/components/ui/separator";

export default function ProductCard({
  id,
  img,
  name,
  rating,
  mrp,
  price,
  sell_price,
}) {
  return (
    <div className="xl:w-1/4 md:w-1/2 md:p-4">
      <a
        className="bg-gray-100 md:p-6 rounded-lg flex-row flex md:flex-col p-2 gap-2 my-1 shadow-lg hover:shadow-sm"
        href={`/product?id=${id}`}
      >
        <img
          className="rounded w-1/3 md:w-full object-contain object-center md:h-40 my-auto"
          src={img}
          alt="content"
        />
        <div className="flex flex-col h-fit">
          <span className="tracking-widest text-indigo-500 text-[10px]">
            {/* SUBTITLE */}
          </span>
          <span className="text-gray-900 font-medium">{name}</span>
          <div>
            <div
              className="Stars text-xl"
              style={{ "--rating": 0 }}
              aria-label="Rating of this product is 2.3 out of 5."
            ></div>
          </div>
          <div className="flex gap-2 items-center">
            <span className="line-through">₹{mrp}</span>
            <span className="font-bold text-black">
              ₹{price ? price : sell_price}
            </span>
            <span className="text-red-500 text-xl">
              (-
              {Math.floor(100 - (price ? price : sell_price / mrp) * 100)}
              %)
            </span>
          </div>
        </div>
      </a>
      <Separator />
    </div>
  );
}
