"use client";
import AuthContext from "@/app/context/AuthContext";
import useAxios from "@/app/hooks/useAxios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function cart() {
  let { baseURL } = useContext(AuthContext);
  let searchParams = useSearchParams();
  let [items, setItems] = useState([]);
  let api = useAxios();
  let getItems = async () => {
    let response = await api.get(`/getOrderItems?id=${searchParams.get("id")}`);
    if (response.status == 200) {
      console.log(response.data);
      setItems(response.data);
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className="font-[sans-serif]">
      <div className="">
        <div className="p-10 bg-transparent overflow-x-auto">
          <div className="flex border-b pb-4">
            <h2 className="text-2xl font-extrabold text-[#333] flex-1">
              Order Items
            </h2>
            <h3 className="text-xl font-extrabold text-[#333]">
              {items.length} Items
            </h3>
          </div>
          <div>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow className="border-b-2 border-black" key={item.id}>
                    <TableCell className="date">
                      <Image
                        src={`${baseURL}${item.product.image}`}
                        className=""
                        width={100}
                        height={50}
                        alt="image"
                      />
                    </TableCell>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      ₹
                      {item.product.price
                        ? item.product.price * item.quantity
                        : item.product.sell_price * item.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
