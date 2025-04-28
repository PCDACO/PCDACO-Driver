import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useBookingMutation } from './use-book';

import { BookingStatusEnum } from '~/constants/enums';
import { BookPayloadSchema, bookSchema } from '~/constants/schemas/book.schema';
import { mergeDateTime } from '~/lib/format';
import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';
import { PaymentResponseStore } from '~/store/use-response';

interface BookFormProps {
  bookingId?: string;
  carId?: string;
  status?: string;
}

export const useBookingForm = ({ bookingId, carId, status }: BookFormProps) => {
  const { setResponse } = PaymentResponseStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { createBooking, extendBooking, paymentBooking } = useBookingMutation();

  const isOnGoing = status === BookingStatusEnum.Ongoing;

  const form = useForm<BookPayloadSchema>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      startDay: new Date(),
      endDay: new Date(new Date().setDate(new Date().getDate() + 1)),
      startTime: new Date(),
      endTime: new Date(),
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    const mergedStart = mergeDateTime(new Date(data.startDay), new Date(data.startTime));
    const mergedEnd = mergeDateTime(new Date(data.endDay), new Date(data.endTime));

    if (bookingId) {
      extendBooking.mutate(
        {
          id: bookingId,
          payload: {
            newStartTime: mergedStart,
            newEndTime: mergedEnd,
          },
        },
        {
          onSuccess: (response) => {
            ToastAndroid.show(
              response.message || translate.booking.success.extend,
              ToastAndroid.SHORT
            );
            queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.List] });
            queryClient.invalidateQueries({
              queryKey: [QueryKey.Booking.get.Detail, bookingId],
            });
            form.reset();

            if (isOnGoing) {
              paymentBooking.mutate(bookingId, {
                onSuccess: (response) => {
                  queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.Detail] });
                  queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.List] });
                  ToastAndroid.show(translate.booking.toast.payment, ToastAndroid.SHORT);
                  setResponse(response.value);
                  form.reset();
                  if (response.value) {
                    router.push({
                      pathname: '/booking/payment',
                      params: {
                        id: bookingId,
                      },
                    });
                  } else {
                    ToastAndroid.show(translate.booking.failed.message, ToastAndroid.SHORT);
                  }
                },
                onError: (error: any) => {
                  ToastAndroid.show(
                    error.response.data.message || translate.booking.failed.payment,
                    ToastAndroid.SHORT
                  );
                },
              });
            } else {
              setTimeout(() => {
                router.navigate({
                  pathname: '/(screen)/booking/detail/[id]',
                  params: { id: response.value.bookingId },
                });
              }, 1000);
            }
          },
          onError: (error: any) => {
            ToastAndroid.show(
              error.response.data.message || translate.booking.failed.extend,
              ToastAndroid.SHORT
            );
          },
        }
      );
    } else {
      createBooking.mutate(
        {
          carId: carId as string,
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
            queryClient.invalidateQueries({
              queryKey: [QueryKey.Booking.get.Detail, response.value.bookingId],
            });
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
          },
        }
      );
    }
  });

  return {
    form,
    onSubmit,
    isLoading: createBooking.isPending,
  };
};
