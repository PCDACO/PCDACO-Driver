import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useBookingMutation } from './use-book';

import { BookPayloadSchema, bookSchema } from '~/constants/schemas/book.schema';
import { mergeDateTime } from '~/lib/format';
import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';

export const useBookingForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { createBooking } = useBookingMutation();

  const form = useForm<BookPayloadSchema>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      carId: '',
      startDay: new Date(),
      endDay: new Date(new Date().setDate(new Date().getDate() + 1)),
      startTime: new Date(),
      endTime: new Date(),
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    const mergedStart = mergeDateTime(new Date(data.startDay), new Date(data.startTime));
    const mergedEnd = mergeDateTime(new Date(data.endDay), new Date(data.endTime));

    createBooking.mutate(
      {
        carId: data.carId,
        startTime: mergedStart,
        endTime: mergedEnd,
      },
      {
        onSuccess: (response) => {
          ToastAndroid.show(
            response.message || translate.booking.success.title,
            ToastAndroid.SHORT
          );
          queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.List] });
          form.reset();
          setTimeout(() => {
            router.navigate({
              pathname: '/booking',
            });
          }, 1000);
        },
        onError: (error: any) => {
          ToastAndroid.show(
            error.response.data.message || translate.booking.failed.title,
            ToastAndroid.SHORT
          );
          console.log('error', error);
        },
      }
    );
  });

  return {
    form,
    onSubmit,
    isLoading: createBooking.isPending,
  };
};
