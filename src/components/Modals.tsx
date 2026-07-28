import { PartyPopper } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

export function NicknameModal({
  onSubmit,
}: {
  onSubmit: (nickname: string) => void;
}) {
  const [nickname, setNickname] = useState('');

  const submit = () => {
    const value = nickname.trim();
    if (value) {
      onSubmit(value);
    }
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

export function LevelUpModal({
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
        onClick={(event: { stopPropagation: () => void }) => event.stopPropagation()}
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
