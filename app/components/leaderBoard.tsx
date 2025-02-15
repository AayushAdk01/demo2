

import { Players } from "@/lib/db";

type Player = {
  player_id: number;
  name: string;
  point: number;
  level: number;
  streak: number;
  friends: number[];
};

type LeaderBoardProps = {
  player: number;
  friends: number[];
};

export default function LeaderBoard({ player, friends }: LeaderBoardProps) {
  // Create a sorted copy of the players array
  const sortedPlayers = [...Players].sort((a, b) => b.point - a.point);

  // Get the top 5 players
  let topPlayers: Player[] = sortedPlayers.slice(0, 5);

  // Get the current player object
  const currentPlayer = Players.find((p) => p.player_id === player);

  // Add the current player if they are not in the top 5 and exist in the database
  if (currentPlayer && !topPlayers.some((p) => p.player_id === player)) {
    topPlayers.push(currentPlayer);
  }

  // Filter out friends who are not in the top 5
  const friendsToBeAdded = friends
    .map((friendId) => Players.find((p) => p.player_id === friendId))
    .filter((friend): friend is Player => friend !== undefined && !topPlayers.some((p) => p.player_id === friend.player_id));

  // Add friends to the leaderboard
  topPlayers = [...topPlayers, ...friendsToBeAdded];

  // Sort the final leaderboard to ensure proper order
  topPlayers.sort((a, b) => b.point - a.point);

  return (
    <div className="py-16 bg-gradient-to-b from-purple-100 to-white min-h-screen flex flex-col items-center">
      <div className="container max-w-4xl bg-gradient-to-r from-white to-purple-50 p-8 rounded-lg shadow-xl">
        <h2 className="text-4xl font-bold text-center text-purple-800 mb-4">Leaderboard</h2>
        <p className="text-center text-gray-700 mb-6">Check out our top performers!</p>
        <div className="overflow-x-auto mb-10">
          <table className="min-w-full bg-gray-100 border border-gray-300 rounded-xl shadow-md">
            <thead>
              <tr className="bg-purple-800 text-white rounded-t-3xl">
                <th className="px-6 py-3 text-left font-medium uppercase">Rank</th>
                <th className="px-6 py-3 text-left font-medium uppercase">Name</th>
                <th className="px-6 py-3 text-left font-medium uppercase">PCMRTS</th>
                <th className="px-6 py-3 text-left font-medium uppercase">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 mb-10">
              {topPlayers.map((playerData, index) => {
                const isCurrentPlayer = playerData.player_id === player;
                const isFriend = friends.includes(playerData.player_id);
                const rowClass = isCurrentPlayer
                  ? "bg-purple-100 font-semibold"
                  : isFriend
                  ? "bg-gray-200"
                  : "";

                // Determine the trophy icon based on rank
                let trophyIcon = null;
                if (index === 0) {
                  trophyIcon = "🥇"; // Gold trophy
                } else if (index === 1) {
                  trophyIcon = "🥈"; // Silver trophy
                } else if (index === 2) {
                  trophyIcon = "🥉"; // Bronze trophy
                }

                return (
                  <tr key={playerData.player_id} className={`${rowClass} hover:bg-gray-50 transition-all`}>
                    <td className="px-6 py-4 text-gray-800 font-medium">
                      {trophyIcon ? (
                        <span className="text-2xl">{trophyIcon}</span>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-800 font-medium">{playerData.name}</td>
                    <td className="px-6 py-4 text-gray-700">{playerData.point}</td>
                    <td className="px-6 py-4 text-gray-600">{playerData.level}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}