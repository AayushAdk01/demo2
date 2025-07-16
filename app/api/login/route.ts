// app/api/leaderboard/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  
  try {
    const allPlayers = await prisma.player.findMany({
      orderBy: { Playerpoint: 'desc' },
      select: {
        Player_ID: true,
        Player_name: true,
        Playerpoint: true,
        Level_Id: true
      }
    });

    const topPlayers = allPlayers.slice(0, 3);
    const currentPlayer = allPlayers.find(p => p.Player_ID === Number(userId));
    
    if (!currentPlayer) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentRank = allPlayers.findIndex(p => p.Player_ID === currentPlayer.Player_ID) + 1;
    const currentPlayerIndex = allPlayers.findIndex(p => p.Player_ID === currentPlayer.Player_ID);
    
    // Get surrounding players
    const surroundingPlayers = {
      above: allPlayers[currentPlayerIndex - 1] || null,
      below: allPlayers[currentPlayerIndex + 1] || null
    };

    // Get player just above (for next rank threshold)
    const nextRankThreshold = surroundingPlayers.above?.Playerpoint || currentPlayer.Playerpoint + 100;
    
    // Get player just below (for current rank floor)
    const currentRankFloor = surroundingPlayers.below?.Playerpoint || 0;

    return NextResponse.json({
      topPlayers,
      currentUser: {
        ...currentPlayer,
        rank: currentRank,
        nextRankThreshold,
        currentRankFloor,
        nextRank: currentRank > 1 ? currentRank - 1 : null
      },
      surroundingPlayers
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}