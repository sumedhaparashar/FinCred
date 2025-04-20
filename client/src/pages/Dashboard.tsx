import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Redirect } from "wouter";
import FinCredScore from "@/components/dashboard/FinCredScore";
import TodaysChallenge from "@/components/dashboard/TodaysChallenge";
import TaskTracker from "@/components/dashboard/TaskTracker";
import XPProgress from "@/components/dashboard/XPProgress";
import BadgesList from "@/components/dashboard/BadgesList";
import Leaderboard from "@/components/dashboard/Leaderboard";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect to="/auth" />;
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate font-heading">
              Welcome back, {user.displayName?.split(" ")[0] || "User"}!
            </h2>
            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <i className="ri-trophy-line flex-shrink-0 mr-1.5 text-primary-500 dark:text-primary-400"></i>
                Level 7 Financial Apprentice
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <i className="ri-calendar-line flex-shrink-0 mr-1.5 text-primary-500 dark:text-primary-400"></i>
                8-day streak
              </div>
            </div>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Button className="inline-flex items-center bg-primary-600 hover:bg-primary-700">
              <i className="ri-share-line mr-2"></i>
              Share Progress
            </Button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Dashboard Content */}
          <div className="lg:col-span-2 space-y-6">
            <FinCredScore />
            <TodaysChallenge />
            <TaskTracker />
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            <XPProgress />
            <BadgesList />
            <Leaderboard />
          </div>
        </div>
      </div>
    </section>
  );
}
