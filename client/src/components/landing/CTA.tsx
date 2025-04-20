import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <div className="bg-primary-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl font-heading">
          <span className="block">Ready to improve your financial future?</span>
          <span className="block text-primary-600 dark:text-primary-400">Join Fincread today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-primary-600 hover:bg-primary-700 transform hover:-translate-y-0.5 transition-all duration-150"
              >
                Get started
              </Button>
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Button
              variant="outline"
              size="lg"
              className="text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
