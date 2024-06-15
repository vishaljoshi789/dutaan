"use client";
import React, { useContext, useEffect, useState } from "react";
import useAxios from "@/app/hooks/useAxios";
import { redirect } from "next/navigation";
import AuthContext from "@/app/context/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function admin() {
  let [payments, setPayments] = useState([]);
  let api = useAxios();
  let getPayments = async () => {
    let response = await api.get("/admin/get-payments/");
    if (response.status === 403) {
      redirect("/");
    }
    if (response.status === 200) {
      toast.success("Payments data fetched ");
      response.data.map((e) => {
        const date = new Date(e.payment_date);

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

        e.date = readableDate;
      });
      setPayments(response.data);
    }
  };
  useEffect(() => {
    getPayments();
  }, []);

  let updateStatus = async (e) => {
    let response = await api.post("/admin/toggle-payment-status/", {
      id: e.target.value,
    });
    if (response.status == 200) {
      getPayments();
    }
  };

  return (
    <div className="w-fit h-[100vh] bg-[#F5f5dc] p-5">
      <table className="md:table-fixed w-full">
        <thead>
          <tr className="border-2 border-black">
            <th className="border-2 border-black">S. No. </th>
            <th className="border-2 border-black">Payement ID </th>
            <th className="border-2 border-black">Order ID </th>
            <th className="border-2 border-black">Amount Paid</th>
            <th className="border-2 border-black">Transaction ID</th>
            <th className="border-2 border-black">Date</th>
            <th className="border-2 border-black">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((e, index) => (
            <tr key={e.id} className="border-2 border-black">
              <td className="p-5 border-2 border-black">{index + 1}</td>
              <td className="p-5 border-2 border-black">{e.id}</td>
              <td className="p-5 border-2 border-black">{e.order}</td>
              <td className="p-5 border-2 border-black w-fit">
                {e.amount_paid}
              </td>
              <td className="p-5 border-2 border-black">{e.transaction_id}</td>
              <td className="p-5 border-2 border-black date">{e.date}</td>
              <td className="p-5 border-2 border-black">
                {
                  <label className="cursor-pointer flex flex-col text-left">
                    <div>
                      <input
                        type="checkbox"
                        value={e.id}
                        className="sr-only peer"
                        checked={e.is_paid}
                        onChange={updateStatus}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                      {e.is_paid}
                    </span>
                  </label>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
