"use client";
import useAxios from "@/app/hooks/useAxios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  let api = useAxios();
  let [orders, setOrders] = useState([]);
  let [loading, setLoading] = useState(true);
  let getOrders = async () => {
    let response = await api.get("/vendor/getOrders/");
    if (response.status == 200) {
      console.log(response.data);
      setOrders(response.data);
      toast.success("Order Fetched.");
      setLoading(false);
    } else {
      toast.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  useEffect(() => {
    dateTime();
  }, [loading]);
  let dateTime = () => {
    let date = document.querySelectorAll(".date");
    console.log(date);
    date.forEach((e) => {
      const date = new Date(e.innerText);

      // Options for formatting the date
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };

      // Convert to a readable format
      const readableDate = date.toLocaleDateString("en-US", options);

      e.innerText = readableDate;
    });
  };

  return (
    <div className="p-10">
      <span className="font-bold text-xl underline">Your Orders</span>
      <Table>
        <TableCaption className="fixed right-28 top-50 shadow-lg shadow-black rounded-md"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((item) => (
            <TableRow className="border-b-2 border-black" key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell className="date">{item.date}</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>
                <Link href={`/vendor/orderItems?id=${item.id}`}>
                  <Button>View Order</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
