import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useWithdrawMutation } from './use-transaction';

import { WithdrawalSchema, withdrawalSchema } from '~/constants/schemas/withdrawal.schema';
import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';

export const useWithdrawForm = () => {
  const queryClient = useQueryClient();
  const { createWithdrawQuery } = useWithdrawMutation();
  const form = useForm<WithdrawalSchema>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      amount: 0,
      bankAccountId: '',
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    createWithdrawQuery.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QueryKey.Transaction.Withdraw] });
        queryClient.invalidateQueries({ queryKey: [QueryKey.User.Current] });
        ToastAndroid.show(translate.transaction.toast.withdraw_success, ToastAndroid.SHORT);
        form.reset();

        setTimeout(() => {
          router.back();
        }, 1000);
      },
      onError: (error) => {
        ToastAndroid.show(
          error.message || translate.transaction.toast.withdraw_error,
          ToastAndroid.SHORT
        );
      },
    });
  });

  return {
    form,
    onSubmit,
    isLoading: createWithdrawQuery.isPending,
    isSuccess: createWithdrawQuery.isSuccess,
    isError: createWithdrawQuery.isError,
  };
};
