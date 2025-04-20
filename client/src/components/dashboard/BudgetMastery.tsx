import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { PlusCircle, DollarSign, AlertCircle, ArrowUpDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type BudgetCategory = {
  id: string;
  name: string;
  icon: string;
  color: string;
  allocated: number;
  spent: number;
  remaining?: number; // Calculated field
  percentSpent?: number; // Calculated field
  status?: "healthy" | "warning" | "danger"; // Calculated field
};

// Mock data for initial display
const initialCategories: BudgetCategory[] = [
  {
    id: "cat1",
    name: "Housing",
    icon: "home",
    color: "bg-blue-500",
    allocated: 1200,
    spent: 1150,
  },
  {
    id: "cat2",
    name: "Food",
    icon: "utensils",
    color: "bg-green-500",
    allocated: 500,
    spent: 320,
  },
  {
    id: "cat3",
    name: "Transportation",
    icon: "car",
    color: "bg-purple-500",
    allocated: 300,
    spent: 275,
  },
  {
    id: "cat4",
    name: "Entertainment",
    icon: "film",
    color: "bg-amber-500",
    allocated: 200,
    spent: 230,
  },
  {
    id: "cat5",
    name: "Utilities",
    icon: "zap",
    color: "bg-red-500",
    allocated: 150,
    spent: 140,
  },
];

export default function BudgetMastery() {
  const [categories, setCategories] = useState<BudgetCategory[]>(
    initialCategories.map(category => ({
      ...category,
      remaining: category.allocated - category.spent,
      percentSpent: Math.round((category.spent / category.allocated) * 100),
      status: 
        (category.spent / category.allocated) > 0.9 
          ? "danger" 
          : (category.spent / category.allocated) > 0.7 
            ? "warning" 
            : "healthy"
    }))
  );

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setCategories(items);
    
    // This would trigger XP reward in a real implementation
    toast({
      title: "Budget categories reordered",
      description: "+5 XP for organizational skills!",
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-400 dark:bg-green-600";
      case "warning":
        return "bg-amber-400 dark:bg-amber-600";
      case "danger":
        return "bg-red-400 dark:bg-red-600";
      default:
        return "bg-gray-400 dark:bg-gray-600";
    }
  };

  const totalAllocated = categories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const overallPercentSpent = Math.round((totalSpent / totalAllocated) * 100);

  return (
    <Card>
      <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Budget Mastery
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Drag and drop to prioritize categories. Stay on budget to earn XP.
          </p>
        </div>
        <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
          <PlusCircle className="mr-1 h-4 w-4" />
          Add Category
        </Button>
      </CardHeader>

      <CardContent className="p-6">
        {/* Overall progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium text-gray-700 dark:text-gray-300">
              Overall Budget
            </div>
            <div className="text-sm font-medium">
              <span className="text-gray-900 dark:text-white">
                ${totalSpent.toLocaleString()}
              </span>{" "}
              <span className="text-gray-500 dark:text-gray-400">
                / ${totalAllocated.toLocaleString()}
              </span>
            </div>
          </div>
          <Progress 
            value={overallPercentSpent} 
            className="h-2"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>0%</span>
            <span>{overallPercentSpent}% spent</span>
            <span>100%</span>
          </div>
        </div>

        {/* Category list with drag and drop */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="categories">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {categories.map((category, index) => (
                  <Draggable
                    key={category.id}
                    draggableId={category.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div
                                {...provided.dragHandleProps}
                                className="mr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab"
                              >
                                <ArrowUpDown className="h-5 w-5" />
                              </div>
                              <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center mr-3`}>
                                <DollarSign className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {category.name}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  ${category.remaining && category.remaining > 0
                                    ? `${category.remaining} left`
                                    : category.remaining === 0
                                    ? "Budget used"
                                    : `${Math.abs(category.remaining || 0)} over budget`}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                <span className="text-gray-900 dark:text-white">
                                  ${category.spent}
                                </span>{" "}
                                <span className="text-gray-500 dark:text-gray-400">
                                  / ${category.allocated}
                                </span>
                              </div>
                              <div className="flex items-center text-sm">
                                <div
                                  className={`h-2 w-2 rounded-full mr-1 ${getStatusColor(
                                    category.status || "healthy"
                                  )}`}
                                />
                                <span className="text-gray-500 dark:text-gray-400">
                                  {category.percentSpent}% spent
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Progress 
                              value={category.percentSpent} 
                              className={`h-2 ${
                                category.status === "danger"
                                  ? "bg-red-200 dark:bg-red-900"
                                  : category.status === "warning"
                                  ? "bg-amber-200 dark:bg-amber-900"
                                  : "bg-green-200 dark:bg-green-900"
                              }`} 
                            />
                          </div>
                          {category.status === "danger" && (
                            <div className="mt-2 flex items-center text-xs text-red-600 dark:text-red-400">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              <span>Over budget. Adjust your spending to earn XP.</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
    </Card>
  );
}