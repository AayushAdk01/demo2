// utils/playerProgress.ts
import prisma from "@/lib/prisma";

export async function getPlayerProgress(playerId: number) {
  console.log(`Fetching progress for player ID: ${playerId}`);
  
  try {
    const player = await prisma.player.findUnique({
      where: { Player_ID: playerId },
      include: {
        playerLevels: {
          select: {
            levelId: true,
            stars: true,
            correctAnswers: true
          }
        }
      }
    });

    if (!player) {
      console.log(`Player not found with ID: ${playerId}`);
      return {};
    }

    console.log(`Found player: ${player.Player_name}`);
    console.log(`Player levels: ${JSON.stringify(player.playerLevels)}`);

    const progressMap: Record<number, { stars: number; correctAnswers: number }> = {};
    
    player.playerLevels.forEach(item => {
      progressMap[item.levelId] = {
        stars: item.stars,
        correctAnswers: item.correctAnswers
      };
    });

    console.log(`Progress map: ${JSON.stringify(progressMap)}`);
    return progressMap;
  } catch (error) {
    console.error("Failed to fetch player progress:", error);
    return {};
  }
}