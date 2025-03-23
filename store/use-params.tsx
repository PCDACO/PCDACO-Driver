import { create } from 'zustand';

import { BookParams } from '~/constants/models/book.model';

type ParamsStore<T> = {
  params: T;
  setParams: (params: T) => void;
  resetParams: () => void;
};

export function createParamsStore<T>(initialParams: T) {
  return create<ParamsStore<T>>((set) => ({
    params: initialParams,
    setParams: (params) => set({ params }),
    resetParams: () => set({ params: initialParams }),
  }));
}

export const useBookingParamsStore = createParamsStore<Partial<BookParams>>({});
