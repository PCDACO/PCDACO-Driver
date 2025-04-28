import { Entypo, FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent, useCallback } from 'react';
import { Animated, Text, View } from 'react-native';

import BookForm from '~/components/form-ui/booking/book-form';
import CardBasic from '~/components/plugins/card-basic';
import Loading from '~/components/plugins/loading';
import Subtitle from '~/components/ui/subtitle';
import { useBookingForm } from '~/hooks/book/use-book-form';
import { useCarUnavailableQuery } from '~/hooks/car/use-car';
import { useSwipeComplete } from '~/hooks/plugins/use-swipe-complete';
import { useContractParamsStore } from '~/store/use-params';

const ExtendScreen: FunctionComponent = () => {
  const { bookingId, id, status } = useLocalSearchParams();
  const { params } = useContractParamsStore();

  const { form, onSubmit, isLoading } = useBookingForm({
    bookingId: bookingId as string,
    status: status as string,
  });

  React.useEffect(() => {
    if (params.startTime && params.endTime) {
      const startDay = new Date(params.startTime);
      const endDay = new Date(params.endTime);

      form.setValue('startDay', startDay);
      form.setValue('endDay', endDay);
      form.setValue('startTime', startDay);
      form.setValue('endTime', endDay);
    }
  }, [params.startTime, params.endTime]);

  // get unavailable dates
  const { data: unavailableDates } = useCarUnavailableQuery({
    id: id as string,
    month: form.getValues('startDay').getMonth() + 1,
    year: form.getValues('startDay').getFullYear(),
  });

  const handleComplete = useCallback(async () => {
    onSubmit();
  }, [onSubmit]);

  const {
    panResponder,
    translateX: buttonTranslateX,
    scale: buttonScale,
  } = useSwipeComplete({
    onComplete: handleComplete,
  });

  return (
    <View className="relative h-screen bg-slate-100 dark:bg-slate-800">
      <View className="px-2 py-4">
        <CardBasic className="gap-2">
          <BookForm
            form={form}
            unavailableDates={unavailableDates?.value || []}
            isExtend
            status={status as string}
          />

          <Subtitle title="Lưu ý:" className="text-sm" />
          <View className="gap-2">
            <Note description="Vui lòng thanh toán sau khi gia hạn thành công" />
          </View>
        </CardBasic>
      </View>
      <View className="absolute bottom-10 left-0 right-0 px-5">
        <View className="bg-foreground/20 relative h-12 w-full items-center justify-center overflow-hidden rounded-full">
          {isLoading ? (
            <View className="flex-row items-center justify-center gap-2">
              <Loading size="small" />
              <Text className="text-base font-bold text-background ">Đang gia hạn...</Text>
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
                <Text className="text-base font-bold text-background ">Vuốt để gia hạn</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ExtendScreen;

const Note = ({ description }: { description: string }) => {
  return (
    <View className="flex-row items-start gap-2">
      <Entypo name="dot-single" size={20} color="gray" />
      <Text className="text-sm text-muted-foreground">{description}</Text>
    </View>
  );
};
