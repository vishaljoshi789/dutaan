"use client";
import useAxios from "@/app/hooks/useAxios";
import React, { useEffect, useState } from "react";

export default function page() {
  let [category, setCategory] = useState([]);
  let api = useAxios();

  let getCategory = async () => {
    let response = await api.get("/getCategory/");
    console.log(response.data);
  };
  useEffect(() => {
    getCategory();
  }, []);
  return <div></div>;
}
