// components/ProgressHeader.tsx
import React, { useEffect, useState } from 'react';

export default function ProgressHeader({ 
  currentPoints,
  nextRankThreshold,
  currentRankFloor,
  currentRank,
  onRankUp
}: {
  currentPoints: number;
  nextRankThreshold?: number;
  currentRankFloor?: number;
  currentRank?: number;
  onRankUp?: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [pointsNeeded, setPointsNeeded] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [prevPoints, setPrevPoints] = useState(0);

  useEffect(() => {
    if (nextRankThreshold && currentRankFloor) {
      // Calculate new progress
      const newProgress = Math.min(100, 
        ((currentPoints - currentRankFloor) / 
        (nextRankThreshold - currentRankFloor)) * 100
      );
      
      const newPointsNeeded = nextRankThreshold - currentPoints;
      
      // Detect when progress reaches 100%
      if (newProgress >= 100 && progress < 100) {
        setIsComplete(true);
        // Trigger rank up callback
        if (onRankUp) onRankUp();
      }
      
      // Reset completion if progress drops below 100%
      if (newProgress < 100 && isComplete) {
        setIsComplete(false);
      }
      
      setProgress(newProgress);
      setPointsNeeded(newPointsNeeded);
      setPrevPoints(currentPoints);
    }
  }, [currentPoints, nextRankThreshold, currentRankFloor]);

  return (
    <div className="progress-header mt-8">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-lg">
          Progress to {currentRank && currentRank > 1 ? `Rank #${currentRank - 1}` : 'Next Rank'}: {Math.round(progress)}%
        </span>
        <span className="text-sm font-semibold">
          +{pointsNeeded} pts needed
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-500 ease-out ${
            isComplete 
              ? 'bg-gradient-to-r from-green-400 to-green-600 animate-pulse' 
              : 'bg-gradient-to-r from-blue-500 to-indigo-600'
          }`} 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* 100% Completion Celebration */}
      {isComplete && (
        <div className="mt-3 p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg text-center">
          <div className="flex items-center justify-center">
            <span className="mr-2 text-2xl">🎉</span>
            <span className="font-bold">
              {currentRank 
                ? `Rank Up Achieved! You're now eligible for Rank #${currentRank - 1}`
                : 'Rank Up Achieved!'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}