import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Hero() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 pt-10 sm:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:flex-col lg:justify-center">
            <h1>
              <span className="block text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
                Introducing Fincread
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-heading font-bold sm:text-5xl xl:text-6xl">
                <span className="block text-gray-900 dark:text-white">No Credit Score?</span>
                <span className="block text-primary-600 dark:text-primary-400">No Problem.</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Build your financial credibility through fun, interactive challenges. Perfect for
              students, freelancers, and gig workers without traditional credit history.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="bg-primary-600 hover:bg-primary-700 transform hover:-translate-y-0.5 transition-all duration-150"
                >
                  Start Building Your FinCred Score
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <Card className="relative block w-full overflow-hidden">
                <div className="p-8">
                  {/* XP Progress Visualization */}
                  <div className="mb-6 text-center">
                    <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300">
                      <i className="ri-line-chart-line text-3xl"></i>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                      FinCred Score
                    </h3>
                  </div>

                  {/* Sample Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Your Progress
                      </span>
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        650/1000
                      </span>
                    </div>
                    <Progress className="h-2.5" value={65} />
                  </div>

                  {/* Badges Preview */}
                  <div className="flex justify-center space-x-2 mb-4">
                    <div
                      className="h-10 w-10 rounded-full bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center"
                      title="Saver Badge"
                    >
                      <i className="ri-money-dollar-circle-line text-secondary-600 dark:text-secondary-400"></i>
                    </div>
                    <div
                      className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center"
                      title="Investor Badge"
                    >
                      <i className="ri-stack-line text-purple-600 dark:text-purple-400"></i>
                    </div>
                    <div
                      className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center opacity-40"
                      title="Locked Badge"
                    >
                      <i className="ri-lock-line text-gray-500 dark:text-gray-400"></i>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="px-3 py-1 text-xs font-semibold text-secondary-800 dark:text-secondary-200 bg-secondary-100 dark:bg-secondary-900 rounded-full">
                      Level 7 Financial Apprentice
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
