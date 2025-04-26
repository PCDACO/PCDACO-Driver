import { FontAwesome } from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent, useCallback } from 'react';
import { View, Text, Animated, ScrollView, ToastAndroid } from 'react-native';

import BookForm from '~/components/form-ui/booking/book-form';
import { Checkbox } from '~/components/layout/checkbox';
import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { useBookingForm } from '~/hooks/book/use-book-form';
import { useCarUnavailableQuery } from '~/hooks/car/use-car';
import { useSwipeComplete } from '~/hooks/plugins/use-swipe-complete';
import { mergeDateTime } from '~/lib/format';
import { useContractParamsStore } from '~/store/use-params';

const Booking: FunctionComponent = () => {
  const [isAccepted, setIsAccepted] = React.useState(false);
  const { setParams, params } = useContractParamsStore();
  const { id, bookingId } = useLocalSearchParams();

  // form action booking
  const {
    form,
    onSubmit,
    isLoading: isBookingLoading,
  } = useBookingForm({
    bookingId: bookingId as string,
    carId: id as string,
  });

  // get unavailable dates
  const { data: unavailableDates } = useCarUnavailableQuery({
    id: id as string,
    month: form.getValues('startDay').getMonth() + 1,
    year: form.getValues('startDay').getFullYear(),
  });

  // set default value for startTime and endTime if bookingId is not undefined
  React.useEffect(() => {
    if (bookingId && params.startTime && params.endTime) {
      const startDay = new Date(params.startTime);
      const endDay = new Date(params.endTime);

      form.setValue('startDay', startDay);
      form.setValue('endDay', endDay);
      form.setValue('startTime', startDay);
      form.setValue('endTime', endDay);
    }
  }, [bookingId, params.startTime, params.endTime]);

  // set params for booking
  React.useEffect(() => {
    setParams({
      carId: id as string,
      startTime: mergeDateTime(form.getValues('startDay'), form.getValues('startTime')),
      endTime: mergeDateTime(form.getValues('endDay'), form.getValues('endTime')),
    });
  }, []);

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

  // handle swipe to complete booking
  const {
    panResponder,
    translateX: buttonTranslateX,
    scale: buttonScale,
  } = useSwipeComplete({
    onComplete: handleComplete,
  });

  return (
    <View className="relative h-screen bg-slate-100 dark:bg-slate-800">
      <ScrollView>
        <View className="min-h-screen rounded-t-3xl bg-white px-6 py-4 dark:bg-slate-800">
          <BookForm
            form={form}
            unavailableDates={unavailableDates?.value || [{ date: new Date() }]}
          />

          <View className="mt-4 flex-row flex-wrap items-start gap-2">
            <Checkbox
              checked={isAccepted}
              onCheckedChange={(check) => setIsAccepted(check)}
              style={{ borderRadius: 100 }}
            />
            <Text className="flex-1 items-baseline text-sm text-muted-foreground">
              Tôi đã đọc và đồng ý với{' '}
              <Link href="/(screen)/(contract)/contract">
                <Text className="text-primary">Hợp đồng</Text>
              </Link>
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
