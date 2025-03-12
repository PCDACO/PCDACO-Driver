import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { FunctionComponent, useEffect } from 'react';
import { Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import CarBasicInfo from '~/components/screen/car-detail-screen/car-basic-info';
import CarConfiguration from '~/components/screen/car-detail-screen/car-configuration';
import CarImages from '~/components/screen/car-detail-screen/car-images';
import CarMainInfo from '~/components/screen/car-detail-screen/car-main-info';
import OwnerContactInfor from '~/components/screen/car-detail-screen/owner-contact-infor';
import { useCarDetailQuery } from '~/hooks/car/use-car';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BUTTON_WIDTH = SCREEN_WIDTH - 40;
const DRAG_THRESHOLD = BUTTON_WIDTH * 0.7;
// const MIN_SHEET_HEIGHT = SCREEN_HEIGHT * 0.4;
const MAX_SHEET_HEIGHT = SCREEN_HEIGHT;

type GestureContext = {
  startX: number;
  startY: number;
};

const CarDetail: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const translateX = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const translateY = useSharedValue(SCREEN_HEIGHT * 0.6);
  const isScrollEnabled = useSharedValue(false);

  const { data, isLoading } = useCarDetailQuery(id as string);

  useEffect(() => {
    translateY.value = withSpring(SCREEN_HEIGHT * 0.4, {
      damping: 15,
      stiffness: 40,
    });
  }, []);

  const handleComplete = () => {
    router.push({
      pathname: '/booking/[id]',
      params: {
        id: data?.value.id as string,
      },
    });
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (isScrollEnabled.value) {
        scrollY.value = event.contentOffset.y;
      }
    },
  });

  const verticalGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      // Only handle drag if we're not in full screen or if we're at the top of the scroll
      if (!isScrollEnabled.value || scrollY.value <= 0) {
        const newTranslateY = ctx.startY + event.translationY;
        translateY.value = Math.max(0, Math.min(SCREEN_HEIGHT * 0.6, newTranslateY));
      }
    },
    onEnd: (event) => {
      const shouldExpand = event.velocityY < -600 || translateY.value < SCREEN_HEIGHT * 0.3;

      const finalPosition = shouldExpand ? 0 : SCREEN_HEIGHT * 0.6;
      translateY.value = withSpring(finalPosition, {
        velocity: event.velocityY,
        damping: 15,
        stiffness: 50,
      });

      // Enable scrolling only when fully expanded
      isScrollEnabled.value = finalPosition === 0;
    },
  });

  const horizontalGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      const newValue = ctx.startX + event.translationX;
      translateX.value = Math.max(0, Math.min(newValue, BUTTON_WIDTH - 64));
    },
    onEnd: () => {
      if (translateX.value > DRAG_THRESHOLD) {
        translateX.value = withSpring(BUTTON_WIDTH - 64);
        runOnJS(handleComplete)();
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const slideStyle = useAnimatedStyle(() => {
    const currentTranslateY = translateY.value - (isScrollEnabled.value ? scrollY.value : 0);

    return {
      transform: [
        {
          translateY: currentTranslateY,
        },
      ],
      height: interpolate(
        translateY.value,
        [0, SCREEN_HEIGHT * 0.6],
        [SCREEN_HEIGHT, SCREEN_HEIGHT * 0.5],
        Extrapolate.CLAMP
      ),
    };
  });

  const dragStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const imageContainerStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      translateY.value,
      [0, SCREEN_HEIGHT * 0.6],
      [0, 1],
      Extrapolate.CLAMP
    );

    const scale = interpolate(progress, [0, 1], [1, 1], Extrapolate.CLAMP);
    const opacity = interpolate(progress, [0, 1], [0.3, 1], Extrapolate.CLAMP);

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  if (isLoading || !data) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 text-muted-foreground">Đang tải thông tin xe...</Text>
      </View>
    );
  }

  return (
    <View className="relative h-screen">
      {/* Back Button */}
      {translateY.value !== MAX_SHEET_HEIGHT && (
        <View className="absolute left-4 top-4 z-10">
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {/* Car Images with animation */}
      <Animated.View style={imageContainerStyle} className="h-[80%]">
        <CarImages />
      </Animated.View>

      {/* Car Detail */}
      <PanGestureHandler onGestureEvent={verticalGestureHandler}>
        <Animated.View
          className="absolute left-0 w-screen rounded-t-3xl bg-white dark:bg-black"
          style={slideStyle}>
          {/* Handle indicator */}
          <View className="items-center py-2">
            <View className="h-1 w-16 rounded-full bg-gray-300" />
          </View>

          <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            className="px-6"
            bounces={false}>
            <View className="gap-4 pb-32">
              <CarBasicInfo car={data.value} />
              <CarConfiguration car={data.value} />
              <OwnerContactInfor car={data.value} />
              <CarMainInfo car={data.value} />
            </View>
          </Animated.ScrollView>
        </Animated.View>
      </PanGestureHandler>

      {/* Drag to Submit Button */}
      <View className="absolute bottom-4 left-0 right-0 px-5">
        <View className="relative h-16 w-full rounded-full bg-gray-600/20 p-2">
          <PanGestureHandler onGestureEvent={horizontalGestureHandler}>
            <Animated.View
              className="bg-primary/70 h-12 w-12 items-center justify-center rounded-full"
              style={dragStyle}>
              <FontAwesome name="arrow-right" size={24} color="white" />
            </Animated.View>
          </PanGestureHandler>
          <View className="absolute left-0 right-0 top-0 translate-y-6">
            <Text className="text-center text-gray-500">Kéo để đặt xe →</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CarDetail;
