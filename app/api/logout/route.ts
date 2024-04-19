import { serialize } from "cookie";
import { BaseNextResponse } from "next/dist/server/base-http";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST()
{
    const cookieName=process.env.NEXT_PUBLIC_COOKIE_NAME||"refresh";
    const cookiesStore=cookies();
    const credentials=cookiesStore.get(cookieName);
    if(!credentials)
    {
        return NextResponse.json(
            {
                message:"Token not found"
            },
            {
                status:400,
            }
        )
    }
    const refreshToken=credentials.value;
    
    if(refreshToken)
        {
            cookiesStore.delete(cookieName);
            return NextResponse.json(
                {
                  message:"Token deleted"   
                },
                {
                    status:200,
                }
            )
        }

      return NextResponse.json(
        {
            message:"Token not logout"
        },
        {
          status:400,
        }
      )  
}