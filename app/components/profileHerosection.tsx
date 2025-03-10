"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ProgressBarType = {
  percentage: number;
};

const ProgressBar = ({ percentage }: ProgressBarType) => {
  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-300">
      <div
        className="bg-blue-600 text-xs  font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
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
  Milestone_Link:string; 
  Milestone_Button_CTA : string 
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
  player :  playerType, 
  playerRank : number
}

function ProfileHerosection({player, playerRank}: typePlayerHeroSection) {



  
  const mileStoneCounter = () => {
    if ((player?.milestone?.UnlockingLevel - player?.Level_Id) < 0) {
      return <span></span>
    } else {
      return <span>(player?.milestone.?UnlockingLevel - player?.Level_Id).toString</span>
    }
  }

  const router = useRouter();
  const handleClaimReward = () => {
    router.push("/reward");
  };
  return (
    <div className="container mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Hello {player?.Player_name}</h1>
      <div className="flex flex-col flex-wrap md:flex-row gap-8 md:gap-12">
        <div className="flex-1">
          {/* Stats Card */}
          <div className="  rounded-lg  bg-blue-50   ">
            <div className="grid grid-cols-3 min  py-6">
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">Ranking</p>
                <p className="text-5xl font-bold text-gray-800">{playerRank} </p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">Points Earned</p>
                <p className="text-5xl font-bold text-gray-800">{player?.Playerpoint}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-1">Level</p>
                <p className="text-5xl font-bold text-gray-800">{player?.Level_Id}</p>
              </div>
            </div>

            {/* Streak Section */}
            <div className="flex items-center justify-center bg-blue-50 rounded-b-lg  py-6 w-full border-t-1">
              <span className="text-blue-300 mr-2 text-xl">🔥</span>
              <p className="text-gray-700 text-xl">{player?.streak} Days Streak</p>
            </div>
          </div>
        </div>

        {/* Right Gift Section */}
        <div className=" flex flex-row items-center  border-1 border-b-3 border-blue-400 gap-8 px-9 rounded-lg">
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
            <p className="text-gray-600 ">
              Solve {((player?.milestone?.UnlockingLevel - player?.Level_Id) < 0 ? 0 : player?.milestone?.UnlockingLevel - player?.Level_Id).toString()} more level to get your reward
            </p>
            <p className="mb-4 font-semibold ">{player?.milestone?.Milestone_Title}</p>
            <ProgressBar percentage={(player?.milestone?.UnlockingLevel - player?.Level_Id) < 0 ? 100 :(player?.Level_Id / player?.milestone?.UnlockingLevel) * 100} />
            <button className="quizPbtn mt-4" disabled={player?.Level_Id < player?.milestone?.UnlockingLevel} onClick={handleClaimReward}>
              Claim Reward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHerosection;
