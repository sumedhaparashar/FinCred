import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Task = {
  id: number;
  title: string;
  status: "completed" | "current" | "upcoming";
  xp: number;
  day: string;
};

const tasks: Task[] = [
  {
    id: 1,
    title: "Set up emergency fund",
    status: "completed",
    xp: 25,
    day: "Monday",
  },
  {
    id: 2,
    title: "Audit subscription services",
    status: "completed",
    xp: 25,
    day: "Tuesday",
  },
  {
    id: 3,
    title: "Research low-fee investing options",
    status: "current",
    xp: 30,
    day: "Today",
  },
  {
    id: 4,
    title: "Set up automatic savings",
    status: "upcoming",
    xp: 35,
    day: "Thursday",
  },
  {
    id: 5,
    title: "Review credit report",
    status: "upcoming",
    xp: 40,
    day: "Friday",
  },
];

export default function TaskTracker() {
  return (
    <Card>
      <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Weekly Task Tracker
        </h3>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {tasks.map((task, taskIdx) => (
              <li key={task.id}>
                <div className="relative pb-8">
                  {taskIdx !== tasks.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                      aria-hidden="true"
                    ></span>
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800 ${
                          task.status === "completed"
                            ? "bg-green-500 dark:bg-green-600"
                            : task.status === "current"
                            ? "bg-primary-500 dark:bg-primary-600"
                            : "bg-gray-400 dark:bg-gray-500"
                        }`}
                      >
                        {task.status === "completed" ? (
                          <i className="ri-check-line text-white"></i>
                        ) : task.status === "current" ? (
                          <i className="ri-time-line text-white"></i>
                        ) : (
                          <i className="ri-lock-line text-white"></i>
                        )}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p
                          className={`text-sm ${
                            task.status === "upcoming"
                              ? "text-gray-500 dark:text-gray-400"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {task.title}{" "}
                          <span
                            className={`font-medium ${
                              task.status === "completed"
                                ? "text-green-600 dark:text-green-400"
                                : task.status === "current"
                                ? "text-primary-600 dark:text-primary-400"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            +{task.xp} XP
                          </span>
                        </p>
                      </div>
                      <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                        <time>{task.day}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
