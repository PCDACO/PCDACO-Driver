import { Platform } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

const ANIMATION_EASING: Animated.EasingFunction = Easing.out(Easing.exp);
const ANIMATION_DURATION = 2200;

const ANIMATION_CONFIGS_IOS = {
  damping: 500,
  stiffness: 1000,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 10,
  restSpeedThreshold: 10,
};

const ANIMATION_CONFIGS_ANDROID = {
  duration: ANIMATION_DURATION,
  easing: ANIMATION_EASING,
};

export const ANIMATION_CONFIGS =
  Platform.OS === 'ios' ? ANIMATION_CONFIGS_IOS : ANIMATION_CONFIGS_ANDROID;
