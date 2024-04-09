"use client"
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../hooks/useAxios";


export default function Home() {
  let [notes, setNotes] = useState([])
  let {authToken } = useContext(AuthContext)
  let api = useAxios()

    
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>You are logged to the home page!</p>
      <ul>
                
            </ul>
    </div>
  );
}
