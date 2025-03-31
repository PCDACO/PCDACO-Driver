import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { CarParams } from '~/constants/models/car.model';
import { QueryKey } from '~/lib/query-key';
import { CarService } from '~/services/car.service';

export const useCarsListQuery = (params: Partial<CarParams>) => {
  const carsQuery = useQuery({
    queryKey: [QueryKey.Car.List, params],
    queryFn: async () => await CarService.get.list(params),
    staleTime: 1000 * 60 * 1,
    retry: 1,
  });

  return carsQuery;
};

export const useCarDetailQuery = (id: string) => {
  const carQuery = useQuery({
    queryKey: [QueryKey.Car.Detail, id],
    queryFn: async () => await CarService.get.detail(id),
  });

  return carQuery;
};

export const useCarsListInfiniteQuery = (params: Partial<CarParams>) => {
  const query = useInfiniteQuery({
    queryKey: [QueryKey.Car.List, params],
    queryFn: () => CarService.get.list(params),
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      return lastPage.value.hasNext ? lastPage.value.items.at(-1)?.id : undefined;
    },
    retry: 1,
    staleTime: 1000 * 60 * 1,
    enabled: !!params,
  });

  return query;
};
