import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Badge = {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  darkColor: string;
  iconColor: string;
  darkIconColor: string;
  locked?: boolean;
};

const badges: Badge[] = [
  {
    id: 1,
    name: "Saver",
    description: "Saved 3 months of expenses",
    icon: "ri-money-dollar-circle-line",
    color: "bg-secondary-100",
    darkColor: "dark:bg-secondary-900",
    iconColor: "text-secondary-600",
    darkIconColor: "dark:text-secondary-400",
  },
  {
    id: 2,
    name: "Investor",
    description: "Started investment account",
    icon: "ri-funds-line",
    color: "bg-purple-100",
    darkColor: "dark:bg-purple-900",
    iconColor: "text-purple-600",
    darkIconColor: "dark:text-purple-400",
  },
  {
    id: 3,
    name: "Protector",
    description: "Set up insurance coverage",
    icon: "ri-shield-check-line",
    color: "bg-blue-100",
    darkColor: "dark:bg-blue-900",
    iconColor: "text-blue-600",
    darkIconColor: "dark:text-blue-400",
  },
  {
    id: 4,
    name: "Learner",
    description: "Completed 5 educational modules",
    icon: "ri-book-read-line",
    color: "bg-amber-100",
    darkColor: "dark:bg-amber-900",
    iconColor: "text-amber-600",
    darkIconColor: "dark:text-amber-400",
  },
  {
    id: 5,
    name: "Consistent",
    description: "7-day streak completed",
    icon: "ri-calendar-check-line",
    color: "bg-green-100",
    darkColor: "dark:bg-green-900",
    iconColor: "text-green-600",
    darkIconColor: "dark:text-green-400",
  },
  {
    id: 6,
    name: "Credit Master",
    description: "Pay bills on time for 3 months",
    icon: "ri-bank-card-line",
    color: "bg-gray-100",
    darkColor: "dark:bg-gray-700",
    iconColor: "text-gray-500",
    darkIconColor: "dark:text-gray-400",
    locked: true,
  },
  {
    id: 7,
    name: "Budgeter",
    description: "Create and follow a budget",
    icon: "ri-exchange-dollar-line",
    color: "bg-gray-100",
    darkColor: "dark:bg-gray-700",
    iconColor: "text-gray-500",
    darkIconColor: "dark:text-gray-400",
    locked: true,
  },
];

export default function EarnedBadges() {
  return (
    <Card>
      <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Earned Badges
        </h3>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`flex flex-col items-center group ${badge.locked ? "opacity-40" : ""}`}
            >
              <div
                className={`h-16 w-16 rounded-full ${badge.color} ${
                  badge.darkColor
                } flex items-center justify-center ${
                  !badge.locked ? "group-hover:scale-110 transition-transform" : ""
                }`}
              >
                <i className={`${badge.icon} text-2xl ${badge.iconColor} ${badge.darkIconColor}`}></i>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                {badge.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
