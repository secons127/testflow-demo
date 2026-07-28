import { useCallback, useEffect, useRef, useState } from 'react';
import {
  clearDemoData,
  defaultLearningState,
  loadLearningState,
  saveLearningState,
} from '../storage';
import type { LearningState } from '../types';

export type LearningStateUpdater =
  | LearningState
  | ((current: LearningState) => LearningState);

export function useLearningState() {
  const [state, setStateInternal] = useState<LearningState>(() =>
    loadLearningState(),
  );
  const [levelUpTo, setLevelUpTo] = useState<number | null>(null);
  const previousLevel = useRef(Math.floor(state.xp / 100) + 1);

  useEffect(() => {
    saveLearningState(state);

    const currentLevel = Math.floor(state.xp / 100) + 1;
    if (currentLevel > previousLevel.current) {
      setLevelUpTo(currentLevel);
    }
    previousLevel.current = currentLevel;
  }, [state]);

  const setState = useCallback((next: LearningStateUpdater) => {
    setStateInternal((current) =>
      typeof next === 'function' ? next(current) : next,
    );
  }, []);

  const reset = useCallback(() => {
    clearDemoData();
    previousLevel.current = 1;
    setLevelUpTo(null);
    setStateInternal({ ...defaultLearningState });
  }, []);

  return {
    state,
    setState,
    reset,
    levelUpTo,
    closeLevelUp: () => setLevelUpTo(null),
  };
}
