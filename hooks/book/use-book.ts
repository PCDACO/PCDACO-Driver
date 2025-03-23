import { useMutation, useQuery } from '@tanstack/react-query';

import { BookParams, BookPayload } from '~/constants/models/book.model';
import { QueryKey } from '~/lib/query-key';
import { BookService } from '~/services/book.service';

export const useBookingListQuery = (params?: Partial<BookParams>) => {
  const bookingQuery = useQuery({
    queryKey: [QueryKey.Booking.List, params ?? {}],
    queryFn: async () => await BookService.get.list(params),
    enabled: !!params,
  });

  return bookingQuery;
};

export const useBookingDetailQuery = (id: string) => {
  const bookingDetailQuery = useQuery({
    queryKey: [QueryKey.Booking.Detail, id],
    queryFn: async () => await BookService.get.detail(id),
    enabled: !!id,
  });

  return bookingDetailQuery;
};

export const useBookingMutation = () => {
  const createBooking = useMutation({
    mutationKey: [QueryKey.Booking.Create],
    mutationFn: async (payload: BookPayload) => await BookService.post.bookings(payload),
  });

  return { createBooking };
};
