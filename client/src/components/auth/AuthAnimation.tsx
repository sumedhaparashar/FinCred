import { Card } from "@/components/ui/card";

export default function AuthAnimation() {
  return (
    <div className="mt-10 lg:mt-0 flex justify-center">
      <div className="lg:max-w-lg">
        <Card className="overflow-hidden shadow p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900">
              <i className="ri-rocket-2-line text-3xl text-primary-600 dark:text-primary-400"></i>
            </div>
            <h3 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">
              Level Up Your Financial Journey
            </h3>
          </div>

          {/* Animation Placeholder - Level Up Visualization */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-center h-64">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                {/* Character progression visualization */}
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center border-4 border-secondary-400 dark:border-secondary-600">
                    <span className="text-2xl font-bold text-secondary-700 dark:text-secondary-300">
                      1
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center border-2 border-white dark:border-gray-700">
                    <i className="ri-arrow-up-line text-white"></i>
                  </div>
                </div>
                <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 self-center mx-1"></div>
                <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center border-4 border-gray-300 dark:border-gray-500 opacity-70">
                  <span className="text-xl font-bold text-gray-500 dark:text-gray-400">2</span>
                </div>
                <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 self-center mx-1"></div>
                <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center border-4 border-gray-300 dark:border-gray-500 opacity-50">
                  <span className="text-xl font-bold text-gray-500 dark:text-gray-400">3</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                Complete challenges to increase your FinCred Score!
              </p>
              <div className="mt-4">
                <span className="px-3 py-1 text-xs font-semibold text-primary-800 dark:text-primary-200 bg-primary-100 dark:bg-primary-900 rounded-full">
                  +500 XP on Signup
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
