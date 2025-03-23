import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { FunctionComponent } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BookCard from '~/components/card/book/book-card';
import Loading from '~/components/plugins/loading';
import { SearchInput } from '~/components/plugins/search-input';
import BookListParams from '~/components/screen/book-list/book-params';
import { BookParams } from '~/constants/models/book.model';
import { useBookingListQuery } from '~/hooks/book/use-book';
import { useBookingParamsStore } from '~/store/use-params';
import { useSearchStore } from '~/store/use-search';
import { COLORS } from '~/theme/colors';

const BookingScreen: FunctionComponent = () => {
  const { searchKeyword } = useSearchStore();
  const [params, setParams] = React.useState<Partial<BookParams>>({});
  const { params: bookingParams } = useBookingParamsStore();
  const { data: booking, isLoading } = useBookingListQuery(params);

  React.useEffect(() => {
    if (searchKeyword || bookingParams) {
      setParams({
        search: searchKeyword || '',
        limit: bookingParams?.limit || 10,
        status: bookingParams?.status,
        isPaid: bookingParams?.isPaid,
        lastId: bookingParams?.lastId,
      });
    }
  }, [searchKeyword, bookingParams]);

  const bookingList = booking?.value.items || [];

  const sheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['1%', '90%'], []);

  const handleSnapPress = React.useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleSheetChange = React.useCallback((index: number) => {
    console.log('handleSheetChange', index);
  }, []);

  const handleClosePress = React.useCallback(() => {
    sheetRef.current?.close();
  }, []);

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
            <Loading />
          </View>
        ) : (
          <FlatList
            data={bookingList}
            renderItem={({ item }) => <BookCard booking={item} />}
            keyExtractor={(item) => item.id}
            className="gap-4"
            ListEmptyComponent={() => (
              <View className="flex-1 items-center justify-center">
                <Text>Không có dữ liệu</Text>
              </View>
            )}
          />
        )}
      </View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}>
        <BottomSheetView className="relative flex-1 bg-white dark:bg-slate-300">
          <BookListParams close={handleClosePress} />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default BookingScreen;
