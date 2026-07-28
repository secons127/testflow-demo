export type Page = 'home' | 'learn' | 'blocks' | 'ai' | 'profile';

export interface Term {
  id: string;
  term: string;
  fullName: string;
  category: string;
  simple: string;
  practical: string;
  example: string;
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
}
