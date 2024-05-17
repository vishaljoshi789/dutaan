"use client";
import AuthContext from "@/app/context/AuthContext";
import useAxios from "@/app/hooks/useAxios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";

export default function page() {
  let param = useSearchParams();
  let [products, setProducts] = useState(null);
  let category = param.get("category");
  let event = param.get("event");
  let q = param.get("q");
  let api = useAxios();
  let { baseURL } = useContext(AuthContext);

  let getProducts = async () => {
    let url = `products?`;
    if (category) {
      url += `category=${category}&`;
    }
    if (event) {
      url += `event=${event}&`;
    }
    if (q) {
      url += `q=${q}`;
    }
    let response = await api.get(url);
    if (response.status == 200) {
      setProducts(response.data.products);
      console.log(response.data.products);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-wrap w-full mb-5">
          <div className="w-full mb-2 lg:mb-0">
            <h1 className="text-2xl font-medium title-font mb-2 text-gray-900">
              {products && products.length} Products found.
            </h1>
            <div className="h-1 w-full bg-indigo-500 rounded"></div>
          </div>
        </div>
        <div className="flex flex-wrap -m-4">
          {products &&
            products.map((e) => (
              <ProductCard
                key={e.product.id}
                id={e.product.id}
                img={`${baseURL}${e.product.image}`}
                name={e.product.name}
                mrp={e.product.mrp}
                price={e.product.price}
                sell_price={e.product.sell_price}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
