import { useMutation, useQuery } from '@tanstack/react-query';

import { BookParams, BookPayload } from '~/constants/models/book.model';
import { QueryKey } from '~/lib/query-key';
import { BookService } from '~/services/book.service';

export const useBookingListQuery = (params?: Partial<BookParams>) => {
  const bookingQuery = useQuery({
    queryKey: [QueryKey.Booking.List, params ?? {}],
    queryFn: async () => await BookService.get.list(params),
  });

  return bookingQuery;
};

export const useBookingDetailQuery = () => {};

export const useBookingMutation = () => {
  const createBooking = useMutation({
    mutationKey: [QueryKey.Booking.Create],
    mutationFn: async (payload: BookPayload) => await BookService.post.bookings(payload),
  });

  return { createBooking };
};
