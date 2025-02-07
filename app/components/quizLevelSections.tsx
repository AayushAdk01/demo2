import React from "react";
import { levels } from "@/lib/db";
import QuizLevelCard from "./quizLevelCard";
import { a } from "framer-motion/client";

type quizLevelSectionsType = {
  currentLevel: number;
};

function QuizLevelSections({ currentLevel }: quizLevelSectionsType) {
  const filteredLevels = levels
    .filter((level) => level.levelnumber <= currentLevel)
    .sort((a, b) => b.levelnumber - a.levelnumber);
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
            key={level.levelnumber}
            levelNumber={level.levelnumber}
            levelLink={`quiz/${level.link}`}
            levelName={level.title}
            currentLevel={currentLevel}
          />
        ))}
      </div>
    </div>
  );
}

export default QuizLevelSections;
