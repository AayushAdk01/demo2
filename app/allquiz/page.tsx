import React from 'react';
import QuizList from '../components/quizList';
import fetchLevels from '@/utils/fLevels';
import { auth } from '@/auth';
import fetchUser from '@/utils/fUser';
import fetchPlayerProgress from "@/utils/fPlayerProgress";

type levelType = {
  Level_Id: number;
  Level_Title: string;
  Level_number: number;
};

type levelsType = levelType[];

// Define the type for progress items
type ProgressItem = {
  levelId: number;
  stars: number;
  correctAnswers: number;
};

async function AllQuiz() {
  const levels: levelsType = (await fetchLevels()) || [];
  const session = await auth();
  
  let playerLevel = 1;
  let progressMap: Record<number, { stars: number; correctAnswers: number }> = {};
  
  if (session) { 
    const user = session.user;
    const name = user?.firstName || "Anonymous";

    const player = await fetchUser(
      Number(user?.memberId),
      name,
      user?.email || ''
    );

    if (player) {
      playerLevel = player.Level_Id || 1;
      const playerId = player.Player_ID;
      
      // Fetch player progress with proper typing
      const progressData: ProgressItem[] = await fetchPlayerProgress(playerId);
      
      // Create progress map
      progressData.forEach((item: ProgressItem) => {
        progressMap[item.levelId] = {
          stars: item.stars,
          correctAnswers: item.correctAnswers
        };
      });
    }
  }

  return (
    <div className='container'>
      <h1 className='title mt-10' id="title">All Quiz</h1>
      <p className='mt-4 mb-20'>Here are all the quiz levels you have unlocked</p>
      <QuizList 
        allLevels={levels} 
        cutEnding={false} 
        playerLevel={playerLevel}
     //   progressMap={progressMap}
      />
    </div>
  )
}

export default AllQuiz;