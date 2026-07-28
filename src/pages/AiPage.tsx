import { Copy, Send, Sparkles, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { suggestedQuestions } from '../data';
import { getMockAnswer } from '../mockAi';
import { loadMessages, saveMessages } from '../storage';
import type { ChatMessage } from '../types';

function makeId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

export function AiPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadMessages());
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const send = async (question?: string) => {
    const value = (question ?? input).trim();
    if (!value || loading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: makeId(),
      role: 'user',
      content: value,
    };

    setMessages((current) => [...current, userMessage]);
    setInput('');
    setLoading(true);

    await new Promise((resolve) => window.setTimeout(resolve, 450));

    const aiMessage: ChatMessage = {
      id: makeId(),
      role: 'assistant',
      content: getMockAnswer(value),
    };

    setMessages((current) => [...current, aiMessage]);
    setLoading(false);
  };

  const reset = () => {
    setMessages([
      {
        id: makeId(),
        role: 'assistant',
        content: '새 채팅을 시작했어요. 궁금한 통신 용어를 물어보세요.',
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
          type="button"
          className="icon-button"
          onClick={reset}
          aria-label="채팅 초기화"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="suggestions">
        {suggestedQuestions.map((question) => (
          <button type="button" key={question} onClick={() => send(question)}>
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
                type="button"
                title="복사"
                onClick={() => navigator.clipboard.writeText(message.content)}
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
              void send();
            }
          }}
          placeholder="통신 용어를 질문하세요"
        />
        <button
          type="button"
          onClick={() => void send()}
          aria-label="질문 보내기"
        >
          <Send size={19} />
        </button>
      </div>
    </section>
  );
}
