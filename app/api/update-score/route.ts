console.log("📥 API HIT: /api/update-score");

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      playerId,
      finalScore,
      newlevel,
      starsEarned,
      levelId,
      correctAnswers
    } = body;

    if (!playerId || !finalScore || !levelId) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    
    console.log(' Update Request:', {
      playerId,
      finalScore,
      newlevel,
      starsEarned,
      levelId,
      correctAnswers
    });

   
    const updatedPlayer = await prisma.player.update({
      where: { Player_ID: playerId },
      data: {
        Playerpoint: finalScore,
        Level_Id:parseInt(newlevel)
      }
    });

   
    await prisma.playerLevel.upsert({
      where: {
        playerId_levelId: {
          playerId,
          levelId: parseInt(levelId)
        }
      },
      update: {
        stars: starsEarned,
        correctAnswers: correctAnswers
      },
      create: {
        playerId,
        levelId: parseInt(levelId),
        stars: starsEarned,
        correctAnswers: correctAnswers
      }
    });
    

    console.log('Score updated in DB for:', updatedPlayer.Player_name);

    return NextResponse.json({ success: true, updatedPlayer });
  } catch (error) {
    console.error(' Error updating score:', error);
    return NextResponse.json(
      { error: 'Failed to update player score.' },
      { status: 500 }
    );
  }
}
