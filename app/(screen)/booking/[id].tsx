import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent, useCallback } from 'react';
import { View, Text, Animated, ScrollView, ToastAndroid } from 'react-native';

import BookForm from '~/components/form-ui/booking/book-form';
import { Checkbox } from '~/components/layout/checkbox';
import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { useBookingForm } from '~/hooks/book/use-book-form';
import { useCarDetailQuery } from '~/hooks/car/use-car';
import { useSwipeComplete } from '~/hooks/plugins/use-swipe-complete';

const Booking: FunctionComponent = () => {
  const [isAccepted, setIsAccepted] = React.useState(false);

  const { id } = useLocalSearchParams();
  const { data: car, isLoading } = useCarDetailQuery(id as string);
  const { form, onSubmit, isLoading: isBookingLoading } = useBookingForm();

  React.useEffect(() => {
    if (id) {
      form.setValue('carId', id as string);
    }
  }, [id]);

  const handleComplete = useCallback(async () => {
    setIsAccepted((prev) => {
      if (!prev) {
        ToastAndroid.show(
          'Vui lòng đồng ý với điều khoản dịch vụ và chính sách bảo mật',
          ToastAndroid.SHORT
        );
        return prev;
      }

      onSubmit();
      return prev;
    });
  }, [onSubmit, isAccepted]);

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

  return (
    <View className="relative h-screen bg-slate-100 dark:bg-slate-800">
      <ScrollView className="">
        <View className="min-h-screen rounded-t-3xl bg-white px-6 py-4 dark:bg-slate-800">
          <BookForm form={form} />

          <View className="mt-4 flex-row flex-wrap items-start gap-2">
            <Checkbox
              checked={isAccepted}
              onCheckedChange={(check) => setIsAccepted(check)}
              style={{ borderRadius: 100 }}
            />
            <Text className="flex-1 text-sm text-muted-foreground">
              Tôi đã đọc và đồng ý với <Text className="text-primary">Điều khoản dịch vụ</Text> và{' '}
              <Text className="text-primary">Chính sách bảo mật</Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-10 left-0 right-0 px-5">
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
