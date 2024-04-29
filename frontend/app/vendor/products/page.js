"use client"
import React, { useContext, useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useAxios from '@/app/hooks/useAxios'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import AuthContext from '@/app/context/AuthContext';
import Link from 'next/link';

export default function products() {
  let api = useAxios();
  let { baseURL } = useContext(AuthContext);
  let [ products, setProducts ] = useState([]);
  let getProducts = async() => {
    let response = await api.get('/vendor/myproducts/');
    if(response.status === 200){
      console.log(response.data)
      setProducts(response.data);
    }
  }
  let updateStatus = async(e) => {
    let response = await api.get(`/vendor/toggleProductStatus?id=${e.target.value}`)
    if(response.status === 200){
      console.log(response.data)
      setProducts(items => items.map(item => {
        if (item.id === response.data.id) {
          return { ...item, status: response.data.status };
        }
        return item;
      }));
    }
  }
  useEffect(()=>{
    getProducts();
  }, [])
  return (
    <>
    
    <div className="addproduct flex justify-end px-14 pb-3">
      <Link href='products/addProduct'><Button>+Add Your Product</Button></Link>
    </div>
    <Table>
      <TableCaption className='fixed right-28 top-50 shadow-lg shadow-black rounded-md'></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product Image</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Product Description</TableHead>
          <TableHead>MRP</TableHead>
          <TableHead>Selling Price</TableHead>
          <TableHead>Final Aprove Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((item)=>
          <TableRow className="border-b-2 border-black" key={item.id}>
            <TableCell>{item.image?<Image src={`${baseURL}${item.image}`} width={50} height={50} alt={item.name}/>:<>NULL</>}</TableCell>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.description.length>500?
                        <><span>{item.description.slice(0,500)}</span><span id='desc' style={{display: "none"}}>{item.description.slice(500)}</span><Button onClick={(e)=>{document.querySelector("#desc").style.display=="none"?document.querySelector("#desc").style.display="inline":document.querySelector("#desc").style.display="none"}}>...</Button></>:
                        item.description}
            </TableCell>
            <TableCell>{item.mrp}</TableCell>
            <TableCell>{item.sell_price}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>
              {item.status!=="Banned"&&<label className="cursor-pointer flex flex-col text-left">
                <div>
                  <input type="checkbox" value={item.id} className="sr-only peer" checked={item.status=="Active"?true:false} onChange={updateStatus}/>
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-300">{item.status}</span>
              </label>}
            </TableCell>
            <TableCell className="flex flex-col gap-2">{item.status!=="Banned"?<><Button className="w-fit"><Link href={`products/editProduct?id=${item.id}`}>Edit</Link></Button><Button className="w-fit"><Link href={`/product?id=${item.id}`}>View</Link></Button></>:<></>}</TableCell>
          </TableRow>
        )}
        
      </TableBody>
    </Table>
    </>
  )
}
