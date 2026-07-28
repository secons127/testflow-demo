import type { ChatMessage, LearningState } from './types';

const LEARNING_KEY = 'testflow-learning';
const CHAT_KEY = 'testflow-chat';

export const defaultLearningState: LearningState = {
  nickname: '',
  xp: 0,
  completedTermIds: [],
  solvedBlockIds: [],
  termMistakes: {},
  blockMistakes: {},
  lastReviewedAt: {},
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isNumberRecord(value: unknown): value is Record<string, number> {
  return Boolean(
    value &&
      typeof value === 'object' &&
      Object.values(value).every(
        (item) => typeof item === 'number' && Number.isFinite(item) && item >= 0,
      ),
  );
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return Boolean(
    value &&
      typeof value === 'object' &&
      Object.values(value).every((item) => typeof item === 'string'),
  );
}

function normalizeLearningState(value: Partial<LearningState>): LearningState {
  const completedTermIds = isStringArray(value.completedTermIds)
    ? value.completedTermIds
    : [];
  const solvedBlockIds = isStringArray(value.solvedBlockIds)
    ? value.solvedBlockIds
    : [];
  const xp =
    typeof value.xp === 'number' && Number.isFinite(value.xp) && value.xp >= 0
      ? value.xp
      : 0;

  const isLegacyDemoSeed =
    typeof value.nickname !== 'string' &&
    xp === 40 &&
    completedTermIds.length === 1 &&
    completedTermIds[0] === 'sip' &&
    solvedBlockIds.length === 0;

  if (isLegacyDemoSeed) {
    return { ...defaultLearningState };
  }

  return {
    nickname: typeof value.nickname === 'string' ? value.nickname.trim() : '',
    xp,
    completedTermIds,
    solvedBlockIds,
    termMistakes: isNumberRecord(value.termMistakes) ? value.termMistakes : {},
    blockMistakes: isNumberRecord(value.blockMistakes) ? value.blockMistakes : {},
    lastReviewedAt: isStringRecord(value.lastReviewedAt)
      ? value.lastReviewedAt
      : {},
  };
}

export function loadLearningState(): LearningState {
  try {
    const raw = localStorage.getItem(LEARNING_KEY);
    return raw
      ? normalizeLearningState(JSON.parse(raw))
      : { ...defaultLearningState };
  } catch {
    return { ...defaultLearningState };
  }
}

export function saveLearningState(state: LearningState) {
  localStorage.setItem(LEARNING_KEY, JSON.stringify(state));
}

export function loadMessages(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(CHAT_KEY);

    return raw
      ? JSON.parse(raw)
      : [
          {
            id: 'welcome',
            role: 'assistant',
            content:
              '안녕하세요! 통신 QA 학습 도우미예요. SIP, RTP, Wireshark, TC 작성법을 물어보세요.',
          },
        ];
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
