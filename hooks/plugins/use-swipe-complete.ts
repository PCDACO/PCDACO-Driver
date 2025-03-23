import { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const BUTTON_WIDTH = SCREEN_WIDTH - 48;
const DRAG_THRESHOLD = BUTTON_WIDTH * 0.6;

interface UseSwipeCompleteProps {
  onComplete: () => void;
  onReset?: () => void;
}

export const useSwipeComplete = ({ onComplete, onReset }: UseSwipeCompleteProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const resetButton = useCallback(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsCompleted(false);
      onReset?.();
    });
  }, [translateX, scale, onReset]);

  const handlePanResponderMove = useCallback(
    (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      if (isCompleted) return;
      translateX.setValue(Math.max(0, Math.min(gestureState.dx, BUTTON_WIDTH - 50)));
    },
    [translateX, isCompleted]
  );

  const handlePanResponderRelease = useCallback(
    (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      if (isCompleted) return;

      if (gestureState.dx >= DRAG_THRESHOLD) {
        Animated.parallel([
          Animated.spring(translateX, {
            toValue: BUTTON_WIDTH - 50,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1.1,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setIsCompleted(true);
          onComplete();
          setTimeout(resetButton, 1000);
        });
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
    [translateX, scale, isCompleted, onComplete, resetButton]
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isCompleted,
      onMoveShouldSetPanResponder: () => !isCompleted,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderRelease,
      onPanResponderTerminate: handlePanResponderRelease,
      onPanResponderTerminationRequest: () => false,
    })
  ).current;

  return {
    panResponder,
    translateX,
    scale,
    isCompleted,
  };
};
