import { Check, Pencil, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { blockQuizzes, terms } from '../data';
import { ProgressBar } from '../components';
import type { LearningState } from '../types';
import type { LearningStateUpdater } from '../hooks/useLearningState';

export function ProfilePage({
  state,
  setState,
  reset,
}: {
  state: LearningState;
  setState: (next: LearningStateUpdater) => void;
  reset: () => void;
}) {
  const level = Math.floor(state.xp / 100) + 1;
  const completed = state.completedTermIds.filter((id) =>
    terms.some((term) => term.id === id),
  ).length;
  const totalActivities = terms.length + blockQuizzes.length;
  const completedActivities = completed + state.solvedBlockIds.length;
  const progress = Math.round((completedActivities / totalActivities) * 100);
  const unresolved =
    Object.keys(state.termMistakes).filter(
      (id) => !state.completedTermIds.includes(id),
    ).length +
    Object.keys(state.blockMistakes).filter(
      (id) => !state.solvedBlockIds.includes(id),
    ).length;
  const [editingNickname, setEditingNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(state.nickname);

  const saveNickname = () => {
    const nickname = nicknameInput.trim();
    if (!nickname) {
      return;
    }

    setState((current) => ({ ...current, nickname }));
    setEditingNickname(false);
  };

  return (
    <section className="profile-shell">
      <div className="profile-card">
        <div className="avatar">
          <UserRound size={30} />
        </div>

        <div className="profile-name">
          {editingNickname ? (
            <div className="nickname-editor">
              <input
                autoFocus
                maxLength={12}
                value={nicknameInput}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNicknameInput(event.target.value)
                }
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                  if (event.key === 'Enter') {
                    saveNickname();
                  }
                }}
              />
              <button type="button" onClick={saveNickname} aria-label="저장">
                <Check size={17} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setNicknameInput(state.nickname);
                  setEditingNickname(false);
                }}
                aria-label="취소"
              >
                <X size={17} />
              </button>
            </div>
          ) : (
            <>
              <h2>{state.nickname || 'TestFlow 학습자'}</h2>
              <button
                type="button"
                className="text-icon-button"
                onClick={() => setEditingNickname(true)}
              >
                <Pencil size={15} />
                닉네임 수정
              </button>
            </>
          )}
        </div>

        <span className="level-badge">LEVEL {level}</span>
      </div>

      <section className="profile-progress-card">
        <div className="section-title">
          <h3>전체 학습 진행률</h3>
          <b>{progress}%</b>
        </div>
        <ProgressBar value={progress} />
      </section>

      <div className="profile-stats">
        <div>
          <span>획득 XP</span>
          <b>{state.xp} XP</b>
        </div>
        <div>
          <span>완료한 용어</span>
          <b>{completed}개</b>
        </div>
        <div>
          <span>완료한 블록 퀴즈</span>
          <b>{state.solvedBlockIds.length}개</b>
        </div>
        <div>
          <span>복습 필요</span>
          <b>{unresolved}개</b>
        </div>
        <div>
          <span>다음 레벨까지</span>
          <b>{100 - (state.xp % 100)} XP</b>
        </div>
      </div>

      <button type="button" className="danger-button" onClick={reset}>
        Demo 데이터 초기화
      </button>
      <p className="notice">
        모든 기록은 현재 브라우저의 localStorage에만 저장됩니다.
      </p>
    </section>
  );
}
