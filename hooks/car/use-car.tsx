import { useQuery } from '@tanstack/react-query';

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
