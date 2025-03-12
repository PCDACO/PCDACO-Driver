import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '~/lib/query-key';
import { UserService } from '~/services/user.service';

export const useUserQuery = () => {
  const currentUserQuery = useQuery({
    queryKey: [QueryKey.User.Current],
    queryFn: async () => await UserService.get.current(),
  });

  return {
    currentUserQuery,
  };
};
export const useUserDetailQuery = (id: string) => {
  const userDetailQuery = useQuery({
    queryKey: [QueryKey.User.Detail, id],
    queryFn: async () => await UserService.get.detail(id),
  });

  return userDetailQuery;
};
export const useUserMutation = () => {};
