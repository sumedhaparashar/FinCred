import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FinCredScore() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Your FinCred Score
          </h3>
          <div className="flex items-center">
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <i className="ri-arrow-up-line mr-1"></i>
              +15 pts
            </Badge>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <div className="relative">
            {/* Circular Progress */}
            <div className="w-48 h-48 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-gray-900 dark:text-white">650</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">FinCred Score</div>
              </div>
            </div>
            {/* Circular Progress Indicator */}
            <div className="absolute top-0 left-0 w-48 h-48">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset="99"
                  className="text-primary-500 dark:text-primary-400"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">8/10</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Challenges</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">5</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Badges</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">73%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Completion</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
