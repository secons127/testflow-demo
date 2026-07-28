import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent, PointerEvent } from 'react';
import {
  BookOpenCheck,
  Check,
  Copy,
  ExternalLink,
  GripVertical,
  PartyPopper,
  Pencil,
  RotateCcw,
  Search,
  Send,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import { BottomNav, Header, ProgressBar } from './components';
import { blockQuizzes, categories, suggestedQuestions, terms } from './data';
import { getMockAnswer } from './mockAi';
import {
  clearDemoData,
  loadLearningState,
  loadMessages,
  saveLearningState,
  saveMessages,
} from './storage';
import type { ChatMessage, LearningState, Page, Term } from './types';

const validTermIds = new Set(terms.map((term) => term.id));

function shuffleItems<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function completedTermCount(state: LearningState) {
  return state.completedTermIds.filter((id) => validTermIds.has(id)).length;
}

function HomePage({ state, go }: { state: LearningState; go: (p: Page) => void }) {
  const completed = completedTermCount(state);
  const progress = Math.round((completed / terms.length) * 100);

  return (
    <>
      <section className="hero-card">
        <span className="pill">오늘의 학습</span>
        <h2>통신 용어를 흐름과 함께 익혀보세요.</h2>
        <p>
          호 처리부터 코덱, IMS 망, 듀얼 SIM까지 실무에서 자주 만나는 개념을
          정리했습니다.
        </p>
        <button className="primary" onClick={() => go('learn')}>
          용어 학습 시작
        </button>
      </section>

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
          <button className="quick-card" onClick={() => go('learn')}>
            <span className="quick-index">01</span>
            <b>용어 학습</b>
            <small>SIP부터 차근차근</small>
          </button>

          <button className="quick-card" onClick={() => go('blocks')}>
            <span className="quick-index">02</span>
            <b>TC 블록 퀴즈</b>
            <small>문제를 골라 순서 조합</small>
          </button>

          <button className="quick-card" onClick={() => go('ai')}>
            <span className="quick-index">03</span>
            <b>AI 질문</b>
            <small>Mock 답변 체험</small>
          </button>
        </div>
      </section>
    </>
  );
}

function LearnPage({
  state,
  setState,
}: {
  state: LearningState;
  setState: (s: LearningState) => void;
}) {
  const [selected, setSelected] = useState<Term | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [query, setQuery] = useState('');

  const completed = completedTermCount(state);
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

  const complete = (id: string) => {
    if (state.completedTermIds.includes(id)) {
      return;
    }

    setState({
      ...state,
      xp: state.xp + 10,
      completedTermIds: [...state.completedTermIds, id],
    });
  };

  if (selected) {
    const done = state.completedTermIds.includes(selected.id);

    const dictionaryUrl =
      `https://terms.tta.or.kr/dictionary/searchList.do?keyword=` +
      encodeURIComponent(selected.term);

    return (
      <section className="detail-card">
        <button className="text-button" onClick={() => setSelected(null)}>
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

        <button
          className="primary full"
          disabled={done}
          onClick={() => complete(selected.id)}
        >
          {done ? (
            <>
              <Check size={18} />
              학습 완료
            </>
          ) : (
            '학습 완료 +10 XP'
          )}
        </button>
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
          <p>검색하거나 분야를 골라 필요한 개념부터 학습하세요.</p>
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

        {query && (
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={() => setQuery('')}
          >
            <X size={17} />
          </button>
        )}
      </div>

      <div className="chip-row">
        {['전체', ...categories].map((category) => (
          <button
            type="button"
            className={`chip ${selectedCategory === category ? 'active' : ''}`}
            key={category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="list-summary">
        <span>{filteredTerms.length}개 용어</span>

        {(query || selectedCategory !== '전체') && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedCategory('전체');
            }}
          >
            필터 초기화
          </button>
        )}
      </div>

      {filteredTerms.length > 0 ? (
        <section className="card-list">
          {filteredTerms.map((term) => {
            const done = state.completedTermIds.includes(term.id);

            return (
              <button
                className="term-card"
                key={term.id}
                onClick={() => setSelected(term)}
              >
                <div className="term-icon">{term.term.slice(0, 2)}</div>

                <div className="term-copy">
                  <span className="term-category">{term.category}</span>
                  <b>{term.term}</b>
                  <small>{term.fullName}</small>
                  <p>{term.simple}</p>
                </div>

                <span className={`term-status ${done ? 'done' : ''}`}>
                  {done ? <Check size={17} /> : '→'}
                </span>
              </button>
            );
          })}
        </section>
      ) : (
        <section className="empty-state">
          <Search size={28} />
          <b>검색 결과가 없습니다.</b>
          <p>다른 용어나 분야를 선택해 보세요.</p>
        </section>
      )}
    </>
  );
}

function BlocksPage({
  state,
  setState,
}: {
  state: LearningState;
  setState: (s: LearningState) => void;
}) {
  const [selectedQuizId, setSelectedQuizId] = useState(blockQuizzes[0].id);

  const selectedQuiz =
    blockQuizzes.find((quiz) => quiz.id === selectedQuizId) ?? blockQuizzes[0];

  const [availableBlocks, setAvailableBlocks] = useState(() =>
    shuffleItems(blockQuizzes[0].blocks),
  );

  const [answerBlocks, setAnswerBlocks] = useState<
    (typeof blockQuizzes)[number]['blocks']
  >([]);

  const [result, setResult] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const draggingIdRef = useRef<string | null>(null);
  const lastOverIdRef = useRef<string | null>(null);

  const selectQuiz = (quizId: string) => {
    const quiz =
      blockQuizzes.find((item) => item.id === quizId) ?? blockQuizzes[0];

    setSelectedQuizId(quiz.id);
    setAvailableBlocks(shuffleItems(quiz.blocks));
    setAnswerBlocks([]);
    setResult(null);
    setDraggingId(null);
  };

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
  };

  const moveBlock = (activeId: string, overId: string) => {
    setAnswerBlocks((current) => {
      const from = current.findIndex((block) => block.id === activeId);
      const to = current.findIndex((block) => block.id === overId);

      if (from < 0 || to < 0 || from === to) {
        return current;
      }

      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);

      return next;
    });

    setResult(null);
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
  };

  const startDrag = (
    event: PointerEvent<HTMLButtonElement>,
    id: string,
  ) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);

    draggingIdRef.current = id;
    lastOverIdRef.current = null;

    setDraggingId(id);
    setResult(null);
  };

  const dragMove = (event: PointerEvent<HTMLButtonElement>) => {
    const activeId = draggingIdRef.current;

    if (!activeId) {
      return;
    }

    event.preventDefault();

    const target = document.elementFromPoint(event.clientX, event.clientY);

    const overItem = target?.closest<HTMLElement>(
      '[data-answer-block-id]',
    );

    const overId = overItem?.dataset.answerBlockId;

    if (
      !overId ||
      overId === activeId ||
      overId === lastOverIdRef.current
    ) {
      return;
    }

    moveBlock(activeId, overId);
    lastOverIdRef.current = overId;
  };

  const endDrag = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    draggingIdRef.current = null;
    lastOverIdRef.current = null;

    setDraggingId(null);
  };

  const handleKeyMove = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      move(index, -1);
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      move(index, 1);
    }
  };

  const resetQuiz = () => {
    setAvailableBlocks(shuffleItems(selectedQuiz.blocks));
    setAnswerBlocks([]);
    setResult(null);
  };

  const submit = () => {
    if (answerBlocks.length !== selectedQuiz.blocks.length) {
      setResult(
        `아직 ${
          selectedQuiz.blocks.length - answerBlocks.length
        }개 블록을 더 선택해야 해요.`,
      );

      return;
    }

    const correct = answerBlocks.filter(
      (block, index) => block.id === selectedQuiz.blocks[index].id,
    ).length;

    if (correct === selectedQuiz.blocks.length) {
      setResult(
        `정답이에요! ${selectedQuiz.title} 순서를 완성했습니다.`,
      );

      if (!state.solvedBlockIds.includes(selectedQuiz.id)) {
        setState({
          ...state,
          xp: state.xp + selectedQuiz.xp,
          solvedBlockIds: [...state.solvedBlockIds, selectedQuiz.id],
        });
      }
    } else {
      setResult(
        `${selectedQuiz.blocks.length}개 중 ${correct}개가 올바른 위치에 있어요.`,
      );
    }
  };

  return (
    <section>
      <div className="question-card">
        <span className="pill">TC 블록 퀴즈</span>

        <h2>풀고 싶은 TC를 고른 뒤 절차를 순서대로 조합하세요.</h2>

        <p>
          아래 블록을 눌러 답안에 추가하고, 추가한 블록은 손잡이로 다시
          정렬할 수 있어요.
        </p>
      </div>

      <div className="quiz-selector" aria-label="블록 퀴즈 선택">
        {blockQuizzes.map((quiz, index) => {
          const solved = state.solvedBlockIds.includes(quiz.id);

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

              {solved && (
                <em>
                  <Check size={13} />
                  완료
                </em>
              )}
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

        <span className="quiz-xp">+{selectedQuiz.xp} XP</span>
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
                    draggingId === block.id ? 'dragging' : ''
                  }`}
                  data-answer-block-id={block.id}
                  key={block.id}
                >
                  <span className="block-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <p>{block.label}</p>

                  <div className="block-actions">
                    <button
                      type="button"
                      className="drag-handle"
                      aria-label={`${index + 1}번 블록 순서 이동`}
                      aria-pressed={draggingId === block.id}
                      title="누른 채 위아래로 이동"
                      onPointerDown={(
                        event: PointerEvent<HTMLButtonElement>,
                      ) => startDrag(event, block.id)}
                      onPointerMove={dragMove}
                      onPointerUp={endDrag}
                      onPointerCancel={endDrag}
                      onKeyDown={(
                        event: KeyboardEvent<HTMLButtonElement>,
                      ) => handleKeyMove(event, index)}
                    >
                      <GripVertical size={19} />
                    </button>

                    <button
                      type="button"
                      className="remove-block"
                      aria-label={`${index + 1}번 블록 선택 취소`}
                      onClick={() => removeBlock(block.id)}
                    >
                      <X size={17} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="answer-placeholder">
              <span>01</span>

              <p>
                위의 블록을 순서대로 선택해
                <br />
                답안을 만들어보세요.
              </p>
            </div>
          )}
        </section>
      </div>

      {result && <div className="result-box">{result}</div>}

      <div className="button-row">
        <button className="secondary" onClick={resetQuiz}>
          <RotateCcw size={17} />
          처음부터
        </button>

        <button className="primary" onClick={submit}>
          정답 확인
        </button>
      </div>
    </section>
  );
}

function AiPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => saveMessages(messages), [messages]);

  const send = async (text = input) => {
    const value = text.trim();

    if (!value || loading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: value,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 650));

    const aiMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: getMockAnswer(value),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  const reset = () => {
    setMessages([
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          '새 채팅을 시작했어요. 궁금한 통신 용어를 물어보세요.',
      },
    ]);
  };

  return (
    <section className="chat-shell">
      <div className="chat-top">
        <div>
          <b>
            <Sparkles size={17} />
            TestFlow AI
          </b>

          <span>Demo Mock 응답</span>
        </div>

        <button
          className="icon-button"
          onClick={reset}
          aria-label="채팅 초기화"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="suggestions">
        {suggestedQuestions.map((question) => (
          <button key={question} onClick={() => send(question)}>
            {question}
          </button>
        ))}
      </div>

      <div className="messages">
        {messages.map((message) => (
          <div className={`message ${message.role}`} key={message.id}>
            <p>{message.content}</p>

            {message.role === 'assistant' && (
              <button
                title="복사"
                onClick={() =>
                  navigator.clipboard.writeText(message.content)
                }
              >
                <Copy size={14} />
              </button>
            )}
          </div>
        ))}

        {loading && (
          <div className="message assistant">
            <p className="typing">답변을 정리하고 있어요…</p>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setInput(event.target.value)
          }
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              send();
            }
          }}
          placeholder="통신 용어를 질문하세요"
        />

        <button onClick={() => send()} aria-label="질문 보내기">
          <Send size={19} />
        </button>
      </div>
    </section>
  );
}

function ProfilePage({
  state,
  setState,
  reset,
}: {
  state: LearningState;
  setState: (s: LearningState) => void;
  reset: () => void;
}) {
  const level = Math.floor(state.xp / 100) + 1;
  const completed = completedTermCount(state);
  const [editingNickname, setEditingNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(state.nickname);

  const saveNickname = () => {
    const nickname = nicknameInput.trim();

    if (!nickname) {
      return;
    }

    setState({ ...state, nickname });
    setEditingNickname(false);
  };

  return (
    <section>
      <div className="profile-card">
        <div className="avatar">TF</div>

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

                if (event.key === 'Escape') {
                  setNicknameInput(state.nickname);
                  setEditingNickname(false);
                }
              }}
              aria-label="닉네임"
            />

            <button type="button" onClick={saveNickname}>
              저장
            </button>
          </div>
        ) : (
          <div className="profile-name-row">
            <h2>{state.nickname}</h2>
            <button
              type="button"
              className="nickname-edit-button"
              aria-label="닉네임 수정"
              onClick={() => {
                setNicknameInput(state.nickname);
                setEditingNickname(true);
              }}
            >
              <Pencil size={15} />
            </button>
          </div>
        )}

        <p>용어부터 흐름까지 한 단계씩</p>
        <span className="level-badge">LEVEL {level}</span>
      </div>

      <div className="section">
        <div className="section-title">
          <h3>학습 기록</h3>
          <b>{state.xp} XP</b>
        </div>

        <ProgressBar value={state.xp % 100} />

        <div className="record-list">
          <div>
            <span>학습 완료 용어</span>
            <b>{completed}개</b>
          </div>

          <div>
            <span>완료한 블록 퀴즈</span>
            <b>{state.solvedBlockIds.length}개</b>
          </div>

          <div>
            <span>다음 레벨까지</span>
            <b>{100 - (state.xp % 100)} XP</b>
          </div>
        </div>
      </div>

      <button className="danger-button" onClick={reset}>
        Demo 데이터 초기화
      </button>

      <p className="notice">
        모든 기록은 현재 브라우저의 localStorage에만 저장됩니다.
      </p>
    </section>
  );
}

function NicknameModal({
  onSubmit,
}: {
  onSubmit: (nickname: string) => void;
}) {
  const [nickname, setNickname] = useState('');

  const submit = () => {
    const value = nickname.trim();

    if (!value) {
      return;
    }

    onSubmit(value);
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="app-modal nickname-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nickname-modal-title"
      >
        <div className="modal-icon">TF</div>
        <span className="modal-kicker">WELCOME TO TESTFLOW</span>
        <h2 id="nickname-modal-title">사용할 닉네임을 입력해 주세요.</h2>
        <p>마이페이지와 학습 기록에 입력한 닉네임이 표시됩니다.</p>

        <input
          autoFocus
          maxLength={12}
          value={nickname}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setNickname(event.target.value)
          }
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              submit();
            }
          }}
          placeholder="닉네임 (최대 12자)"
          aria-label="닉네임 입력"
        />

        <button
          type="button"
          className="primary full"
          disabled={!nickname.trim()}
          onClick={submit}
        >
          학습 시작하기
        </button>
      </section>
    </div>
  );
}

function LevelUpModal({
  level,
  nickname,
  onClose,
}: {
  level: number;
  nickname: string;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="app-modal level-up-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="level-up-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="celebration-icon">
          <PartyPopper size={32} />
        </div>
        <span className="modal-kicker">LEVEL UP</span>
        <h2 id="level-up-title">레벨업을 축하합니다!</h2>
        <p>
          {nickname}님이 <b>LEVEL {level}</b>에 도달했어요.
        </p>
        <button type="button" className="primary full" onClick={onClose}>
          계속 학습하기
        </button>
      </section>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>(() => {
    const hash = location.hash.replace('#/', '') as Page;

    return ['home', 'learn', 'blocks', 'ai', 'profile'].includes(hash)
      ? hash
      : 'home';
  });

  const [state, setState] = useState<LearningState>(loadLearningState);
  const [levelUpLevel, setLevelUpLevel] = useState<number | null>(null);
  const previousLevelRef = useRef(Math.floor(state.xp / 100) + 1);

  useEffect(() => saveLearningState(state), [state]);

  useEffect(() => {
    const currentLevel = Math.floor(state.xp / 100) + 1;

    if (currentLevel > previousLevelRef.current) {
      setLevelUpLevel(currentLevel);
    }

    previousLevelRef.current = currentLevel;
  }, [state.xp]);

  const go = (next: Page) => {
    setPage(next);
    location.hash = `/${next}`;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const reset = () => {
    if (!confirm('저장된 Demo 학습 기록과 채팅을 초기화할까요?')) {
      return;
    }

    clearDemoData();
    location.reload();
  };

  const titles: Record<Page, string> = {
    home: 'TestFlow',
    learn: '용어 학습',
    blocks: '블록 퀴즈',
    ai: 'AI 질문',
    profile: '마이페이지',
  };

  return (
    <div className="app-shell">
      <main className="app-content">
        <Header title={titles[page]} xp={state.xp} />

        {page === 'home' && <HomePage state={state} go={go} />}

        {page === 'learn' && (
          <LearnPage state={state} setState={setState} />
        )}

        {page === 'blocks' && (
          <BlocksPage state={state} setState={setState} />
        )}

        {page === 'ai' && <AiPage />}

        {page === 'profile' && (
          <ProfilePage state={state} setState={setState} reset={reset} />
        )}
      </main>

      <BottomNav current={page} onChange={go} />

      {!state.nickname && (
        <NicknameModal
          onSubmit={(nickname) => setState({ ...state, nickname })}
        />
      )}

      {levelUpLevel !== null && (
        <LevelUpModal
          level={levelUpLevel}
          nickname={state.nickname}
          onClose={() => setLevelUpLevel(null)}
        />
      )}
    </div>
  );
}
