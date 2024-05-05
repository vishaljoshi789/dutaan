"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function page() {
  let param = useSearchParams();
  let [products, setProducts] = useState(null);
  let category = param.get("category");

  let getProducts = async () => {};
  return <div>page</div>;
}
