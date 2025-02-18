"use client"
import { createContext, useContext, useEffect, useState } from "react";

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
}

export const playerContext = createContext<any>(null);

function PlayerContextProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with localStorage data if available
  const [player, setPlayer] = useState<typePlayer | null>(() => {
    if (typeof window !== 'undefined') {
      const savedPlayer = localStorage.getItem('player');
      return savedPlayer ? JSON.parse(savedPlayer, (key, value) => {
        if (key === 'lastLogin') return new Date(value);
        return value;
      }) : null;
    }
    return null;
  });

  const [tempScore, setTempScore] = useState(-1);

  // Save to localStorage whenever player changes
  useEffect(() => {
    if (player !== null) {
      localStorage.setItem('player', JSON.stringify(player));
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
      setPlayer(prev => prev ? {...prev, Level_Id: newLevel} : null);
    }
  };

  return (
    <playerContext.Provider value={value}>
      {children}
    </playerContext.Provider>
  );
}

export default PlayerContextProvider;

export function usePlayer() { 
  const context = useContext(playerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerContextProvider');
  }
  return context;
}