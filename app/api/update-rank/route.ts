// app/api/update-rank/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { playerId } = await request.json();

    // Get all players ordered by points (descending)
    const allPlayers = await prisma.player.findMany({
      orderBy: { Playerpoint: 'desc' },
      select: {
        Player_ID: true,
        Playerpoint: true
      }
    });

    // Calculate ranks
    const rankMap = new Map<number, number>();
    let currentRank = 1;
    let lastPoints = -1;

    allPlayers.forEach((player, index) => {
      if (player.Playerpoint !== lastPoints) {
        currentRank = index + 1;
        lastPoints = player.Playerpoint;
      }
      rankMap.set(player.Player_ID, currentRank);
    });

    // Update each player's rank
    await Promise.all(
      allPlayers.map((player) =>
        prisma.player.update({
          where: { Player_ID: player.Player_ID },
          data: { rank: rankMap.get(player.Player_ID) ?? 0 }
        })
      )
    );

    return NextResponse.json({
      success: true,
      message: `Ranks updated for ${allPlayers.length} players`
    });

  } catch (error) {
    console.error('Error updating ranks:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
