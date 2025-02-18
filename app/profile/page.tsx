
import React from "react";
import QuizLevelSections from "../components/quizLevelSections";
import LeaderBoard from "../components/leaderBoard";
import ProfileHerosection from "../components/profileHerosection";







function Profile() {
  
  return (
    <div className="p-6 min-h-screen">
  
      <ProfileHerosection  />
       <div className="mt-12">
        <QuizLevelSections currentLevel={20}/>
      </div>
      {/* Leaderboard Section */}

      <div className=" mt-12 container">
        <LeaderBoard player={1} friends={[2, 4, 9]} />
      </div>
    </div>
  );
}

export default Profile;
