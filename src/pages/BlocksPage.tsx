import {
  ArrowDown,
  ArrowUp,
  Check,
  GripVertical,
  Lightbulb,
  RotateCcw,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { blockQuizzes } from '../data';
import type { LearningState, QuizBlock } from '../types';
import type { LearningStateUpdater } from '../hooks/useLearningState';
import { shuffleItems } from '../utils/shuffle';

type QuizResult = 'correct' | 'wrong' | null;

export function BlocksPage({
  state,
  setState,
  focusQuizId,
  onFocusHandled,
}: {
  state: LearningState;
  setState: (next: LearningStateUpdater) => void;
  focusQuizId?: string | null;
  onFocusHandled?: () => void;
}) {
  const [selectedQuizId, setSelectedQuizId] = useState(blockQuizzes[0].id);
  const selectedQuiz = useMemo(
    () =>
      blockQuizzes.find((quiz) => quiz.id === selectedQuizId) ??
      blockQuizzes[0],
    [selectedQuizId],
  );
  const [availableBlocks, setAvailableBlocks] = useState<QuizBlock[]>(() =>
    shuffleItems(blockQuizzes[0].blocks),
  );
  const [answerBlocks, setAnswerBlocks] = useState<QuizBlock[]>([]);
  const [result, setResult] = useState<QuizResult>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [earnedXp, setEarnedXp] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const selectQuiz = (quizId: string) => {
    const quiz =
      blockQuizzes.find((item) => item.id === quizId) ?? blockQuizzes[0];

    setSelectedQuizId(quiz.id);
    setAvailableBlocks(shuffleItems(quiz.blocks));
    setAnswerBlocks([]);
    setResult(null);
    setShowAnswer(false);
    setEarnedXp(false);
    setDraggedId(null);
  };

  useEffect(() => {
    if (!focusQuizId) {
      return;
    }
    selectQuiz(focusQuizId);
    onFocusHandled?.();
  }, [focusQuizId, onFocusHandled]);

  const addBlock = (blockId: string) => {
    const block = availableBlocks.find((item) => item.id === blockId);
    if (!block) {
      return;
    }

    setAvailableBlocks((current) =>
      current.filter((item) => item.id !== blockId),
    );
    setAnswerBlocks((current) => [...current, block]);
    setResult(null);
    setShowAnswer(false);
  };

  const removeBlock = (blockId: string) => {
    const block = answerBlocks.find((item) => item.id === blockId);
    if (!block) {
      return;
    }

    setAnswerBlocks((current) =>
      current.filter((item) => item.id !== blockId),
    );
    setAvailableBlocks((current) => [...current, block]);
    setResult(null);
    setShowAnswer(false);
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= answerBlocks.length) {
      return;
    }

    const next = [...answerBlocks];
    [next[index], next[target]] = [next[target], next[index]];
    setAnswerBlocks(next);
    setResult(null);
    setShowAnswer(false);
  };

  const moveDraggedBlock = (overId: string) => {
    if (!draggedId || draggedId === overId) {
      return;
    }

    setAnswerBlocks((current) => {
      const from = current.findIndex((block) => block.id === draggedId);
      const to = current.findIndex((block) => block.id === overId);
      if (from < 0 || to < 0) {
        return current;
      }

      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  const checkAnswer = () => {
    if (answerBlocks.length !== selectedQuiz.blocks.length) {
      return;
    }

    const isCorrect = answerBlocks.every(
      (block, index) => block.id === selectedQuiz.blocks[index].id,
    );
    const reviewedAt = new Date().toISOString();

    if (isCorrect) {
      setResult('correct');
      setShowAnswer(false);
      const alreadySolved = state.solvedBlockIds.includes(selectedQuiz.id);
      setEarnedXp(!alreadySolved);
      setState((current) => {
        const alreadySolvedNow = current.solvedBlockIds.includes(selectedQuiz.id);

        return {
          ...current,
          xp: alreadySolvedNow ? current.xp : current.xp + selectedQuiz.xp,
          solvedBlockIds: alreadySolvedNow
            ? current.solvedBlockIds
            : [...current.solvedBlockIds, selectedQuiz.id],
          lastReviewedAt: {
            ...current.lastReviewedAt,
            [`block:${selectedQuiz.id}`]: reviewedAt,
          },
        };
      });
      return;
    }

    setResult('wrong');
    setShowAnswer(true);
    setState((current) => ({
      ...current,
      blockMistakes: {
        ...current.blockMistakes,
        [selectedQuiz.id]:
          (current.blockMistakes[selectedQuiz.id] ?? 0) + 1,
      },
      lastReviewedAt: {
        ...current.lastReviewedAt,
        [`block:${selectedQuiz.id}`]: reviewedAt,
      },
    }));
  };

  const resetCurrent = () => {
    setAvailableBlocks(shuffleItems(selectedQuiz.blocks));
    setAnswerBlocks([]);
    setResult(null);
    setShowAnswer(false);
    setEarnedXp(false);
  };

  const mistakeCount = state.blockMistakes[selectedQuiz.id] ?? 0;

  return (
    <>
      <section className="block-intro">
        <span className="learning-kicker">TC ORDER TRAINING</span>
        <h2>풀고 싶은 TC를 고른 뒤 절차를 순서대로 조합하세요.</h2>
        <p>틀린 문제는 오답노트에 자동 저장되고 정답 순서를 바로 확인할 수 있습니다.</p>
      </section>

      <div className="quiz-selector">
        {blockQuizzes.map((quiz, index) => {
          const solved = state.solvedBlockIds.includes(quiz.id);
          const wrongCount = state.blockMistakes[quiz.id] ?? 0;

          return (
            <button
              type="button"
              className={`quiz-option ${
                quiz.id === selectedQuiz.id ? 'active' : ''
              }`}
              key={quiz.id}
              onClick={() => selectQuiz(quiz.id)}
            >
              <span>TC {String(index + 1).padStart(2, '0')}</span>
              <b>{quiz.title}</b>
              <small>
                {quiz.blocks.length}단계 · {quiz.category}
              </small>
              <span className="quiz-option-status">
                {wrongCount > 0 && <em>오답 {wrongCount}회</em>}
                {solved && (
                  <i>
                    <Check size={13} />
                    완료
                  </i>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <section className="selected-quiz-card">
        <div>
          <span className="quiz-category">{selectedQuiz.category}</span>
          <h3>{selectedQuiz.title}</h3>
          <p>{selectedQuiz.description}</p>
        </div>
        <div className="selected-quiz-meta">
          <span className="quiz-xp">+{selectedQuiz.xp} XP</span>
          <span>누적 오답 {mistakeCount}회</span>
        </div>
      </section>

      <div className="block-workspace">
        <section className="block-panel">
          <div className="block-panel-title">
            <div>
              <span>STEP 1</span>
              <h3>선택 가능한 블록</h3>
            </div>
            <b>{availableBlocks.length}개</b>
          </div>

          {availableBlocks.length > 0 ? (
            <div className="block-pool">
              {availableBlocks.map((block) => (
                <button
                  type="button"
                  className="pool-block"
                  key={block.id}
                  onClick={() => addBlock(block.id)}
                >
                  <span>+</span>
                  <p>{block.label}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="block-empty">
              <Check size={20} />
              <span>모든 블록을 선택했어요.</span>
            </div>
          )}
        </section>

        <section className="block-panel answer-panel">
          <div className="block-panel-title">
            <div>
              <span>STEP 2</span>
              <h3>내가 조합한 순서</h3>
            </div>
            <b>
              {answerBlocks.length}/{selectedQuiz.blocks.length}
            </b>
          </div>

          {answerBlocks.length > 0 ? (
            <div className="block-list assembled-list">
              {answerBlocks.map((block, index) => (
                <div
                  className={`block-item ${
                    draggedId === block.id ? 'dragging' : ''
                  }`}
                  key={block.id}
                  draggable
                  onDragStart={() => setDraggedId(block.id)}
                  onDragEnd={() => setDraggedId(null)}
                  onDragOver={(event: { preventDefault: () => void }) => {
                    event.preventDefault();
                    moveDraggedBlock(block.id);
                  }}
                >
                  <span className="block-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <GripVertical className="drag-handle" size={19} />
                  <p>{block.label}</p>
                  <div className="block-controls">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => move(index, -1)}
                      aria-label="위로 이동"
                    >
                      <ArrowUp size={15} />
                    </button>
                    <button
                      type="button"
                      disabled={index === answerBlocks.length - 1}
                      onClick={() => move(index, 1)}
                      aria-label="아래로 이동"
                    >
                      <ArrowDown size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeBlock(block.id)}
                      aria-label="블록 제거"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="block-empty">
              <GripVertical size={20} />
              <span>왼쪽 블록을 눌러 순서를 만들어보세요.</span>
            </div>
          )}
        </section>
      </div>

      {result === 'correct' && (
        <div className="quiz-feedback success block-result">
          <Check size={21} />
          <div>
            <b>정답입니다!</b>
            <p>
              {earnedXp
                ? `${selectedQuiz.xp} XP를 획득했습니다.`
                : '복습을 완료했습니다.'}
            </p>
          </div>
        </div>
      )}

      {result === 'wrong' && (
        <div className="quiz-feedback error block-result">
          <Lightbulb size={21} />
          <div>
            <b>순서가 다릅니다. 오답노트에 저장했습니다.</b>
            <p>올바른 순서를 확인한 뒤 다시 조합해보세요.</p>
          </div>
        </div>
      )}

      {showAnswer && (
        <section className="correct-order-card">
          <div className="section-title">
            <h3>정답 순서와 단계별 확인 포인트</h3>
            <span>{selectedQuiz.blocks.length}단계</span>
          </div>
          <ol>
            {selectedQuiz.blocks.map((block) => (
              <li key={block.id}>{block.label}</li>
            ))}
          </ol>
        </section>
      )}

      <div className="block-actions">
        <button type="button" className="secondary" onClick={resetCurrent}>
          <RotateCcw size={17} />
          처음부터
        </button>
        <button
          type="button"
          className="primary"
          disabled={answerBlocks.length !== selectedQuiz.blocks.length}
          onClick={checkAnswer}
        >
          정답 확인
        </button>
      </div>
    </>
  );
}
