import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Check, Copy, RotateCcw, Send, Sparkles, Trash2 } from 'lucide-react';
import { BottomNav, Header, ProgressBar } from './components';
import { callFlow, categories, suggestedQuestions, terms } from './data';
import { getMockAnswer } from './mockAi';
import {
  clearDemoData, loadLearningState, loadMessages, saveLearningState, saveMessages,
} from './storage';
import type { ChatMessage, LearningState, Page, Term } from './types';

function HomePage({ state, go }: { state: LearningState; go: (p: Page) => void }) {
  const progress = Math.round((state.completedTermIds.length / terms.length) * 100);
  return (
    <>
      <section className="hero-card">
        <span className="pill">오늘의 학습</span>
        <h2>통신 흐름을 직접 조립하며 익혀보세요.</h2>
        <p>용어 암기보다 실제 QA 흐름에 가깝게 학습하는 프로토타입입니다.</p>
        <button className="primary" onClick={() => go('learn')}>이어 학습하기</button>
      </section>

      <section className="section">
        <div className="section-title"><h3>내 진행률</h3><b>{progress}%</b></div>
        <ProgressBar value={progress} />
        <div className="stats-grid">
          <div className="stat"><strong>{state.completedTermIds.length}</strong><span>학습 용어</span></div>
          <div className="stat"><strong>{state.solvedBlockIds.length}</strong><span>블록 완료</span></div>
          <div className="stat"><strong>{state.xp}</strong><span>총 XP</span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-title"><h3>빠른 시작</h3></div>
        <div className="quick-grid">
          <button className="quick-card" onClick={() => go('learn')}>
            <span>📚</span><b>용어 학습</b><small>SIP부터 차근차근</small>
          </button>
          <button className="quick-card" onClick={() => go('blocks')}>
            <span>🧩</span><b>순서 조립</b><small>통화 절차 맞추기</small>
          </button>
          <button className="quick-card" onClick={() => go('ai')}>
            <span>🤖</span><b>AI 질문</b><small>Mock 답변 체험</small>
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

  const complete = (id: string) => {
    if (state.completedTermIds.includes(id)) return;
    setState({
      ...state,
      xp: state.xp + 10,
      completedTermIds: [...state.completedTermIds, id],
    });
  };

  if (selected) {
    const done = state.completedTermIds.includes(selected.id);
    return (
      <section className="detail-card">
        <button className="text-button" onClick={() => setSelected(null)}>← 용어 목록</button>
        <span className="pill">{selected.category}</span>
        <h2>{selected.term}</h2>
        <p className="full-name">{selected.fullName}</p>
        <div className="explain-box"><b>쉽게 설명하면</b><p>{selected.simple}</p></div>
        <div className="explain-box"><b>실무에서는</b><p>{selected.practical}</p></div>
        <div className="explain-box"><b>예시</b><p>{selected.example}</p></div>
        <button className="primary full" disabled={done} onClick={() => complete(selected.id)}>
          {done ? <><Check size={18}/> 학습 완료</> : '학습 완료 +10 XP'}
        </button>
      </section>
    );
  }

  return (
    <>
      <div className="chip-row">
        {categories.slice(0, 7).map((c) => <span className="chip" key={c}>{c}</span>)}
      </div>
      <section className="card-list">
        {terms.map((term) => {
          const done = state.completedTermIds.includes(term.id);
          return (
            <button className="term-card" key={term.id} onClick={() => setSelected(term)}>
              <div className="term-icon">{term.term.slice(0, 2)}</div>
              <div><b>{term.term}</b><span>{term.simple}</span></div>
              {done && <Check className="done-icon" size={20}/>}
            </button>
          );
        })}
      </section>
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
  const shuffled = useMemo(() => [...callFlow].sort(() => Math.random() - 0.5), []);
  const [blocks, setBlocks] = useState(shuffled);
  const [result, setResult] = useState<string | null>(null);

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    setBlocks(next);
    setResult(null);
  };

  const submit = () => {
    const correct = blocks.filter((b, i) => b.id === callFlow[i].id).length;
    if (correct === callFlow.length) {
      setResult('정답이에요! 음성통화 기본 절차를 완성했습니다.');
      if (!state.solvedBlockIds.includes('voice-call-flow')) {
        setState({
          ...state,
          xp: state.xp + 30,
          solvedBlockIds: [...state.solvedBlockIds, 'voice-call-flow'],
        });
      }
    } else {
      setResult(`${callFlow.length}개 중 ${correct}개가 올바른 위치에 있어요.`);
    }
  };

  return (
    <section>
      <div className="question-card">
        <span className="pill">순서 조립</span>
        <h2>음성통화를 발신하고 정상 연결 여부를 확인하는 순서를 완성하세요.</h2>
        <p>화살표 버튼으로 블록의 위치를 바꿔보세요.</p>
      </div>

      <div className="block-list">
        {blocks.map((block, index) => (
          <div className="block-item" key={block.id}>
            <span className="block-number">{index + 1}</span>
            <p>{block.label}</p>
            <div className="block-actions">
              <button aria-label="위로 이동" onClick={() => move(index, -1)}><ArrowUp size={17}/></button>
              <button aria-label="아래로 이동" onClick={() => move(index, 1)}><ArrowDown size={17}/></button>
            </div>
          </div>
        ))}
      </div>

      {result && <div className="result-box">{result}</div>}
      <div className="button-row">
        <button className="secondary" onClick={() => { setBlocks(shuffled); setResult(null); }}>
          <RotateCcw size={17}/> 초기화
        </button>
        <button className="primary" onClick={submit}>답안 제출</button>
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
    if (!value || loading) return;

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
    setMessages([{
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '새 채팅을 시작했어요. 궁금한 통신 QA 내용을 물어보세요.',
    }]);
  };

  return (
    <section className="chat-shell">
      <div className="chat-top">
        <div><b><Sparkles size={17}/> TestFlow AI</b><span>Demo Mock 응답</span></div>
        <button className="icon-button" onClick={reset}><Trash2 size={18}/></button>
      </div>

      <div className="suggestions">
        {suggestedQuestions.map((q) => <button key={q} onClick={() => send(q)}>{q}</button>)}
      </div>

      <div className="messages">
        {messages.map((m) => (
          <div className={`message ${m.role}`} key={m.id}>
            <p>{m.content}</p>
            {m.role === 'assistant' && (
              <button title="복사" onClick={() => navigator.clipboard.writeText(m.content)}>
                <Copy size={14}/>
              </button>
            )}
          </div>
        ))}
        {loading && <div className="message assistant"><p className="typing">답변을 정리하고 있어요…</p></div>}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
          placeholder="통신 QA 질문을 입력하세요"
        />
        <button onClick={() => send()}><Send size={19}/></button>
      </div>
    </section>
  );
}

function ProfilePage({ state, reset }: { state: LearningState; reset: () => void }) {
  const level = Math.floor(state.xp / 100) + 1;
  return (
    <section>
      <div className="profile-card">
        <div className="avatar">TF</div>
        <h2>통신 입문자</h2>
        <p>신입 4개월차</p>
        <span className="level-badge">LEVEL {level}</span>
      </div>

      <div className="section">
        <div className="section-title"><h3>학습 기록</h3><b>{state.xp} XP</b></div>
        <ProgressBar value={state.xp % 100} />
        <div className="record-list">
          <div><span>학습 완료 용어</span><b>{state.completedTermIds.length}개</b></div>
          <div><span>완료한 블록 퀴즈</span><b>{state.solvedBlockIds.length}개</b></div>
          <div><span>다음 레벨까지</span><b>{100 - (state.xp % 100)} XP</b></div>
        </div>
      </div>

      <button className="danger-button" onClick={reset}>Demo 데이터 초기화</button>
      <p className="notice">모든 기록은 현재 브라우저의 localStorage에만 저장됩니다.</p>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>(() => {
    const hash = location.hash.replace('#/', '') as Page;
    return ['home', 'learn', 'blocks', 'ai', 'profile'].includes(hash) ? hash : 'home';
  });
  const [state, setState] = useState<LearningState>(loadLearningState);

  useEffect(() => saveLearningState(state), [state]);

  const go = (next: Page) => {
    setPage(next);
    location.hash = `/${next}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reset = () => {
    if (!confirm('저장된 Demo 학습 기록과 채팅을 초기화할까요?')) return;
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
        {page === 'learn' && <LearnPage state={state} setState={setState} />}
        {page === 'blocks' && <BlocksPage state={state} setState={setState} />}
        {page === 'ai' && <AiPage />}
        {page === 'profile' && <ProfilePage state={state} reset={reset} />}
      </main>
      <BottomNav current={page} onChange={go} />
    </div>
  );
}
