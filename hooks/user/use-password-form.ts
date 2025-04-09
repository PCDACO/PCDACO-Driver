import { zodResolver } from '@hookform/resolvers/zod';
import { QueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useUserMutation } from './use-user';

import { PasswordPayloadSchema, passwordSchema } from '~/constants/schemas/user.schema';
import { QueryKey } from '~/lib/query-key';

interface UsePasswordFormProps {
  id: string;
}

export const usePasswordForm = ({ id }: UsePasswordFormProps) => {
  const queryClient = new QueryClient();
  const { updateUserPasswordMutation } = useUserMutation();
  const form = useForm<PasswordPayloadSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    updateUserPasswordMutation.mutate(
      {
        id,
        payload: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
      },
      {
        onSuccess: () => {
          form.reset();
          queryClient.invalidateQueries({ queryKey: [QueryKey.User.Current] });
          ToastAndroid.show('Mật khẩu đã được cập nhật', ToastAndroid.SHORT);
        },
        onError: (error: any) => {
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
        },
      }
    );
  });

  return {
    form,
    onSubmit,
    isLoading: updateUserPasswordMutation.isPending,
    isDone: updateUserPasswordMutation.isSuccess,
  };
};
