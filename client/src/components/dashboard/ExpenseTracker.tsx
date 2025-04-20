import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Plus, DollarSign, Receipt, Edit2, Trash2 } from "lucide-react";

type Expense = {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  time: string;
};

// Mock data for initial display
const initialExpenses: Expense[] = [
  {
    id: "exp1",
    amount: 12.50,
    category: "food",
    description: "Lunch at cafe",
    date: "2025-04-20",
    time: "12:30"
  },
  {
    id: "exp2",
    amount: 35.75,
    category: "transportation",
    description: "Uber ride",
    date: "2025-04-20",
    time: "09:15"
  }
];

// Category options with icons and colors
const categories = [
  { id: "food", name: "Food & Dining", icon: "🍽️", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  { id: "transportation", name: "Transportation", icon: "🚗", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  { id: "entertainment", name: "Entertainment", icon: "🎬", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
  { id: "utilities", name: "Utilities", icon: "💡", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  { id: "shopping", name: "Shopping", icon: "🛍️", color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200" },
  { id: "housing", name: "Housing", icon: "🏠", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200" },
  { id: "health", name: "Healthcare", icon: "🏥", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
  { id: "other", name: "Other", icon: "📌", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200" },
];

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(
    new Date().toTimeString().split(' ')[0].substring(0, 5)
  );
  
  const { toast } = useToast();
  
  const resetForm = () => {
    setAmount("");
    setCategory("");
    setDescription("");
    setDate(new Date().toISOString().split('T')[0]);
    setTime(new Date().toTimeString().split(' ')[0].substring(0, 5));
  };
  
  const handleAddExpense = () => {
    setShowAddDialog(true);
  };

  const handleSubmit = () => {
    if (!amount || !category || !description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newExpense: Expense = {
        id: `exp${Date.now()}`,
        amount: parseFloat(amount),
        category,
        description,
        date,
        time
      };
      
      setExpenses([newExpense, ...expenses]);
      setIsSubmitting(false);
      setShowAddDialog(false);
      resetForm();
      
      toast({
        title: "Expense added",
        description: "Your expense has been recorded successfully",
      });
      
      // In a real app, we would also update XP and other stats here
    }, 1000);
  };
  
  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    
    toast({
      title: "Expense deleted",
      description: "Your expense has been removed",
    });
  };
  
  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[7]; // Default to "Other"
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  const getTodaysTotal = () => {
    const today = new Date().toISOString().split('T')[0];
    const todaysExpenses = expenses.filter(expense => expense.date === today);
    return todaysExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  return (
    <Card>
      <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex flex-wrap justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white flex items-center">
            Daily Expenses Tracker
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
              (Today: {formatCurrency(getTodaysTotal())})
            </span>
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Record your daily spending to stay on budget
          </p>
        </div>
        <Button 
          onClick={handleAddExpense}
          className="mt-2 sm:mt-0 bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </CardHeader>

      <CardContent className="p-6">
        {expenses.length > 0 ? (
          <div className="space-y-4">
            {expenses.map(expense => {
              const categoryInfo = getCategoryInfo(expense.category);
              
              return (
                <div 
                  key={expense.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-wrap justify-between"
                >
                  <div className="flex items-start">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${categoryInfo.color}`}>
                      <span className="text-lg">{categoryInfo.icon}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {expense.description}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                        <span>{categoryInfo.name}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(expense.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {expense.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-2 sm:mt-0">
                    <div className="font-medium text-lg text-gray-900 dark:text-white mr-4">
                      {formatCurrency(expense.amount)}
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        onClick={() => handleDeleteExpense(expense.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Receipt className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No expenses recorded yet</p>
            <p className="text-sm mt-1">Click "Add Expense" to start tracking your spending</p>
          </div>
        )}
      </CardContent>
      
      {/* Add Expense Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
            <DialogDescription>
              Record your spending to track your budget
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <div className="col-span-3 relative">
                <DollarSign className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="pl-9"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <div className="col-span-3">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        <span className="flex items-center">
                          <span className="mr-2">{cat.icon}</span>
                          {cat.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <div className="col-span-3">
                <Input
                  id="description"
                  placeholder="What did you spend on?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <div className="col-span-3">
                <Input
                  id="date"
                  type="date"
                  value={date}
                  max={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <div className="col-span-3">
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-primary-600 hover:bg-primary-700" 
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </span>
                  Saving...
                </span>
              ) : (
                "Save Expense"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}