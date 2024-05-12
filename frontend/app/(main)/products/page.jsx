"use client";
import AuthContext from "@/app/context/AuthContext";
import useAxios from "@/app/hooks/useAxios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

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
              <div className="xl:w-1/4 md:w-1/2 md:p-4">
                <a
                  className="bg-gray-100 md:p-6 rounded-lg flex-row flex md:flex-col p-2 gap-2 my-1 shadow-lg hover:shadow-sm"
                  href={`/product?id=${e.product.id}&category=${category}`}
                >
                  <img
                    className="rounded w-1/3 md:w-full object-contain object-center md:h-40 my-auto"
                    src={`${baseURL}${e.product.image}`}
                    alt="content"
                  />
                  <div className="flex flex-col h-fit">
                    <span className="tracking-widest text-indigo-500 text-[10px]">
                      SUBTITLE
                    </span>
                    <span className="text-gray-900 font-medium">
                      {e.product.name}
                    </span>
                    <div>
                      <div
                        className="Stars text-xl"
                        style={{ "--rating": 0 }}
                        aria-label="Rating of this product is 2.3 out of 5."
                      ></div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="line-through">₹{e.product.mrp}</span>
                      <span className="font-bold text-black">
                        ₹
                        {e.product.price
                          ? e.product.price
                          : e.product.sell_price}
                      </span>
                      <span className="text-red-500 text-xl">
                        (-
                        {Math.floor(
                          100 -
                            (e.product.price
                              ? e.product.price
                              : e.product.sell_price / e.product.mrp) *
                              100
                        )}
                        %)
                      </span>
                    </div>
                  </div>
                </a>
                <Separator />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
