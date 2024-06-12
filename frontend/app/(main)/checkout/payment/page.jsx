"use client";
import useAxios from "@/app/hooks/useAxios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  let api = useAxios();
  let router = useRouter();
  let [order, setOrder] = useState({});
  let param = useSearchParams();
  let addPayment = async (e) => {
    e.preventDefault();
    let response = await api.post(`/addPayment/`, {
      order: order.id,
      amount_paid: parseFloat(order.amount) + parseFloat(order.shipping),
      transaction_id: e.target.txn.value,
      payment_method: "QR",
    });
    if (response.status == 200) {
      router.push("/checkout/success");
    }
  };
  let getOrder = async () => {
    let response = await api.get(`/getOrder?id=${param.get("id")}`);
    if (response.status == 200) {
      setOrder(response.data);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-10 w-fit m-auto">
      <span className="text-center text-2xl font-bold">Payment</span>
      <span>
        Scan the QR and Pay the amount of{" "}
        <b>{parseFloat(order["amount"]) + parseFloat(order["shipping"])}</b>{" "}
      </span>
      <div className="image w-80 h-80 bg-gray-300"></div>
      <form
        action=""
        method="post"
        className="w-full flex flex-col items-center gap-2"
        onSubmit={addPayment}
      >
        <span className="text-xl font-bold text-red-500">
          Enter the Transaction ID of the Payment
        </span>
        <Input
          type="text"
          placeholder="Your trasaction ID"
          className=""
          name="txn"
          required
        />
        <Button className="w-full">Submit</Button>
      </form>
    </div>
  );
}
