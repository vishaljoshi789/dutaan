"use client"
import { useState, useContext, useEffect } from "react"
import AuthContext from "@/app/context/AuthContext"
import Image from "next/image"
import PrivateRoute from "@/app/utils/PrivateRoute"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import useAxios from "@/app/hooks/useAxios"
import { redirect } from "next/navigation"
export default function page() {
    let  [ userInfo, setUserInfo ] = useState(null)
    let api = useAxios()
    let {userLogout} = useContext(AuthContext)
    let getUserData = async() => {
        try{
            let response = await api.get('/userInfo/');
            if(response.status===200){
                setUserInfo(response.data)
            }else{
                userLogout()
                redirect('/login/')
            }
        }catch(e){
            userLogout()
            redirect('/login/')
        }
    }
    useEffect(()=>{getUserData()}, [])
    return (
        <PrivateRoute>
        {userInfo?<section className="text-gray-600 body-font bg-[#F5F5DC]">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4 justify-center">
                    <div className="p-4 md:w-1/2">
                        <div className="h-full border-2 border-black border-opacity-60 rounded-lg overflow-hidden p-5">
                            <Image className="lg:h-48 md:h-36 w-full object-contain object-center" src="/images/user.png" alt="blog" width={500} height={500} priority/>
                            <div className="p-6">
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{userInfo.user.role}</h2>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{userInfo.user.name}</h1>
                                <p className="leading-relaxed mb-3">{userInfo.user.phone}</p>
                                <p className="leading-relaxed mb-3">{userInfo.user.email}</p>
                                <p className="leading-relaxed mb-3">{userInfo.address.street_address}, {userInfo.address.city}</p>
                                
                            </div>
                            <div className="flex justify-evenly">
                                <Button><Link href='/account/edit/'>Edit Profile</Link></Button>
                                <Button>Orders</Button>
                            </div>
                                
                        </div>
                    </div>
                </div>
            </div>
        </section>:<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
        </div>}
        </PrivateRoute>
  )
}
