import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

import { UserPasswordPayload, UserPayload } from '~/constants/models/user.model';
import { QueryKey } from '~/lib/query-key';
import { UserService } from '~/services/user.service';

export const useUserQuery = () => {
  const currentUserQuery = useQuery({
    queryKey: [QueryKey.User.Current],
    queryFn: async () => await UserService.get.current(),
    staleTime: 0,
    retry: 2,
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

export const useUserMutation = () => {
  const queryClient = new QueryClient();

  const updateUserMutation = useMutation({
    mutationKey: [QueryKey.User.Update],
    mutationFn: async ({ id, payload }: { id: string; payload: UserPayload }) =>
      await UserService.put.user(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.User.Current] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateUserPasswordMutation = useMutation({
    mutationKey: [QueryKey.User.Password],
    mutationFn: async ({ id, payload }: { id: string; payload: UserPasswordPayload }) =>
      await UserService.patch.password(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.User.Current] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateUserAvatarMutation = useMutation({
    mutationKey: [QueryKey.User.Avatar],
    mutationFn: async ({ id, avatar }: { id: string; avatar: File }) =>
      await UserService.patch.avatar(id, avatar),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.User.Current] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { updateUserMutation, updateUserPasswordMutation, updateUserAvatarMutation };
};
