'use client'
import { stat } from 'fs'
import React, { useState } from 'react'
export default function page() {
  const[user,setUser]=useState(null)
  const[accessToken,setAccessToken]=useState("")
  const[Authorized,setAuthorized]=useState(false)
  const[refreshToken,setRefreshToken]=useState("") 
  const handleLogin = async()=>{
       const email = "lyhou282@gmail.com";
       const password = "PhivLyhou";
       
        fetch(process.env.NEXT_PUBLIC_API_URL +'/login',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password})
       })
       .then(res=>res.json()).then((data)=>{
        setAccessToken(data.accessToken)
      
       setUser(data.user)
       console.log(data)
       })
       .catch(error=>console.log(error))
      
  }

  const handleRefreshToken = async()=>{
    fetch('http://localhost:3000/api/refresh',{
         method: 'POST',
         headers:{
          'Content-Type': 'application/json',
          'Aurthorization': `Bearer ${refreshToken}`
         },
         credentials: 'include',
         body: JSON.stringify({})
    })
    .then(res=>res.json()).then((data)=>{
    console.log("data from refresh token:",data)
    setAccessToken(data.accessToken)
    })
    .catch(error=>console.log(error))
   
  }

  const handleUpdate = async()=>{
    const body={
      name: "Update specific updated products"
    }
  const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/products/${141}/`,{
       method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
    })
    if(response.status===401){
      setAuthorized(true)
    }
    const data = await response.json()
    console.log("data from update:",data)
  }

  return (
    <main className='h-screen grid place-content-center '>
        <p className='text-3xl'>Test JWT</p>
        <button className='bg-blue-700 text-xl text-gray-100 rounded-lg p-4 my-2' onClick={handleLogin}>Login</button>
        <button className='bg-blue-700 text-xl text-gray-100 rounded-lg p-4 my-2' onClick={handleUpdate}>Update</button>
        {Authorized && 
        <button className='bg-blue-700 text-xl text-gray-100 rounded-lg p-4 my-2' onClick={handleRefreshToken}>Refresh</button>
        }
    </main>
  )
}
