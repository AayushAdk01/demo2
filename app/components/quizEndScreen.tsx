"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function QuizEndScreen({
  player,
  finalScore,
  starsEarned,
  levelId,
  correctAnswers
}: {
  player: any;
  finalScore: number;
  starsEarned: number;
  levelId: number;
  correctAnswers: number;
}) {
  const router = useRouter();
  
  useEffect(() => {
    const updateScore = async () => {
      try {
        // Calculate new level (simple increment example)
        const newLevel = player.Level_Id + 1;
        
        // Call your existing API
        const response = await fetch("/api/update-score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            playerId: player.Player_ID,
            finalScore: player.Playerpoint + finalScore,
            newlevel: newLevel,
            starsEarned,
            levelId,
            correctAnswers
          })
        });
        
        if (!response.ok) throw new Error("Score update failed");
        
        // Redirect to reward page after successful update
        router.push("/reward");
      } catch (error) {
        console.error("Score update error:", error);
        router.push("/error");
      }
    };

    updateScore();
  }, [player, finalScore, starsEarned, levelId, correctAnswers, router]);

  return (
    <div className="quiz-end-screen">
      <h2>Quiz Completed!</h2>
      <p>Calculating your results...</p>
    </div>
  );
}