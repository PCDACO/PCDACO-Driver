import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '~/lib/query-key';
import { ManufacturerService } from '~/services/manufacturer.service';

interface UseManufacturerQuery {
  params?: RootRequest;
}

export const useManufactureQuery = ({ params }: UseManufacturerQuery) => {
  const query = useQuery({
    queryKey: [QueryKey.Manufacturer.List],
    queryFn: async () => await ManufacturerService.listManufacturer(params),
  });
  return query;
};
