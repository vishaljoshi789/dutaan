import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-wrap justify-evenly p-10'>
        <div className="card flex flex-col items-center gap-5 bg-[#ffffa8] p-10 rounded-md shadow-md">
            <Image src="/images/order.png" width={100} height={100}/>
            <span className='text-xl font-bold underline'>Orders</span>
        </div>
        <Link href="/vendor/products" className="card flex flex-col items-center gap-5 bg-[#ffffa8] p-10 rounded-md shadow-md">
            <Image src="/images/cubes.png" width={100} height={100}/>
            <span className='text-xl font-bold underline'>Products</span>
        </Link>
    </div>
  )
}
