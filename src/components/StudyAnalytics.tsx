import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target, 
  BookOpen,
  Brain,
  Zap,
  Trophy
} from 'lucide-react';

interface StudySession {
  date: string;
  questionsAnswered: number;
  correctAnswers: number;
  timeSpent: number; // in minutes
  subjects: string[];
  points: number;
}

interface AnalyticsData {
  weeklyProgress: number[];
  totalStudyTime: number;
  averageAccuracy: number;
  strongestSubject: string;
  weakestSubject: string;
  currentStreak: number;
  longestStreak: number;
  sessionsThisWeek: number;
  totalSessions: number;
  recentSessions: StudySession[];
}

interface StudyAnalyticsProps {
  userStats: any;
}

export const StudyAnalytics: React.FC<StudyAnalyticsProps> = ({ userStats }) => {
  // Mock analytics data - in real app this would come from backend
  const analytics: AnalyticsData = {
    weeklyProgress: [85, 92, 78, 96, 88, 94, 90],
    totalStudyTime: 280, // minutes
    averageAccuracy: userStats.questionsAnswered > 0 
      ? Math.round((userStats.correctAnswers / userStats.questionsAnswered) * 100) 
      : 0,
    strongestSubject: 'Mathematics',
    weakestSubject: 'Physics',
    currentStreak: userStats.streak,
    longestStreak: Math.max(userStats.streak, 7),
    sessionsThisWeek: 5,
    totalSessions: 23,
    recentSessions: [
      {
        date: 'Today',
        questionsAnswered: 15,
        correctAnswers: 12,
        timeSpent: 25,
        subjects: ['Math', 'Physics'],
        points: 340
      },
      {
        date: 'Yesterday',
        questionsAnswered: 20,
        correctAnswers: 18,
        timeSpent: 32,
        subjects: ['Chemistry', 'Biology'],
        points: 450
      }
    ]
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-4 w-4 text-primary mr-1" />
              <span className="text-xs font-medium">Study Time</span>
            </div>
            <p className="text-lg font-bold text-primary">
              {Math.floor(analytics.totalStudyTime / 60)}h {analytics.totalStudyTime % 60}m
            </p>
          </CardContent>
        </Card>

        <Card className="nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-4 w-4 text-success mr-1" />
              <span className="text-xs font-medium">Accuracy</span>
            </div>
            <p className="text-lg font-bold text-success">{analytics.averageAccuracy}%</p>
          </CardContent>
        </Card>

        <Card className="nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-4 w-4 text-warning mr-1" />
              <span className="text-xs font-medium">Sessions</span>
            </div>
            <p className="text-lg font-bold text-warning">{analytics.totalSessions}</p>
          </CardContent>
        </Card>

        <Card className="nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="h-4 w-4 text-destructive mr-1" />
              <span className="text-xs font-medium">Best Streak</span>
            </div>
            <p className="text-lg font-bold text-destructive">{analytics.longestStreak}</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress Chart */}
      <Card className="nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weekDays.map((day, index) => (
              <div key={day} className="flex items-center gap-3">
                <span className="text-sm font-medium w-10">{day}</span>
                <div className="flex-1">
                  <Progress 
                    value={analytics.weeklyProgress[index]} 
                    className="h-3"
                  />
                </div>
                <span className="text-sm font-bold w-12 text-right">
                  {analytics.weeklyProgress[index]}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject Performance */}
      <Card className="nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Subject Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Strongest Subject:</span>
            <Badge className="bg-success">{analytics.strongestSubject}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Needs Practice:</span>
            <Badge variant="outline" className="border-warning text-warning">
              {analytics.weakestSubject}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card className="nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Recent Study Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.recentSessions.map((session, index) => (
              <div key={index} className="p-3 bg-accent rounded-lg nova-transition hover:scale-[1.02]">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">{session.date}</span>
                  <Badge variant="outline">{session.points} pts</Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Questions: {session.questionsAnswered}</span>
                    <span>Correct: {session.correctAnswers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time: {session.timeSpent}min</span>
                    <span>Accuracy: {Math.round((session.correctAnswers / session.questionsAnswered) * 100)}%</span>
                  </div>
                  <div className="flex gap-1 pt-1">
                    {session.subjects.map((subject, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};