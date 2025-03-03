import React from 'react'
import QuizList from '../components/quizList'
import fetchLevels from '@/utils/fLevels';
import Link from 'next/link';


type levelType = {
    Level_Id: number;
    Level_Title: string;
    Level_number: number;
  };
  
  type levelsType = levelType[];

async function AllQuiz() {
    const levels: levelsType = (await fetchLevels()) || [];
  
  return (
    <div className='container '>
        <h1 className='title mt-10' id="title">All Quiz</h1>
        <p className='mt-4 mb-20'>Here are the all the quiz level you have unlocked</p>
        <QuizList allLevels={levels} cutEnding={false}/>
    </div>
  )
}

export default AllQuiz