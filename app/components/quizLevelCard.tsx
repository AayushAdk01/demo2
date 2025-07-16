"use client"
import React, { useState } from "react";
import Pbtn from "./buttons/primarybtn";
import StarIcon from "./StarIcon";
import { useProgress } from "@/app/context/progressContext";

type QuizLevelCardTypes = {
  levelName: string;
  levelLink: string;
  levelNumber: number;
  currentLevel: number;
  starsEarned? : number;
  correctAnswers? : number;
  totalQuestions?: number;
};

function QuizLevelCard({
  levelName,
  levelLink,
  levelNumber,
  currentLevel,
 // starsEarned,
 // correctAnswers,
  totalQuestions = 10 //default 10 questions.

}: QuizLevelCardTypes) {

  const { progress } = useProgress();
  const levelProgress = progress[levelNumber] || {};
  const starsEarned = levelProgress.stars;
  const correctAnswers = levelProgress.correctAnswers;
  const hasPlayed = starsEarned !== undefined && starsEarned > 0;
  // Tooltip messages for each star
  const starTooltips = [
    "Level Completion: Earned for completing the level",
    "On Time Completion: Earned for finishing within the time limit",
    "Perfect Accuracy: Earned for answering all questions correctly",
    "Bonus Star: Earned for completing all other challenges perfectly"
  ];
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  return (
    <div
      className={`levelContainer rounded-lg p-6 border-b-4 border-2  mt-10  lg:w-1/2 duration-300  lg:even:ml-auto
                  first-element-gradient intersect:motion-preset-slide-up-lg motion-delay-${
                    1000 - levelNumber * 100
                  }  intersect-once `}
    >
      <div className="pastQuizBox">
      <div className="flex gap-4">
        <div className="flex items-center justify-center bg-blue-400 border-blue-400 text-[#191A23] w-8 h-8 rounded-full border-2 mb-4">
          <p className="font-bold">{levelNumber}</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2">{levelName}</h3>
          <p className="text mb-4">Number of Questions: {totalQuestions}</p>
        </div>
        
      </div>
        {/* Display stars if earned */}
        {hasPlayed && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <div 
                    key={star}
                    className="relative"
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                  >
                    <StarIcon
                      filled={star <= starsEarned}
                      className="w-5 h-5 mx-0.5 cursor-pointer transition-transform hover:scale-110"
                    />
                    
                    {/* Tooltip */}
                    {hoveredStar === star && (
                      <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                        <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-lg">
                          {starTooltips[star - 1]}
                        </div>
                        {/* Tooltip arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <span>({starsEarned}/4)</span>
            </div>
          </div>
        )}
      </div>
      <div id="pastQuiz" className="pt-4 place-items-end">
      {hasPlayed && correctAnswers !== undefined && (
          <div className="text-sm font-medium bg-blue-100 px-3 py-1 rounded-full">
            Correct Answers: {correctAnswers}/{totalQuestions}
          </div>
        )}
        <Pbtn
          toDestination={levelLink}
          theme={levelNumber == currentLevel ? "light" : "dark"}
          message={hasPlayed ? "Play Again" : "Start Quiz"}
        />
      </div>
    </div>
  );
}

export default QuizLevelCard;
