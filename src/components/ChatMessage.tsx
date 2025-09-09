import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Brain, User } from 'lucide-react';
import { Question } from '@/data/questionBank';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  question?: Question;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in-up`}>
      {message.isBot && (
        <Avatar className="nova-soft-shadow">
          <AvatarFallback className="nova-gradient text-white">
            <Brain className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
        <div className={`rounded-lg p-4 nova-transition ${
          message.isBot 
            ? 'bg-white nova-soft-shadow border' 
            : 'nova-gradient text-white ml-auto'
        }`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.text}
          </div>
          
          {message.question && (
            <div className="mt-3 pt-3 border-t border-border/20">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  {message.question.subject.charAt(0).toUpperCase() + message.question.subject.slice(1)}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Grade {message.question.grade}
                </Badge>
                <Badge 
                  className={`text-xs ${
                    message.question.difficulty === 'easy' ? 'bg-success' :
                    message.question.difficulty === 'medium' ? 'bg-warning' : 'bg-destructive'
                  }`}
                >
                  {message.question.difficulty.charAt(0).toUpperCase() + message.question.difficulty.slice(1)}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {message.question.points} pts
                </Badge>
              </div>
            </div>
          )}
        </div>
        
        <p className={`text-xs text-muted-foreground mt-1 ${
          message.isBot ? 'text-left' : 'text-right'
        }`}>
          {message.isBot ? 'Nova AI' : 'You'} • {formatTime(message.timestamp)}
        </p>
      </div>
      
      {!message.isBot && (
        <Avatar className="nova-soft-shadow order-3">
          <AvatarFallback className="bg-secondary">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};