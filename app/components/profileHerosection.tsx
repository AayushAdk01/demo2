"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProgress } from "@/app/context/progressContext"; // Import the progress context
import StarIcon from "./StarIcon";

type ProgressBarType = {
  percentage: number;
};

const ProgressBar = ({ percentage }: ProgressBarType) => {
  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-300">
      <div
        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: `${percentage}%` }}
      >
        {Math.floor(percentage)}%
      </div>
    </div>
  );
};

type milestoneType = {
  Milestone_Id: number;
  Milestone_Title: string;
  Milestone_description: string;
  UnlockingLevel: number;
  Milestone_reward_message: string;
  Milestone_Link: string; 
  Milestone_Button_CTA: string;
};

type playerType = {
  Player_ID: number;
  Player_name: string;
  Playerpoint: number;
  streak: number;
  lastLogin: Date;
  Level_Id: number;
  Milestone_Id?: number;
  milestone: milestoneType;
};


type typePlayerHeroSection = { 
  player: playerType, 
  playerRank: number
};

function ProfileHerosection({ player, playerRank }: typePlayerHeroSection) {
  const { progress } = useProgress(); // Get progress from context
  const router = useRouter();
  
  // Calculate average stars
  const calculateAverageStars = () => {
    // Get all levels that have been played (have stars)
    const playedLevels = Object.values(progress).filter(level => level.stars !== undefined);
    
    if (playedLevels.length === 0) return 0;
    
    // Sum all stars from played levels
    const totalStars = playedLevels.reduce((sum, level) => sum + level.stars, 0);
    
    // Calculate average and round to 1 decimal place
    return Math.round((totalStars / playedLevels.length) * 10) / 10;
  };
  
  const averageStars = calculateAverageStars();
  
  const handleClaimReward = () => {
    router.push("/reward");
  };
  
  return (
    <div className="container mx-auto max-w-6xl">
     <h1 className="text-3xl font-bold text-gray-800 mb-2">
  Hello {player?.Player_name}
</h1>

{player.milestone && player.Level_Id >= player.milestone.UnlockingLevel && (
  <p className="text-yellow-600 font-semibold text-sm mb-4">
    🎉 {player.milestone.Milestone_Title}
  </p>
)}
      <div className="flex flex-col flex-wrap md:flex-row gap-8 md:gap-12">
        <div className="flex-1">
        <div className="text-center"> 
</div>
          {/* Stats Card */}
          <div className="rounded-lg bg-blue-50 pl-3 pr-3">
       

            <div className="grid grid-cols-4 min py-6">
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">Ranking</p>
                <p className="text-5xl font-bold text-gray-800">{playerRank}</p>
              </div>
              <div className="text-center">
  <p className="text-gray-500 text-sm mb-1">Avg Stars</p>
  <div className="block items-center justify-center">
    
    <div className="flex justify-center">
      {[1, 2, 3, 4].map(star => (
        <StarIcon
          key={star}
          filled={star <= Math.round(averageStars)}
          className="w-7.5 h-7.5 mx-0.5"
        />
      ))}
    </div>
    
    <span className="text-3xl text-gray-800 mr-2">
      {averageStars.toFixed(1)}/4
    </span>
  </div>
</div>
             
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">Level</p>
                <p className="text-5xl font-bold text-gray-800">{player?.Level_Id}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">Points</p>
                <p className="text-5xl font-bold text-gray-800">{player?.Playerpoint}</p>
              </div>
             
            </div>

            {/* Streak Section */}
            <div className="flex items-center justify-center bg-blue-50 rounded-b-lg py-6 w-full border-t-1">
              <span className="text-blue-300 mr-2 text-xl">🔥</span>
              <p className="text-gray-700 text-xl">{player?.streak} Days Streak</p>
            </div>
          </div>
          {averageStars >= 2.5 && (
  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
    <span className="font-bold text-yellow-700">⭐ Star Performer!</span>
    <p>Your average is in the top 10% of players</p>
  </div>
)}
        </div>

        {/* Right Gift Section */}
        <div className="flex flex-row items-center border-1 border-b-3 border-blue-400 gap-8 px-9 rounded-lg">
          <div className="relative overflow-visible mb-4">
            <div className="flex flex-col gap-y-[-3] items-center">
              <Image
                src="/ProfileGraphics/Gift.svg"
                alt="Gift icon"
                className="intersect:motion-preset-stretch-sm intersect-once"
                width={100}
                height={140}
              />
            </div>
          </div>

          <div className="py-4 mb:py-0">
            <p className="text-gray-600">
              Solve {((player?.milestone?.UnlockingLevel - player?.Level_Id) < 0 ? 0 : player?.milestone?.UnlockingLevel - player?.Level_Id).toString()} more level to get your reward
            </p>
            <p className="mb-4 font-semibold">{player?.milestone?.Milestone_Title}</p>
            <ProgressBar percentage={
              player?.Level_Id >= player?.milestone?.UnlockingLevel 
                ? 100 
                : (player?.Level_Id / player?.milestone?.UnlockingLevel) * 100
            } />
            <button 
              className="quizPbtn mt-4" 
              disabled={player?.Level_Id < player?.milestone?.UnlockingLevel} 
              onClick={handleClaimReward}
            >
              Claim Reward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHerosection;
