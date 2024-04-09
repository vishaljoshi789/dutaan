"use client"

import useAxios from '@/app/hooks/useAxios'
import PrivateRoute from '@/app/utils/PrivateRoute'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

const EditProfile = () => {
  let [ user, setUser ] = useState({"id": null, "name": null, "email": null, "phone": null, "address": null})
  let api = useAxios()
  let router = useSearchParams()
  let id = router.get('id')
  useEffect(()=>{
    getUser();
  }, [])
    let getUser = async (e) =>{
        let response = await api.get(`/get-user-data?id=${id}`)
        if(response.status === 200){
            setUser(response.data)
            toast.success("User data fetched.")
        }else{
            toast.error("Something went Wrong!!!")
        }
    }
    let updateUser = async(e) => {
        e.preventDefault();
        let response = await api.post("/update-user-data/", {"id": e.target.id.value, "name": e.target.name.value, "email": e.target.email.value, "phone": e.target.phone.value, "address": e.target.address.value, "username": e.target.email.value})
        if(response.status == 200){
            setUser(response.data)
            toast.success("Data upgraded Successfully!!!")
        }else{
            toast.error("Something went Wrong!!!")
        }
        
    }
  return (
    <PrivateRoute>
    {<div className='h-[100vh] flex items-center'>
    <div className="flex flex-col gap-5 w-full md:w-1/2 m-auto justify-center bg-[#F5f5dc] rounded-md p-10">
      <span className="text-4xl ">Edit Profile</span>
      <form method='post' onSubmit={updateUser} className='flex flex-col gap-5 items-center '>
        <Input type='hidden' name='id' defaultValue={user.id} className="md:text-2xl"/>
        <Input type='text' name='name' defaultValue={user.name} placeholder='Name' className="md:text-2xl"/>
        <Input type='email' name='email' defaultValue={user.email} placeholder='Email' className="md:text-2xl"/>
        <Input type='text' name='phone' defaultValue={user.phone} placeholder='Phone' className="md:text-2xl"/>
        <Input type='text' name='address' defaultValue={user.address } placeholder='Address' className="md:text-2xl"/>
        <Button type="submit" className="text-2xl w-fit bg-[#964B00] shadow-lg hover:shadow-sm hover:bg-[#422c16] cus-animate">Update</Button>
    </form>
    </div>
    
  </div>}
  </PrivateRoute>
  )
}

export default EditProfile