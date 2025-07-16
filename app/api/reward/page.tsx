"use client";

import React, { useContext } from "react";
import { playerContext } from "@/app/context/playerContext";

export default function RewardPage() {
  const { player } = useContext(playerContext);

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading your profile...
      </div>
    );
  }

  if (!player.milestone || player.Level_Id < player.milestone.UnlockingLevel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4"> No Reward Yet</h1>
        <p className="text-gray-600 mb-2">
          Complete more levels to unlock your next milestone reward.
        </p>
        <p className="text-gray-500">
          You’re currently at Level {player.Level_Id}. Keep going!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-6 bg-gray-50">
      <RewardCopy player={player} />
    </div>
  );
}
