"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RewardCopy({ player }: { player: any }) {
  const router = useRouter();
  const [isClaiming, setIsClaiming] = useState(false);
  const [error, setError] = useState("");

  const handleClaimReward = async () => {
    setIsClaiming(true);
    try {
      const response = await fetch("/api/reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerId: player.Player_ID,
          milestoneId: player.milestone.Milestone_Id
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to claim reward");
      }

      // Refresh the page to show updated status
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Claim error:", err);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="reward-container">
      <h2 className="text-3xl font-bold mb-4">{player.milestone.Milestone_Title}</h2>
      <p className="text-lg mb-2">{player.milestone.Milestone_description}</p>
      <p className="mb-6">{player.milestone.Milestone_reward_message}</p>
      
      <button
        className="quizPbtn"
        onClick={handleClaimReward}
        disabled={isClaiming}
      >
        {isClaiming ? "Claiming..." : player.milestone.Milestone_Button_CTA}
      </button>
      
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
}