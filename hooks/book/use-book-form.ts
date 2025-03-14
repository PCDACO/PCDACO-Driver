import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useBookingMutation } from './use-book';

import { BookPayloadSchema, bookSchema } from '~/constants/schemas/book.schema';

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
    // console.log('data', data);

    createBooking.mutate(data, {
      onSuccess: () => {
        ToastAndroid.show('Đặt xe thành công', ToastAndroid.SHORT);
        form.reset();
      },
      onError: (error) => {
        ToastAndroid.show('Đặt xe thất bại', ToastAndroid.SHORT);
        console.log('error', error);
      },
    });
  });

  return { form, onSubmit, isLoading: createBooking.isPending };
};
