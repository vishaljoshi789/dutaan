"use client"
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useContext } from "react";
import AuthContext from '../context/AuthContext';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Image from 'next/image';


const Navbar = () => {
  let { user, userLogout } = useContext(AuthContext)
  return (
    <nav className='pb-5 bg-[#F5F5DC] '>
      <div className='flex justify-between p-5 px-10 bg-[#F5F5DC] shadow-lg items-center w-full'>
        <div className="brandLogo">
          <Link href="/">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div className="menu">
          <ul className='flex gap-10 items-center'>
            <li className='hidden md:block'><Link href='/'>Home</Link></li>
            <li className='hidden md:block'><Link href='#'>Products</Link></li>
            <li className='hidden md:block'><Link href='#'>Orders</Link></li>
            <li className='hidden md:block'>
              <DropdownMenu>
                <DropdownMenuTrigger>Account</DropdownMenuTrigger>
                {user ? 
                <DropdownMenuContent>
                  <DropdownMenuItem><Link href='/account/'>Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href='/account/edit/'>Edit Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuItem onClick={userLogout}>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
              
              :
              
                  <DropdownMenuContent>
                    <DropdownMenuItem><Link href='/auth/register'>Register</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href='/auth/login'>Login</Link></DropdownMenuItem>
                  </DropdownMenuContent>
                }
                </DropdownMenu>
              
            </li>
            <li className='block md:hidden'>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="w-8 h-18">
                    <AvatarImage src="/images/profile.png"/>
                    <AvatarFallback>Dutaan Profile</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                {user?
                <DropdownMenuContent className="bg-[#F5F5DC]">
                  <DropdownMenuItem><Link href='/account/'>Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href='/account/edit/'>Edit Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuItem onClick={userLogout}>Log Out</DropdownMenuItem>
                </DropdownMenuContent>:<DropdownMenuContent>
                    <DropdownMenuItem><Link href='/auth/register'>Register</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href='/auth/login'>Login</Link></DropdownMenuItem>
                  </DropdownMenuContent>}
              </DropdownMenu>
            </li>
            <li className='block md:hidden'>
            <Drawer>
              <DrawerTrigger>
                  <Image src="/images/more.png" width={20} height={20} alt='Dutaan Menu'/>
                </DrawerTrigger>
              <DrawerContent className="bg-[#F5F5DC] ">
                
                <DrawerFooter className="flex flex-col items-center">
                  <Button className='w-fit'><Link href='/'>Home</Link></Button>
                  <Button className='w-fit'><Link href='#'>Products</Link></Button>
                  <Button className='w-fit'><Link href='#'>Orders</Link></Button>
                  
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            </li>
          </ul>
        </div>
        </div>
    </nav>
  )
}

export default Navbar