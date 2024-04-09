"use client"

import AuthContext from '@/app/context/AuthContext'
import useAxios from '@/app/hooks/useAxios'
import PrivateRoute from '@/app/utils/PrivateRoute'
import React, { useContext } from 'react'
import { toast } from 'sonner';

const EditProfile = () => {
  let { setUserInfo, userInfo } = useContext(AuthContext)
  let api = useAxios()
    let updateUser = async(e) => {
        e.preventDefault();
        let response = await api.put("/updateUserInfo/", {"user": {"name": e.target.name.value, "email": e.target.email.value, "phone": e.target.phone.value}, "address": {"street_address": e.target.street_address.value, "city": e.target.city.value, "state": e.target.state.value, "zip_code": e.target.zipcode.value}})
        if(response.status == 200){
            localStorage.setItem('userInfo', JSON.stringify(response.data))
            setUserInfo(response.data)
            toast.success("Data Updated Successfully!!")
        }else{
          toast.error("Something went wrong!!!")
        }
        
    }
  return (
    <PrivateRoute>
    {userInfo?<div className="min-h-screen p-6 bg-[#F5f5dc] flex items-center justify-center">
  <div className="container max-w-screen-lg mx-auto">
    <div>
      <h2 className="font-semibold text-xl text-gray-600">Edit Profile</h2>
      <p className="text-gray-500 mb-6"></p>

      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">

          <div className="lg:col-span-2">
            <form method='post' onSubmit={updateUser} className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label htmlFor="full_name">Full Name</label>
                <input type="text" name="name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue={userInfo.user.name} />
              </div>

              <div className="md:col-span-5">
                <label htmlFor="email">Email Address</label>
                <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue={userInfo.user.email} placeholder="email@domain.com" />
              </div>


              <div className="md:col-span-3">
                <label htmlFor="phone">Phone Number</label>
                <input type="text" name="phone" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue={userInfo.user.phone} placeholder="95XXXXXXXX" />
              </div>


              
              

              <div className="md:col-span-3">
                <label htmlFor="address">Address / Street</label>
                <input type="text" name="street_address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue={userInfo.address.street_address} placeholder="" />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue={userInfo.address.city} placeholder="" />
              </div>


              <div className="md:col-span-2">
                <label htmlFor="state">State / province</label>
                  <input name="state" id="state" placeholder="State" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" defaultValue={userInfo.address.state} />    
              </div>

              <div className="md:col-span-1">
                <label htmlFor="zipcode">Zipcode</label>
                <input type="text" name="zipcode" id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" defaultValue={userInfo.address.zipcode} />
              </div>

              

              
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>:<></>}
  </PrivateRoute>
  )
}

export default EditProfile


