"use client";
import React from "react";
import QuizLevelSections from "../components/quizLevelSections";
import LeaderBoard from "../components/leaderBoard";
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
        {percentage}%
      </div>
    </div>
  );
};

function Profile() {
  const router = useRouter();
  const handleClaimReward = () => {
    router.push("/reward");
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Hello Sudip</h1>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="flex-1">
            {/* Stats Card */}
            <div className="  rounded-lg  bg-blue-50   ">
              <div className="grid grid-cols-3  py-6">
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-1">Ranking</p>
                  <p className="text-5xl font-bold text-gray-800">20</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-1">Points Earned</p>
                  <p className="text-5xl font-bold text-gray-800">120,000</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-1">Level</p>
                  <p className="text-5xl font-bold text-gray-800">3</p>
                </div>
              </div>

              {/* Streak Section */}
              <div className="flex items-center justify-center bg-blue-50 rounded-b-lg  py-6 w-full border-t-1">
                <span className="text-blue-300 mr-2 text-xl">🔥</span>
                <p className="text-gray-700 text-xl">3 Days Streak</p>
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

            <div className="">
              <p className="text-gray-600 mb-4">
                Solve 3 more questions to get your reward
              </p>
              <ProgressBar percentage={25} />
              <button className="quizPbtn mt-4" onClick={handleClaimReward}>
                Claim Reward
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Quiz Level Section */}
      <div className="mt-12">
        <QuizLevelSections currentLevel={3} />
      </div>
      {/* Leaderboard Section */}

      <div className=" mt-12 container">
        <LeaderBoard player={1} friends={[2, 4, 9]} />
      </div>
    </div>
  );
}

export default Profile;
