"use client"; 

import { createContext, useContext, useEffect, useState } from "react";
import { cookies } from 'next/headers'


type typePlayer = {
  Level_Id: number;
  Milestone_Id: number;
  Player_ID: number;
  Player_name: string;
  Playerpoint: number;
  Temp_Score: number;
  lastLogin: Date;
  streak: number;
  user_Id: number;
};

export const playerContext = createContext<any>(null);

function PlayerContextProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<typePlayer | null>(null); 
  const [tempScore, setTempScore] = useState(0);

  useEffect(() => {
    try {
      const storedPlayer = localStorage.getItem("player");
      if (storedPlayer) {
        setPlayer(JSON.parse(storedPlayer));
        

      }
    } catch (error) {
      console.error("Failed to parse player data:", error);
    }
  }, []);

  useEffect(() => {
    if (player !== null) {
      localStorage.setItem("player", JSON.stringify(player));

      
    }
  }, [player]);

  const AssignPlayerData = (playerData: typePlayer) => {
    setPlayer(playerData);
  };

  const value = {
    player,
    AssignPlayerData,
    playerLevel: player?.Level_Id,
    setPlayerLevel: (newLevel: number) => {
      setPlayer((prev) => (prev ? { ...prev, Level_Id: newLevel } : null));
    },
    setTempScore,
    tempScore,
  };

  return (
    <playerContext.Provider value={value}>{children}</playerContext.Provider>
  );
}

export default PlayerContextProvider;
