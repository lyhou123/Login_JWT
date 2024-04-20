import { serialize } from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST()
{

    const cookieStore=cookies();
    const cookieName=process.env?.COOKIE_REFRESH_TOKEN_NAME||"refresh";
    console.log("cookieName=",cookieName)
    const credentials=cookieStore.get(cookieName);

    console.log("credentials=",credentials)

    if(!credentials){
        return NextResponse.json(
            {
                message:"Token not found"
            },
            {
                status:404
            }
        )
    }
    
    const refreshToken=credentials.value;
    console.log("refresh token=",refreshToken)

    const respone=await fetch
    (
        `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/token/refresh/`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${refreshToken}`
             
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
     console.log("data=",data)
        const user= data?.user|| null;
        const accessToken= data?.access || null;
        const newRefreshToken= data?.refresh || null;
        
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