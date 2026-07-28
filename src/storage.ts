import type { ChatMessage, LearningState } from './types';

const LEARNING_KEY = 'testflow-learning';
const CHAT_KEY = 'testflow-chat';

export const defaultLearningState: LearningState = {
  nickname: '',
  xp: 0,
  completedTermIds: [],
  solvedBlockIds: [],
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
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

  // 이전 데모 버전의 기본값(40 XP, SIP 1개 완료)이 저장되어 있으면
  // 실제 사용자 기록이 아니라 초기 샘플 데이터이므로 0부터 시작합니다.
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
  };
}

export function loadLearningState(): LearningState {
  try {
    const raw = localStorage.getItem(LEARNING_KEY);

    if (!raw) {
      return { ...defaultLearningState };
    }

    return normalizeLearningState(JSON.parse(raw));
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
