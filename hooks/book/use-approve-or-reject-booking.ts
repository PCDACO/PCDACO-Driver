import { useQueryClient } from '@tanstack/react-query';
import { Linking, ToastAndroid } from 'react-native';

import { useBookingMutation } from './use-book';

import { BookStartTripPayload } from '~/constants/models/book.model';
import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';

interface UseApproveOrRejectBooking {
  id: string;
}

export const useApproveOrRejectBooking = ({ id }: UseApproveOrRejectBooking) => {
  if (!id) {
    throw new Error('Id is required');
  }

  const queryClient = useQueryClient();

  const { cancelBooking, paymentBooking, startTripBooking, completeBooking } = useBookingMutation();

  const handleApproveOrRejectBooking = (status: boolean) => {
    if (status) {
      paymentBooking.mutate(id, {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.Detail] });
          queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.List] });
          ToastAndroid.show(translate.booking.toast.payment, ToastAndroid.SHORT);

          Linking.openURL(data.value.paymentUrl);
        },
        onError: (error: any) => {
          ToastAndroid.show(error.message || translate.booking.failed.message, ToastAndroid.SHORT);
        },
      });
    } else {
      cancelBooking.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.Detail] });
          queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.List] });
          ToastAndroid.show(translate.booking.toast.cancel, ToastAndroid.SHORT);
        },
        onError: (error: any) => {
          ToastAndroid.show(error.message || translate.booking.failed.message, ToastAndroid.SHORT);
        },
      });
    }
  };

  const handleStartTrip = (payload: BookStartTripPayload) => {
    startTripBooking.mutate(
      {
        id,
        payload,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.Detail] });
          queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.List] });
          ToastAndroid.show(translate.booking.toast.startTrip, ToastAndroid.SHORT);
        },
        onError: (error: any) => {
          ToastAndroid.show(error.message || translate.booking.failed.message, ToastAndroid.SHORT);
        },
      }
    );
  };

  const handleComplete = () => {
    completeBooking.mutate(id, {
      onSuccess: () => {},
      onError: (error: any) => {
        ToastAndroid.show(error.message || translate.booking.failed.message, ToastAndroid.SHORT);
      },
    });
  };

  return {
    handleApproveOrRejectBooking,
    handleStartTrip,
    handleComplete,
  };
};
