import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileCard() {
  const { user } = useAuth();
  const displayName = user?.displayName || "Jane Doe";
  const initials = displayName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="mx-auto h-24 w-24 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 text-2xl font-bold mb-4">
          {initials}
        </div>
        <h2 className="text-xl font-medium text-gray-900 dark:text-white">{displayName}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Level 7 Financial Apprentice</p>
        <div className="mt-4">
          <Badge variant="outline" className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
            650 XP
          </Badge>
        </div>
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Member since</dt>
              <dd className="text-sm text-gray-900 dark:text-white">Jan 14, 2023</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Challenges completed
              </dt>
              <dd className="text-sm text-gray-900 dark:text-white">47</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Current streak</dt>
              <dd className="text-sm text-gray-900 dark:text-white">8 days</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Badges earned</dt>
              <dd className="text-sm text-gray-900 dark:text-white">5 / 12</dd>
            </div>
          </dl>
        </div>
        <div className="mt-6">
          <Button className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700">
            <i className="ri-share-line mr-2"></i>
            Share FinCred Card
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
