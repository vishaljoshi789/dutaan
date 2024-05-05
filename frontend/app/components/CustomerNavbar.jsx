"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import axiosInstance from "../utils/axiosInstance";

const Navbar = () => {
  let { user, userLogout, baseURL, authToken } = useContext(AuthContext);
  let [cartCount, setCartCount] = useState();

  let cartc = async () => {
    if (user && authToken) {
      let response = await axiosInstance.get(`/getCartCount/`);
      if (response.status == 200) {
        setCartCount(response.data.cartCount);
      }
    }
  };
  useEffect(() => {
    cartc();
  }, []);
  return (
    <nav className="shadow-lg relative z-10">
      <div className="flex justify-between py-3 px-5 lg:px-10 items-center w-full shadow-lg bg-[#D0AF74]">
        <div className="brandLogo bg-white rounded-sm">
          <Link href="/">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src="/images/logo.png"
              alt="logo"
              className="w-24 h-10 shadow-lg"
            />
          </Link>
        </div>
        <div className="hidden lg:block">
          <form action="" method="get" className="flex items-center">
            <input
              type="text"
              className="text-xl p-2 rounded-full pr-12 border-2 border-[#E7BB49]"
              placeholder="Search your products"
            />
            <button
              type="submit"
              className="-translate-x-11 bg-[#D0AF74] h-10 w-10 rounded-r-full flex justify-center items-center"
            >
              <Image
                src="/images/search.png"
                width={25}
                height={25}
                alt="search"
              />
            </button>
          </form>
        </div>
        <div className="menu">
          <ul className="flex lg:gap-10 gap-5 items-center">
            <li className="hidden lg:block">
              <Link href="/">Home</Link>
            </li>
            <li className="hidden lg:block">
              <Link href="#">Products</Link>
            </li>
            <li className="hidden lg:block">
              <Link href="#">Orders</Link>
            </li>
            <li className="hidden lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger>Account</DropdownMenuTrigger>
                {user ? (
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/account/">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/account/edit/">Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Orders</DropdownMenuItem>
                    <DropdownMenuItem onClick={userLogout}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                ) : (
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/auth/register">Register</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/auth/login">Login</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            </li>
            <li className="lg:hidden">
              <Dialog>
                <DialogTrigger className="flex items-center">
                  <Image
                    src="/images/search.png"
                    width={25}
                    height={25}
                    alt="search"
                  />
                </DialogTrigger>
                <DialogContent className="bg-[#F5F5DC]">
                  <DialogHeader>
                    <DialogTitle>Search Dutaan</DialogTitle>
                    <DialogDescription>
                      <form action="" method="get">
                        <input type="text" className="text-xl p-2" />
                      </form>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </li>
            <li className="flex items-center lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/images/profile.png" />
                    <AvatarFallback>Dutaan Profile</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                {user ? (
                  <DropdownMenuContent className="bg-[#F5F5DC]">
                    <DropdownMenuItem>
                      <Link href="/account/">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/account/edit/">Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Orders</DropdownMenuItem>
                    <DropdownMenuItem onClick={userLogout}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                ) : (
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/auth/register">Register</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/auth/login">Login</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            </li>
            <li>
              <Link href="/cart">
                <Image
                  src="/images/cart.png"
                  width={25}
                  height={25}
                  alt="cart"
                />
                {user && (
                  <span className="absolute translate-x-4 -translate-y-4 bg-[#ffdc69] text-[10px] rounded-full w-3 h-3 text-center text-yellow-950">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            {/* <li className="block lg:hidden">
              <Drawer>
                <DrawerTrigger>
                  <Image
                    src="/images/more.png"
                    width={20}
                    height={20}
                    alt="Dutaan Menu"
                  />
                </DrawerTrigger>
                <DrawerContent className="bg-[#F5F5DC] ">
                  <DrawerFooter className="flex flex-col items-center">
                    <Button className="w-fit">
                      <Link href="/">Home</Link>
                    </Button>
                    <Button className="w-fit">
                      <Link href="#">Products</Link>
                    </Button>
                    <Button className="w-fit">
                      <Link href="#">Orders</Link>
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
