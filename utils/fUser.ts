import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
type typeUser = { 
    userid : number, 
    username : string | null , 
    email  : string 

}
export const   FectUser = async (userid:number, username:string, email :string ) => { 
if (!username){
    username = "User123"
}



const user = await prisma.user.findFirst({
    where: {
        User_Id: userid,
    },
});



if (user) { 
    const player = await prisma.player.findUnique({ 
        where : { 
            user_Id : userid
        }, include: { 
            milestone : true
        }
    })
    return player
}else   { 
        const hasedPassword = await bcrypt.hash("test123", 10)
    
    const user = await prisma.user.create( { 
        data: {
            Username: email,
            Password: hasedPassword,
            User_Id : userid, 
            player: {
                create: {
                    Player_name: username,
                    Playerpoint: 0,
                    streak: 0,
                    lastLogin: new Date(),
                    Level_Id: 1,
                    Milestone_Id: 1,
                    Temp_Score: -1,



                },
            }


        },
        include: {
            player: true, 
            
            
        }
    }
    )

    const player = user.player
    return player
}


}