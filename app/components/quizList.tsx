

import React from "react";
import QuizLevelCard from "./quizLevelCard";
import fetchPlayers from "@/utils/fPlayers";

type levelType = {
  Level_Id: number;
  Level_Title: string;
  Level_number: number;
};
type levelsType = levelType[];

async function QuizList({ allLevels, cutEnding = true, playerLevel }: { allLevels: levelsType; cutEnding: boolean , playerLevel : number}) {
 
 

  const displayLevel = playerLevel 

  const filteredLevels = allLevels
    .filter((level: levelType) => level.Level_Id <= displayLevel) 
    .sort((a, b) => b.Level_Id - a.Level_Id);

  const endingPoint = cutEnding ? (filteredLevels[0]?.Level_Id ?? 4) - 3 : 0; 

  const isBrowser = () => typeof window !== "undefined";

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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
            />
          )
      )}

      {!cutEnding && (
        <div className="py-20 w-full flex">
          <button className="underline text-center font-semibold mx-auto px-auto" >
            Scroll To Top
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizList;
