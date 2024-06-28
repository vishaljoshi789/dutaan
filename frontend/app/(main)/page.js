"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "../components/ProductCard";

export default function Home() {
  let { baseURL } = useContext(AuthContext);
  let [category, setCategory] = useState(null);
  let [event, setEvent] = useState(null);
  let [section1Products, setSection1Products] = useState([]);
  let [section2Products, setSection2Products] = useState([]);
  let getCategory = async () => {
    let response = await fetch(`${baseURL}/getCategory`);
    let data = await response.json();
    console.log(data);
    setCategory(data);
  };
  let getEvent = async () => {
    let response = await fetch(`${baseURL}/getEvent`);
    let data = await response.json();
    setEvent(data);
  };
  let getSection1Products = async () => {
    let response = await fetch(`${baseURL}/getProductsByCategory?category=1`);
    let data = await response.json();
    setSection1Products(data.products);
  };
  let getSection2Products = async () => {
    let response = await fetch(`${baseURL}/getProductsByCategory?category=2`);
    let data = await response.json();
    setSection2Products(data.products);
  };
  useEffect(() => {
    getCategory();
    getEvent();
    getSection1Products();
    getSection2Products();
  }, []);
  return (
    <div className="flex flex-col">
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex gap-5 w-full p-1 px-3 justify-evenly">
          {category &&
            category.map((e) => (
              <Link
                key={e.id}
                className="bg-white p-1 rounded-sm"
                href={`products?category=${e.id}`}
              >
                {e.category}
              </Link>
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="w-full">
        <AspectRatio ratio={16 / 6} className="bg-[#ffe174]">
          <Image
            src=""
            alt="Image"
            className="rounded-md object-cover"
            width={0}
            height={0}
            sizes="100vw"
          />
        </AspectRatio>
      </div>
      <div className="giftfinder flex justify-center items-center py-5">
        <form
          action="/products"
          method="get"
          className="flex gap-2 items-center justify-evenly flex-col md:flex-row p-8 bg-white shadow-md"
        >
          <span className="font-bold text-[#b68d47]">Your Gift Finder</span>
          <div className="flex items-center w-full lg:w-fit">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute"
            >
              <path
                d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                stroke="#808080"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                stroke="#808080"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              name="pincode"
              id=""
              placeholder="Enter Pincode"
              className="pl-5 p-2 rounded-sm w-full lg:w-fit border-2 border-[#D0AF74]"
            />
          </div>

          <div className="w-full lg:w-fit">
            <select
              name="event"
              id=""
              className="w-full p-2 rounded-sm border-2 border-[#D0AF74]"
            >
              <option value="">Select Events</option>
              {event &&
                event.map((e) => <option value={e.id}>{e.event}</option>)}
            </select>
          </div>

          <div className="w-full lg:w-fit">
            <select
              name="category"
              id=""
              className="w-full p-2 rounded-sm border-2 border-[#D0AF74]"
            >
              <option value="">Select Gift Type</option>
              {category &&
                category.map((e) => <option value={e.id}>{e.category}</option>)}
            </select>
          </div>
          <Button type="Submit" variant="default" className="">
            Get Your Gift
          </Button>
        </form>
      </div>

      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex gap-5 justify-evenly p-5">
          <div className="flex flex-col gap-2 items-center">
            <div className="w-28 h-28 bg-gray-500 rounded-2xl"></div>
            <span className="text-sm">Mother's Day</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-28 h-28 bg-gray-500 rounded-2xl"></div>
            <span className="text-sm">Birthday</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-28 h-28 bg-gray-500 rounded-2xl"></div>
            <span className="text-sm">Best of Personalised</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-28 h-28 bg-gray-500 rounded-2xl"></div>
            <span className="text-sm">Best of Flowers</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-28 h-28 bg-gray-500 rounded-2xl"></div>
            <span className="text-sm">Eggless Cakes</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-28 h-28 bg-gray-500 rounded-2xl"></div>
            <span className="text-sm">For Kids</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-28 h-28 bg-gray-500 rounded-2xl"></div>
            <span className="text-sm">For Him</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-28 h-28 bg-gray-500 rounded-2xl"></div>
            <span className="text-sm">For Her</span>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="birthday_gift p-3">
        <h2 className="text-red-500 font-bold">Birthday Gifts</h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex gap-2">
            {section1Products.map((e) => (
              <>
                <ProductCard
                  key={e.product.id}
                  id={e.product.id}
                  img={`${baseURL}${e.product.image}`}
                  name={e.product.name}
                  mrp={e.product.mrp}
                  price={e.product.price}
                  sell_price={e.product.sell_price}
                  highlight={true}
                  description={e.product.description}
                />
              </>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="aniversary_gift p-3">
        <h2 className="text-red-500 font-bold">Aniversary Gifts</h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex gap-2">
            {section2Products.map((e) => (
              <>
                <ProductCard
                  key={e.product.id}
                  id={e.product.id}
                  img={`${baseURL}${e.product.image}`}
                  name={e.product.name}
                  mrp={e.product.mrp}
                  price={e.product.price}
                  sell_price={e.product.sell_price}
                  highlight={true}
                  description={e.product.description}
                />
              </>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="trending p-3">
        <h2 className="text-red-500 font-bold">Trending Gifts</h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="p-5 flex gap-5 justify-evenly">
            <div className="w-48 h-48 bg-white flex items-end text-center rounded-lg">
              <span className="bg-gradient-to-b from-white to-gray-500 text-white w-full pt-7 pb-2 rounded-lg">
                FLOWERS
              </span>
            </div>
            <div className="w-48 h-48 bg-white flex items-end text-center rounded-lg">
              <span className="bg-gradient-to-b from-white to-gray-500 text-white w-full pt-7 pb-2 rounded-lg">
                CAKES
              </span>
            </div>
            <div className="w-48 h-48 bg-white flex items-end text-center rounded-lg">
              <span className="bg-gradient-to-b from-white to-gray-500 text-white w-full pt-7 pb-2 rounded-lg">
                PERSONALIZED
              </span>
            </div>
            <div className="w-48 h-48 bg-white flex items-end text-center rounded-lg">
              <span className="bg-gradient-to-b from-white to-gray-500 text-white w-full pt-7 pb-2 rounded-lg">
                HAMPERS
              </span>
            </div>
            <div className="w-48 h-48 bg-white flex items-end text-center rounded-lg">
              <span className="bg-gradient-to-b from-white to-gray-500 text-white w-full pt-7 pb-2 rounded-lg">
                PLANTS
              </span>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="stories p-3">
        <h2 className="text-red-500 font-bold">Gifts That tell Stories</h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className=" flex justify-evenly gap-2 p-2">
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full w-56 h-56 bg-gray-500 border-white border-4 shadow-lg"></div>
              <span>Stationery Gift</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full w-56 h-56 bg-gray-500 border-white border-4 shadow-lg"></div>
              <span>Cushions</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full w-56 h-56 bg-gray-500 border-white border-4 shadow-lg"></div>
              <span>Photo Frames</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full w-56 h-56 bg-gray-500 border-white border-4 shadow-lg"></div>
              <span>Mugs</span>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
