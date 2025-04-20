import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Star, Users, Swords, Crown, Circle, CheckCircle2, XCircle, Clock } from "lucide-react";

// Types for our leaderboard and duels
type LeaderboardUser = {
  id: number;
  name: string;
  xp: number;
  level: number;
  rank: number;
  streak: number;
  isCurrentUser?: boolean;
  avatarUrl?: string;
};

type Duel = {
  id: number;
  opponentName: string;
  opponentAvatar?: string;
  challengeType: "savings" | "spending" | "streak";
  startDate: string;
  endDate: string;
  userScore?: number;
  opponentScore?: number;
  status: "pending" | "active" | "won" | "lost" | "draw";
  xpReward?: number;
};

// Mock data
const leaderboardUsers: LeaderboardUser[] = [
  {
    id: 1,
    name: "Financial Wizard",
    xp: 2540,
    level: 15,
    rank: 1,
    streak: 15,
    avatarUrl: "https://ui-avatars.com/api/?name=Financial+Wizard&background=a855f7&color=fff"
  },
  {
    id: 2,
    name: "Budget Master",
    xp: 2345,
    level: 14,
    rank: 2,
    streak: 12,
    avatarUrl: "https://ui-avatars.com/api/?name=Budget+Master&background=3b82f6&color=fff"
  },
  {
    id: 3,
    name: "Jane Doe",
    xp: 2150,
    level: 13,
    rank: 3,
    streak: 10,
    isCurrentUser: true,
    avatarUrl: "https://ui-avatars.com/api/?name=Jane+Doe&background=10b981&color=fff"
  },
  {
    id: 4,
    name: "Thrifty Saver",
    xp: 1920,
    level: 11,
    rank: 4,
    streak: 7,
    avatarUrl: "https://ui-avatars.com/api/?name=Thrifty+Saver&background=f59e0b&color=fff"
  },
  {
    id: 5,
    name: "Frugal Investor",
    xp: 1750,
    level: 10,
    rank: 5,
    streak: 5,
    avatarUrl: "https://ui-avatars.com/api/?name=Frugal+Investor&background=ef4444&color=fff"
  }
];

const activeDuels: Duel[] = [
  {
    id: 1,
    opponentName: "Budget Master",
    opponentAvatar: "https://ui-avatars.com/api/?name=Budget+Master&background=3b82f6&color=fff",
    challengeType: "savings",
    startDate: "Apr 15, 2025",
    endDate: "Apr 22, 2025",
    userScore: 120,
    opponentScore: 145,
    status: "active"
  },
  {
    id: 2,
    opponentName: "Financial Wizard",
    opponentAvatar: "https://ui-avatars.com/api/?name=Financial+Wizard&background=a855f7&color=fff",
    challengeType: "streak",
    startDate: "Apr 18, 2025",
    endDate: "Apr 25, 2025",
    status: "pending"
  }
];

const completedDuels: Duel[] = [
  {
    id: 3,
    opponentName: "Thrifty Saver",
    opponentAvatar: "https://ui-avatars.com/api/?name=Thrifty+Saver&background=f59e0b&color=fff",
    challengeType: "spending",
    startDate: "Apr 1, 2025",
    endDate: "Apr 8, 2025",
    userScore: 250,
    opponentScore: 200,
    status: "won",
    xpReward: 75
  },
  {
    id: 4,
    opponentName: "Frugal Investor",
    opponentAvatar: "https://ui-avatars.com/api/?name=Frugal+Investor&background=ef4444&color=fff",
    challengeType: "savings",
    startDate: "Mar 25, 2025",
    endDate: "Apr 1, 2025",
    userScore: 180,
    opponentScore: 210,
    status: "lost",
    xpReward: 25
  }
];

export default function EnhancedLeaderboard() {
  const [showDuelDialog, setShowDuelDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<LeaderboardUser | null>(null);
  const [challengeType, setChallengeType] = useState<string>("");
  const [isCreatingDuel, setIsCreatingDuel] = useState(false);
  const { toast } = useToast();

  const handleChallengeClick = (user: LeaderboardUser) => {
    if (user.isCurrentUser) {
      toast({
        title: "Cannot challenge yourself",
        description: "Pick another user from the leaderboard to duel with.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedUser(user);
    setShowDuelDialog(true);
  };

  const handleCreateDuel = () => {
    if (!challengeType) {
      toast({
        title: "Challenge type required",
        description: "Please select a challenge type for the duel.",
        variant: "destructive"
      });
      return;
    }
    
    setIsCreatingDuel(true);
    
    // Simulate API call to create duel
    setTimeout(() => {
      setIsCreatingDuel(false);
      setShowDuelDialog(false);
      
      toast({
        title: "Challenge sent!",
        description: `Your ${challengeType} challenge has been sent to ${selectedUser?.name}.`,
      });
      
      // Reset form
      setChallengeType("");
      setSelectedUser(null);
    }, 1500);
  };

  const getChallengeTypeIcon = (type: string) => {
    switch (type) {
      case "savings":
        return <Circle className="mr-1 h-4 w-4 text-blue-500" />;
      case "spending":
        return <Circle className="mr-1 h-4 w-4 text-green-500" />;
      case "streak":
        return <Circle className="mr-1 h-4 w-4 text-amber-500" />;
      default:
        return <Circle className="mr-1 h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case "active":
        return (
          <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700">
            <Swords className="mr-1 h-3 w-3" />
            Active
          </Badge>
        );
      case "won":
        return (
          <Badge variant="outline" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Won
          </Badge>
        );
      case "lost":
        return (
          <Badge variant="outline" className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700">
            <XCircle className="mr-1 h-3 w-3" />
            Lost
          </Badge>
        );
      case "draw":
        return (
          <Badge variant="outline" className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700">
            <Star className="mr-1 h-3 w-3" />
            Draw
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Leaderboard & Duels
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Compete with others and earn XP rewards
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="leaderboard" className="w-full">
          <TabsList className="grid grid-cols-2 h-auto p-1 mx-3 my-3">
            <TabsTrigger value="leaderboard" className="flex items-center">
              <Trophy className="mr-1.5 h-4 w-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="duels" className="flex items-center">
              <Swords className="mr-1.5 h-4 w-4" />
              PvP Duels
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="leaderboard" className="mt-0">
            {/* Seasonal Banner */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-800 dark:to-primary-600 p-3 flex justify-between items-center">
              <div className="flex items-center">
                <Crown className="text-white h-5 w-5 mr-2" />
                <div className="text-white font-medium">Spring Season</div>
              </div>
              <div className="text-white text-sm">Ends in 15 days</div>
            </div>
          
            {/* Leaderboard List */}
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {leaderboardUsers.map((user, index) => (
                <motion.li
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`px-6 py-4 flex items-center justify-between ${
                    user.isCurrentUser ? "bg-primary-50 dark:bg-primary-900/20" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center font-medium text-gray-500 dark:text-gray-400">
                      {user.rank}
                    </div>
                    
                    <div className="h-9 w-9 rounded-full overflow-hidden ml-2">
                      <img 
                        src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`} 
                        alt={user.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-3">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        {user.isCurrentUser && (
                          <Badge variant="outline" className="ml-2 text-xs py-0 h-5">You</Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <span>Level {user.level}</span>
                        <span className="mx-1">•</span>
                        <span>{user.streak} day streak</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="mr-4 text-right">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {user.xp.toLocaleString()} XP
                      </div>
                    </div>
                    
                    {!user.isCurrentUser && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleChallengeClick(user)}
                        className="py-1 px-3 h-auto text-xs bg-white dark:bg-gray-800"
                      >
                        <Swords className="mr-1 h-3 w-3" />
                        Challenge
                      </Button>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
            
            <div className="p-4 text-center">
              <Button variant="link" className="text-primary-600 dark:text-primary-400">
                View Full Leaderboard
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="duels" className="mt-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Active Duels Section */}
              <div>
                <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    <Users className="mr-1.5 h-4 w-4" />
                    Active Challenges ({activeDuels.length})
                  </h4>
                </div>
                
                {activeDuels.length > 0 ? (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {activeDuels.map((duel) => (
                      <li key={duel.id} className="px-6 py-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img 
                                src={duel.opponentAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(duel.opponentName)}`} 
                                alt={duel.opponentName} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            
                            <div className="ml-3">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {duel.opponentName}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                <span className="flex items-center">
                                  {getChallengeTypeIcon(duel.challengeType)}
                                  {duel.challengeType.charAt(0).toUpperCase() + duel.challengeType.slice(1)} Challenge
                                </span>
                                <span className="mx-1">•</span>
                                <span>Ends {duel.endDate}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            {getStatusBadge(duel.status)}
                            
                            {duel.status === "active" && (
                              <div className="mt-2 text-sm">
                                <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md flex justify-between min-w-[100px]">
                                  <div className="font-medium text-green-600 dark:text-green-400">
                                    {duel.userScore || 0}
                                  </div>
                                  <div className="font-medium text-gray-500 dark:text-gray-400">vs</div>
                                  <div className="font-medium text-red-600 dark:text-red-400">
                                    {duel.opponentScore || 0}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    <p>No active challenges</p>
                  </div>
                )}
              </div>
              
              {/* Completed Duels Section */}
              <div>
                <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    <Star className="mr-1.5 h-4 w-4" />
                    Past Challenges ({completedDuels.length})
                  </h4>
                </div>
                
                {completedDuels.length > 0 ? (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {completedDuels.map((duel) => (
                      <li key={duel.id} className="px-6 py-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img 
                                src={duel.opponentAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(duel.opponentName)}`} 
                                alt={duel.opponentName} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            
                            <div className="ml-3">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {duel.opponentName}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                <span className="flex items-center">
                                  {getChallengeTypeIcon(duel.challengeType)}
                                  {duel.challengeType.charAt(0).toUpperCase() + duel.challengeType.slice(1)} Challenge
                                </span>
                                <span className="mx-1">•</span>
                                <span>Ended {duel.endDate}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(duel.status)}
                              {duel.xpReward && (
                                <div className="text-xs font-medium text-primary-600 dark:text-primary-400 flex items-center">
                                  +{duel.xpReward} XP
                                </div>
                              )}
                            </div>
                            
                            <div className="mt-2 text-sm">
                              <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md flex justify-between min-w-[100px]">
                                <div className={`font-medium ${duel.status === "won" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                                  {duel.userScore}
                                </div>
                                <div className="font-medium text-gray-500 dark:text-gray-400">vs</div>
                                <div className={`font-medium ${duel.status === "lost" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                                  {duel.opponentScore}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    <p>No completed challenges</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 text-center">
              <Button className="bg-primary-600 hover:bg-primary-700 w-full">
                <Swords className="mr-2 h-4 w-4" />
                Start a New Challenge
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Challenge Dialog */}
      <Dialog open={showDuelDialog} onOpenChange={setShowDuelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Challenge {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              Select a challenge type and duration for your PvP duel.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Challenge Type
              </label>
              <Select
                value={challengeType}
                onValueChange={setChallengeType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select challenge type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="savings">Savings Challenge</SelectItem>
                  <SelectItem value="spending">Spending Control Challenge</SelectItem>
                  <SelectItem value="streak">Login Streak Challenge</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <AnimatePresence>
              {challengeType && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md border border-gray-200 dark:border-gray-700 text-sm">
                    {challengeType === "savings" && (
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white mb-1">Savings Challenge</div>
                        <p className="text-gray-600 dark:text-gray-400">
                          Compete to save the highest percentage of your income over the next 7 days. The winner receives bonus XP and a special badge.
                        </p>
                      </div>
                    )}
                    
                    {challengeType === "spending" && (
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white mb-1">Spending Control Challenge</div>
                        <p className="text-gray-600 dark:text-gray-400">
                          Stay under budget in specific categories. The player with the best budget adherence wins XP and improves their FinCred Score.
                        </p>
                      </div>
                    )}
                    
                    {challengeType === "streak" && (
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white mb-1">Login Streak Challenge</div>
                        <p className="text-gray-600 dark:text-gray-400">
                          Maintain the longest daily login and activity streak. Complete financial tasks each day to stay ahead of your opponent.
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-2 text-primary-600 dark:text-primary-400 font-medium">
                      Reward: Up to 100 XP + Seasonal Ranking Points
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDuelDialog(false)} disabled={isCreatingDuel}>
              Cancel
            </Button>
            <Button 
              type="button" 
              className="bg-primary-600 hover:bg-primary-700" 
              disabled={!challengeType || isCreatingDuel}
              onClick={handleCreateDuel}
            >
              {isCreatingDuel ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </span>
                  Creating...
                </span>
              ) : (
                <span className="flex items-center">
                  <Swords className="mr-2 h-4 w-4" />
                  Send Challenge
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}