import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '~/lib/query-key';
import { FuelService } from '~/services/fuel.service';

interface UseFuelProps {
  params?: Partial<RootRequest>;
}

export const useFuelQuery = ({ params }: UseFuelProps) => {
  const listFuelQuery = useQuery({
    queryKey: [QueryKey.Fuel.List, params],
    queryFn: () => FuelService.listFuel(params),
    enabled: !!params,
    retry: 1,
  });

  return listFuelQuery;
};
