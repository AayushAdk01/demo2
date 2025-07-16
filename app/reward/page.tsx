import RewardCopy from "../components/rewardcopy";
import { auth } from "@/auth";
import fetchUser from "@/utils/fUser";
import { redirect } from "next/navigation";

type MilestoneType = {
  Milestone_Id: number;
  Milestone_Title: string;
  Milestone_description: string;
  UnlockingLevel: number;
  Milestone_reward_message: string;
  Milestone_Link: string; 
  Milestone_Button_CTA: string;
};

type PlayerType = {
  Player_ID: number;
  Player_name: string;
  Playerpoint: number;
  streak: number;
  lastLogin: Date;
  Level_Id: number;
  Milestone_Id?: number;
  milestone: MilestoneType; // Make milestone nullable
};

async function Reward() {
  const session = await auth();
  
  // Handle session and user safely
  if (!session || !session.user) {
    redirect("/login");
    return null; // Prevent further execution
  }
  
  const user = session.user;
  
  // Check if required fields exist
  if (!user.memberId) {
    redirect("/login");
    return null;
  }
  
  // Use the PlayerType for the player variable
  const player: PlayerType = await fetchUser(
    Number(user.memberId),
    user.firstName || "Anonymous",
    user.email || "noemailavailable"
  );
  
  if (!player) return <div>Player not found</div>;
  if (!player.milestone) return <div>No milestones available</div>;
  
  return (
    <div>
      <RewardCopy player={player} />
    </div>
  );
}

export default Reward;