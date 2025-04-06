import { create } from 'zustand';

import { BookPaymentResponse } from '~/constants/models/book.model';

interface UseResponse<T> {
  response: T | null;
  setResponse: (response: T) => void;
  clearResponse: () => void;
}

export const useResponse = <T>() =>
  create<UseResponse<T>>((set) => ({
    response: null,
    setResponse: (response: T) => set({ response }),
    clearResponse: () => set({ response: null }),
  }));

export const PaymentResponseStore = create<UseResponse<BookPaymentResponse>>((set) => ({
  response: null,
  setResponse: (response: BookPaymentResponse) => set({ response }),
  clearResponse: () => set({ response: null }),
}));
