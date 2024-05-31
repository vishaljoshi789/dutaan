"use client";
import useAxios from "@/app/hooks/useAxios";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function page() {
  let api = useAxios();
  let [address, setAddress] = useState([]);
  let [selectedAddress, setSelectedAddress] = useState(null);
  let [selectedPM, setSelectedPM] = useState(null);
  let getAddress = async () => {
    let response = await api.get("/getUserAddress/");
    setAddress(response.data);
  };
  let addAddress = async (e) => {
    e.preventDefault();
    let response = await api.post("/addUserAddress/", {
      street_address: e.target.street_address.value,
      city: e.target.city.value,
      state: e.target.state.value,
      zip_code: e.target.zip_code.value,
      name: e.target.name.value,
      contact: e.target.contact.value,
    });
    if (response.status == 201) {
      getAddress();
    }
    // console.log(response.data);
  };
  useEffect(() => {
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
              <div className="w-full h-[3px] mx-4 rounded-lg bg-gray-300"></div>
            </div>
            <div className="mt-2 mr-4 max-sm:hidden">
              <h6 className="text-base font-bold text-[#333]">Shipping</h6>
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
        <div className="address py-10">
          <h2 className="text-2xl font-extrabold text-[#333] inline-block">
            Address
          </h2>
          <div className="flex flex-col gap-5">
            <RadioGroup
              name="address"
              onClick={(e) => setSelectedAddress(e.target.value)}
            >
              {address.map((e) => (
                <div className="flex items-center space-x-2 px-5 bg-gray-300">
                  <RadioGroupItem value={e.id} id={e.id} />
                  <Label htmlFor={e.id} className="w-full h-full p-5">
                    <div className="text-xl">Deliver to - {e.name}</div>
                    <div>
                      {`${e.street_address}, ${e.city}, ${e.state} (${e.zip_code})`}
                    </div>
                    <div>Contact - {e.contact}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Dialog>
              <DialogTrigger className="w-fit">
                <Button>+Add Address</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Address</DialogTitle>
                </DialogHeader>
                <form
                  className="grid flex-1 gap-2 text-black"
                  onSubmit={addAddress}
                >
                  <Label htmlFor="name" className="sr-only">
                    Name
                  </Label>
                  <Input id="name" placeholder="Name" />
                  <Label htmlFor="contact" className="sr-only">
                    Contact
                  </Label>
                  <Input id="contact" placeholder="Contact" />
                  <Label htmlFor="street_address" className="sr-only">
                    Street Address
                  </Label>
                  <Input id="street_address" placeholder="Street Address" />
                  <Label htmlFor="image" className="sr-only">
                    City
                  </Label>
                  <Input id="city" placeholder="City" />
                  <Label htmlFor="state" className="sr-only">
                    State
                  </Label>
                  <Input id="state" placeholder="State" />
                  <Label htmlFor="zip_code" className="sr-only">
                    Zip Code
                  </Label>
                  <Input id="zip_code" placeholder="Zip Code" />
                  <DialogClose>
                    <Button className="bg-white text-black hover:text-white">
                      Add
                    </Button>
                  </DialogClose>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[#333] inline-block">
            Payment Method
          </h2>
          <div className="flex flex-col gap-5">
            <RadioGroup
              name="payment_mode"
              onClick={(e) => setSelectedPM(e.target.value)}
            >
              <div className="flex items-center space-x-2 px-5 bg-gray-300">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online" className="w-full h-full p-5">
                  Online
                </Label>
              </div>
              <div className="flex items-center space-x-2 bg-gray-300 px-5">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="w-full h-full p-5">
                  Cash On Delivery
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="my-5 flex justify-center items-center gap-5 flex-col">
          {selectedAddress && selectedPM ? (
            <></>
          ) : (
            <span className="text-red-400 w-full">
              *Select Address and Payment Mode before Proceeding
            </span>
          )}
          <Link
            href={
              selectedAddress && selectedPM
                ? {
                    pathname: "/checkout/billing",
                    query: {
                      address: selectedAddress,
                      payment: "cod",
                    },
                  }
                : ""
            }
          >
            <Button className="font-bold">Continue</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
