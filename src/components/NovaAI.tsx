import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Sparkles, 
  Send, 
  Brain, 
  Trophy, 
  Target, 
  Zap,
  BookOpen,
  Star,
  RotateCcw,
  GraduationCap,
  MessageSquare,
  Lightbulb,
  TrendingUp
} from 'lucide-react';
import { questionBank, getRandomQuestion, subjects, Question } from '@/data/questionBank';
import { FlashCards } from '@/components/FlashCards';
import { ChatMessage } from '@/components/ChatMessage';
import { UserProgress } from '@/components/UserProgress';
import { VoiceRecognition } from '@/components/VoiceRecognition';
import { StudyAnalytics } from '@/components/StudyAnalytics';
import { StudyTimer } from '@/components/StudyTimer';
import { AchievementSystem } from '@/components/AchievementSystem';
import { ThemeToggle } from '@/components/ThemeToggle';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  question?: Question;
}

interface UserStats {
  totalPoints: number;
  streak: number;
  questionsAnswered: number;
  correctAnswers: number;
  level: number;
}

const NovaAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 0,
    streak: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    level: 1
  });
  const [selectedGrade, setSelectedGrade] = useState<number>(6);
  const [selectedSubject, setSelectedSubject] = useState<string>('math');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [showFlashCards, setShowFlashCards] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [studySessionActive, setStudySessionActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: `Hello! I'm Nova AI, your intelligent learning companion! 🚀\n\nI'm here to help you master any school subject with personalized questions, instant explanations, and gamified learning!\n\nChoose your grade and subject to get started, or ask me anything about mathematics, physics, chemistry, biology, and more!`,
      isBot: true,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Check if user is answering a question
    if (isAnswering && currentQuestion) {
      await handleAnswerCheck(inputValue, currentQuestion);
      return;
    }

    // Generate AI response
    await generateAIResponse(inputValue);
  };

  const handleAnswerCheck = async (answer: string, question: Question) => {
    const isCorrect = answer.toLowerCase().includes(question.answer.toLowerCase()) ||
                     question.answer.toLowerCase().includes(answer.toLowerCase());

    let responseText = '';
    let pointsEarned = 0;

    if (isCorrect) {
      pointsEarned = question.points;
      responseText = `🎉 Excellent! You're absolutely right!\n\nAnswer: ${question.answer}\n\nYou earned ${pointsEarned} points! Keep up the great work!`;
      
      setUserStats(prev => ({
        ...prev,
        totalPoints: prev.totalPoints + pointsEarned,
        streak: prev.streak + 1,
        questionsAnswered: prev.questionsAnswered + 1,
        correctAnswers: prev.correctAnswers + 1,
        level: Math.floor((prev.totalPoints + pointsEarned) / 1000) + 1
      }));
    } else {
      responseText = `🤔 Not quite right, but great effort!\n\nCorrect Answer: ${question.answer}\n\nLet me explain: This is a ${question.subject} concept typically taught in grade ${question.grade}. Would you like me to break it down further?`;
      
      setUserStats(prev => ({
        ...prev,
        streak: 0,
        questionsAnswered: prev.questionsAnswered + 1
      }));
    }

    const botResponse: Message = {
      id: Date.now().toString(),
      text: responseText,
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botResponse]);
    setIsAnswering(false);
    setCurrentQuestion(null);

    // Offer another question
    setTimeout(() => {
      const followUpMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Ready for another challenge? Click 'Get Practice Question' or ask me anything else!",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, followUpMessage]);
    }, 2000);
  };

  const generateAIResponse = async (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    let responseText = '';

    // Educational AI responses
    if (lowerInput.includes('help') || lowerInput.includes('explain')) {
      responseText = "I'm here to help! I can:\n\n📚 Answer questions about math, physics, chemistry, biology, and English\n🎯 Provide practice questions tailored to your grade\n🃏 Create interactive flash cards\n🏆 Track your learning progress\n\nWhat subject would you like to explore?";
    } else if (lowerInput.includes('math') || lowerInput.includes('mathematics')) {
      responseText = "Mathematics is amazing! 🧮 I can help you with:\n\n• Basic arithmetic and algebra\n• Geometry and trigonometry  \n• Calculus and advanced topics\n• Word problems and applications\n\nWhat specific math topic interests you?";
    } else if (lowerInput.includes('physics')) {
      responseText = "Physics reveals the secrets of the universe! ⚡ Let's explore:\n\n• Mechanics and motion\n• Energy and waves\n• Electricity and magnetism\n• Modern physics concepts\n\nWhat physics concept would you like to learn about?";
    } else if (lowerInput.includes('chemistry')) {
      responseText = "Chemistry is the science of transformation! 🧪 We can dive into:\n\n• Atomic structure and bonding\n• Chemical reactions and equations\n• Organic and inorganic chemistry\n• Laboratory techniques\n\nWhich chemistry topic interests you most?";
    } else if (lowerInput.includes('biology')) {
      responseText = "Biology is the study of life itself! 🧬 Let's explore:\n\n• Cell structure and function\n• Genetics and evolution\n• Ecology and ecosystems\n• Human anatomy and physiology\n\nWhat aspect of biology fascinates you?";
    } else if (lowerInput.includes('english') || lowerInput.includes('literature')) {
      responseText = "English opens worlds through words! 📚 I can help with:\n\n• Grammar and writing skills\n• Literature analysis\n• Poetry and creative writing\n• Reading comprehension\n\nWhat would you like to improve in English?";
    } else {
      // General encouragement and guidance
      responseText = `Great question! 🌟 I love your curiosity about "${userInput}".\n\nI'm designed to help students excel in core subjects like mathematics, physics, chemistry, biology, and English. I can provide detailed explanations, practice problems, and personalized learning experiences.\n\nWould you like me to:\n• Generate a practice question for you\n• Explain a specific concept\n• Create flash cards for studying\n\nJust let me know what subject interests you most!`;
    }

    const botResponse: Message = {
      id: Date.now().toString(),
      text: responseText,
      isBot: true,
      timestamp: new Date()
    };

    // Simulate AI thinking delay
    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generatePracticeQuestion = () => {
    const question = getRandomQuestion(selectedGrade, selectedSubject);
    setCurrentQuestion(question);
    setIsAnswering(true);

    const questionMessage: Message = {
      id: Date.now().toString(),
      text: `🎯 Here's a ${question.difficulty} ${question.subject} question for Grade ${question.grade}:\n\n**${question.question}**\n\n💰 This question is worth ${question.points} points!\n\nType your answer below:`,
      isBot: true,
      timestamp: new Date(),
      question
    };

    setMessages(prev => [...prev, questionMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceTranscription = (text: string) => {
    setInputValue(text);
  };

  const handleStudySessionComplete = (timeSpent: number, mode: string) => {
    const bonusPoints = Math.floor(timeSpent * 2); // 2 points per minute
    setUserStats(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + bonusPoints,
      level: Math.floor((prev.totalPoints + bonusPoints) / 1000) + 1
    }));

    const congratsMessage: Message = {
      id: Date.now().toString(),
      text: `🎉 Study session complete! You studied for ${timeSpent} minutes and earned ${bonusPoints} bonus points!\n\nGreat job staying focused! Ready for some questions to test what you've learned?`,
      isBot: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, congratsMessage]);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <Card className="mb-6 nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="nova-gradient rounded-full p-3">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  Nova AI
                </CardTitle>
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              </div>
              <ThemeToggle />
            </div>
            <p className="text-muted-foreground text-lg">
              Your Intelligent Learning Companion - Master Every Subject with AI-Powered Education
            </p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <UserProgress userStats={userStats} />
            
            {/* Study Timer */}
            <StudyTimer onSessionComplete={handleStudySessionComplete} />
            
            {/* Grade & Subject Selection */}
            <Card className="nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Learning Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Grade Level</label>
                  <select 
                    value={selectedGrade} 
                    onChange={(e) => setSelectedGrade(Number(e.target.value))}
                    className="w-full p-2 border rounded-lg nova-transition hover:border-primary"
                  >
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(grade => (
                      <option key={grade} value={grade}>Grade {grade}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <select 
                    value={selectedSubject} 
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full p-2 border rounded-lg nova-transition hover:border-primary"
                  >
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>
                        {subject.icon} {subject.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Button 
                  onClick={generatePracticeQuestion}
                  className="w-full nova-gradient text-white nova-transition hover:scale-105"
                  disabled={isAnswering}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Get Practice Question
                </Button>

                <Button 
                  onClick={() => setShowFlashCards(true)}
                  variant="outline"
                  className="w-full nova-transition hover:bg-accent"
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Flash Cards
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="chat" className="h-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  AI Chat
                </TabsTrigger>
                <TabsTrigger value="flashcards" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Flash Cards
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Achievements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="h-full">
                <Card className="h-[600px] nova-soft-shadow border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0 h-full flex flex-col">
                    {/* Messages Area */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <ChatMessage key={message.id} message={message} />
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="border-t p-4 bg-white/50">
                      {isAnswering && currentQuestion && (
                        <div className="mb-3 p-3 bg-accent rounded-lg animate-pulse">
                          <p className="text-sm font-medium text-accent-foreground">
                            🎯 Answering: {currentQuestion.subject.charAt(0).toUpperCase() + currentQuestion.subject.slice(1)} • Grade {currentQuestion.grade} • {currentQuestion.points} pts
                          </p>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <div className="flex justify-end">
                          <VoiceRecognition 
                            onTranscription={handleVoiceTranscription}
                            isListening={isVoiceListening}
                            setIsListening={setIsVoiceListening}
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={isAnswering ? "Type your answer or use voice..." : "Ask me anything about school subjects..."}
                            className="flex-1 nova-transition focus:ring-2 focus:ring-primary"
                          />
                          <Button 
                            onClick={handleSendMessage}
                            className="nova-gradient text-white nova-transition hover:scale-105"
                            disabled={!inputValue.trim()}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="flashcards">
                <FlashCards 
                  grade={selectedGrade} 
                  subject={selectedSubject}
                  onPointsEarned={(points) => {
                    setUserStats(prev => ({
                      ...prev,
                      totalPoints: prev.totalPoints + points,
                      level: Math.floor((prev.totalPoints + points) / 1000) + 1
                    }));
                  }}
                />
              </TabsContent>

              <TabsContent value="analytics">
                <StudyAnalytics userStats={userStats} />
              </TabsContent>

              <TabsContent value="achievements">
                <AchievementSystem 
                  userStats={userStats}
                  onAchievementUnlocked={(achievement) => {
                    const achievementMessage: Message = {
                      id: Date.now().toString(),
                      text: `🏆 Achievement Unlocked: "${achievement.title}"!\n\n${achievement.description}\n\nYou earned ${achievement.points} bonus XP! Keep up the amazing work!`,
                      isBot: true,
                      timestamp: new Date()
                    };
                    setMessages(prev => [...prev, achievementMessage]);
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaAI;