import { serialize } from "cookie";
import { BaseNextResponse } from "next/dist/server/base-http";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET()
{

    const cookieStore=cookies();
    const cookieName=process.env.NEXT_PUBLIC_COOKIE_NAME||"refresh";
    const credentials=cookieStore.get(cookieName);
    if(!credentials){
        return NextResponse.json(
            {
                message:"Token not found"
            },
            {
                status:404,
            }
        )
    }
    
    const refreshToken=credentials.value;

    const respone=await fetch
    (
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({refresh:refreshToken})
    });

    if(!respone.ok)
        {
            return NextResponse.json(
                {
                    message:"Failed to refresh token"
                },
                {
                    status:respone.status,
                }
            )
        }

     const data= await respone.json();
        const user= data.user|| null;
        const accessToken= data.token || null;
        const newRefreshToken= data.refreshToken || null;
        
       const serialized=serialize(cookieName,refreshToken,{
              httpOnly:true,
              secure:process.env.NODE_ENV==="production",
              sameSite:"lax",
              path:"/"
       }) 

         return NextResponse.json(
              {
                user:user,
                accessToken:accessToken
              },
              {
                status:respone.status,
                headers:{
                     "Set-Cookie":serialized
                }
              }
         )
}