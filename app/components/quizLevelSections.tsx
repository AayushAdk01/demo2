import React from "react";
import QuizLevelCard from "./quizLevelCard";
import fetchLevels from "@/lib/fetchLevels";

type quizLevelSectionsType = {
  currentLevel: number;
};

type levelType = {
  Level_Id: number;
  Level_Title: string;
  Level_number: number;
};
type levelsType = levelType[];

async function QuizLevelSections({ currentLevel }: quizLevelSectionsType) {
  const levels: levelsType = (await fetchLevels()) || [];

  const filteredLevels = levels
    .filter((level: levelType) => level.Level_Id <= currentLevel)
    .sort((a, b) => b.Level_Id - a.Level_Id);
  return (
    <div className="space-y-8 ">
      <div className=" container flex lg:gap-12 flex-wrap ">
        <h2 className=" px-4 lg:py-1 bg-blue-400 text-4xl w-fit  rounded font-bold text-gray-900 lg:mb-10 mb-4">
          Your Journey{" "}
        </h2>
        <p className="w-96">
          You will unlock new level as you complete the top level. New
          Challenges will appear as you grow
        </p>
      </div>
      <div className=" container grid lg:gap-16  gap-8  ">
        {filteredLevels.map((level) => (
          <QuizLevelCard
            key={level.Level_Id}
            levelNumber={level.Level_Id}
            levelLink={`quiz/${level.Level_Id}`}
            levelName={level.Level_Title}
            currentLevel={currentLevel}
          />
        ))}
      </div>
    </div>
  );
}

export default QuizLevelSections;
