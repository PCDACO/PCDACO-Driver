import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import * as React from 'react';
import { FlatList, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CarCard } from '~/components/card/car/card';
import Backdrop from '~/components/plugins/back-drop';
import Loading from '~/components/plugins/loading';
import { SearchInput } from '~/components/plugins/search-input';
import CarParams from '~/components/screen/car-list/car-params';
import { CarParams as CarParamsState } from '~/constants/models/car.model';
import { useCarsListInfiniteQuery } from '~/hooks/car/use-car';
import { useCarParamsStore } from '~/store/use-params';
import { useSearchStore } from '~/store/use-search';
import { COLORS } from '~/theme/colors';

const HomeScreen = () => {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [params, setParams] = React.useState<Partial<CarParamsState>>({});

  const { searchKeyword } = useSearchStore();
  const { params: carParams } = useCarParamsStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCarsListInfiniteQuery(params);

  const carList = data?.pages.flatMap((page) => page.value.items);

  React.useEffect(() => {
    if (searchKeyword || carParams) {
      setParams({
        keyword: searchKeyword || '',
        limit: carParams?.limit || 10,
        fuel: carParams?.fuel,
        transmission: carParams?.transmission,
      });
    }
  }, [carParams, searchKeyword]);

  React.useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        ToastAndroid.show('Xin hãy cấp quyền truy cập vị trí', ToastAndroid.SHORT);
        return;
      }
      await Location.getCurrentPositionAsync({});
    }
    getCurrentLocation();
  }, []);

  const sheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['1%', '45%'], []);

  const handleSnapPress = React.useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
    setIsSheetOpen(index === snapPoints.length - 1);
  }, []);

  const handleSheetChange = React.useCallback((index: number) => {
    setIsSheetOpen(index === snapPoints.length - 1);
  }, []);

  const handleClosePress = React.useCallback(() => {
    sheetRef.current?.close();
    setIsSheetOpen(false);
  }, []);

  return (
    <SafeAreaView className="relative flex-1 gap-2 bg-background px-2">
      {/* Nút Filter */}
      <View
        className="absolute bottom-4 right-4 z-10"
        style={{
          opacity: isSheetOpen ? 0 : 1, // Ẩn khi mở BottomSheet
          zIndex: isSheetOpen ? -1 : 10, // Đưa xuống dưới khi mở BottomSheet
        }}>
        <TouchableOpacity
          className="items-center justify-center rounded-full border border-gray-200 bg-white  dark:border-gray-700 dark:bg-slate-300"
          onPress={() => handleSnapPress(1)}
          style={{
            padding: 16,
          }}>
          <Ionicons name="options-outline" size={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View className="flex-row gap-2">
        <SearchInput className="flex-1" />
      </View>

      {/* Danh sách xe */}
      <FlatList
        data={carList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarCard
            car={item}
            onPress={() =>
              router.push({
                pathname: '/car/[id]',
                params: { id: item.id },
              })
            }
          />
        )}
        ItemSeparatorComponent={() => <View className="h-1" />}
        ListEmptyComponent={() => (
          <View className="h-96 flex-1 items-center justify-center">
            <Text className="text-muted-foreground">Không có xe</Text>
          </View>
        )}
        ListFooterComponent={isFetchingNextPage ? <Loading /> : null}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
      />

      {/* BottomSheet Filter */}
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        backdropComponent={
          isSheetOpen ? (props) => <Backdrop {...props} onPress={handleClosePress} /> : null
        }
        onChange={handleSheetChange}>
        <BottomSheetView className="relative z-20 flex-1 bg-white dark:bg-slate-300">
          <CarParams close={handleClosePress} />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default HomeScreen;
