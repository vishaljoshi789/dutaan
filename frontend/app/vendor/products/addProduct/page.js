"use client";
import AuthContext from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import useAxios from "@/app/hooks/useAxios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function addProduct() {
  let api = useAxios();
  const router = useRouter();

  let { baseURL } = useContext(AuthContext);
  let [category, setCategory] = useState([]);
  let [event, setEvent] = useState([]);
  let [eventList, setEventList] = useState([]);
  let [categoryList, setCategoryList] = useState([]);
  let [imageList, setImageList] = useState([{ image: null }]);
  let [specsList, setSpecsList] = useState([{ key: "", value: "" }]);

  let getCategory = async () => {
    let response = await fetch(`${baseURL}/getCategory/`);
    let data = await response.json();
    setCategory(data);
  };

  let getEvent = async () => {
    let response = await fetch(`${baseURL}/getEvent/`);
    let data = await response.json();
    setEvent(data);
  };

  const handleAddSpec = () => {
    // console.log(specsList)
    const newSpec = { key: "", value: "" };
    setSpecsList([...specsList, newSpec]);
  };

  const handleRemoveSpec = (index) => {
    const updatedSpecs = specsList.filter((_, i) => i !== index);
    setSpecsList(updatedSpecs);
  };

  const handleSpecChange = (index, field, newValue) => {
    const updatedSpecs = specsList.map((spec, i) =>
      i === index ? { ...spec, [field]: newValue } : spec
    );
    setSpecsList(updatedSpecs);
  };

  const handleAddImage = () => {
    const newImage = { image: null };
    setImageList([...imageList, newImage]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = imageList.filter((_, i) => i !== index);
    setImageList(updatedImages);
  };

  const handleImageChange = (index, file) => {
    const updatedImages = [...imageList];
    updatedImages[index].image = file;
    setImageList(updatedImages);
  };

  let eventListSetter = () => {
    let events = document.querySelectorAll(".events");
    setEventList([]);
    events.forEach((e) =>
      e.checked ? setEventList((i) => [...i, e.value]) : console.log()
    );
    // console.log(eventList)
  };

  let categorytListSetter = () => {
    let categories = document.querySelectorAll(".categories");
    setCategoryList([]);
    categories.forEach((e) =>
      e.checked ? setCategoryList((i) => [...i, e.value]) : console.log()
    );
    // console.log(categoryList)
  };

  let submitProductForm = async (e) => {
    e.preventDefault();
    if (imageList[0]["image"] == null) {
      toast.error("Submit atleast 1 image");
      return;
    }
    const formData = new FormData();
    imageList.forEach((image, index) => {
      formData.append(`image${index + 1}`, image.image);
    });
    formData.append("specification", JSON.stringify(specsList));
    formData.append("category", JSON.stringify(categoryList));
    formData.append("event", JSON.stringify(eventList));
    formData.append("name", e.target.name.value);
    formData.append("description", e.target.description.value);
    formData.append("mrp", e.target.mrp.value);
    formData.append("sell_price", e.target.price.value);
    formData.append("stock_quantity", e.target.stock_quantity.value);
    formData.append("sell_price", e.target.price.value);
    formData.append("video", e.target.video.files[0]);
    formData.append("image", e.target.image.files[0]);
    try {
      let response = await api.post("/vendor/addProduct/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      if (response.status == 201) {
        toast.success("Product Created");
        router.push("/vendor/products");
      } else {
        toast.error("Something went wrong, Recheck your Entered Data");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong, Recheck your Entered Data");
    }
  };

  useEffect(() => {
    getCategory();
    getEvent();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-[#F5f5dc] flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">Add Product</h2>
          <p className="text-gray-500 mb-6"></p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Product Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <form
                  method="post"
                  className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
                  onSubmit={submitProductForm}
                >
                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                      required
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="desc">Product Description</label>
                    <textarea
                      type="text"
                      name="description"
                      id="desc"
                      rows="5"
                      className="border mt-1 rounded px-4 w-full bg-gray-50"
                      required
                      defaultValue=""
                      placeholder="Your Product Description here"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="mrp">MRP</label>
                    <input
                      type="number"
                      name="mrp"
                      id="mrp"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                      placeholder=""
                      required
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="password">Price</label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                      placeholder=""
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="stock_quantity">Stock Quantity</label>
                    <input
                      type="number"
                      name="stock_quantity"
                      id="stock_quantity"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label htmlFor="stock_quantity">Customizable</label>
                    <input
                      type="checkbox"
                      name="cutomizable"
                      id="customizable"
                      className="h-10 border mt-1 rounded w-full bg-gray-50"
                      defaultValue=""
                      placeholder=""
                      required
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="category">Category</label>
                    <div className="flex flex-wrap w-full gap-3 items-center md:justify-evenly">
                      {category.map((i) => (
                        <div
                          key={i["id"]}
                          className="flex items-center gap-1 md:w-1/3"
                        >
                          <input
                            className="categories"
                            name={i["category"]}
                            onChange={categorytListSetter}
                            value={i["category"]}
                            type="checkbox"
                          />
                          <label
                            htmlFor={i["category"]}
                            className="text-gray-500 font-bold"
                          >
                            {i["category"]}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr className="md:col-span-5" />

                  <div className="md:col-span-5">
                    <label htmlFor="event">Events</label>
                    <div className="flex flex-wrap w-full gap-3 items-center md:justify-evenly">
                      {event.map((i) => (
                        <div
                          key={i["id"]}
                          className="flex items-center gap-1 md:w-1/3"
                        >
                          <input
                            className="events"
                            name={i["event"]}
                            onChange={eventListSetter}
                            value={i["event"]}
                            type="checkbox"
                          />
                          <label
                            htmlFor={i["event"]}
                            className="text-gray-500 font-bold"
                          >
                            {i["event"]}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <hr className="md:col-span-5" />

                  <div className="md:col-span-5">
                    <label htmlFor="specs">Specification</label>
                    <div className="flex flex-col flex-wrap w-full gap-3 items-center rounded-sm">
                      {specsList.map((spec, index) => (
                        <div
                          className="flex gap-1 items-center border-gray-300 border-2 rounded-sm px-1"
                          key={index}
                        >
                          <Input
                            type="text"
                            className="h-5 md:h-10 border rounded md:px-4 bg-gray-50  w-full md:w-auto"
                            value={spec.name}
                            placeholder="Label"
                            onChange={(e) =>
                              handleSpecChange(index, "key", e.target.value)
                            }
                          />
                          <Input
                            type="text"
                            className="h-5 md:h-10 border rounded md:px-4 bg-gray-50 w-full md:w-auto"
                            value={spec.value}
                            placeholder="Value"
                            onChange={(e) =>
                              handleSpecChange(index, "value", e.target.value)
                            }
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSpec(index)}
                            className="h-auto w-20 md:w-7"
                          >
                            <Image
                              src="/images/remove.png"
                              height={50}
                              width={50}
                              alt="remove-icon"
                            />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleAddSpec}
                        className="h-auto w-10"
                      >
                        <Image
                          src="/images/add.png"
                          height={50}
                          width={50}
                          alt="add-icon"
                        />
                      </button>
                    </div>
                  </div>

                  <hr className="md:col-span-5" />

                  <div className="md:col-span-5">
                    <label htmlFor="cover_image">Cover Image</label>
                    <input
                      type="file"
                      name="image"
                      id="cover_image"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="specs">Images</label>
                    <div className="flex flex-col flex-wrap w-full gap-3 items-center md:justify-evenly rounded-sm">
                      {imageList.map((image, index) => (
                        <div
                          className="flex flex-col justify-center gap-1 items-center border-gray-300 border-2 rounded-sm "
                          key={index}
                        >
                          <Input
                            type="file"
                            className="h-10 border rounded bg-gray-50 w-full md:w-auto"
                            placeholder="Image"
                            onChange={(e) =>
                              handleImageChange(index, e.target.files[0])
                            }
                          />

                          {image.file ? (
                            <Image
                              key={index}
                              src={URL.createObjectURL(image.file)} // Use object URL for local preview
                              alt="temp-img"
                              height={100}
                              width={100}
                            />
                          ) : (
                            <></>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="h-auto"
                          >
                            <Image
                              src="/images/remove.png"
                              height={30}
                              width={30}
                              alt="remove-icon"
                            />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleAddImage}
                        className="h-auto w-10"
                      >
                        <Image
                          src="/images/add.png"
                          height={50}
                          width={50}
                          alt="add-icon"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <label htmlFor="product_video">Product Video</label>
                    <input
                      type="file"
                      name="product_video"
                      id="video"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                      placeholder=""
                    />
                  </div>
                  <Button>Submit</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
