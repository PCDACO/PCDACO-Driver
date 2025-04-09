import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import { useBankMutation } from './use-bank';

import { BankSchemaPayload, BankSchema } from '~/constants/schemas/bank.schema';
import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';

interface BankFormProps {
  id?: string;
}

export const useBankForm = ({ id }: BankFormProps) => {
  const queryClient = useQueryClient();
  const { createBankAccountMutation, updateBankAccountMutation } = useBankMutation();

  const form = useForm<BankSchemaPayload>({
    resolver: zodResolver(BankSchema),
    defaultValues: {
      bankInfoId: '',
      accountNumber: '',
      accountName: '',
      isPrimary: false,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    if (id) {
      updateBankAccountMutation.mutate(
        { id, payload: values },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.Bank.Account.List] });
            form.reset();
            ToastAndroid.show(translate.bank.toast.update, ToastAndroid.SHORT);

            setTimeout(() => {
              router.back();
            }, 1000);
          },
          onError: (error: any) => {
            ToastAndroid.show(
              error.response.data.message || translate.bank.toast.error_update,
              ToastAndroid.SHORT
            );
          },
        }
      );
    } else {
      createBankAccountMutation.mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKey.Bank.Account.List] });
          form.reset();
          ToastAndroid.show(translate.bank.toast.create, ToastAndroid.SHORT);

          setTimeout(() => {
            router.back();
          }, 1000);
        },
        onError: (error: any) => {
          ToastAndroid.show(
            error.response.data.message || translate.bank.toast.error_create,
            ToastAndroid.SHORT
          );
        },
      });
    }
  });

  return {
    form,
    onSubmit,
    isLoading: createBankAccountMutation.isPending || updateBankAccountMutation.isPending,
  };
};
