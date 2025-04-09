import { FunctionComponent } from 'react';
import { View, FlatList, Text } from 'react-native';

import CardTransaction from '~/components/card/transaction/card-transaction';
import Loading from '~/components/plugins/loading';
import { useInfiniteTransactions } from '~/hooks/transaction/use-transaction';

const Transaction: FunctionComponent = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteTransactions({});

  const transactions = data?.pages.flatMap((page) => page.value?.items || []) || [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Loading size="small" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={transactions}
        renderItem={({ item }) => <CardTransaction data={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center">
            <Text>Không có dữ liệu</Text>
          </View>
        )}
        ListFooterComponent={() => {
          if (isFetchingNextPage) {
            return (
              <View className="py-4">
                <Loading size="small" />
              </View>
            );
          }
          return null;
        }}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View className="h-4" />}
      />
    </View>
  );
};

export default Transaction;
