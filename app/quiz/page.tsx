// pages/QuizHomePage.js
"use client"; // Mark this as a Client Component
import React, { useState } from "react";

import Pbtn from "../components/buttons/primarybtn";
import Image from "next/image";
import WhyplaySection from "./whyplaySection";
import QuizLevelSections from "../components/quizLevelSections";
import LeaderBoard from "../components/leaderBoard";
import InvitePopup from "../components/InvitePopup";
import ProfileHerosection from "../components/profileHerosection";
import ShareButton from "../components/buttons/sharebtn";
import QuizHero from "../components/quizHero";
import fetchPlayers from "@/utils/fPlayers";
import { auth } from "@/auth";
import LogoutButton from "../components/buttons/logoutBtn";
import LoginButton from "../components/buttons/loginBtn";
import { FectUser } from "@/utils/fUser";



async function  QuizHomePage() {
  const players = (await fetchPlayers() || [])
  const session = await auth()
  
if ( session ){
  const user = session.user
  
  const player = await FectUser(Number(user?.memberId),user?.name , user?.email )
  

  return (
    <div className="mt-10">
      
      {player?.Player_name}
      
      {/* Hero Section */}
   
      <QuizHero />
     
      {/* Why Play Section */}
      <div className="whyplay">
        <WhyplaySection />
      </div>
user id : {user?.memberId}

      {/* Quiz Level Section */}
      <div className="QuizSection mt-16">
        <QuizLevelSections />
      </div>

      {/* Leaderboard Section */}
      <div className="leaderboard section container">
        <LeaderBoard Players={players}  />
      </div>


    </div>
  );
} 
return ( 
  <div className="container"> 
    You are logged out 
    <LoginButton/>
  </div>
)
  
}

export default QuizHomePage;

export function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
    </div>
  );
}