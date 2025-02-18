import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"

export async function POST(req: Request) {


    try {
        const { playerId, finalScore, newlevel } = await req.json()
        if (!playerId || !finalScore ) {
            return NextResponse.json(
                { message: "All field are required" + finalScore + newlevel+playerId },
                { status: 400 }
                
            )
        }

       const updatePlayer = await prisma.player.update({
        where: { 
            Player_ID: playerId
        }, 
        data : { 
            Playerpoint : finalScore, 
            Level_Id : newlevel

        }, 
        include: {
            milestone: true

        }
       })

        return NextResponse.json({ message: "User Created Sucessfullt", player : updatePlayer, newlevel : newlevel }, { status: 201 })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ message: "Failed to create user" + e, error: e }, { status: 500 })
    }
}