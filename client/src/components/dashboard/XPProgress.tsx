import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function XPProgress() {
  const currentXP = 650;
  const maxXP = 1000;
  const xpPercentage = (currentXP / maxXP) * 100;

  return (
    <Card>
      <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          XP Progress
        </h3>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-1">
          <div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{currentXP}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400"> / {maxXP} XP</span>
          </div>
          <div>
            <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
              Next Level: 8
            </span>
          </div>
        </div>
        <Progress value={xpPercentage} className="h-3" />
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            You're making great progress! Complete today's challenge to earn more XP.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
