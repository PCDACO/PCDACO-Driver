import { useRef } from 'react';
import { Animated, PanResponder, Dimensions } from 'react-native';

interface UsePanResponderProps {
  initialPosition?: number;
  onExpand?: () => void;
  onCollapse?: () => void;
}

export const usePanResponder = ({
  initialPosition = 370,
  onExpand,
  onCollapse,
}: UsePanResponderProps = {}) => {
  const slideAnim = useRef(new Animated.Value(initialPosition)).current;
  const screenHeight = Dimensions.get('window').height;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newPosition = initialPosition + gestureState.dy;
        if (newPosition >= 0 && newPosition <= screenHeight) {
          slideAnim.setValue(newPosition);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < screenHeight / 3) {
          // If pulled up more than 1/3 of screen height, expand
          Animated.spring(slideAnim, {
            toValue: 60,
            useNativeDriver: true,
            tension: 65,
            friction: 10,
          }).start();
          onExpand?.();
        } else {
          // Otherwise, return to default position
          Animated.spring(slideAnim, {
            toValue: initialPosition,
            useNativeDriver: true,
            tension: 65,
            friction: 10,
          }).start();
          onCollapse?.();
        }
      },
    })
  ).current;

  return {
    slideAnim,
    panResponder,
  };
};

//   onScroll: (event) => {
//     if (isScrollEnabled.value) {
//       scrollY.value = event.contentOffset.y;
//     }
//   },
// });

// const verticalGestureHandler = useAnimatedGestureHandler<
//   PanGestureHandlerGestureEvent,
//   GestureContext
// >({
//   onStart: (_, ctx) => {
//     ctx.startY = translateY.value;
//   },
//   onActive: (event, ctx) => {
//     // Only handle drag if we're not in full screen or if we're at the top of the scroll
//     if (!isScrollEnabled.value || scrollY.value <= 0) {
//       const newTranslateY = ctx.startY + event.translationY;
//       translateY.value = Math.max(0, Math.min(SCREEN_HEIGHT * 0.6, newTranslateY));
//     }
//   },
//   onEnd: (event) => {
//     const shouldExpand = event.velocityY < -600 || translateY.value < SCREEN_HEIGHT * 0.3;

//     const finalPosition = shouldExpand ? 0 : SCREEN_HEIGHT * 0.6;
//     translateY.value = withSpring(finalPosition, {
//       velocity: event.velocityY,
//       damping: 15,
//       stiffness: 50,
//     });

//     // Enable scrolling only when fully expanded
//     isScrollEnabled.value = finalPosition === 0;
//   },
// });
// const slideStyle = useAnimatedStyle(() => {
//   const currentTranslateY = translateY.value - (isScrollEnabled.value ? scrollY.value : 0);

//   return {
//     transform: [
//       {
//         translateY: currentTranslateY,
//       },
//     ],
//     height: interpolate(
//       translateY.value,
//       [0, SCREEN_HEIGHT * 0.6],
//       [SCREEN_HEIGHT, SCREEN_HEIGHT * 0.5],
//       Extrapolate.CLAMP
//     ),
//   };
// });
// Drag to submit button
// const horizontalGestureHandler = useAnimatedGestureHandler<
//   PanGestureHandlerGestureEvent,
//   GestureContext
// >({
//   onStart: (_, ctx) => {
//     ctx.startX = translateX.value;
//   },
//   onActive: (event, ctx) => {
//     const newValue = ctx.startX + event.translationX;
//     translateX.value = Math.max(0, Math.min(newValue, BUTTON_WIDTH - 64));
//   },
//   onEnd: () => {
//     if (translateX.value > DRAG_THRESHOLD) {
//       translateX.value = withSpring(BUTTON_WIDTH - 64);
//       runOnJS(handleComplete)();
//     } else {
//       translateX.value = withSpring(0);
//     }
//   },
// });

// // Drag to submit button
// const dragStyle = useAnimatedStyle(() => ({
//   transform: [{ translateX: translateX.value }],
// }));

// const imageContainerStyle = useAnimatedStyle(() => {
//   const progress = interpolate(
//     translateY.value,
//     [0, SCREEN_HEIGHT * 0.6],
//     [0, 1],
//     Extrapolate.CLAMP
//   );

//   const scale = interpolate(progress, [0, 1], [1, 1], Extrapolate.CLAMP);
//   const opacity = interpolate(progress, [0, 1], [0.3, 1], Extrapolate.CLAMP);

//   return {
//     transform: [{ scale }],
//     opacity,
//   };
// });
