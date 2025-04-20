import { Card, CardContent, CardHeader } from "@/components/ui/card";

type LeaderboardUser = {
  id: number;
  name: string;
  xp: number;
  isCurrentUser?: boolean;
  rank: number;
};

const users: LeaderboardUser[] = [
  {
    id: 1,
    name: "Sarah M.",
    xp: 875,
    rank: 1,
  },
  {
    id: 2,
    name: "Alex T.",
    xp: 720,
    rank: 2,
  },
  {
    id: 3,
    name: "You",
    xp: 650,
    isCurrentUser: true,
    rank: 3,
  },
  {
    id: 4,
    name: "Maria K.",
    xp: 605,
    rank: 4,
  },
  {
    id: 5,
    name: "John D.",
    xp: 590,
    rank: 5,
  },
];

export default function Leaderboard() {
  return (
    <Card>
      <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Leaderboard</h3>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <li key={user.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <span
                  className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    user.rank <= 3
                      ? "bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {user.rank}
                </span>
                <span
                  className={`ml-3 block text-sm font-medium ${
                    user.isCurrentUser
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {user.name}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{user.xp} XP</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-center">
          <a
            href="#"
            className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            View full leaderboard
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
