import { useQueryClient } from '@tanstack/react-query';
import { ToastAndroid } from 'react-native';

import { useBookingMutation } from './use-book';

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

  const { cancelBooking, paymentBooking } = useBookingMutation();

  const handleApproveOrRejectBooking = (status: boolean) => {
    if (status) {
      paymentBooking.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.Detail] });
          queryClient.invalidateQueries({ queryKey: [QueryKey.Booking.get.List] });
          ToastAndroid.show(translate.booking.toast.approve, ToastAndroid.SHORT);
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
          ToastAndroid.show(translate.booking.toast.reject, ToastAndroid.SHORT);
        },
        onError: (error: any) => {
          ToastAndroid.show(error.message || translate.booking.failed.message, ToastAndroid.SHORT);
        },
      });
    }
  };

  return {
    handleApproveOrRejectBooking,
  };
};
