import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { View, TouchableOpacity, Text, Animated, ScrollView } from 'react-native';

import BookForm from '~/components/form-ui/booking/book-form';
import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import CarImages from '~/components/screen/car-detail-screen/car-images';
import { SwiperImageItem } from '~/components/ui/swiper-images';
import { useBookingForm } from '~/hooks/book/use-book-form';
import { useCarDetailQuery } from '~/hooks/car/use-car';
import { useSwipeComplete } from '~/hooks/plugins/use-swipe-complete';

const Booking: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const { data: car, isLoading } = useCarDetailQuery(id as string);
  const { form, onSubmit, isLoading: isBookingLoading } = useBookingForm();
  const router = useRouter();

  React.useEffect(() => {
    if (id) {
      form.setValue('carId', id as string);
    }
  }, [id]);

  const handleComplete = () => {
    onSubmit();
  };

  const {
    panResponder,
    translateX: buttonTranslateX,
    scale: buttonScale,
  } = useSwipeComplete({
    onComplete: handleComplete,
  });

  if (isLoading || !car) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 text-muted-foreground">Đang tải thông tin xe...</Text>
      </View>
    );
  }

  const carImages: SwiperImageItem[] =
    car?.value.images
      .filter((item) => item.type === 'Car')
      .map((image) => ({
        id: image.id,
        url: image.url,
      })) || [];

  return (
    <View className="relative h-screen bg-slate-100 dark:bg-slate-800">
      <View className="absolute left-4 top-4 z-10">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <CarImages images={carImages} />

      <ScrollView className="absolute left-0 right-0 top-0 translate-y-1/3">
        <View className="min-h-screen rounded-t-3xl bg-white px-6 py-4 dark:bg-slate-800">
          <BookForm form={form} />
        </View>
      </ScrollView>

      <View className="absolute bottom-4 left-0 right-0 px-5">
        <View className="bg-foreground/20 relative h-12 w-full items-center justify-center overflow-hidden rounded-full">
          {isBookingLoading ? (
            <View className="flex-row items-center justify-center gap-2">
              <ActivityIndicator size="small" color="#0000ff" />
              <Text className="text-base font-bold text-background ">Đang đặt xe...</Text>
            </View>
          ) : (
            <>
              <Animated.View
                className="absolute left-1 top-1 size-10 items-center justify-center rounded-full bg-blue-500"
                style={{
                  transform: [{ translateX: buttonTranslateX }, { scale: buttonScale }],
                }}
                {...panResponder.panHandlers}>
                <FontAwesome name="arrow-right" size={20} color="white" />
              </Animated.View>
              <View className="h-full w-full items-center justify-center">
                <Text className="text-base font-bold text-background ">Vuốt để đặt xe</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Booking;
