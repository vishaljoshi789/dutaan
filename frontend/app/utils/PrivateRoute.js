"use client"
import Link from 'next/link';
import React, { useContext } from 'react'
import { redirect, usePathname } from 'next/navigation';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({children, ...rest}) => {
    let path = usePathname()
    let { user } = useContext(AuthContext)
  return (
    <div {...rest} >{ (!user && (path !== "/auth/login")) ? redirect('/auth/login') :children}</div>
  )
}

export default PrivateRoute