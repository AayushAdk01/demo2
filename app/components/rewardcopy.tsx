"use client";
import React, { useState, useRef, useContext} from "react";
import Image from "next/image";
import { playerContext } from "../context/playerContext";
import { Resend } from 'resend';
import { useRouter } from "next/navigation";


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


  type typeRewardCopy =  { 
    player : playerType | null
  }


function RewardCopy({player}:typeRewardCopy) {
  const router = useRouter()
  const reward = player?.milestone
  const playerId = player?.Player_ID
  const currentMilestone = player?.milestone?.Milestone_Id ?? 1
  
  const handleSumit = async (e: React.FormEvent) => { 
    e.preventDefault()
   const  nextMilestone = currentMilestone + 1
    const response = await fetch("/api/reward", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerId,  nextMilestone }),
    });
  
    if (response.ok) { 
      
    
      const data = await response.json()
      if (reward?.Milestone_Link) {
        window.open(String(reward.Milestone_Link), "_blank");
      }
      console.log(data.nextMilestone)
      router.push("/quiz")
      

    } else {
      console.error("Failed to send email");
    }
  };



  return (
    <div className="container">
      <h1 className="title mt-20">{reward?.Milestone_Title}</h1>
      <p className="mt-6">
      {reward?.Milestone_description}      </p>
      <p className="mt-4">{reward?.Milestone_reward_message}</p>
      <div className="my-11">        <button className="quizPbtn" onClick={handleSumit}>{reward?.Milestone_Button_CTA}</button>


      </div>
     
   
    </div>
  );
}

export default RewardCopy;
