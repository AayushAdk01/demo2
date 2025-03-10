import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
type typeUser = {
  userid: number;
  username: string | null;
  email: string;
};
const fetchUser = async (userid: number, username: string, email: string) => {
  const playerexist = await prisma.player.findFirst({
    where: {
      Player_ID: userid,
    },
  });

  if (playerexist) {
    // checking and updating streak
    const lastLoginDate = new Date(playerexist.lastLogin);
    lastLoginDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const dayDiff =
      (currentDate.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24); // Convert milliseconds to days

    let updatedStreak = playerexist.streak;

    if (dayDiff === 1) {
      updatedStreak += 1; // Increment streak if last login was exactly 1 day ago
    } else if (dayDiff > 1) {
      updatedStreak = 1; // Reset streak if more than 1 day has passed
    }

    const player = await prisma.player.update({
      where: {
        Player_ID: userid,
      },
      data: {
        Player_name: username,
        streak: updatedStreak,
        lastLogin: currentDate,
      },
      include: {
        milestone: true,
      },
    });

    return player;
  } else {
    const player = await prisma.player.create({
      data: {
        Player_ID: Number(userid),
        Player_name: username,
        Playerpoint: 0,
        Level_Id: 1,
        Milestone_Id: 1,
        lastLogin: new Date(),
        streak: 1,
      },
      include: {
        milestone: true,
      },
    });
    return player;
  }
};

export default fetchUser;
