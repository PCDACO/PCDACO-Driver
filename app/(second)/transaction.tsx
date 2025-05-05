import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';

import CardTransaction from '~/components/card/transaction/card-transaction';
import LoadingAnimation from '~/components/plugins/loading-animation';
import { useInfiniteTransactions } from '~/hooks/transaction/use-transaction';
import { COLORS } from '~/theme/colors';

interface GroupedTransactions {
  date: string;
  transactions: any[];
}

const formatVietnameseDate = (date: Date): string => {
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const months = [
    'Thg 1',
    'Thg 2',
    'Thg 3',
    'Thg 4',
    'Thg 5',
    'Thg 6',
    'Thg 7',
    'Thg 8',
    'Thg 9',
    'Thg 10',
    'Thg 11',
    'Thg 12',
  ];

  const dayOfWeek = days[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${dayOfWeek}, ${month} ${day}, ${year}`;
};

const Transaction = () => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteTransactions({});

  const transactions = data?.pages.flatMap((page) => page.value?.items || []) || [];

  // Group transactions by date
  const groupedTransactions = React.useMemo(() => {
    const groups: GroupedTransactions[] = [];
    const dateMap = new Map<string, any[]>();

    transactions.forEach((transaction) => {
      const date = new Date(transaction.createdAt);
      const formattedDate = formatVietnameseDate(date);
      if (!dateMap.has(formattedDate)) {
        dateMap.set(formattedDate, []);
      }
      dateMap.get(formattedDate)?.push(transaction);
    });

    dateMap.forEach((transactions, date) => {
      groups.push({ date, transactions });
    });

    // Sort groups by date (newest first)
    return groups.sort(
      (a, b) =>
        new Date(b.transactions[0].createdAt).getTime() -
        new Date(a.transactions[0].createdAt).getTime()
    );
  }, [transactions]);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  const renderItem = ({ item }: { item: GroupedTransactions }) => (
    <View>
      <View className="mb-2 mt-4 flex-row items-center justify-between px-2">
        <Text className="text-sm font-semibold text-gray-500 dark:text-gray-500">{item.date}</Text>
      </View>
      <View className="flex-1 gap-2">
        {item.transactions.map((transaction) => (
          <CardTransaction key={transaction.id} data={transaction} />
        ))}
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <LoadingAnimation />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={groupedTransactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.date}
        onEndReached={loadMore}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (isFetchingNextPage) {
            return (
              <View className="py-4">
                <ActivityIndicator size="small" />
              </View>
            );
          }
          return null;
        }}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListEmptyComponent={() => (
          <View className="h-96 flex-1 items-center justify-center">
            <Feather name="file-text" size={40} color={COLORS.light.grey4} />
            <Text className="text-lg font-bold text-muted">Không có giao dịch nào</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Transaction;
