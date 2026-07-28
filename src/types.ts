export type Page = 'home' | 'learn' | 'blocks' | 'review' | 'ai' | 'profile';

export interface Term {
  id: string;
  term: string;
  fullName: string;
  category: string;
  simple: string;
  practical: string;
  example: string;
}

export interface QuizBlock {
  id: string;
  label: string;
}

export interface BlockQuiz {
  id: string;
  title: string;
  category: string;
  description: string;
  xp: number;
  blocks: QuizBlock[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface LearningState {
  nickname: string;
  xp: number;
  completedTermIds: string[];
  solvedBlockIds: string[];
  termMistakes: Record<string, number>;
  blockMistakes: Record<string, number>;
  lastReviewedAt: Record<string, string>;
}
