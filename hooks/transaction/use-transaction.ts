import { useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query';

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

export const useInfiniteTransactions = (params: Partial<TransactionParams>) => {
  return useInfiniteQuery({
    queryKey: [QueryKey.Transaction.Transaction, 'infinite', params],
    queryFn: async ({ pageParam = 1 }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await TransactionService.get.transaction({
        ...params,
        index: pageParam,
        size: 10,
      });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.value?.hasNext) return undefined;
      return allPages.length + 1;
    },
    enabled: !!params,
  });
};

export const useInfiniteWithdraw = (params: Partial<WithdrawParams>) => {
  return useInfiniteQuery({
    queryKey: [QueryKey.Transaction.Withdraw, 'infinite', params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await TransactionService.get.withdraw({
        ...params,
        index: pageParam,
        size: 10,
      });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.value?.hasNext) return undefined;
      return allPages.length + 1;
    },
    enabled: !!params,
  });
};

export const useCheckTransaction = () => {
  const checkTransactionQuery = useMutation({
    mutationKey: [QueryKey.Transaction.Check],
    mutationFn: async (orderCode: number) => await TransactionService.post.check(orderCode),
  });
  return checkTransactionQuery;
};
