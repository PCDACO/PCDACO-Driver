import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '~/lib/query-key';
import { ModelsService } from '~/services/model.service';

interface IUseModelQuery {
  params?: Partial<RootRequest>;
}

export const useModelQuery = ({ params }: IUseModelQuery) => {
  const modelListQuery = useQuery({
    queryKey: [QueryKey.Model.List, params],
    queryFn: () => ModelsService.get.list(params),
    enabled: !!params?.keyword,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });

  return modelListQuery;
};
