import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TodaysChallenge() {
  return (
    <Card>
      <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Today's Challenge
          </h3>
          <Badge variant="outline" className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
            +50 XP
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-lg bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center">
              <i className="ri-money-dollar-box-line text-2xl text-secondary-600 dark:text-secondary-400"></i>
            </div>
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              Create a monthly budget
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Track your expenses for one week and categorize them to create a realistic monthly
              budget.
            </p>
            <div className="mt-4">
              <Button className="inline-flex items-center px-4 py-2 bg-secondary-600 hover:bg-secondary-700">
                Start Challenge
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
