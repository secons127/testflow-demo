import {
  BookOpen,
  Bot,
  Blocks,
  Home,
  NotebookTabs,
  UserRound,
} from 'lucide-react';
import type { Page } from '../types';

const items: Array<{ page: Page; label: string; icon: typeof Home }> = [
  { page: 'home', label: '홈', icon: Home },
  { page: 'learn', label: '학습', icon: BookOpen },
  { page: 'blocks', label: '블록', icon: Blocks },
  { page: 'review', label: '복습', icon: NotebookTabs },
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
          type="button"
          key={page}
          className={current === page ? 'active' : ''}
          onClick={() => onChange(page)}
          aria-current={current === page ? 'page' : undefined}
        >
          <Icon size={19} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
