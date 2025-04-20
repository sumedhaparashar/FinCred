export interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  finCredScore: number;
  level: number;
  xp: number;
  streak: number;
  badges: Badge[];
  createdAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt?: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  icon: string;
  status: 'incomplete' | 'complete' | 'in-progress';
  dueDate: Date;
}

export interface Task {
  id: string;
  title: string;
  xpReward: number;
  status: 'completed' | 'current' | 'upcoming';
  day: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  rank: number;
  isCurrentUser?: boolean;
}
