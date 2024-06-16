"use client";
import useAxios from "@/app/hooks/useAxios";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AuthContext from "@/app/context/AuthContext";

export default function page() {
  let param = useSearchParams();
  let order = param.get("id");
  let { baseURL } = useContext(AuthContext);
  let [items, setItems] = useState([]);
  let api = useAxios();
  let getItems = async () => {
    let response = await api.get(`/vendor/getOrderItems?id=${order}`);
    setItems(response.data);
    console.log(response.data);
    toast.success("Items fetched");
  };
  let changeStatus = async (id, value) => {
    let response = await api.get(
      `/vendor/changeOrderStatus?id=${id}&status=${value}`
    );
    if (response.status == 200) {
      getItems();
    }
  };
  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="p-10">
      <span className="font-bold text-xl underline">
        Order Items for order no {order}
      </span>
      <Table>
        <TableCaption className="fixed right-28 top-50 shadow-lg shadow-black rounded-md"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Product Image</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>View Product</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow className="border-b-2 border-black" key={item.id}>
              <TableCell className="font-medium">{item.product.id}</TableCell>
              <TableCell>{item.product.name}</TableCell>
              <TableCell>
                <Image
                  width={100}
                  height={50}
                  src={`${baseURL}${item.product.image}`}
                />
              </TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                <Link href={`/product?id=${item.product.id}`}>
                  <Button>View Product</Button>
                </Link>
              </TableCell>
              <TableCell>
                <select
                  name=""
                  id=""
                  className="p-2 rounded-md"
                  value={item.status}
                  onChange={(e) => changeStatus(item.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispached">Dispached</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
