import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export function useIsScreenActive() {
  const isFocused = useIsFocused();
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener('change', setAppState);
    return () => sub.remove();
  }, []);

  const isScreenActive = isFocused && appState === 'active';

  return isScreenActive;
}
