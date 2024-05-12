"use client";
import React, { useContext, useEffect, useState } from "react";
import useAxios from "@/app/hooks/useAxios";
import { redirect } from "next/navigation";
import AuthContext from "@/app/context/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function admin() {
  let { userInfo } = useContext(AuthContext);
  let [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(true);
  let api = useAxios();
  let getUsers = async () => {
    let response = await api.get("/admin/get-all-products/");
    if (response.status === 403) {
      redirect("/");
    }
    if (response.status === 200) {
      toast.success("Users data fetched ");
      setUsers(response.data);
      setLoading(false);
      console.log(response.data);
    }
  };
  useEffect(() => {
    getUsers();
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
      console.log(readableDate);
    });
  };
  return (
    <div className="w-fit h-[100vh] bg-[#F5f5dc] p-5">
      <table className="md:table-fixed w-full">
        <thead>
          <tr className="border-2 border-black">
            <th className="border-2 border-black">S. No. </th>
            <th className="border-2 border-black">User ID </th>
            <th className="border-2 border-black">Name </th>
            <th className="border-2 border-black">Email</th>
            <th className="border-2 border-black">Phone</th>
            <th className="border-2 border-black">Address</th>
            <th className="border-2 border-black">Date Joined</th>
            <th className="border-2 border-black">Last Login</th>
            <th className="border-2 border-black">User Type</th>
            <th className="border-2 border-black">Edit Details</th>
          </tr>
        </thead>
        <tbody>
          {users.map((e, index) => (
            <tr key={e.id} className="border-2 border-black">
              <td className="p-5 border-2 border-black">{index + 1}</td>
              <td className="p-5 border-2 border-black">{e.id}</td>
              <td className="p-5 border-2 border-black">{e.name}</td>
              <td className="p-5 border-2 border-black w-fit">{e.email}</td>
              <td className="p-5 border-2 border-black">{e.phone}</td>
              <td className="p-5 border-2 border-black">{e.address}</td>
              <td className="p-5 date border-2 border-black">
                {e.date_joined}
              </td>
              <td className="p-5 date border-2 border-black">{e.last_login}</td>
              <td className="p-5 border-2 border-black">Customer</td>
              <td className="p-5 border-2 border-black">
                <Button>
                  <Link href={`users/edit?id=${e.id}`}>Edit</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
