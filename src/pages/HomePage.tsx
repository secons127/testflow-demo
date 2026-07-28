import { ArrowRight, BookOpenCheck, NotebookTabs } from 'lucide-react';
import { blockQuizzes, terms } from '../data';
import { ProgressBar } from '../components';
import type { LearningState, Page } from '../types';

export function HomePage({
  state,
  go,
}: {
  state: LearningState;
  go: (page: Page) => void;
}) {
  const completed = state.completedTermIds.filter((id) =>
    terms.some((term) => term.id === id),
  ).length;
  const progress = Math.round((completed / terms.length) * 100);
  const unresolvedTerms = Object.keys(state.termMistakes).filter(
    (id) => !state.completedTermIds.includes(id),
  ).length;
  const unresolvedBlocks = Object.keys(state.blockMistakes).filter(
    (id) => !state.solvedBlockIds.includes(id),
  ).length;
  const reviewCount = unresolvedTerms + unresolvedBlocks;

  return (
    <>
      <section className="hero-card">
        <span className="pill">오늘의 학습</span>
        <h2>읽고, 풀고, 틀린 문제까지 다시 익혀보세요.</h2>
        <p>
          50개의 통신 용어와 TC 순서 퀴즈를 학습하고 오답 기록을 한곳에서
          복습할 수 있습니다.
        </p>
        <button type="button" className="primary" onClick={() => go('learn')}>
          용어 학습 시작
          <ArrowRight size={18} />
        </button>
      </section>

      {reviewCount > 0 && (
        <button
          type="button"
          className="review-alert-card"
          onClick={() => go('review')}
        >
          <span className="review-alert-icon">
            <NotebookTabs size={22} />
          </span>
          <span>
            <b>복습이 필요한 항목이 {reviewCount}개 있습니다.</b>
            <small>
              용어 {unresolvedTerms}개 · TC {unresolvedBlocks}개
            </small>
          </span>
          <ArrowRight size={19} />
        </button>
      )}

      <section className="section">
        <div className="section-title">
          <h3>내 진행률</h3>
          <b>{progress}%</b>
        </div>
        <ProgressBar value={progress} />

        <div className="stats-grid">
          <div className="stat">
            <strong>{completed}</strong>
            <span>학습 용어</span>
          </div>
          <div className="stat">
            <strong>{state.solvedBlockIds.length}</strong>
            <span>블록 완료</span>
          </div>
          <div className="stat">
            <strong>{state.xp}</strong>
            <span>총 XP</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h3>빠른 시작</h3>
        </div>

        <div className="quick-grid">
          <button type="button" className="quick-card" onClick={() => go('learn')}>
            <span className="quick-index">01</span>
            <BookOpenCheck size={21} />
            <b>용어 미니퀴즈</b>
            <small>정답을 맞혀야 학습 완료</small>
          </button>
          <button
            type="button"
            className="quick-card"
            onClick={() => go('blocks')}
          >
            <span className="quick-index">02</span>
            <b>TC 블록 퀴즈</b>
            <small>{blockQuizzes.length}개 문제 순서 조합</small>
          </button>
          <button
            type="button"
            className="quick-card"
            onClick={() => go('review')}
          >
            <span className="quick-index">03</span>
            <b>오답 복습</b>
            <small>틀린 횟수와 정답 순서 확인</small>
          </button>
          <button type="button" className="quick-card" onClick={() => go('ai')}>
            <span className="quick-index">04</span>
            <b>AI 질문</b>
            <small>Mock 답변으로 개념 확인</small>
          </button>
        </div>
      </section>
    </>
  );
}
