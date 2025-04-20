import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ScoreGraph() {
  return (
    <Card>
      <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          FinCred Score Progression
        </h3>
      </CardHeader>
      <CardContent className="p-6">
        {/* Simplified graph implementation */}
        <div className="bg-white dark:bg-gray-800 h-64 rounded-md">
          <div className="relative h-full">
            {/* Y-axis labels */}
            <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 py-2">
              <span>1000</span>
              <span>750</span>
              <span>500</span>
              <span>250</span>
              <span>0</span>
            </div>

            {/* Graph area */}
            <div className="ml-8 h-full flex items-end">
              {/* Graph bars */}
              <div className="flex-1 h-full flex items-end justify-around">
                {[20, 35, 45, 38, 55, 65].map((height, index) => (
                  <div
                    key={index}
                    className="w-4 bg-primary-200 dark:bg-primary-900 rounded-t"
                    style={{ height: `${height}%` }}
                  >
                    <div
                      className="w-full bg-primary-500 dark:bg-primary-400 rounded-t transition-all duration-300"
                      style={{ height: "100%" }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 w-full flex justify-around text-xs text-gray-500 dark:text-gray-400 pl-8 py-2">
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
