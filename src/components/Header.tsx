import { Zap } from 'lucide-react';

export function Header({ title, xp }: { title: string; xp: number }) {
  return (
    <header className="top-header">
      <div>
        <div className="eyebrow">TELECOM QA LEARNING</div>
        <h1>{title}</h1>
      </div>
      <div className="xp-badge">
        <Zap size={15} />
        {xp} XP
      </div>
    </header>
  );
}
