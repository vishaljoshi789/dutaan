"use client";
import AuthContext from "@/app/context/AuthContext";
import useAxios from "@/app/hooks/useAxios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";

export default function Product() {
  let router = useRouter();
  let { baseURL, cartc } = useContext(AuthContext);
  let API = useAxios();
  const [api, setApi] = useState();
  let param = useSearchParams();
  let id = param.get("id");
  let [productInfo, setProductInfo] = useState({});
  let [vendor, setVendor] = useState({});
  let [activeImage, setActiveImage] = useState({});
  let [wishlist, setWishlist] = useState(false);

  let getVendor = async (vendor) => {
    let response = await API.get(`/getVendorName?id=${vendor}`);
    if (response.status === 200) {
      // console.log(response.data)
      setVendor(response.data);
    }
  };

  let toggleWishlist = async () => {
    let response = await API.post(`/toggleWishlist/`, { id: productInfo.id });
    if (response.status === 200) {
      console.log(response.data, response.status);
      getProductInfo();
    }
  };

  let getProductInfo = async () => {
    let response = await API.get(`/getProduct?id=${id}`);
    if (response.status === 200) {
      // console.log(response.data)
      if (response.data[1].length !== 0) {
        setWishlist(true);
      } else {
        setWishlist(false);
      }
      getVendor(response.data[0].vendor);
      setProductInfo(response.data[0]);
      setActiveImage(0);
    }
  };

  let handleShare = async () => {
    try {
      await navigator.share({
        title: "DUTAAN",
        text: productInfo.name,
        url: window.location.href,
      });
    } catch (err) {
      console.log(err);
    }
  };

  let addToCart = async (e) => {
    console.log(e.target);
    if (e.target.srcset === "/images/cart_added.png") {
      return router.push("/cart");
    }
    let response = await API.post(`/addToCart/`, { id: productInfo.id });
    if (response.status === 200) {
      console.log(response.data);
      e.target.srcset = "/images/cart_added.png";
      cartc();
    }
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setActiveImage(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    getProductInfo();
  }, []);

  return (
    <section className="text-gray-600 body-font min-h-screen pt-10">
      <div className="">
        <div className="lg:w-4/5 w-full mx-auto flex flex-wrap">
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col gap-5 items-center pt-16 sticky z-10 top-0 shadow-md">
              <Carousel className="w-full bg-white" setApi={setApi}>
                <CarouselContent>
                  {productInfo.images &&
                    productInfo.images.map((item) => (
                      <CarouselItem
                        className="flex items-center justify-center w-full"
                        key={item.id}
                      >
                        <Image
                          alt="product-img"
                          height={0}
                          width={0}
                          sizes="100vw"
                          className="w-full h-64 object-contain object-center rounded"
                          src={`${baseURL}${item["image"]}`}
                        />
                      </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious/> */}
                {/* <CarouselNext /> */}
              </Carousel>
              <ScrollArea className="bg-white ">
                <div className="flex items-center justify-evenly gap-2 p-3">
                  {productInfo.images &&
                    productInfo.images.map((item, index) => (
                      <Image
                        onClick={() => api.scrollTo(index)}
                        alt="product-img"
                        height={0}
                        width={0}
                        sizes="100vw"
                        className={`w-20 h-20 object-contain object-center rounded ${
                          index == activeImage && `border-black border-2`
                        } `}
                        src={`${baseURL}${item["image"]}`}
                        key={item.id}
                      />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>

          <div className="lg:w-1/2 w-full lg:pl-10 mt-6 lg:mt-0 p-5">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {vendor.store_name}
            </h2>
            <div className="flex gap-5 items-center">
              <h2 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {productInfo.name}
              </h2>
              {productInfo.customizable && (
                <HoverCard openDelay={100} closeDelay={100}>
                  <HoverCardTrigger className="bg-[#F5F5DC] shadow-lg rounded-full p-2">
                    <Image
                      src="/images/magic-wand.png"
                      height={23}
                      width={23}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-[#F5F5DC] w-fit">
                    Customizable
                  </HoverCardContent>
                </HoverCard>
              )}
            </div>

            <div className="flex mb-4">
              <div className="flex items-center">
                <div>
                  <div
                    className="Stars text-xl"
                    style={{ "--rating": 5, "--bg": "#6366F1" }}
                    aria-label="Rating of this product is 2.3 out of 5."
                  ></div>
                </div>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </div>
              <div className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <Button
                  className="bg-transparent shadow-lg hover:bg-white"
                  onClick={handleShare}
                >
                  <Image
                    src="/images/share.png"
                    width={20}
                    height={20}
                    alt="share"
                  />
                </Button>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex gap-5">
                <span className="title-font font-medium text-2xl text-gray-900 line-through">
                  ₹{productInfo.mrp}
                </span>
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹
                  {productInfo.price
                    ? productInfo.price
                    : productInfo.sell_price}
                </span>
                <span className="title-font font-medium text-2xl text-red-500">
                  -(
                  {parseInt(
                    (parseInt(productInfo.mrp) -
                      parseInt(
                        productInfo.price
                          ? productInfo.price
                          : productInfo.sell_price
                      )) /
                      (parseInt(productInfo.mrp) / 100)
                  )}
                  %)
                </span>
              </div>

              <div className="flex items-center gap-10 my-5">
                {productInfo.customizable && (
                  <Link
                    className="bg-[#F5F5DC] shadow-lg rounded-full p-2"
                    href={`/chat?proid=${productInfo.id}&id=null`}
                  >
                    <Image src="/images/chat.png" height={30} width={30} />
                  </Link>
                )}
                <button className="flex text-white bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-600 rounded">
                  <Image
                    src="/images/cart_add.png"
                    onClick={addToCart}
                    width={50}
                    height={50}
                  />
                </button>

                <button
                  onClick={toggleWishlist}
                  className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                >
                  <svg
                    fill={wishlist ? `#4F46E5` : `currentcolor`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <p className="leading-relaxed">{productInfo.description}</p>

            <div className="flex flex-col mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              {/* <p className="text-xl w-full text-black">Specifications</p> */}

              <Table>
                <TableBody>
                  {productInfo.specifications &&
                    productInfo.specifications.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.key}</TableCell>
                        <TableCell>{item.value}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
