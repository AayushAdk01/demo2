// utils/fPlayerProgress.ts
import prisma from "@/lib/prisma";

// Define the return type
export type ProgressItem = {
  levelId: number;
  stars: number;
  correctAnswers: number;
};

export default async function fetchPlayerProgress(playerId: number): Promise<ProgressItem[]> {
  try {
    const playerLevels = await prisma.playerLevel.findMany({
      where: { playerId },
      select: {
        levelId: true,
        stars: true,
        correctAnswers: true,
      },
    });

    return playerLevels as ProgressItem[];
  } catch (error) {
    console.error("Failed to fetch player progress:", error);
    return [];
  }
}