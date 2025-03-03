
import React from "react";
import QuizLevelSections from "../components/quizLevelSections";
import LeaderBoard from "../components/leaderBoard";
import ProfileHerosection from "../components/profileHerosection";
import LeaderBoardSection from "../components/leaderBoardSection";






function Profile() {
  
  return (
    <div className="p-6 min-h-screen">
  
      <ProfileHerosection  />
       <div className="mt-12">
        <QuizLevelSections/>
      </div>
      {/* Leaderboard Section */}

      <div className=" mt-12 container">
        {/* <LeaderBoard  /> */}
        <LeaderBoardSection/>
      </div>
    </div>
  );
}

export default Profile;
