import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Play, CheckCircle, Calendar, Target, ListTodo, Star } from "lucide-react";

export default function TodaysChallenge() {
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [challengeStarted, setChallengeStarted] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleStartChallenge = () => {
    setShowStartDialog(true);
  };

  const handleConfirmStart = () => {
    setIsStarting(true);

    // Simulate API call to start the challenge
    setTimeout(() => {
      setIsStarting(false);
      setShowStartDialog(false);
      setChallengeStarted(true);
      setShowSuccessDialog(true);

      // Show toast notification
      toast({
        title: "Challenge started!",
        description: "Get ready to improve your financial habits.",
      });

      // In a real app, we would invalidate relevant queries
      // queryClient.invalidateQueries({ queryKey: ['challenges'] });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Today's Challenge
          </h3>
          <Badge variant="outline" className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
            +50 XP
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-lg bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center">
              <Target className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
            </div>
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              Create a monthly budget
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Track your expenses for one week and categorize them to create a realistic monthly
              budget.
            </p>
            
            {!challengeStarted ? (
              <div className="mt-4">
                <Button 
                  className="inline-flex items-center px-4 py-2 bg-secondary-600 hover:bg-secondary-700"
                  onClick={handleStartChallenge}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Challenge
                </Button>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700 dark:text-gray-300">Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">3/7 days</span>
                </div>
                <Progress value={42} className="h-2 w-full bg-gray-200 dark:bg-gray-700" />
                
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-1">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                  <span>Sun</span>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-2 border-secondary-200 hover:bg-secondary-50 text-secondary-700 dark:border-secondary-700 dark:hover:bg-secondary-900 dark:text-secondary-400"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Start Challenge Dialog */}
      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start Financial Challenge</DialogTitle>
            <DialogDescription>
              Get ready to improve your budgeting skills and earn XP rewards.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <ListTodo className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Track all expenses</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Record every expense for 7 days in the app
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Create budget categories</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Organize expenses into at least 5 categories
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Star className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Set spending limits</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Establish realistic monthly spending limits for each category
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-md">
              <div className="flex">
                <div className="text-amber-600 dark:text-amber-400 text-sm">
                  <p className="font-medium">Rewards:</p>
                  <ul className="mt-1 list-disc ml-4 space-y-1 text-xs">
                    <li>50 XP for completing challenge</li>
                    <li>30 XP for staying within budget</li>
                    <li>"Budget Master" badge</li>
                    <li>+10 FinCred Score points</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStartDialog(false)} disabled={isStarting}>
              Cancel
            </Button>
            <Button 
              type="button" 
              className="bg-secondary-600 hover:bg-secondary-700" 
              disabled={isStarting}
              onClick={handleConfirmStart}
            >
              {isStarting ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </span>
                  Starting...
                </span>
              ) : (
                <span className="flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  Begin Challenge
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <motion.div 
              className="mx-auto mt-4 mb-2 bg-green-100 dark:bg-green-900 rounded-full p-3 w-16 h-16 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </motion.div>
            <DialogTitle className="text-center text-xl">Challenge Started!</DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-3 py-4">
            <p className="text-gray-600 dark:text-gray-400">
              You've started the budgeting challenge. Track your progress daily to maximize your rewards.
            </p>
            
            <motion.div
              className="bg-secondary-50 dark:bg-secondary-900/30 py-3 px-4 rounded-lg mx-auto max-w-xs flex items-center justify-center space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="font-medium text-secondary-700 dark:text-secondary-300">7 day challenge</div>
              <div className="w-1 h-8 bg-secondary-200 dark:bg-secondary-700 rounded-full"></div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">Ends April 27</div>
            </motion.div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              className="w-full bg-secondary-600 hover:bg-secondary-700" 
              onClick={() => setShowSuccessDialog(false)}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
