"use client"
import React, { useContext, useState } from 'react'
import QuizLevelCard from './quizLevelCard'
import { playerContext } from '../context/playerContext';
type levelType = {
    Level_Id: number;
    Level_Title: string;
    Level_number: number;
  };
  type levelsType = levelType[];

  function QuizList({ allLevels }: { allLevels: levelsType }) {
    
    const{playerLevel} = useContext(playerContext)
    const filteredLevels = allLevels.filter((level:levelType)=> level.Level_Id <= playerLevel).sort((a,b)=> b.Level_Id - a.Level_Id)
   
    return (
      <div>
        player level should be here {playerLevel}
        {filteredLevels.map((level: levelType) => (
          <QuizLevelCard
            key={level.Level_Id}
            levelNumber={level.Level_Id}
            levelLink={`quiz/${level.Level_Id}`}
            levelName={level.Level_Title}
            currentLevel={playerLevel}
          />
        ))}
      </div>
    );
  }

export default QuizList