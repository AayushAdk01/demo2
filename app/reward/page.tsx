import RewardCopy from "../components/rewardcopy";
import React from 'react'
import { auth } from "@/auth";
import fetchUser from "@/utils/fUser";


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


async function Reward() {
  const session = await auth()
  if(session) { 
    const user = session?.user
    const player: playerType | null  = await fetchUser(Number(user?.memberId), user?.firstName || "Anonymous", user?.email||"noemailavailable") ?? null
    return (
      <div>
       <RewardCopy player={ player}/>
      </div>
     )
  }
  
}

export default Reward