import { useCallback, useEffect, useState } from 'react';
import {
  BottomNav,
  Header,
  LevelUpModal,
  NicknameModal,
} from './components';
import { useLearningState } from './hooks/useLearningState';
import {
  AiPage,
  BlocksPage,
  HomePage,
  LearnPage,
  ProfilePage,
  ReviewPage,
} from './pages';
import type { Page } from './types';

const validPages: Page[] = [
  'home',
  'learn',
  'blocks',
  'review',
  'ai',
  'profile',
];

const pageTitles: Record<Page, string> = {
  home: 'TestFlow',
  learn: '용어 학습',
  blocks: 'TC 블록 퀴즈',
  review: '오답 복습',
  ai: 'AI 질문',
  profile: '마이페이지',
};

function getPageFromHash(): Page {
  const value = window.location.hash.replace(/^#\/?/, '').split('/')[0];
  return validPages.includes(value as Page) ? (value as Page) : 'home';
}

export default function App() {
  const [page, setPage] = useState<Page>(() => getPageFromHash());
  const [focusQuizId, setFocusQuizId] = useState<string | null>(null);
  const [focusTermId, setFocusTermId] = useState<string | null>(null);
  const {
    state,
    setState,
    reset,
    levelUpTo,
    closeLevelUp,
  } = useLearningState();

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#/home');
    }

    const onHashChange = () => {
      setPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((nextPage: Page) => {
    if (getPageFromHash() === nextPage) {
      setPage(nextPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.location.hash = `/${nextPage}`;
  }, []);

  const retryBlock = useCallback(
    (quizId: string) => {
      setFocusQuizId(quizId);
      navigate('blocks');
    },
    [navigate],
  );


  const resetWithConfirmation = () => {
    if (
      window.confirm(
        '닉네임, XP, 완료 기록과 오답노트를 모두 초기화하시겠습니까?',
      )
    ) {
      reset();
      navigate('home');
    }
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <div className="app-frame">
        <Header title={pageTitles[page]} xp={state.xp} />

        <main className="page-content">
          {page === 'home' && <HomePage state={state} go={navigate} />}
          {page === 'learn' && (
            <LearnPage
              state={state}
              setState={setState}
              focusTermId={focusTermId}
              onFocusHandled={() => setFocusTermId(null)}
            />
          )}
          {page === 'blocks' && (
            <BlocksPage
              state={state}
              setState={setState}
              focusQuizId={focusQuizId}
              onFocusHandled={() => setFocusQuizId(null)}
            />
          )}
          {page === 'review' && (
            <ReviewPage
              state={state}
              setState={setState}
              retryBlock={retryBlock}
            />
          )}
          {page === 'ai' && <AiPage />}
          {page === 'profile' && (
            <ProfilePage
              state={state}
              setState={setState}
              reset={resetWithConfirmation}
            />
          )}
        </main>

        <BottomNav current={page} onChange={navigate} />
      </div>

      {!state.nickname && (
        <NicknameModal
          onSubmit={(nickname) =>
            setState((current) => ({ ...current, nickname }))
          }
        />
      )}

      {levelUpTo !== null && state.nickname && (
        <LevelUpModal
          level={levelUpTo}
          nickname={state.nickname}
          onClose={closeLevelUp}
        />
      )}
    </div>
  );
}
