import {
  BookOpenCheck,
  Check,
  ExternalLink,
  Search,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { ProgressBar, TermMiniQuiz } from '../components';
import { categories, terms } from '../data';
import type { LearningState, Term } from '../types';
import type { LearningStateUpdater } from '../hooks/useLearningState';

export function LearnPage({
  state,
  setState,
  focusTermId,
  onFocusHandled,
}: {
  state: LearningState;
  setState: (next: LearningStateUpdater) => void;
  focusTermId?: string | null;
  onFocusHandled?: () => void;
}) {
  const [selected, setSelected] = useState<Term | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!focusTermId) {
      return;
    }
    const term = terms.find((item) => item.id === focusTermId);
    if (term) {
      setSelected(term);
    }
    onFocusHandled?.();
  }, [focusTermId, onFocusHandled]);

  const completed = state.completedTermIds.filter((id) =>
    terms.some((term) => term.id === id),
  ).length;
  const progress = Math.round((completed / terms.length) * 100);

  const filteredTerms = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('ko-KR');

    return terms.filter((term) => {
      const categoryMatched =
        selectedCategory === '전체' || term.category === selectedCategory;
      if (!categoryMatched) {
        return false;
      }
      if (!keyword) {
        return true;
      }

      return [term.term, term.fullName, term.simple, term.category]
        .join(' ')
        .toLocaleLowerCase('ko-KR')
        .includes(keyword);
    });
  }, [query, selectedCategory]);

  const updateReviewedAt = (termId: string) => {
    setState((current) => ({
      ...current,
      lastReviewedAt: {
        ...current.lastReviewedAt,
        [`term:${termId}`]: new Date().toISOString(),
      },
    }));
  };

  if (selected) {
    const done = state.completedTermIds.includes(selected.id);
    const mistakeCount = state.termMistakes[selected.id] ?? 0;
    const dictionaryUrl =
      'https://terms.tta.or.kr/dictionary/searchList.do?keyword=' +
      encodeURIComponent(selected.term);

    return (
      <section className="detail-card">
        <button
          type="button"
          className="text-button"
          onClick={() => setSelected(null)}
        >
          ← 용어 목록
        </button>

        <div className="detail-heading">
          <span className="pill">{selected.category}</span>
          {done && (
            <span className="completion-label">
              <Check size={14} />
              완료
            </span>
          )}
        </div>

        <h2>{selected.term}</h2>
        <p className="full-name">{selected.fullName}</p>

        <div className="explain-box">
          <span className="explain-number">01</span>
          <div>
            <b>뜻</b>
            <p>{selected.simple}</p>
          </div>
        </div>
        <div className="explain-box">
          <span className="explain-number">02</span>
          <div>
            <b>통신 QA에서 보는 위치</b>
            <p>{selected.practical}</p>
          </div>
        </div>
        <div className="explain-box">
          <span className="explain-number">03</span>
          <div>
            <b>확인 예시</b>
            <p>{selected.example}</p>
          </div>
        </div>

        <a
          className="dictionary-link"
          href={dictionaryUrl}
          target="_blank"
          rel="noreferrer"
        >
          TTA 정보통신용어사전에서 검색
          <ExternalLink size={16} />
        </a>

        <TermMiniQuiz
          key={selected.id}
          term={selected}
          completed={done}
          mistakeCount={mistakeCount}
          onReviewed={() => updateReviewedAt(selected.id)}
          onWrong={() =>
            setState((current) => ({
              ...current,
              termMistakes: {
                ...current.termMistakes,
                [selected.id]: (current.termMistakes[selected.id] ?? 0) + 1,
              },
            }))
          }
          onCorrect={() =>
            setState((current) => {
              if (current.completedTermIds.includes(selected.id)) {
                return current;
              }

              return {
                ...current,
                xp: current.xp + 10,
                completedTermIds: [...current.completedTermIds, selected.id],
              };
            })
          }
        />
      </section>
    );
  }

  return (
    <>
      <section className="learning-overview">
        <div>
          <span className="learning-kicker">
            <BookOpenCheck size={16} />
            용어 라이브러리
          </span>
          <h2>{terms.length}개의 핵심 통신 용어</h2>
          <p>설명을 읽은 뒤 미니퀴즈를 맞히면 학습이 완료됩니다.</p>
        </div>

        <div className="learning-progress">
          <strong>
            {completed}
            <small> / {terms.length}</small>
          </strong>
          <span>완료</span>
        </div>
        <ProgressBar value={progress} />
      </section>

      <div className="search-box">
        <Search size={19} />
        <input
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setQuery(event.target.value)
          }
          placeholder="용어 또는 영문 이름 검색"
          aria-label="통신 용어 검색"
        />
      </div>

      <div className="category-chips" aria-label="용어 분야 선택">
        {['전체', ...categories].map((category) => (
          <button
            type="button"
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="term-list">
        {filteredTerms.map((term) => {
          const done = state.completedTermIds.includes(term.id);
          const mistakeCount = state.termMistakes[term.id] ?? 0;

          return (
            <button
              type="button"
              className="term-card"
              key={term.id}
              onClick={() => setSelected(term)}
            >
              <span className="term-icon">{term.term.slice(0, 2)}</span>
              <span className="term-copy">
                <b>{term.term}</b>
                <small>{term.fullName}</small>
              </span>
              <span className="term-meta">
                {mistakeCount > 0 && <em>오답 {mistakeCount}</em>}
                {done ? (
                  <span className="term-done">
                    <Check size={15} />
                  </span>
                ) : (
                  <span>›</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {filteredTerms.length === 0 && (
        <div className="empty-card">검색 결과가 없습니다.</div>
      )}
    </>
  );
}
