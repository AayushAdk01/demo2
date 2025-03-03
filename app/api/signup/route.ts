import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { username, name, password, tempScore } = await req.json()
    if (!username || !name || !password) {
        return NextResponse.json(
            { message: "All field are required" + username + name + password + tempScore },
            { status: 400 }
        )
    }

    const levelId: number = tempScore == 0 ? 1 : 2
    const hasedPassword = await bcrypt.hash(password, 10)
    try {

        const user = await prisma.user.create({
            data: {
                Username: username,
                Password: hasedPassword,
                player: {
                    create: {
                        Player_name: name,
                        Playerpoint: tempScore,
                        streak: 0,
                        lastLogin: new Date(),
                        Level_Id: levelId,
                        Milestone_Id: 1,
                        Temp_Score: -1,



                    },
                }


            },
            include: {
                player: true, 
                
                
            }
        })

        
        const cookieStore =  cookies()
            cookieStore.set('LoggedIn', 'true', { secure: true , httpOnly:true,sameSite:"strict", path:"/", })
            cookieStore.set('PlayerLevel', String(levelId), { secure: true , httpOnly:true,sameSite:"strict", path:"/", })


        return NextResponse.json({ message: "User Created Sucessfullt", player: user?.player }, { status: 201 })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ message: "Failed to create user" + e, error: e }, { status: 500 })
    }
}