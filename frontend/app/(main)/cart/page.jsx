"use client";
import AuthContext from "@/app/context/AuthContext";
import useAxios from "@/app/hooks/useAxios";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

export default function cart() {
  let [cart, setCart] = useState([]);
  let [totalAmt, setTotalAmt] = useState(0);
  let { baseURL } = useContext(AuthContext);
  let api = useAxios();
  let getCart = async () => {
    let response = await api.get("/getCart/");
    if (response.status == 200) {
      // console.log(response.data);
      setTotalAmt(0);
      response.data.forEach((e) => {
        console.log(e.product.sell_price * e.quantity);
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

  let addToCart = async (e) => {
    let response = await api.post(`/addToCart/`, { id: e.target.name });
    if (response.status === 200) {
      console.log(response.data);
      getCart();
    }
  };

  let removeFromCart = async (e) => {
    let response = await api.post(`/removeFromCart/`, { id: e.target.name });
    if (response.status === 200) {
      console.log(response.data);
      getCart();
    }
  };

  let removeCart = async (e) => {
    console.log(e.target);
    let response = await api.post(`/removeCart/`, { id: e.target.name });
    if (response.status === 200) {
      console.log(response.data);
      getCart();
    }
  };

  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="font-[sans-serif]">
      {cart.length === 0 ? (
        <p className="text-xl h-full w-full text-center text-gray-800 font-bold">
          Your Cart is empty
        </p>
      ) : (
        <div className="grid lg:grid-cols-3">
          <div className="lg:col-span-2 p-10 bg-transparent overflow-x-auto">
            <div className="flex border-b pb-4">
              <h2 className="text-2xl font-extrabold text-[#333] flex-1">
                Shopping Cart
              </h2>
              <h3 className="text-xl font-extrabold text-[#333]">
                {cart.length} Items
              </h3>
            </div>
            <div>
              <table className="mt-6 w-full border-collapse divide-y">
                <thead className="whitespace-nowrap text-left">
                  <tr>
                    <th className="text-base text-[#333] p-4">Description</th>
                    <th className="text-base text-[#333] p-4">Quantity</th>
                    <th className="text-base text-[#333] p-4">Price</th>
                  </tr>
                </thead>
                <tbody className="whitespace-nowrap divide-y">
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-6 w-max">
                          <div className="h-24 w-40">
                            <Image
                              src={`${baseURL}${item.product.image}`}
                              className="w-full h-full object-contain"
                              width={200}
                              height={100}
                              alt="image"
                            />
                          </div>
                          <div>
                            <p className="text-md font-bold text-[#333]">
                              {item.product.name}
                            </p>
                            <button
                              type="button"
                              className="mt-4 font-semibold text-red-400 text-sm"
                              name={item.product.id}
                              onClick={removeCart}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-4">
                        <div className="flex divide-x border w-max">
                          <button
                            type="button"
                            className="bg-gray-100 px-4 py-2 font-semibold"
                            name={item.product.id}
                            onClick={removeFromCart}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            className="bg-transparent px-4 py-2 font-semibold text-[#333] text-md"
                          >
                            {item.quantity}
                          </button>
                          <button
                            type="button"
                            className="bg-gray-800 text-white px-4 py-2 font-semibold"
                            name={item.product.id}
                            onClick={addToCart}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-6 px-4">
                        <h4 className="text-md font-bold text-[#333]">
                          ₹
                          {item.product.price
                            ? item.product.price * item.quantity
                            : item.product.sell_price * item.quantity}
                        </h4>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                Shipping <span className="ml-auto font-bold">+₹50</span>
              </li>
              <li className="flex flex-wrap gap-4 text-md py-4">
                Tax {`(18%)`}
                <span className="ml-auto font-bold">+₹{0.18 * totalAmt}</span>
              </li>
              <li className="flex flex-wrap gap-4 text-md py-4 font-bold">
                Total{" "}
                <span className="ml-auto">
                  ₹{totalAmt + totalAmt * 0.18 + 50}
                </span>
              </li>
            </ul>
            <a
              href="/checkout/shipping"
              className="mt-6 text-md px-6 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Check out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
