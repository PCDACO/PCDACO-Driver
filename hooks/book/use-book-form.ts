import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useBookingMutation } from './use-book';

import { BookPayloadSchema, bookSchema } from '~/constants/schemas/book.schema';
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
      startTime: new Date(),
      endTime: new Date(),
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    createBooking.mutate(data, {
      onSuccess: () => {
        ToastAndroid.show(translate.booking.success.title, ToastAndroid.SHORT);
        queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.List] });
        form.reset();
        setTimeout(() => {
          router.navigate({
            pathname: '/booking',
          });
        }, 1000);
      },
      onError: (error: any) => {
        ToastAndroid.show(error.message || translate.booking.failed.title, ToastAndroid.SHORT);
        console.log('error', error);
      },
    });
  });

  return { form, onSubmit, isLoading: createBooking.isPending };
};
