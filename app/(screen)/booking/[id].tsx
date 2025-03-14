import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import BookForm from '~/components/form-ui/booking/book-form';
import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import CarImages from '~/components/screen/car-detail-screen/car-images';
import { useBookingForm } from '~/hooks/book/use-book-form';
import { useCarDetailQuery } from '~/hooks/car/use-car';

type GestureContext = {
  startX: number;
  startY: number;
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const BUTTON_WIDTH = SCREEN_WIDTH - 40;
const DRAG_THRESHOLD = BUTTON_WIDTH * 0.7;

const Booking: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const { data: car, isLoading } = useCarDetailQuery(id as string);
  const { form, onSubmit, isLoading: isBookingLoading } = useBookingForm();
  const router = useRouter();
  const translateX = useSharedValue(0);

  React.useEffect(() => {
    if (id) {
      form.setValue('carId', id as string);
    }
  }, [id]);

  const handleComplete = () => {
    onSubmit();

    setTimeout(() => {
      translateX.value = withSpring(0);
    }, 300);
  };

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

  const dragStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (isLoading || !car) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 text-muted-foreground">Đang tải thông tin xe...</Text>
      </View>
    );
  }
  return (
    <View className="relative h-screen bg-slate-100 dark:bg-slate-800">
      <View className="absolute left-4 top-4 z-10">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <CarImages />

      <ScrollView className="absolute left-0 right-0 top-0 translate-y-1/3">
        <View className="min-h-screen rounded-t-3xl bg-white px-6 py-4 dark:bg-slate-800">
          <BookForm form={form} />
        </View>
      </ScrollView>

      <View className="absolute bottom-4 left-0 right-0 px-5">
        <View className="relative h-16 w-full rounded-full bg-gray-600/20 p-2">
          {isBookingLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <>
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
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Booking;
