import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const previewScore = Number(request.nextUrl.searchParams.get('previewScore')) || 0;

  try {
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const allPlayers = await prisma.player.findMany({
      select: {
        Player_ID: true,
        Player_name: true,
        Playerpoint: true,
        Level_Id: true,
        // milestone is NOT included here to avoid breaking the leaderboard
      },
      orderBy: [
        { Playerpoint: 'desc' },
        { Player_ID: 'asc' },
      ],
    });

    const currentPlayerId = Number(userId);
    const currentPlayer = allPlayers.find(p => p.Player_ID === currentPlayerId);

    if (!currentPlayer) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Simulate previewed score
    const simulatedPlayer = {
      ...currentPlayer,
      Playerpoint: currentPlayer.Playerpoint + previewScore,
    };

    // Update player list with simulated player
    const playersWithSimulated = allPlayers.map(p =>
      p.Player_ID === simulatedPlayer.Player_ID ? simulatedPlayer : p
    );

    // Sort with new score
    playersWithSimulated.sort((a, b) => {
      if (b.Playerpoint === a.Playerpoint) {
        return a.Player_ID - b.Player_ID;
      }
      return b.Playerpoint - a.Playerpoint;
    });

    const currentRank = playersWithSimulated.findIndex(p => p.Player_ID === currentPlayerId) + 1;

    const topPlayers = playersWithSimulated.slice(0, 5);
    if (!topPlayers.find(p => p.Player_ID === currentPlayerId)) {
      topPlayers.push(simulatedPlayer);
    }

    topPlayers.sort((a, b) => b.Playerpoint - a.Playerpoint);

    const topPlayersWithRank = topPlayers.map((p, i) => ({
      ...p,
      rank: i + 1,
    }));

    const currentIndex = playersWithSimulated.findIndex(p => p.Player_ID === currentPlayerId);
    const surroundingPlayers = {
      above: playersWithSimulated[currentIndex - 1] || null,
      below: playersWithSimulated[currentIndex + 1] || null,
    };

    const nextRankThreshold = surroundingPlayers.above?.Playerpoint ?? simulatedPlayer.Playerpoint + 100;
    const currentRankFloor = surroundingPlayers.below?.Playerpoint ?? 0;

    return NextResponse.json({
      topPlayers: topPlayersWithRank,
      currentUser: {
        ...simulatedPlayer,
        rank: currentRank,
        nextRankThreshold,
        currentRankFloor,
        nextRank: currentRank > 1 ? currentRank - 1 : null,
      },
      surroundingPlayers,
    });

  } catch (error) {
    console.error('[LEADERBOARD_GET_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
