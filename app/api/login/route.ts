import { serialize } from "cookie";
import { BaseNextResponse } from "next/dist/server/base-http";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    const body= await req.json();
    const { email, password } = body;

     const respone = await fetch(
      `${process.env.DJANGO_API_URL}/api/user/login/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email:"lyhou282@gmail.com", password:"PhivLyhou" })
      }
     );
     if(!respone.ok){
       return NextResponse.json(
        {
          message : "faild to login"
        },
        {
          status:respone.status,

        }

       )
     }

     const data= await respone.json();
     const user= data.user|| null;
     const accessToken= data.access_token || null;
     const refreshToken= data.access_token || null;

     const cookieName=process.env.COOKIE_REFRESH_TOKEN_NAME||"refresh";
     const serialized= serialize(cookieName,refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"lax",
        path:"/"
     })

     return NextResponse.json(
       {
         user:user,
         accessToken:accessToken,
       },
       {
         status:respone.status,
         headers:{
           "Set-Cookie":serialized,
         }
       }
     );



}