import React, { useEffect, useState } from 'react';

type Player = {
  Player_ID: number;
  Player_name: string;
  Playerpoint: number;
  Level_Id?: number | null;
  rank?: number;
};

type LeaderboardResponse = {
  topPlayers: Player[];
  currentUser: Player & {
    rank: number;
    nextRankThreshold: number;
    currentRankFloor: number;
  };
  surroundingPlayers?: any;
};

export default function LeaderboardSidebar({
  playerId,
  currentQuizScore
}: {
  playerId: number;
  currentQuizScore: number;
}) {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRankUp, setShowRankUp] = useState(false);
  const [rankUpMessage, setRankUpMessage] = useState('');
  const [prevRank, setPrevRank] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/leaderboard?userId=${playerId}&previewScore=${currentQuizScore}`);
        const json = await res.json();

        if (res.status !== 200) {
          setError(json.error || 'Unknown error');
          return;
        }

        if (json.currentUser?.rank && prevRank !== null && json.currentUser.rank < prevRank) {
          const rankDifference = prevRank - json.currentUser.rank;
          setRankUpMessage(`🎉 Rank up! From #${prevRank} to #${json.currentUser.rank} (+${rankDifference})`);
          setShowRankUp(true);
          setTimeout(() => setShowRankUp(false), 5000);
        }

        if (json.currentUser?.rank) {
          setPrevRank(json.currentUser.rank);
        }

        setData(json);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        setError('Failed to load leaderboard.');
      } finally {
        setIsLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      fetchData();
    }, 300);

    const interval = setInterval(fetchData, 5000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [playerId, prevRank, currentQuizScore]);

  if (isLoading) return <div>Loading leaderboard...</div>;
  if (error) return <div className="text-red-500 text-sm text-center">{error}</div>;
  if (!data) return <div>No data available.</div>;

  const { topPlayers, currentUser } = data;
  const sortedTopPlayers = [...topPlayers]
    .sort((a: Player, b: Player) => b.Playerpoint - a.Playerpoint)
    .slice(0, 6);

  const topPlayerPoints = Math.max(...sortedTopPlayers.map(p => p.Playerpoint));

  const progress = currentUser.nextRankThreshold && currentUser.currentRankFloor
    ? Math.min(
        100,
        (((currentUser.Playerpoint + currentQuizScore) - currentUser.currentRankFloor) /
          (currentUser.nextRankThreshold - currentUser.currentRankFloor)) * 100
      )
    : 0;

  const toNextRank = Math.max(0, currentUser.nextRankThreshold - (currentUser.Playerpoint + currentQuizScore));

  const cheerMessages = [
    "Keep going! You're doing great!",
    "Every point brings you closer to the top!",
    "You're moving up the ranks!",
    "Great progress! Keep it up!",
    "You're unstoppable!"
  ];
  const randomCheer = cheerMessages[Math.floor(Math.random() * cheerMessages.length)];

  return (
    <div className="leaderboard-sidebar bg-white p-4 rounded-lg shadow-md border border-gray-200 w-72">
      <h3 className="font-bold text-lg mb-3 text-center">LIVE LEADERBOARD</h3>

      {showRankUp ? (
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-3 rounded-lg mb-4 text-center animate-pulse">
          {rankUpMessage}
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 p-2 rounded text-center mb-4 text-sm">
          {randomCheer}
        </div>
      )}

      {sortedTopPlayers.map((player: Player) => (
        <div key={player.Player_ID} className="mb-3">
          <div className="flex items-center">
            <span className="mr-2">
              {player.rank === 1 && '🥇'}
              {player.rank === 2 && '🥈'}
              {player.rank === 3 && '🥉'}
            </span>
            <span className={`font-medium ${player.Player_ID === playerId ? 'text-blue-600' : ''}`}>
              {player.Player_name}
              {player.Player_ID === playerId && ' (You)'}
            </span>
          </div>
          <div className="flex items-center mt-1">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
              <div
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full"
                style={{ width: `${(player.Playerpoint / topPlayerPoints) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-500">
              {Math.round((player.Playerpoint / topPlayerPoints) * 100)}%
            </span>
          </div>
        </div>
      ))}

      <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <div className="font-semibold mb-2">Your Progress (Rank #{currentUser.rank})</div>

        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-sm">New Score:</span>
            <span className="font-medium">{currentUser.Playerpoint + currentQuizScore}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-2">
          <div className="flex justify-between">
            <span className="text-sm">To Next Rank:</span>
            <span className="font-medium">+{toNextRank} pts</span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {toNextRank === 0
              ? "🎉 You've reached the next rank!"
              : `You need ${toNextRank} more points to reach rank #${currentUser.rank - 1}`}
          </div>
        </div>
      </div>
    </div>
  );
}
