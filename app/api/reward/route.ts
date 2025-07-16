import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {

  
  try {
    const { playerId, milestoneId } = await req.json();

    // Update player with milestone (simplified)
    const updatedPlayer = await prisma.player.update({
      where: { Player_ID: Number(playerId) },
      data: {
        Milestone_Id: Number(milestoneId),
        Playerpoint: { increment: 100 }
      },
      include: { milestone: true }
    });

    return NextResponse.json({
      message: "Reward claimed successfully!",
      player: updatedPlayer
    }, { status: 200 });

  } catch (error) {
    console.error("Reward claim error:", error);
    return NextResponse.json(
      { message: "Failed to claim reward", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
