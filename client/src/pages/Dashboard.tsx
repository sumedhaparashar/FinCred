import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Redirect } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, Award, Wallet, ChartBar, Mail } from "lucide-react";
import FinCredScore from "@/components/dashboard/FinCredScore";
import TodaysChallenge from "@/components/dashboard/TodaysChallenge";
import TaskTracker from "@/components/dashboard/TaskTracker";
import XPProgress from "@/components/dashboard/XPProgress";
import BadgesList from "@/components/dashboard/BadgesList";
import BudgetMastery from "@/components/dashboard/BudgetMastery";
import BankSync from "@/components/dashboard/BankSync";
import EnhancedLeaderboard from "@/components/dashboard/EnhancedLeaderboard";
import ExpenseTracker from "@/components/dashboard/ExpenseTracker";
import { calculateXPProgress } from "@/lib/xpEngine";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect to="/auth" />;
  }
  
  // Calculate level and progress using XP engine
  const mockXP = 1250; // This would come from user.xp in a real app
  const xpProgress = calculateXPProgress(mockXP);

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
                <Crown className="flex-shrink-0 mr-1.5 h-4 w-4 text-primary-500 dark:text-primary-400" />
                Level {xpProgress.currentLevel} Financial Apprentice
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Award className="flex-shrink-0 mr-1.5 h-4 w-4 text-primary-500 dark:text-primary-400" />
                8-day streak
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <ChartBar className="flex-shrink-0 mr-1.5 h-4 w-4 text-primary-500 dark:text-primary-400" />
                {mockXP.toLocaleString()} XP total
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center md:mt-0 md:ml-4">
            <div className="relative mr-4">
              <Mail className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[10px] font-medium text-white">
                2
              </span>
            </div>
            <Button className="inline-flex items-center bg-primary-600 hover:bg-primary-700">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Account
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab Content */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
                <EnhancedLeaderboard />
              </div>
            </div>
          </TabsContent>
          
          {/* Budget Tab Content */}
          <TabsContent value="budget" className="mt-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <BudgetMastery />
                <ExpenseTracker />
              </div>
              <div>
                <XPProgress />
              </div>
            </div>
          </TabsContent>
          
          {/* Challenges Tab Content */}
          <TabsContent value="challenges" className="mt-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <TodaysChallenge />
                <TaskTracker />
              </div>
              <div className="space-y-6">
                <BadgesList />
              </div>
            </div>
          </TabsContent>
          
          {/* Accounts Tab Content */}
          <TabsContent value="accounts" className="mt-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <BankSync />
              </div>
              <div>
                <FinCredScore />
              </div>
            </div>
          </TabsContent>
          
          {/* Social Tab Content */}
          <TabsContent value="social" className="mt-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                {/* This would be social feed in a real app */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium mb-4">Social Activity Coming Soon</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Connect with friends, share financial achievements, and compete in challenges.
                  </p>
                </div>
              </div>
              <div>
                <EnhancedLeaderboard />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
