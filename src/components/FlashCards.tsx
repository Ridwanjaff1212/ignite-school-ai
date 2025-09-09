import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RotateCcw, Check, X, Shuffle, ArrowLeft, ArrowRight } from 'lucide-react';
import { getQuestionsByGrade, getQuestionsBySubject, Question } from '@/data/questionBank';

interface FlashCardsProps {
  grade: number;
  subject: string;
  onPointsEarned: (points: number) => void;
}

export const FlashCards: React.FC<FlashCardsProps> = ({ grade, subject, onPointsEarned }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set());
  const [sessionScore, setSessionScore] = useState(0);

  useEffect(() => {
    let filteredQuestions = getQuestionsBySubject(subject);
    filteredQuestions = filteredQuestions.filter(q => Math.abs(q.grade - grade) <= 1);
    
    if (filteredQuestions.length === 0) {
      filteredQuestions = getQuestionsBySubject(subject);
    }
    
    // Shuffle questions
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompletedCards(new Set());
    setSessionScore(0);
  }, [grade, subject]);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const markCorrect = () => {
    if (currentQuestion && !completedCards.has(currentQuestion.id)) {
      const points = Math.floor(currentQuestion.points * 0.8); // Flash cards give 80% of normal points
      setCompletedCards(prev => new Set([...prev, currentQuestion.id]));
      setSessionScore(prev => prev + points);
      onPointsEarned(points);
    }
    nextCard();
  };

  const markIncorrect = () => {
    nextCard();
  };

  const nextCard = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back to start
    }
    setIsFlipped(false);
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(questions.length - 1); // Loop to end
    }
    setIsFlipped(false);
  };

  const shuffleCards = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const resetSession = () => {
    setCompletedCards(new Set());
    setSessionScore(0);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (questions.length === 0) {
    return (
      <Card className="h-[600px] nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="nova-gradient rounded-full p-6 mx-auto mb-4 w-fit">
              <RotateCcw className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Loading Flash Cards...</h3>
            <p className="text-muted-foreground">Preparing questions for {subject} - Grade {grade}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress and Controls */}
      <Card className="nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline">
                {currentIndex + 1} / {questions.length}
              </Badge>
              <Badge variant="secondary">
                Session Score: {sessionScore}
              </Badge>
              <Badge variant="outline">
                Completed: {completedCards.size}
              </Badge>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={shuffleCards}>
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={resetSession}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Flash Card */}
      <div className="flex justify-center">
        <div className="flip-card w-full max-w-2xl h-96" style={{ perspective: '1000px' }}>
          <div className={`flip-card-inner relative w-full h-full nova-transition ${isFlipped ? 'flipped' : ''}`}>
            {/* Front of Card - Question */}
            <Card className={`flip-card-front absolute inset-0 nova-strong-shadow border-0 bg-white cursor-pointer ${
              completedCards.has(currentQuestion.id) ? 'nova-glow' : ''
            }`} onClick={flipCard}>
              <CardContent className="h-full flex flex-col justify-center p-8">
                <div className="text-center space-y-4">
                  <div className="flex justify-center gap-2 mb-4">
                    <Badge className="nova-gradient text-white">
                      {currentQuestion.subject.charAt(0).toUpperCase() + currentQuestion.subject.slice(1)}
                    </Badge>
                    <Badge variant="outline">Grade {currentQuestion.grade}</Badge>
                    <Badge 
                      className={`${
                        currentQuestion.difficulty === 'easy' ? 'bg-success' :
                        currentQuestion.difficulty === 'medium' ? 'bg-warning' : 'bg-destructive'
                      }`}
                    >
                      {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                    </Badge>
                  </div>
                  
                  <h2 className="text-2xl font-bold leading-relaxed">
                    {currentQuestion.question}
                  </h2>
                  
                  <p className="text-muted-foreground text-sm">
                    Click to reveal answer • Worth {currentQuestion.points} points
                  </p>
                  
                  {completedCards.has(currentQuestion.id) && (
                    <Badge className="bg-success">
                      <Check className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Back of Card - Answer */}
            <Card className="flip-card-back absolute inset-0 nova-strong-shadow border-0 nova-card-gradient cursor-pointer" onClick={flipCard}>
              <CardContent className="h-full flex flex-col justify-center p-8">
                <div className="text-center space-y-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">Answer:</h3>
                    <p className="text-2xl font-bold text-primary leading-relaxed">
                      {currentQuestion.answer}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      Did you get it right?
                    </p>
                    
                    <div className="flex justify-center gap-4">
                      <Button 
                        onClick={(e) => { e.stopPropagation(); markCorrect(); }}
                        className="bg-success hover:bg-success/90 text-white"
                        disabled={completedCards.has(currentQuestion.id)}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Correct
                      </Button>
                      
                      <Button 
                        onClick={(e) => { e.stopPropagation(); markIncorrect(); }}
                        variant="outline"
                        className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Incorrect
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={previousCard}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <Button variant="outline" onClick={nextCard}>
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};