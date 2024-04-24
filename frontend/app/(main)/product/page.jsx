"use client"
import AuthContext from '@/app/context/AuthContext'
import useAxios from '@/app/hooks/useAxios'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export default function Product() {
    let { baseURL } = useContext(AuthContext)
    let API = useAxios()
    const [api, setApi] = useState()
    let param = useSearchParams()
    let id = param.get('id')
    let [productInfo, setProductInfo] = useState({})
    let [vendor, setVendor] = useState({})
    let [activeImage, setActiveImage] = useState({})

    let getVendor = async (vendor) => {
        let response = await API.get(`/getVendorName?id=${vendor}`)
        if (response.status === 200) {
            // console.log(response.data)
            setVendor(response.data)
        }
    }

    let getProductInfo = async () => {
        let response = await API.get(`/getProduct?id=${id}`)
        if (response.status === 200) {

            getVendor(response.data.vendor)
            setProductInfo(response.data)
            setActiveImage(0)

        }
    }


    useEffect(() => {
        if (!api) {
            return
        }

        api.on("select", () => {
            setActiveImage(api.selectedScrollSnap())
        })
    }, [api])

    useEffect(() => {
        getProductInfo();
    }, [])

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="py-16">
                <div className="lg:w-4/5 w-full mx-auto flex flex-wrap">
                    <div className="flex flex-col w-full lg:w-1/2 gap-5 items-center pt-16">
                        <Carousel className="w-full bg-white" setApi={setApi}>
                            <CarouselContent>
                                {productInfo.images && productInfo.images.map((item) =>
                                    <CarouselItem className='flex items-center justify-center w-full'>

                                        <Image alt="product-img" height={0} width={0} sizes="100vw" className="w-full h-64 object-contain object-center rounded" src={`${baseURL}${item['image']}`} /></CarouselItem>
                                )}

                            </CarouselContent>
                            {/* <CarouselPrevious/> */}
                            {/* <CarouselNext /> */}
                        </Carousel>
                        <ScrollArea className="bg-white ">
                            <div className="flex items-center justify-evenly gap-2 p-3">
                                {productInfo.images && productInfo.images.map((item, index) =>
                                    <>
                                        <Image onClick={() => api.scrollTo(index)} alt="product-img" height={0} width={0} sizes="100vw" className={`w-20 h-20 object-contain object-center rounded ${index == activeImage && `border-black border-2`} `} src={`${baseURL}${item['image']}`} />
                                    </>
                                )}</div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    <div className="lg:w-1/2 w-full lg:pl-10 mt-6 lg:mt-0 p-5">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{vendor.store_name}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{productInfo.name}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <span className="text-gray-600 ml-3">4 Reviews</span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                    </svg>
                                </a>
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                    </svg>
                                </a>
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                    </svg>
                                </a>
                            </span>
                        </div>
                        <p className="leading-relaxed">{productInfo.description}</p>
                        <div className="flex flex-col mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <p className="text-xl w-full text-black">Specifications</p>
                            <Table>
                                {/* <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Name</TableHead>
                                        <TableHead>Value</TableHead>
                                    </TableRow>
                                </TableHeader> */}
                                <TableBody>
                                    {productInfo.specifications&&productInfo.specifications.map((item)=>
                                        <TableRow>
                                            <TableCell>{item.key}</TableCell>
                                            <TableCell>{item.value}</TableCell>
                                        </TableRow>
                                    )}
                                    
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex">
                            <div className="flex gap-5">
                                <span className="title-font font-medium text-2xl text-gray-900 line-through">₹{productInfo.mrp}</span>
                                <span className="title-font font-medium text-2xl text-gray-900">₹{productInfo.price ? productInfo.price : productInfo.sell_price}</span></div>
                            <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>
                            <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
