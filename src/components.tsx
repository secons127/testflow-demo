import {
  BookOpen, Bot, Blocks, Home, UserRound, Zap,
} from 'lucide-react';
import type { Page } from './types';

const items: Array<{ page: Page; label: string; icon: typeof Home }> = [
  { page: 'home', label: '홈', icon: Home },
  { page: 'learn', label: '학습', icon: BookOpen },
  { page: 'blocks', label: '블록', icon: Blocks },
  { page: 'ai', label: 'AI 질문', icon: Bot },
  { page: 'profile', label: '마이', icon: UserRound },
];

export function BottomNav({
  current,
  onChange,
}: {
  current: Page;
  onChange: (page: Page) => void;
}) {
  return (
    <nav className="bottom-nav" aria-label="주요 메뉴">
      {items.map(({ page, label, icon: Icon }) => (
        <button
          key={page}
          className={current === page ? 'active' : ''}
          onClick={() => onChange(page)}
          aria-current={current === page ? 'page' : undefined}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

export function Header({ title, xp }: { title: string; xp: number }) {
  return (
    <header className="top-header">
      <div>
        <div className="eyebrow">TELECOM QA LEARNING</div>
        <h1>{title}</h1>
      </div>
      <div className="xp-badge"><Zap size={15} /> {xp} XP</div>
    </header>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.min(100, value)}>
      <div className="progress-fill" style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}