

type leaderBoardType = {
  player: number;
  friends: number[];
};
import { useContext } from "react";
import { playerContext } from "../context/playerContext";

import ShareButton from "./buttons/sharebtn";

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

type PlayersType ={ Players : playerType[] | []}

export default  function LeaderBoard({Players}:PlayersType) {
  const {player}= useContext(playerContext)
  

  
  // Sort players by points in descending order
  const sortedPlayers = [...Players]?.sort((a, b) => b?.Playerpoint - a?.Playerpoint);
  // Get the top 5 players
  let topPlayers = sortedPlayers?.slice(0, 5);

  // Check if the current player is in the top 5
  const isPlayerInTop5 = topPlayers?.some((p) => p?.Player_ID === player?.Player_ID);

  // If the current player is not in the top 5, add them to the table
  if (!isPlayerInTop5) {
    const currentPlayer = Players?.find((p) => p?.Player_ID === player?.Player_ID);
    if (currentPlayer) {
      topPlayers.push(currentPlayer); // Replace the 5th player with the current player
    }
  }
 

  return (
    <div className=" py-24">
     
      <div className="container">
        <h2 className="px-4 py-1 text-center bg-blue-400 text-4xl w-fit rounded font-bold text-gray-900 m-auto intersect:motion-preset-slide-up motion-delay-200 intersect-once ">
          Leader Board
        </h2>
        <p className="w-96 m-auto text-center mt-6 mb-10 intersect:motion-preset-slide-up motion-delay-200 intersect-once">
          Check our top performers
        </p>
      </div>
      <div className="overflow-x-auto">
      <table className="intersect:motion-preset-slide-up motion-delay-200 intersect-once min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
  <thead className="bg-gradient-to-b from-gray-950 to-gray-800 text-white uppercase text-sm font-semibold">
    <tr>
      <th className="px-6 py-3 text-left tracking-wider">Name</th>
      <th className="px-6 py-3 text-left tracking-wider">Points</th>
      <th className="px-6 py-3 text-left tracking-wider">Level</th>
      <th className="px-6 py-3 text-left tracking-wider">Upcoming Reward</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-300">
    {topPlayers.map((playerData) => {
      const isCurrentPlayer = playerData?.Player_ID === player?.Player_ID;

      const rowClass = isCurrentPlayer
        && "bg-blue-100 font-semibold text-gray-900"
        


      return (
        <tr key={playerData?.Player_ID} className={`${rowClass} transition-all`}>
          <td className="px-6 py-4 text-sm ">{playerData?.Player_name}</td>
          <td className="px-6 py-4 text-sm">{playerData?.Playerpoint}</td>
          <td className="px-6 py-4 text-sm">{playerData?.Level_Id}</td>
          <td className="px-6 py-4 text-sm">{playerData?.milestone?.Milestone_Title}</td>
        </tr>
      );
    })}
  </tbody>
</table>

      </div>
    </div>
  );
}