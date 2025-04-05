import { useMutation, useQuery } from '@tanstack/react-query';

import {
  TransactionParams,
  WithdrawParams,
  WithdrawPayload,
} from '~/constants/models/transaction.model';
import { QueryKey } from '~/lib/query-key';
import { TransactionService } from '~/services/tranaction.service';

export const useTransaction = (parmas: Partial<TransactionParams>) => {
  const transactionQuery = useQuery({
    queryKey: [QueryKey.Transaction.Transaction, parmas],
    queryFn: async () => await TransactionService.get.transaction(parmas),
    enabled: !!parmas,
  });
  return transactionQuery;
};

export const useCheckTransaction = () => {
  const checkTransactionMutation = useMutation({
    mutationKey: [QueryKey.Transaction.Check],
    mutationFn: async (orderCode: number) => await TransactionService.post.check(orderCode),
  });
  return checkTransactionMutation;
};

export const useWithdraw = (parmas: Partial<WithdrawParams>) => {
  const withdrawQuery = useQuery({
    queryKey: [QueryKey.Transaction.Withdraw, parmas],
    queryFn: async () => await TransactionService.get.withdraw(parmas),
    enabled: !!parmas,
  });
  return withdrawQuery;
};

export const useWithdrawMutation = () => {
  const createWithdrawQuery = useMutation({
    mutationKey: [QueryKey.Transaction.CreateWithdraw],
    mutationFn: async (payload: WithdrawPayload) => await TransactionService.post.withdraw(payload),
  });
  return { createWithdrawQuery };
};
