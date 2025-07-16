import prisma from "@/lib/prisma";

const fetchUser = async (userid: number, username: string, email: string) => {
  try {
    const playerexist = await prisma.player.findFirst({
      where: { Player_ID: userid }
    });

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    if (playerexist) {
      // Handle streak calculation
      const lastLogin = new Date(playerexist.lastLogin);
      lastLogin.setHours(0, 0, 0, 0);
      
      let updatedStreak = playerexist.streak;
      const dayDiff = Math.floor(
        (currentDate.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (dayDiff === 0) updatedStreak = playerexist.streak;
      else if (dayDiff === 1) updatedStreak += 1;
      else updatedStreak = 1;

      // Update player - no score modification here
      return await prisma.player.update({
        where: { Player_ID: userid },
        data: {
          Player_name: username,
          streak: updatedStreak,
          lastLogin: currentDate,
        },
        include: { milestone: true },
      });
    } else {
      // Create new player
      return await prisma.player.create({
        data: {
          Player_ID: userid,
          Player_name: username,
          Playerpoint: 0,
          Level_Id: 1,
          lastLogin: currentDate,
          streak: 1,
          Milestone_Id: 1 // Assigning first milestone
        },
        include: { milestone: true },
      });
    }
  } catch (error) {
    console.error("Error in fetchUser:", error);
    return null;
  }
};

export default fetchUser;