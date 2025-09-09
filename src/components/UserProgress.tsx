import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Zap, Star, TrendingUp } from 'lucide-react';

interface UserStats {
  totalPoints: number;
  streak: number;
  questionsAnswered: number;
  correctAnswers: number;
  level: number;
}

interface UserProgressProps {
  userStats: UserStats;
}

export const UserProgress: React.FC<UserProgressProps> = ({ userStats }) => {
  const accuracy = userStats.questionsAnswered > 0 
    ? Math.round((userStats.correctAnswers / userStats.questionsAnswered) * 100)
    : 0;

  const nextLevelPoints = userStats.level * 1000;
  const currentLevelProgress = userStats.totalPoints % 1000;
  const progressPercentage = (currentLevelProgress / 1000) * 100;

  const getLevelTitle = (level: number) => {
    if (level <= 2) return 'Novice Scholar';
    if (level <= 5) return 'Knowledge Seeker';
    if (level <= 10) return 'Academic Star';
    if (level <= 15) return 'Learning Master';
    return 'Genius Mind';
  };

  return (
    <Card className="nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="h-5 w-5 text-primary" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Level and Points */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-5 w-5 text-warning" />
            <span className="text-lg font-bold">Level {userStats.level}</span>
          </div>
          <Badge variant="outline" className="mb-3 text-xs">
            {getLevelTitle(userStats.level)}
          </Badge>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{currentLevelProgress}/1000 XP</span>
              <span>Next: Level {userStats.level + 1}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-accent rounded-lg nova-transition hover:scale-105">
            <div className="flex items-center justify-center mb-1">
              <Zap className="h-4 w-4 text-primary mr-1" />
              <span className="text-xs font-medium">Points</span>
            </div>
            <p className="text-lg font-bold text-primary">{userStats.totalPoints.toLocaleString()}</p>
          </div>

          <div className="text-center p-3 bg-accent rounded-lg nova-transition hover:scale-105">
            <div className="flex items-center justify-center mb-1">
              <Target className="h-4 w-4 text-success mr-1" />
              <span className="text-xs font-medium">Streak</span>
            </div>
            <p className="text-lg font-bold text-success">{userStats.streak}</p>
          </div>

          <div className="text-center p-3 bg-accent rounded-lg nova-transition hover:scale-105">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-4 w-4 text-warning mr-1" />
              <span className="text-xs font-medium">Accuracy</span>
            </div>
            <p className="text-lg font-bold text-warning">{accuracy}%</p>
          </div>

          <div className="text-center p-3 bg-accent rounded-lg nova-transition hover:scale-105">
            <div className="flex items-center justify-center mb-1">
              <Trophy className="h-4 w-4 text-destructive mr-1" />
              <span className="text-xs font-medium">Solved</span>
            </div>
            <p className="text-lg font-bold text-destructive">{userStats.questionsAnswered}</p>
          </div>
        </div>

        {/* Achievement Badges */}
        {userStats.totalPoints > 0 && (
          <div className="pt-3 border-t">
            <p className="text-xs font-medium mb-2 text-center">Achievements</p>
            <div className="flex flex-wrap gap-1 justify-center">
              {userStats.totalPoints >= 100 && (
                <Badge variant="secondary" className="text-xs">First 100 🎯</Badge>
              )}
              {userStats.streak >= 5 && (
                <Badge variant="secondary" className="text-xs">Hot Streak 🔥</Badge>
              )}
              {userStats.correctAnswers >= 10 && (
                <Badge variant="secondary" className="text-xs">Problem Solver 🧠</Badge>
              )}
              {userStats.level >= 5 && (
                <Badge variant="secondary" className="text-xs">Rising Star ⭐</Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};