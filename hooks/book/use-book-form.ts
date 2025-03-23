import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useBookingMutation } from './use-book';

import { BookPayloadSchema, bookSchema } from '~/constants/schemas/book.schema';
import { translate } from '~/lib/translate';

export const useBookingForm = () => {
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
        form.reset();
      },
      onError: (error: any) => {
        ToastAndroid.show(error.message || translate.booking.failed.title, ToastAndroid.SHORT);
        console.log('error', error);
      },
    });
  });

  return { form, onSubmit, isLoading: createBooking.isPending };
};
