import React from 'react'
import QuizList from '../components/quizList'
import fetchLevels from '@/utils/fLevels';
import Link from 'next/link';
import { auth } from '@/auth';
import fetchUser from '@/utils/fUser';
import { div } from 'framer-motion/client';

type levelType = {
    Level_Id: number;
    Level_Title: string;
    Level_number: number;
  };
  
  type levelsType = levelType[];

async function AllQuiz() {
    const levels: levelsType = (await fetchLevels()) || [];
    const session = await auth() 
    if(session )  { 
      const user = session.user;
    const name = user?.firstName == null ? "Anonymous" :user?.firstName 

    const player = await fetchUser(
      Number(user?.memberId),
      name,
      user?.email || ''
    );

    const playerLevel = player?.Level_Id ?? 1;

    return (
      <div className='container '>
      <h1 className='title mt-10' id="title">All Quiz</h1>
      <p className='mt-4 mb-20'>Here are the all the quiz level you have unlocked</p>
      <QuizList allLevels={levels} cutEnding={false} playerLevel={playerLevel}/>
  </div>
    )
    }
  
  return (
    <div className='container '>
        <h1 className='title mt-10' id="title">All Quiz</h1>
        <p className='mt-4 mb-20'>Here are the all the quiz level you have unlocked</p>
        <QuizList allLevels={levels} cutEnding={false} playerLevel={1}/>
    </div>
  )
}

export default AllQuiz