"use client"; // Mark this as a Client Component in Next.js

import { Players } from "@/lib/db";
type leaderBoardType = {
  player: number;
  friends: Array<number>;
};

export default function LeaderBoard({ player, friends }: leaderBoardType) {
  // Sort players by points in descending order
  const sortedPlayers = Players.sort((a, b) => b.point - a.point);

  // Get the top 5 players
  let topPlayers = sortedPlayers.slice(0, 5);

  // Check if the current player is in the top 5
  const isPlayerInTop5 = topPlayers.some((p) => p.player_id === player);

  // If the current player is not in the top 5, add them to the table
  if (!isPlayerInTop5) {
    const currentPlayer = Players.find((p) => p.player_id === player);
    if (currentPlayer) {
      topPlayers.push(currentPlayer); // Replace the 5th player with the current player
    }
  }
  const friendsToBeAdded = friends.filter((a) => {
    topPlayers.some((p) => p.player_id != a);
  });

  //   check if the friends are in the top 5 or no

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
        <table className="intersect:motion-preset-slide-up motion-delay-200 intersect-once min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className=" bg-blue-200 rounded-lg">
              <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Points
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Level
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {topPlayers.map((playerData) => {
              // Check if the current row is the player or a friend
              const isCurrentPlayer = playerData.player_id === player;
              const isFriend = friends.includes(playerData.player_id);

              // Apply conditional styling
              const rowClass = isCurrentPlayer
                ? "bg-blue-100" // Highlight the current player
                : isFriend
                ? "bg-gray-100" // Highlight friends
                : "";

              return (
                <tr key={playerData.player_id} className={rowClass}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {playerData.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {playerData.point}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {playerData.level}
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
