import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Crown, 
  Medal, 
  Award,
  Flame,
  BookOpen,
  Brain,
  Sparkles
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  category: 'learning' | 'streak' | 'time' | 'mastery' | 'special';
}

interface AchievementSystemProps {
  userStats: any;
  onAchievementUnlocked?: (achievement: Achievement) => void;
}

export const AchievementSystem: React.FC<AchievementSystemProps> = ({ 
  userStats, 
  onAchievementUnlocked 
}) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  // Initialize achievements
  useEffect(() => {
    const allAchievements: Achievement[] = [
      // Learning Achievements
      {
        id: 'first_question',
        title: 'First Steps',
        description: 'Answer your first question',
        icon: <Target className="h-4 w-4" />,
        progress: Math.min(userStats.questionsAnswered, 1),
        maxProgress: 1,
        isUnlocked: userStats.questionsAnswered >= 1,
        rarity: 'common',
        points: 50,
        category: 'learning'
      },
      {
        id: 'question_master_10',
        title: 'Question Master',
        description: 'Answer 10 questions correctly',
        icon: <Brain className="h-4 w-4" />,
        progress: Math.min(userStats.correctAnswers, 10),
        maxProgress: 10,
        isUnlocked: userStats.correctAnswers >= 10,
        rarity: 'common',
        points: 100,
        category: 'learning'
      },
      {
        id: 'scholar_50',
        title: 'Dedicated Scholar',
        description: 'Answer 50 questions correctly',
        icon: <BookOpen className="h-4 w-4" />,
        progress: Math.min(userStats.correctAnswers, 50),
        maxProgress: 50,
        isUnlocked: userStats.correctAnswers >= 50,
        rarity: 'rare',
        points: 300,
        category: 'learning'
      },
      {
        id: 'genius_100',
        title: 'Genius Mind',
        description: 'Answer 100 questions correctly',
        icon: <Crown className="h-4 w-4" />,
        progress: Math.min(userStats.correctAnswers, 100),
        maxProgress: 100,
        isUnlocked: userStats.correctAnswers >= 100,
        rarity: 'epic',
        points: 500,
        category: 'learning'
      },

      // Streak Achievements
      {
        id: 'streak_3',
        title: 'Getting Warmed Up',
        description: 'Get a 3-question streak',
        icon: <Flame className="h-4 w-4" />,
        progress: Math.min(userStats.streak, 3),
        maxProgress: 3,
        isUnlocked: userStats.streak >= 3,
        rarity: 'common',
        points: 75,
        category: 'streak'
      },
      {
        id: 'streak_5',
        title: 'Hot Streak',
        description: 'Get a 5-question streak',
        icon: <Flame className="h-4 w-4" />,
        progress: Math.min(userStats.streak, 5),
        maxProgress: 5,
        isUnlocked: userStats.streak >= 5,
        rarity: 'rare',
        points: 150,
        category: 'streak'
      },
      {
        id: 'streak_10',
        title: 'On Fire!',
        description: 'Get a 10-question streak',
        icon: <Flame className="h-4 w-4" />,
        progress: Math.min(userStats.streak, 10),
        maxProgress: 10,
        isUnlocked: userStats.streak >= 10,
        rarity: 'epic',
        points: 400,
        category: 'streak'
      },
      {
        id: 'streak_20',
        title: 'Unstoppable Force',
        description: 'Get a 20-question streak',
        icon: <Crown className="h-4 w-4" />,
        progress: Math.min(userStats.streak, 20),
        maxProgress: 20,
        isUnlocked: userStats.streak >= 20,
        rarity: 'legendary',
        points: 1000,
        category: 'streak'
      },

      // Points Achievements
      {
        id: 'points_1000',
        title: 'Point Collector',
        description: 'Earn 1,000 points',
        icon: <Star className="h-4 w-4" />,
        progress: Math.min(userStats.totalPoints, 1000),
        maxProgress: 1000,
        isUnlocked: userStats.totalPoints >= 1000,
        rarity: 'common',
        points: 100,
        category: 'learning'
      },
      {
        id: 'points_5000',
        title: 'Point Master',
        description: 'Earn 5,000 points',
        icon: <Medal className="h-4 w-4" />,
        progress: Math.min(userStats.totalPoints, 5000),
        maxProgress: 5000,
        isUnlocked: userStats.totalPoints >= 5000,
        rarity: 'rare',
        points: 250,
        category: 'learning'
      },
      {
        id: 'points_10000',
        title: 'Point Legend',
        description: 'Earn 10,000 points',
        icon: <Trophy className="h-4 w-4" />,
        progress: Math.min(userStats.totalPoints, 10000),
        maxProgress: 10000,
        isUnlocked: userStats.totalPoints >= 10000,
        rarity: 'legendary',
        points: 750,
        category: 'learning'
      },

      // Level Achievements
      {
        id: 'level_5',
        title: 'Rising Star',
        description: 'Reach level 5',
        icon: <Sparkles className="h-4 w-4" />,
        progress: Math.min(userStats.level, 5),
        maxProgress: 5,
        isUnlocked: userStats.level >= 5,
        rarity: 'rare',
        points: 200,
        category: 'mastery'
      },
      {
        id: 'level_10',
        title: 'Expert Learner',
        description: 'Reach level 10',
        icon: <Award className="h-4 w-4" />,
        progress: Math.min(userStats.level, 10),
        maxProgress: 10,
        isUnlocked: userStats.level >= 10,
        rarity: 'epic',
        points: 500,
        category: 'mastery'
      },

      // Special Achievements
      {
        id: 'perfectionist',
        title: 'Perfectionist',
        description: 'Get 100% accuracy on 10+ questions',
        icon: <Crown className="h-4 w-4" />,
        progress: userStats.questionsAnswered >= 10 && 
                 (userStats.correctAnswers / userStats.questionsAnswered) === 1 ? 1 : 0,
        maxProgress: 1,
        isUnlocked: userStats.questionsAnswered >= 10 && 
                   (userStats.correctAnswers / userStats.questionsAnswered) === 1,
        rarity: 'legendary',
        points: 1000,
        category: 'special'
      }
    ];

    // Check for new achievements
    const previouslyUnlocked = achievements.map(a => a.id);
    const newlyUnlocked = allAchievements.filter(a => 
      a.isUnlocked && !previouslyUnlocked.includes(a.id)
    );

    if (newlyUnlocked.length > 0) {
      setNewAchievements(newlyUnlocked);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
      
      // Notify parent component
      newlyUnlocked.forEach(achievement => {
        onAchievementUnlocked?.(achievement);
      });
    }

    setAchievements(allAchievements);
  }, [userStats]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 border-gray-300';
      case 'rare': return 'text-blue-600 border-blue-300 bg-blue-50';
      case 'epic': return 'text-purple-600 border-purple-300 bg-purple-50';
      case 'legendary': return 'text-yellow-600 border-yellow-300 bg-yellow-50';
      default: return 'text-gray-600 border-gray-300';
    }
  };

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'nova-gradient';
      default: return 'bg-gray-500';
    }
  };

  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const lockedAchievements = achievements.filter(a => !a.isUnlocked);

  return (
    <div className="space-y-6">
      {/* Celebration Animation */}
      {showCelebration && newAchievements.length > 0 && (
        <Card className="nova-glow border-2 border-primary animate-bounce">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="h-6 w-6 text-primary animate-spin" />
              <span className="font-bold text-primary">Achievement Unlocked!</span>
              <Trophy className="h-6 w-6 text-primary animate-spin" />
            </div>
            {newAchievements.map((achievement, index) => (
              <div key={achievement.id} className="animate-fade-in-up">
                <p className="font-semibold">{achievement.title}</p>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                <Badge className={`${getRarityBadgeColor(achievement.rarity)} text-white mt-1`}>
                  +{achievement.points} XP
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Achievement Summary */}
      <Card className="nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Achievements ({unlockedAchievements.length}/{achievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress 
            value={(unlockedAchievements.length / achievements.length) * 100} 
            className="h-3"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Total Achievement Points: {unlockedAchievements.reduce((sum, a) => sum + a.points, 0)}
          </p>
        </CardContent>
      </Card>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <Card className="nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Unlocked Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {unlockedAchievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`p-3 rounded-lg border-2 ${getRarityColor(achievement.rarity)} nova-transition hover:scale-[1.02]`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 nova-gradient rounded-lg text-white">
                        {achievement.icon}
                      </div>
                      <div>
                        <p className="font-semibold">{achievement.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${getRarityBadgeColor(achievement.rarity)} text-white mb-1`}>
                        {achievement.rarity.toUpperCase()}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        +{achievement.points} XP
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <Card className="nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Locked Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {lockedAchievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className="p-3 rounded-lg border border-muted bg-muted/20 opacity-70"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                        {achievement.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-muted-foreground">
                          {achievement.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        {achievement.rarity.toUpperCase()}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        +{achievement.points} XP
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress Bar for locked achievements */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.maxProgress) * 100}
                      className="h-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};