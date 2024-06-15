"use client"
import useAxios from '@/app/hooks/useAxios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function page() {
    let param = useSearchParams()
    let order = param.get('id')
    let api = useAxios()
    let getItems = async() => {
        let response = await api.get(`/vendor/getOrderItems?id=${order}`)
        console.log(response.data)
    }
    useEffect(()=>{
        getItems()
    }, [])

  return (
    <div>page</div>
  )
}
