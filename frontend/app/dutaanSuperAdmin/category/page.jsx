"use client";
import useAxios from "@/app/hooks/useAxios";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthContext from "@/app/context/AuthContext";

export default function page() {
  let { baseURL } = useContext(AuthContext);
  let [category, setCategory] = useState([]);
  let api = useAxios();

  let getCategory = async () => {
    let response = await api.get("/getCategory/");
    if (response.status == 200) {
      setCategory(response.data);
      // console.log(response.data);
    }
  };
  let addCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", e.target.category.value);
    e.target.image.files[0] &&
      formData.append("image", e.target.image.files[0]);
    let response = await api.post(`/admin/add-category/`, formData);
    if (response.status == 201) {
      // console.log(response.data);
      getCategory();
    }
  };
  let deleteCategory = async (id) => {
    let response = await api.get(`/admin/delete-category?id=${id}`);
    if (response.status == 200) {
      getCategory();
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="p-5 flex flex-col">
      <Dialog>
        <DialogTrigger className="self-end my-5">
          <Button>+Add Category</Button>
        </DialogTrigger>
        <DialogContent className="bg-black text-white">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <form className="grid flex-1 gap-2 text-black" onSubmit={addCategory}>
            <Label htmlFor="name" className="sr-only">
              Category Name
            </Label>
            <Input id="category" />
            <Label htmlFor="image" className="sr-only">
              Category Image
            </Label>
            <Input id="image" type="file" />
            <DialogClose>
              <Button className="bg-white text-black hover:text-white">
                Add
              </Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>

      <div className="category flex flex-wrap gap-5">
        {category.map((e) => (
          <div className="card flex flex-col gap-2 bg-[#F5F5DC] p-5 w-52">
            {e.image && <img src={baseURL + e.image} alt="image" />}
            <span>{e.category}</span>
            <Button
              onClick={() => deleteCategory(e.id)}
              className="w-fit bg-transparent self-end"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="red"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-x pointer-events-none"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
