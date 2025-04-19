import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useUserMutation } from './use-user';

import { UserPayloadSchema, userSchema } from '~/constants/schemas/user.schema';
import { QueryKey } from '~/lib/query-key';

interface UserFormProps {
  id: string;
}

export const useUserForm = ({ id }: UserFormProps) => {
  const queryClient = useQueryClient();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const { updateUserMutation } = useUserMutation();
  const form = useForm<UserPayloadSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      dateOfBirth: new Date(),
      phone: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    updateUserMutation.mutate(
      { id, payload: data },
      {
        onSuccess: (data) => {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
          setIsSuccess(true);
          queryClient.invalidateQueries({ queryKey: [QueryKey.User.Current] });
          setTimeout(() => {
            router.back();
          }, 1000);
        },
        onError: (error: any) => {
          setIsSuccess(false);
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
        },
      }
    );
  });

  return { form, onSubmit, isLoading: updateUserMutation.isPending, isSuccess };
};
