import { Check, CircleX, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { terms } from '../data';
import type { Term } from '../types';
import { shuffleItems } from '../utils/shuffle';

interface TermMiniQuizProps {
  term: Term;
  completed: boolean;
  mistakeCount: number;
  onCorrect: () => void;
  onWrong: () => void;
  onReviewed: () => void;
}

function buildOptions(term: Term) {
  const sameCategory = terms.filter(
    (item) => item.id !== term.id && item.category === term.category,
  );
  const fallback = terms.filter(
    (item) => item.id !== term.id && item.category !== term.category,
  );
  const distractors = [...sameCategory, ...fallback]
    .slice(0, 8)
    .map((item) => item.simple);

  return shuffleItems([term.simple, ...shuffleItems(distractors).slice(0, 3)]);
}

export function TermMiniQuiz({
  term,
  completed,
  mistakeCount,
  onCorrect,
  onWrong,
  onReviewed,
}: TermMiniQuizProps) {
  const options = useMemo(() => buildOptions(term), [term]);
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  const submit = () => {
    if (!selected || result === 'correct') {
      return;
    }

    onReviewed();

    if (selected === term.simple) {
      setResult('correct');
      onCorrect();
      return;
    }

    setResult('wrong');
    onWrong();
  };

  const retry = () => {
    setSelected('');
    setResult(null);
  };

  return (
    <section className="mini-quiz">
      <div className="mini-quiz-heading">
        <div>
          <span className="quiz-kicker">MINI QUIZ</span>
          <h3>다음 중 {term.term}의 설명은?</h3>
        </div>
        <div className="mistake-chip">오답 {mistakeCount}회</div>
      </div>

      <div className="answer-options">
        {options.map((option, index) => {
          const isSelected = selected === option;
          const isCorrectOption = result !== null && option === term.simple;
          const isWrongSelected =
            result === 'wrong' && isSelected && option !== term.simple;

          return (
            <button
              type="button"
              key={option}
              disabled={result === 'correct'}
              className={[
                'answer-option',
                isSelected ? 'selected' : '',
                isCorrectOption ? 'correct' : '',
                isWrongSelected ? 'wrong' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                setSelected(option);
                if (result === 'wrong') {
                  setResult(null);
                }
              }}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{option}</p>
            </button>
          );
        })}
      </div>

      {result === 'correct' && (
        <div className="quiz-feedback success">
          <Check size={19} />
          <div>
            <b>{completed ? '복습 정답입니다.' : '정답입니다. +10 XP'}</b>
            <p>{term.practical}</p>
          </div>
        </div>
      )}

      {result === 'wrong' && (
        <div className="quiz-feedback error">
          <CircleX size={19} />
          <div>
            <b>아쉽습니다. 정답을 확인하고 다시 풀어보세요.</b>
            <p>정답: {term.simple}</p>
          </div>
        </div>
      )}

      <div className="mini-quiz-actions">
        {result === 'wrong' && (
          <button type="button" className="secondary" onClick={retry}>
            <RotateCcw size={17} />
            다시 풀기
          </button>
        )}
        <button
          type="button"
          className="primary"
          disabled={!selected || result === 'correct'}
          onClick={submit}
        >
          {result === 'correct'
            ? '학습 완료'
            : completed
              ? '복습 정답 확인'
              : '정답 확인'}
        </button>
      </div>
    </section>
  );
}
