import type { ChatMessage, LearningState } from './types';

const LEARNING_KEY = 'testflow-learning';
const CHAT_KEY = 'testflow-chat';

export const defaultLearningState: LearningState = {
  xp: 40,
  completedTermIds: ['sip'],
  solvedBlockIds: [],
};

export function loadLearningState(): LearningState {
  try {
    const raw = localStorage.getItem(LEARNING_KEY);
    return raw ? { ...defaultLearningState, ...JSON.parse(raw) } : defaultLearningState;
  } catch {
    return defaultLearningState;
  }
}

export function saveLearningState(state: LearningState) {
  localStorage.setItem(LEARNING_KEY, JSON.stringify(state));
}

export function loadMessages(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(CHAT_KEY);
    return raw ? JSON.parse(raw) : [{
      id: 'welcome',
      role: 'assistant',
      content: '안녕하세요! 통신 QA 학습 도우미예요. SIP, RTP, Wireshark, TC 작성법을 물어보세요.',
    }];
  } catch {
    return [];
  }
}

export function saveMessages(messages: ChatMessage[]) {
  localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
}

export function clearDemoData() {
  localStorage.removeItem(LEARNING_KEY);
  localStorage.removeItem(CHAT_KEY);
}
