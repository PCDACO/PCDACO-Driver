import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '~/lib/query-key';
import { TransmissionService } from '~/services/transmission.service';

interface ITransmissionQuery {
  params?: Partial<RootRequest>;
}

export const useTransmissionQuery = ({ params }: ITransmissionQuery) => {
  const transmissionQuery = useQuery({
    queryKey: [QueryKey.Transmission.List, params],
    queryFn: async () => await TransmissionService.listTransmissions(params),
  });

  return transmissionQuery;
};
