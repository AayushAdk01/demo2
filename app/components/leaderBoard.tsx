import { auth } from "@/auth";
import fetchPlayers from "@/utils/fPlayers";
import fetchRank from "@/utils/fRanking";
import fetchUser from "@/utils/fUser";
import Image from "next/image";

type leaderBoardType = {
  player: number;
  friends: Array<number>;
};

type milestoneType = {
  Milestone_Id: number;
  Milestone_Title: string;
  Milestone_description: string;
  UnlockingLevel: number;
  UploadRequired: boolean;
};

type playerType = {
  Player_ID: number;
  Player_name: string;
  Playerpoint: number;
  streak: number;
  lastLogin: Date;
  Level_Id?: number;
  Milestone_Id?: number;
  milestone: milestoneType;
};

type PlayersType = { Players: playerType[] | [] };

export default async function LeaderBoard() {
  const Players = (await fetchPlayers()) || [];
  const session = await auth();
  const user = session?.user;
  const name = user?.firstName == null ? "Anonymous" : user?.firstName + " " + user?.lastName;

  const player = session ? await fetchUser(
    Number(user?.memberId),
    name,
    user?.email || ""
  ) : null;
  const playerId = session ? player?.Player_ID : null;
  const rank = player ? await fetchRank(player.Playerpoint) : 100;

  // Sort players by points in descending order
  const sortedPlayers = [...Players]?.sort(
    (a, b) => b?.Playerpoint - a?.Playerpoint
  );
  
  // Get the top 5 players
  let topPlayers = sortedPlayers?.slice(0, 5);
  
  // Check if the current player is in the top 5
  const isPlayerInTop5 = topPlayers?.some((p) => p?.Player_ID === playerId);

  // If the current player is not in the top 5, add them to the table
  if (!isPlayerInTop5) {
    const currentPlayer = Players?.find((p) => p?.Player_ID === playerId);
    if (currentPlayer) {
      topPlayers.push(currentPlayer);
    }
  }

  return (
    <div className="py-24">
      <div className="container">
        <h2 className="px-4 py-1 text-center bg-blue-400 text-4xl w-fit rounded font-bold text-gray-900 m-auto intersect:motion-preset-slide-up motion-delay-200 intersect-once">
          LeaderBoard
        </h2>
        <p className="w-96 m-auto text-center mt-6 mb-10 intersect:motion-preset-slide-up motion-delay-200 intersect-once">
          Check our top performers
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="intersect:motion-preset-slide-up motion-delay-200 intersect-once min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gradient-to-b from-gray-950 to-gray-800 text-white uppercase text-sm font-semibold">
            <tr>
              <th className="px-6 py-3 text-left tracking-wider">Ranking</th>
              <th className="px-6 py-3 text-left tracking-wider">Name</th>
              <th className="px-6 py-3 text-left tracking-wider">Points</th>
              <th className="px-6 py-3 text-left tracking-wider">Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {topPlayers.map((playerData, index) => {
              const isCurrentPlayer = playerData?.Player_ID === playerId;
              const leaderBoardRank = isCurrentPlayer ? rank : index + 1;
              const isTopThree = index === 0 || index === 1 || index === 2;
              let rowClass = "";
              
              if (index === 0) {
                rowClass = "gold-row text-black font-bold";
              } else if (index === 1) {
                rowClass = "silver-row text-black font-semibold";
              } else if (index === 2) {
                rowClass = "bronze-row text-black font-medium";
              } else if (isCurrentPlayer) {
                rowClass = "bg-blue-100 font-semibold text-gray-900";
              }

              return (
                <tr
                  key={playerData?.Player_ID}
                  className={`${rowClass} transition-all`}
                >
                  <td className="px-6 py-4 text-sm flex items-center gap-2">
                  #{leaderBoardRank}
                  </td>
                  <td className="px-6 py-4 text-sm ">
                    

                   
                
  <span>{playerData?.Player_name}</span>
 
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {playerData?.Playerpoint.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    Level {playerData?.Level_Id}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}