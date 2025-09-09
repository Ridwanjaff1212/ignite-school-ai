import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Clock,
  Coffee,
  Brain,
  Target
} from 'lucide-react';

type TimerMode = 'study' | 'break' | 'longBreak';

interface StudyTimerProps {
  onSessionComplete: (timeSpent: number, mode: TimerMode) => void;
}

export const StudyTimer: React.FC<StudyTimerProps> = ({ onSessionComplete }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('study');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialTime = useRef(25 * 60);

  const timerPresets = {
    study: 25 * 60, // 25 minutes
    break: 5 * 60,  // 5 minutes
    longBreak: 15 * 60 // 15 minutes
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    const timeSpent = initialTime.current - timeLeft;
    
    if (mode === 'study') {
      setSessionsCompleted(prev => prev + 1);
      setTotalStudyTime(prev => prev + Math.floor(timeSpent / 60));
      onSessionComplete(Math.floor(timeSpent / 60), mode);
      
      // Auto-switch to break after study session
      const nextMode = sessionsCompleted > 0 && (sessionsCompleted + 1) % 4 === 0 ? 'longBreak' : 'break';
      switchMode(nextMode);
    } else {
      // Switch back to study after break
      switchMode('study');
    }

    // Browser notification
    if (Notification.permission === 'granted') {
      new Notification(`${mode === 'study' ? 'Study' : 'Break'} session complete!`, {
        body: mode === 'study' 
          ? 'Time for a well-deserved break! 🎉' 
          : 'Ready to get back to studying? 📚',
        icon: '/favicon.ico'
      });
    }
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(timerPresets[newMode]);
    initialTime.current = timerPresets[newMode];
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerPresets[mode]);
    initialTime.current = timerPresets[mode];
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (mode === 'study') {
      const timeSpent = initialTime.current - timeLeft;
      setTotalStudyTime(prev => prev + Math.floor(timeSpent / 60));
      onSessionComplete(Math.floor(timeSpent / 60), mode);
    }
    resetTimer();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((initialTime.current - timeLeft) / initialTime.current) * 100;

  const getModeIcon = (mode: TimerMode) => {
    switch (mode) {
      case 'study': return <Brain className="h-4 w-4" />;
      case 'break': return <Coffee className="h-4 w-4" />;
      case 'longBreak': return <Coffee className="h-4 w-4" />;
    }
  };

  const getModeColor = (mode: TimerMode) => {
    switch (mode) {
      case 'study': return 'bg-primary';
      case 'break': return 'bg-success';
      case 'longBreak': return 'bg-warning';
    }
  };

  // Request notification permission
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <Card className="nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-3">
        <CardTitle className="flex items-center justify-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Pomodoro Timer
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Mode Selector */}
        <div className="flex gap-2 justify-center">
          <Button
            variant={mode === 'study' ? 'default' : 'outline'}
            size="sm"
            onClick={() => switchMode('study')}
            className={mode === 'study' ? 'nova-gradient text-white' : ''}
          >
            <Brain className="h-3 w-3 mr-1" />
            Study
          </Button>
          <Button
            variant={mode === 'break' ? 'default' : 'outline'}
            size="sm"
            onClick={() => switchMode('break')}
            className={mode === 'break' ? 'bg-success text-white' : ''}
          >
            <Coffee className="h-3 w-3 mr-1" />
            Break
          </Button>
          <Button
            variant={mode === 'longBreak' ? 'default' : 'outline'}
            size="sm"
            onClick={() => switchMode('longBreak')}
            className={mode === 'longBreak' ? 'bg-warning text-white' : ''}
          >
            <Coffee className="h-3 w-3 mr-1" />
            Long
          </Button>
        </div>

        {/* Current Mode Badge */}
        <div className="text-center">
          <Badge className={`${getModeColor(mode)} text-white`}>
            {getModeIcon(mode)}
            <span className="ml-1 capitalize">{mode === 'longBreak' ? 'Long Break' : mode}</span>
          </Badge>
        </div>

        {/* Timer Display */}
        <div className="text-center space-y-4">
          <div className="relative">
            <div className={`text-5xl font-bold ${
              mode === 'study' ? 'text-primary' : 
              mode === 'break' ? 'text-success' : 'text-warning'
            } ${isRunning ? 'animate-pulse' : ''}`}>
              {formatTime(timeLeft)}
            </div>
            
            {/* Progress Circle Visual Effect */}
            <div className="mt-4">
              <Progress 
                value={progress} 
                className={`h-2 ${
                  mode === 'study' ? '[&>div]:bg-primary' :
                  mode === 'break' ? '[&>div]:bg-success' : '[&>div]:bg-warning'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Timer Controls */}
        <div className="flex justify-center gap-3">
          <Button
            onClick={toggleTimer}
            className={`${
              mode === 'study' ? 'nova-gradient' :
              mode === 'break' ? 'bg-success hover:bg-success/90' : 'bg-warning hover:bg-warning/90'
            } text-white nova-transition hover:scale-105`}
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start
              </>
            )}
          </Button>

          <Button variant="outline" onClick={resetTimer}>
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button variant="outline" onClick={stopTimer}>
            <Square className="h-4 w-4" />
          </Button>
        </div>

        {/* Session Stats */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t">
          <div className="text-center p-2 bg-accent rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Target className="h-3 w-3 text-primary mr-1" />
              <span className="text-xs font-medium">Sessions</span>
            </div>
            <p className="font-bold text-primary">{sessionsCompleted}</p>
          </div>
          
          <div className="text-center p-2 bg-accent rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-3 w-3 text-success mr-1" />
              <span className="text-xs font-medium">Study Time</span>
            </div>
            <p className="font-bold text-success">{totalStudyTime}m</p>
          </div>
        </div>

        {/* Next Session Info */}
        {!isRunning && timeLeft === timerPresets[mode] && (
          <div className="text-center text-xs text-muted-foreground">
            {mode === 'study' ? (
              <>Next: {sessionsCompleted > 0 && (sessionsCompleted + 1) % 4 === 0 ? 'Long Break' : 'Short Break'}</>
            ) : (
              <>Next: Study Session</>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};