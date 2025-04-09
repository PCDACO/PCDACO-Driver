import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ToastAndroid } from 'react-native';

import { BankAccountPayload } from '~/constants/models/bank.model';
import { QueryKey } from '~/lib/query-key';
import { translate } from '~/lib/translate';
import { BankService } from '~/services/bank.service';

interface BankQueryProps {
  search?: string;
}
interface BankAccountQueryProps {
  params?: Partial<RootRequest>;
}
interface BankAccountDetailQueryProps {
  id: string;
}

export const useBankQuery = ({ search }: BankQueryProps) => {
  const bankQuery = useQuery({
    queryKey: [QueryKey.Bank.List, search],
    queryFn: async () => await BankService.get.list(search),
    enabled: true,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  return bankQuery;
};

export const useBankAccountDetailQuery = ({ id }: BankAccountDetailQueryProps) => {
  const bankAccountDetailQuery = useQuery({
    queryKey: [QueryKey.Bank.Account.Detail, id],
    queryFn: () => BankService.get.detail_account(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  return bankAccountDetailQuery;
};

export const useBackAccountListQuery = ({ params }: BankAccountQueryProps) => {
  const bankAccountListQuery = useQuery({
    queryKey: [QueryKey.Bank.Account.List, params],
    queryFn: () => BankService.get.accounts(params),
    enabled: !!params,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  return bankAccountListQuery;
};

export const useBankMutation = () => {
  const queryClient = useQueryClient();

  const createBankAccountMutation = useMutation({
    mutationKey: [QueryKey.Bank.Account.Create],
    mutationFn: (payload: BankAccountPayload) => BankService.post.account(payload),
  });

  const updateBankAccountMutation = useMutation({
    mutationKey: [QueryKey.Bank.Account.Update],
    mutationFn: ({ id, payload }: { id: string; payload: BankAccountPayload }) =>
      BankService.put.account(id, payload),
  });

  const deleteBankAccountMutation = useMutation({
    mutationKey: [QueryKey.Bank.Account.Delete],
    mutationFn: (id: string) => BankService.delete.account(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Bank.Account.List] });
      ToastAndroid.show(translate.bank.toast.delete, ToastAndroid.SHORT);
    },
    onError: (error: any) => {
      ToastAndroid.show(
        error.response.data.message || translate.bank.toast.error_delete,
        ToastAndroid.SHORT
      );
    },
  });

  return { createBankAccountMutation, updateBankAccountMutation, deleteBankAccountMutation };
};
