"use client";
import AuthContext from "@/app/context/AuthContext";
import useAxios from "@/app/hooks/useAxios";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  const searchParams = useSearchParams();
  let [cart, setCart] = useState([]);
  let { baseURL } = useContext(AuthContext);
  let [totalAmt, setTotalAmt] = useState(0);
  let [address, setAddress] = useState({});
  let api = useAxios();
  let getCart = async () => {
    let response = await api.get("/getCart/");
    if (response.status == 200) {
      console.log(response.data);
      setTotalAmt(0);
      response.data.forEach((e) => {
        setTotalAmt(
          (i) =>
            i +
            (e.product.price
              ? e.product.price * e.quantity
              : e.product.sell_price * e.quantity)
        );
      });
      setCart(response.data);
    }
  };
  let getAddress = async () => {
    let response = await api.get(
      `/getAddress?address=${searchParams.get("address")}`
    );
    if (response.status == 200) {
      setAddress(response.data);
    }
  };
  useEffect(() => {
    getCart();
    getAddress();
  }, []);
  return (
    <div className="font-[sans-serif] bg-white p-6">
      <div className="max-w-4xl mx-auto w-full">
        <div>
          <h2 className="text-2xl font-extrabold text-[#333] inline-block">
            Checkout
          </h2>
        </div>
        <div className="flex items-start mt-12">
          <div className="w-full">
            <div className="flex items-center w-full">
              <div className="w-8 h-8 shrink-0 mx-[-1px] bg-[#333] p-1.5 flex items-center justify-center rounded-full">
                <span className="text-base text-white font-bold">1</span>
              </div>
              <div className="w-full h-[3px] mx-4 rounded-lg bg-[#333]"></div>
            </div>
            <div className="mt-2 mr-4 max-sm:hidden">
              <h6 className="text-base font-bold text-[#333]">Shipping</h6>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-center w-full">
              <div className="w-8 h-8 shrink-0 mx-[-1px] bg-[#333] p-1.5 flex items-center justify-center rounded-full">
                <span className="text-base text-white font-bold">2</span>
              </div>
              <div className="w-full h-[3px] mx-4 rounded-lg bg-gray-300"></div>
            </div>
            <div className="mt-2 mr-4 max-sm:hidden">
              <h6 className="text-base font-bold text-[#333]">Billing</h6>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-center w-full">
              <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-300 p-1.5 flex items-center justify-center rounded-full">
                <span className="text-base text-white font-bold">2</span>
              </div>
              <div className="w-full h-[3px] mx-4 rounded-lg bg-gray-300"></div>
            </div>
            <div className="mt-2 mr-4 max-sm:hidden">
              <h6 className="text-base font-bold text-gray-400">Confirm</h6>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-300 p-1.5 flex items-center justify-center rounded-full">
                <span className="text-base text-white font-bold">3</span>
              </div>
            </div>
            <div className="mt-2 max-sm:hidden">
              <h6 className="text-base font-bold text-gray-400">Finish</h6>
            </div>
          </div>
        </div>
        <div className="shipping flex flex-col gap-3 my-5 bg-gray-400 p-2">
          <span className="text-xl">Deliver to - {address.name}</span>
          <span className="">
            Address -{" "}
            {`${address.street_address}, ${address.city}, ${address.state} (${address.zip_code})`}
          </span>
          <span className="">Contact - {address.contact}</span>
        </div>
        <div className="py-5">
          <span className="text-xl font-bold">Your Items</span>
          <Table>
            <TableBody>
              {cart.map((e, index) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    <Image
                      src={`${baseURL}${e.product.image}`}
                      height={50}
                      width={100}
                      alt="image"
                    />
                  </TableCell>
                  <TableCell>
                    {e.product.name} <br />
                    <span className="bg-gray-400 p-1 rounded-md">
                      X{e.quantity}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="bg-gray-50 p-10">
          <h3 className="text-xl font-extrabold text-[#333] border-b pb-4">
            Order Summary
          </h3>
          <ul className="text-[#333] divide-y mt-6">
            <li className="flex flex-wrap gap-4 text-md py-4">
              Subtotal <span className="ml-auto font-bold">₹{totalAmt}</span>
            </li>
            <li className="flex flex-wrap gap-4 text-md py-4">
              Shipping <span className="ml-auto font-bold">$4.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-md py-4">
              Tax <span className="ml-auto font-bold">$4.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-md py-4 font-bold">
              Total <span className="ml-auto">$45.00</span>
            </li>
          </ul>
          <Link
            href=""
            className="mt-6 text-md px-6 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Confirm Order
          </Link>
        </div>
      </div>
    </div>
  );
}
