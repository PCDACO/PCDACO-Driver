import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  BookApprovePayload,
  BookParams,
  BookPayload,
  BookPostInspectionPayload,
  BookPreInspectionPayload,
  BookStartTripPayload,
  BookUpdatePayload,
  Webhook,
} from '~/constants/models/book.model';
import { QueryKey } from '~/lib/query-key';
import { BookService } from '~/services/book.service';

export const useBookingListQuery = (params?: Partial<BookParams>) => {
  const bookingQuery = useInfiniteQuery({
    queryKey: [QueryKey.Booking.get.List, params ?? {}],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await BookService.get.list({
        ...params,
        index: 1,
        size: 10 + (pageParam - 1),
      });
      return response;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.value.hasNext) {
        return lastPage.value.pageNumber + 1;
      }
      return undefined;
    },
    enabled: !!params,
    initialPageParam: 1,
  });

  return bookingQuery;
};

export const useBookingDetailQuery = (id: string) => {
  const bookingDetailQuery = useQuery({
    queryKey: [QueryKey.Booking.get.Detail, id],
    queryFn: async () => await BookService.get.detail(id),
    enabled: !!id,
  });

  return bookingDetailQuery;
};

export const useBookingMutation = () => {
  const createBooking = useMutation({
    mutationKey: [QueryKey.Booking.post.Create],
    mutationFn: async (payload: BookPayload) => await BookService.post.bookings(payload),
  });

  const trackBooking = useMutation({
    mutationKey: [QueryKey.Booking.post.Track],
    mutationFn: async ({ id, payload }: { id: string; payload: BookStartTripPayload }) =>
      await BookService.post.track(id, payload),
  });

  const postInspectionBooking = useMutation({
    mutationKey: [QueryKey.Booking.post.PostInspection],
    mutationFn: async ({
      bookingId,
      payload,
    }: {
      bookingId: string;
      payload: BookPostInspectionPayload;
    }) => await BookService.post.postInspection(bookingId, payload),
  });

  const webhookBooking = useMutation({
    mutationKey: [QueryKey.Booking.post.Webhook],
    mutationFn: async (payload: Webhook) => await BookService.post.webhook(payload),
  });

  const inspectionBooking = useMutation({
    mutationKey: [QueryKey.Booking.post.Inspection],
    mutationFn: async ({
      bookingId,
      payload,
    }: {
      bookingId: string;
      payload: BookPreInspectionPayload;
    }) => await BookService.post.preInspection(bookingId, payload),
  });

  const paymentBooking = useMutation({
    mutationKey: [QueryKey.Booking.post.Payment],
    mutationFn: async (bookingId: string) => await BookService.post.bookingPayment(bookingId),
  });

  const completeBooking = useMutation({
    mutationKey: [QueryKey.Booking.put.Complete],
    mutationFn: async (bookingId: string) => await BookService.put.complete(bookingId),
  });

  const approveOrRejectBooking = useMutation({
    mutationKey: [QueryKey.Booking.put.Approve],
    mutationFn: async ({
      bookingId,
      payload,
    }: {
      bookingId: string;
      payload: BookApprovePayload;
    }) => await BookService.put.approveOrReject(bookingId, payload),
  });

  const cancelBooking = useMutation({
    mutationKey: [QueryKey.Booking.put.Cancel],
    mutationFn: async (id: string) => await BookService.put.cancel(id),
  });

  const returnBooking = useMutation({
    mutationKey: [QueryKey.Booking.put.Return],
    mutationFn: async (id: string) => await BookService.put.return(id),
  });

  const startTripBooking = useMutation({
    mutationKey: [QueryKey.Booking.put.StartTrip],
    mutationFn: async ({ id, payload }: { id: string; payload: BookStartTripPayload }) =>
      await BookService.put.startTrip(id, payload),
  });

  const extendBooking = useMutation({
    mutationKey: [QueryKey.Booking.put.Extend],
    mutationFn: async ({ id, payload }: { id: string; payload: BookUpdatePayload }) =>
      await BookService.put.extend(id, payload),
  });

  return {
    createBooking,
    trackBooking,
    postInspectionBooking,
    webhookBooking,
    inspectionBooking,
    paymentBooking,
    completeBooking,
    approveOrRejectBooking,
    cancelBooking,
    returnBooking,
    startTripBooking,
    extendBooking,
  };
};

export const useBookingContractQuery = (id: string) => {
  const bookingContractQuery = useQuery({
    queryKey: [QueryKey.Booking.get.Contract, id],
    queryFn: async () => await BookService.get.contracts(id),
    enabled: !!id,
    retry: 1,
  });

  return bookingContractQuery;
};

export const useBookingPaymentQuery = (id: string) => {
  const bookingPaymentQuery = useQuery({
    queryKey: [QueryKey.Booking.get.Payment, id],
    queryFn: async () => await BookService.get.payment(id),
  });

  return bookingPaymentQuery;
};
