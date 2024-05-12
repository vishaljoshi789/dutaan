"use client";
import React, { useContext, useEffect, useState } from "react";
import useAxios from "@/app/hooks/useAxios";
import { redirect } from "next/navigation";
import AuthContext from "@/app/context/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

export default function admin() {
  let { userInfo } = useContext(AuthContext);
  let [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(true);
  let api = useAxios();
  let getUsers = async () => {
    let response = await api.get("/admin/getAllUsers/");
    if (response.status === 403) {
      redirect("/");
    }
    if (response.status === 200) {
      toast.success("Users data fetched ");
      setUsers(response.data);
      console.log(response.data);
      setLoading(false);
    }
  };

  let toggleUserStatus = async (e) => {
    console.log(e);
    let response = await api.get(
      `/admin/toggle-user-status?id=${e.target.name}`
    );
    if (response.status == 200) {
      getUsers();
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
      <table className="table-auth w-full">
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
            <th className="border-2 border-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((e, index) => (
            <tr key={e.id} className="border-2 border-black">
              <td className="p-5 border-2 border-black">{index + 1}</td>
              <td className="p-5 border-2 border-black">{e.id}</td>
              <td className="p-5 border-2 border-black">{e.name}</td>
              <td className="p-5 border-2 border-black">{e.email}</td>
              <td className="p-5 border-2 border-black">{e.phone}</td>
              <td className="p-5 border-2 border-black">{e.address}</td>
              <td className="p-5 date border-2 border-black">
                {e.date_joined}
              </td>
              <td className="p-5 date border-2 border-black">{e.last_login}</td>
              <td className="p-5 border-2 border-black">{e.role}</td>
              <td className="">
                {/* <Button>
                  <Link href={`users/edit?id=${e.id}`}>
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Link>
                </Button> */}
                <Button onClick={toggleUserStatus} name={e.id}>
                  {e.status == "Active" ? (
                    <Image
                      src="/images/user-check.png"
                      alt="active"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-5 h-5"
                      name={e.id}
                    />
                  ) : (
                    <Image
                      src="/images/block-user.png"
                      alt="deactivate"
                      width={50}
                      height={50}
                      sizes="100vw"
                      className="w-5 h-5"
                      name={e.id}
                    />
                  )}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
