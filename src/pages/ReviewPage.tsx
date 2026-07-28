import {
  Check,
  CircleAlert,
  Clock3,
  ListRestart,
  NotebookTabs,
  RotateCcw,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { TermMiniQuiz } from '../components';
import { blockQuizzes, terms } from '../data';
import type { LearningState, Term } from '../types';
import type { LearningStateUpdater } from '../hooks/useLearningState';

type ReviewFilter = 'needs' | 'history';

function formatReviewDate(value?: string) {
  if (!value) {
    return '기록 없음';
  }

  try {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(value));
  } catch {
    return '기록 없음';
  }
}

export function ReviewPage({
  state,
  setState,
  retryBlock,
}: {
  state: LearningState;
  setState: (next: LearningStateUpdater) => void;
  retryBlock: (quizId: string) => void;
}) {
  const [filter, setFilter] = useState<ReviewFilter>('needs');
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  const termRecords = useMemo(
    () =>
      Object.entries(state.termMistakes)
        .map(([id, count]) => {
          const term = terms.find((item) => item.id === id);
          return term
            ? {
                type: 'term' as const,
                id,
                count,
                title: term.term,
                subtitle: term.fullName,
                resolved: state.completedTermIds.includes(id),
                reviewedAt: state.lastReviewedAt[`term:${id}`],
                term,
              }
            : null;
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    [
      state.completedTermIds,
      state.lastReviewedAt,
      state.termMistakes,
    ],
  );

  const blockRecords = useMemo(
    () =>
      Object.entries(state.blockMistakes)
        .map(([id, count]) => {
          const quiz = blockQuizzes.find((item) => item.id === id);
          return quiz
            ? {
                type: 'block' as const,
                id,
                count,
                title: quiz.title,
                subtitle: quiz.description,
                resolved: state.solvedBlockIds.includes(id),
                reviewedAt: state.lastReviewedAt[`block:${id}`],
                quiz,
              }
            : null;
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    [
      state.blockMistakes,
      state.lastReviewedAt,
      state.solvedBlockIds,
    ],
  );

  const records = [...termRecords, ...blockRecords];
  const unresolvedRecords = records.filter((item) => !item.resolved);
  const visibleRecords =
    filter === 'needs' ? unresolvedRecords : records;

  if (selectedTerm) {
    const completed = state.completedTermIds.includes(selectedTerm.id);
    const mistakeCount = state.termMistakes[selectedTerm.id] ?? 0;

    return (
      <section className="detail-card">
        <button
          type="button"
          className="text-button"
          onClick={() => setSelectedTerm(null)}
        >
          ← 오답노트
        </button>

        <div className="detail-heading">
          <span className="pill">오답 복습</span>
          {completed && (
            <span className="completion-label">
              <Check size={14} />
              해결 완료
            </span>
          )}
        </div>
        <h2>{selectedTerm.term}</h2>
        <p className="full-name">{selectedTerm.fullName}</p>

        <div className="explain-box">
          <span className="explain-number">01</span>
          <div>
            <b>핵심 설명</b>
            <p>{selectedTerm.simple}</p>
          </div>
        </div>
        <div className="explain-box">
          <span className="explain-number">02</span>
          <div>
            <b>실무 확인 포인트</b>
            <p>{selectedTerm.practical}</p>
          </div>
        </div>

        <TermMiniQuiz
          key={`review-${selectedTerm.id}`}
          term={selectedTerm}
          completed={completed}
          mistakeCount={mistakeCount}
          onReviewed={() =>
            setState((current) => ({
              ...current,
              lastReviewedAt: {
                ...current.lastReviewedAt,
                [`term:${selectedTerm.id}`]: new Date().toISOString(),
              },
            }))
          }
          onWrong={() =>
            setState((current) => ({
              ...current,
              termMistakes: {
                ...current.termMistakes,
                [selectedTerm.id]:
                  (current.termMistakes[selectedTerm.id] ?? 0) + 1,
              },
            }))
          }
          onCorrect={() =>
            setState((current) => {
              if (current.completedTermIds.includes(selectedTerm.id)) {
                return current;
              }

              return {
                ...current,
                xp: current.xp + 10,
                completedTermIds: [
                  ...current.completedTermIds,
                  selectedTerm.id,
                ],
              };
            })
          }
        />
      </section>
    );
  }

  return (
    <>
      <section className="review-hero">
        <div className="review-hero-icon">
          <NotebookTabs size={27} />
        </div>
        <div>
          <span className="learning-kicker">REVIEW CENTER</span>
          <h2>틀린 문제를 모아 다시 학습하세요.</h2>
          <p>오답 횟수, 최근 복습일, 해결 여부를 브라우저에 저장합니다.</p>
        </div>
      </section>

      <div className="review-stats">
        <div>
          <strong>{unresolvedRecords.length}</strong>
          <span>복습 필요</span>
        </div>
        <div>
          <strong>{records.length}</strong>
          <span>오답 기록</span>
        </div>
        <div>
          <strong>
            {records.filter((item) => item.resolved).length}
          </strong>
          <span>해결 완료</span>
        </div>
      </div>

      <div className="review-tabs">
        <button
          type="button"
          className={filter === 'needs' ? 'active' : ''}
          onClick={() => setFilter('needs')}
        >
          복습 필요
        </button>
        <button
          type="button"
          className={filter === 'history' ? 'active' : ''}
          onClick={() => setFilter('history')}
        >
          전체 오답 기록
        </button>
      </div>

      {visibleRecords.length === 0 ? (
        <section className="review-empty">
          <Check size={28} />
          <h3>
            {filter === 'needs'
              ? '현재 복습할 오답이 없습니다.'
              : '아직 저장된 오답 기록이 없습니다.'}
          </h3>
          <p>
            용어 미니퀴즈나 TC 블록 퀴즈에서 틀린 항목이 자동으로 표시됩니다.
          </p>
        </section>
      ) : (
        <div className="review-list">
          {visibleRecords.map((record) => (
            <article className="review-card" key={`${record.type}-${record.id}`}>
              <div className="review-card-top">
                <span
                  className={`review-type ${
                    record.type === 'term' ? 'term' : 'block'
                  }`}
                >
                  {record.type === 'term' ? '용어' : 'TC'}
                </span>
                <span
                  className={`review-status ${
                    record.resolved ? 'resolved' : 'unresolved'
                  }`}
                >
                  {record.resolved ? (
                    <>
                      <Check size={13} />
                      해결 완료
                    </>
                  ) : (
                    <>
                      <CircleAlert size={13} />
                      복습 필요
                    </>
                  )}
                </span>
              </div>

              <h3>{record.title}</h3>
              <p>{record.subtitle}</p>

              <div className="review-meta">
                <span>
                  <ListRestart size={15} />
                  틀린 횟수 {record.count}회
                </span>
                <span>
                  <Clock3 size={15} />
                  최근 복습 {formatReviewDate(record.reviewedAt)}
                </span>
              </div>

              {record.type === 'block' && (
                <details className="answer-details">
                  <summary>올바른 순서 보기</summary>
                  <ol>
                    {record.quiz.blocks.map((block) => (
                      <li key={block.id}>{block.label}</li>
                    ))}
                  </ol>
                </details>
              )}

              <button
                type="button"
                className="secondary full"
                onClick={() =>
                  record.type === 'term'
                    ? setSelectedTerm(record.term)
                    : retryBlock(record.id)
                }
              >
                <RotateCcw size={17} />
                {record.resolved ? '다시 복습하기' : '오답 다시 풀기'}
              </button>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
