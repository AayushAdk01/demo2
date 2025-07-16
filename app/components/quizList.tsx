// components/quizList.tsx
import React from "react";
import QuizLevelCard from "./quizLevelCard";
import ScrollToTopButton from "./ScrollToTopButton"; // Import the new component

type levelType = {
  Level_Id: number;
  Level_Title: string;
  Level_number: number;
};

type levelsType = levelType[];

type ProgressMap = Record<number, { stars: number; correctAnswers: number }>;

function QuizList({ 
  allLevels, 
  cutEnding = true, 
  playerLevel,
 // progressMap = {}
}: { 
  allLevels: levelsType; 
  cutEnding: boolean;
  playerLevel: number;
  progressMap?: ProgressMap;
}) {
  const displayLevel = playerLevel;
  const filteredLevels = allLevels
    .filter((level: levelType) => level.Level_Id <= displayLevel) 
    .sort((a, b) => b.Level_Id - a.Level_Id);

  const endingPoint = cutEnding ? (filteredLevels[0]?.Level_Id ?? 4) - 3 : 0; 

  return (
    <div className="">
      {filteredLevels.map(
        (level: levelType) =>
          level.Level_Id > endingPoint && (
            <QuizLevelCard
              key={level.Level_Id}
              levelNumber={level.Level_Id}
              levelLink={`quiz/${level.Level_Id}`}
              levelName={level.Level_Title}
              currentLevel={displayLevel}
            //  starsEarned={progressMap[level.Level_Id]?.stars}
            //  correctAnswers={progressMap[level.Level_Id]?.correctAnswers}
            />
          )
      )}

      {!cutEnding && (
        <div className="py-20 w-full flex">
          <ScrollToTopButton /> {/* Use the new component */}
        </div>
      )}
    </div>
  );
}

export default QuizList;