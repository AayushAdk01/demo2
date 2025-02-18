import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const { username, name, password } = await req.json()
    if (!username || !name || !password) {
        return NextResponse.json(
            { message: "All field are required" },
            { status: 400 }
        )
    }

    const hasedPassword = await bcrypt.hash(password, 10)
    try {

        const user = await prisma.user.create({
            data: {
                Username: username,
                Password: hasedPassword,
                player: {
                    create: {
                        Player_name: name,
                        Playerpoint: 0,
                        streak: 0,
                        lastLogin: new Date(),
                        Level_Id: 1,
                        Milestone_Id: 1,
                        Temp_Score: -1,



                    },
                }


            },
            include : { 
                player : true
            }
        })
        return NextResponse.json({ message: "User Created Sucessfullt", player : user?.player }, { status: 201 })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ message: "Failed to create user" + e, error: e }, { status: 500 })
    }
}