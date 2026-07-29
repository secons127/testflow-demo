//React hook
import { useCallback, useEffect, useState } from 'react';

// 컴포넌트 
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

//페이지 목록 
const validPages: Page[] = [ 
  'home',
  'learn',
  'blocks',
  'review',
  'ai',
  'profile',
];

//페이지 string
const pageTitles: Record<Page, string> = {
  home: 'TestFlow',
  learn: '용어 학습',
  blocks: 'TC 블록 퀴즈',
  review: '오답 복습',
  ai: 'AI 질문',
  profile: '마이페이지',
};


//현재 표시할 페이지
function getPageFromHash(): Page {
  const value = window.location.hash.replace(/^#\/?/, '').split('/')[0];
  return validPages.includes(value as Page) ? (value as Page) : 'home';
}

//실행 중 데이터 상태값 저장
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


  //주소-페이지 연결 (null 값 > home으로)
  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#/home');
    }

  //화면 이동 시 scroll up
    const onHashChange = () => {
      setPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

  //주소-페이지 연결
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  //화면 이동 시 scroll up
  const navigate = useCallback((nextPage: Page) => {
    if (getPageFromHash() === nextPage) {
      setPage(nextPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.location.hash = `/${nextPage}`;
  }, []);

  // 오답 블록 퀴즈를 다시 풀기
  const retryBlock = useCallback(
    (quizId: string) => {
      setFocusQuizId(quizId);
      navigate('blocks');
    },
    [navigate],
  );
  
  // 학습 기록 초기화
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
      {/* 배경 효과 */}
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
  
      {/* 앱의 기본 화면 */}
      <div className="app-frame">
        <Header title={pageTitles[page]} xp={state.xp} />
  
        {/* 현재 page 값에 맞는 화면 표시 */}
        <main className="page-content">
          {page === 'home' && (
            <HomePage state={state} go={navigate} />
          )}
  
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
  
        {/* 하단 페이지 이동 메뉴 */}
        <BottomNav current={page} onChange={navigate} />
      </div>
  
      {/* 닉네임이 없을 때 표시 */}
      {!state.nickname && (
        <NicknameModal
          onSubmit={(nickname) =>
            setState((current) => ({
              ...current,
              nickname,
            }))
          }
        />
      )}
  
      {/* 레벨업했을 때 표시 */}
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
