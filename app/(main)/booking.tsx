import { FontAwesome, Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { FunctionComponent } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BookCard from '~/components/card/book/book-card';
import Backdrop from '~/components/plugins/back-drop';
import Loading from '~/components/plugins/loading';
import LoadingAnimation from '~/components/plugins/loading-animation';
import { SearchInput } from '~/components/plugins/search-input';
import BookListParams from '~/components/screen/book-list/book-params';
import { ANIMATION_CONFIGS } from '~/configs/animated.config';
import { BookParams, BookResponseList } from '~/constants/models/book.model';
import { useBookingListQuery } from '~/hooks/book/use-book';
import { useBottomSheet } from '~/hooks/plugins/use-bottom-sheet';
import { useBookingParamsStore } from '~/store/use-params';
import { useSearchStore } from '~/store/use-search';
import { COLORS } from '~/theme/colors';

type InfiniteQueryPage = {
  value: {
    items: BookResponseList[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    hasNext: boolean;
  };
};

const BookingScreen: FunctionComponent = () => {
  const { searchKeyword } = useSearchStore();
  const [params, setParams] = React.useState<Partial<BookParams>>({});
  const { params: bookingParams } = useBookingParamsStore();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const { handleClosePress, handleSheetChange, isSheetOpen, sheetRef, handleSnapPress } =
    useBottomSheet();

  const {
    data: booking,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useBookingListQuery(params);

  React.useEffect(() => {
    if (searchKeyword || bookingParams) {
      setParams({
        search: searchKeyword || '',
        status: bookingParams?.status,
        isPaid: bookingParams?.isPaid,
      });
    }
  }, [searchKeyword, bookingParams]);

  const bookingList = React.useMemo(() => {
    if (!booking?.pages) return [];
    return (booking.pages as InfiniteQueryPage[]).flatMap((page, pageIndex) =>
      page.value.items.map((item) => ({
        ...item,
        pageIndex,
      }))
    );
  }, [booking]);

  const handleLoadMore = () => {
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

  const snapPoints = React.useMemo(() => ['1%', '60%'], []);

  return (
    <SafeAreaView className="relative h-full flex-1">
      <View className="mb-3 flex-row items-center gap-2 px-4">
        <SearchInput className="flex-1" />
        <TouchableOpacity
          className="items-center justify-center rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-300"
          style={{
            padding: 11,
          }}
          onPress={() => {
            handleSnapPress(1);
          }}>
          <Ionicons name="options-outline" size={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      <View className="flex-1 px-4">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <LoadingAnimation />
          </View>
        ) : (
          <FlatList
            data={bookingList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <BookCard booking={item} />}
            keyExtractor={(item) => `${item.id}-${item.pageIndex}`}
            className="gap-4"
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={1.5}
            ListFooterComponent={() =>
              isFetchingNextPage ? (
                <View className="py-4">
                  <Loading />
                </View>
              ) : null
            }
            ListEmptyComponent={() => (
              <View className="h-96 flex-1 items-center justify-center gap-2">
                <FontAwesome name="clipboard" size={42} color={COLORS.gray} />
                <Text className="w-32 text-center text-base font-bold text-gray-400 dark:text-gray-600">
                  Hiện chưa có yêu cầu đặt xe
                </Text>
              </View>
            )}
          />
        )}
      </View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        animationConfigs={ANIMATION_CONFIGS}
        enableDynamicSizing={false}
        backdropComponent={
          isSheetOpen ? (props) => <Backdrop {...props} onPress={handleClosePress} /> : null
        }
        onChange={handleSheetChange}>
        <BottomSheetView className="relative flex-1 bg-white dark:bg-slate-300">
          <BookListParams close={handleClosePress} />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default BookingScreen;
