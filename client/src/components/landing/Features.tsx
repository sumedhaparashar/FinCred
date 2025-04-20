export default function Features() {
  return (
    <div className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary-600 dark:text-primary-400 tracking-wide uppercase">
            FEATURES
          </h2>
          <p className="mt-1 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-4xl font-heading">
            Build your financial future
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-600 dark:text-gray-300">
            Engage with daily challenges, track your progress, and earn rewards.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {/* Feature 1 */}
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 dark:bg-primary-600 text-white">
                <i className="ri-trophy-line text-xl"></i>
              </div>
              <div className="ml-16">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Gamified XP System
                </h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  Earn experience points for completing financial challenges and watching your score
                  grow.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 dark:bg-primary-600 text-white">
                <i className="ri-calendar-check-line text-xl"></i>
              </div>
              <div className="ml-16">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Daily Challenges
                </h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  Complete bite-sized financial tasks every day to build consistent money management
                  habits.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 dark:bg-primary-600 text-white">
                <i className="ri-line-chart-line text-xl"></i>
              </div>
              <div className="ml-16">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Track Financial Growth
                </h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  Visualize your progress with interactive charts and celebrate reaching new
                  financial milestones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
