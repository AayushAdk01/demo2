import React from 'react'
import fetchPlayers from '@/utils/fPlayers'
import LeaderBoard from './leaderBoard'

type milestoneType = { 
    Milestone_Id : number, 
    Milestone_Title : string, 
    Milestone_description : string , 
    UnlockingLevel : number, 
    UploadRequired : boolean, 
  }
  
  type playerType = { 
    Player_ID :number, 
    Player_name : string, 
    Playerpoint : number, 
    streak : number, 
    lastLogin : Date, 
    Level_Id ?: number,
    Milestone_Id ?: number , 
    milestone : milestoneType
  }
  
  type Players = playerType[]

  async function LeaderBoardSection() {
    const Players: Players = await fetchPlayers();
  
    return (
      <div>
        <LeaderBoard Players={Players} />
      </div>
    );
  }

export default LeaderBoardSection