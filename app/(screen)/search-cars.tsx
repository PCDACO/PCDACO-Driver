// import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { FlatList, Text, TouchableOpacity, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CarCard } from '~/components/card/car/card';
// eslint-disable-next-line import/order
import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';

// import ModalPicker from '~/components/plugins/modal-picker';
import { SearchInput } from '~/components/plugins/search-input';
import { CarParams } from '~/constants/models/car.model';
import { useCarsListQuery } from '~/hooks/car/use-car';
import { useSearchStore } from '~/store/use-search';
// import { Button } from '~/components/nativewindui/Button';
// import { Text as TextUI } from '~/components/nativewindui/Text';

const SearchCarsPage: FunctionComponent = () => {
  const router = useRouter();
  const { searchKeyword } = useSearchStore();
  const [params, setParams] = React.useState<Partial<CarParams>>({});
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const { data, isLoading, refetch } = useCarsListQuery(params as CarParams);

  React.useEffect(() => {
    setParams({
      keyword: searchKeyword,
      lastId: data?.value.items[data?.value.items.length - 1]?.id,
    });
  }, [searchKeyword]);

  const handleLoadMore = async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    const lastItem = data?.value.items[data.value.items.length - 1];
    if (lastItem) {
      setParams((prev) => ({
        ...prev,
        lastId: lastItem.id,
      }));
      await refetch();
    }
    setIsLoadingMore(false);
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView className="flex-1 bg-background px-4">
      <Animated.View
        className=""
        style={{
          transform: [{ translateY: headerTranslateY }],
          opacity: headerOpacity,
        }}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </Animated.View>
      <View>
        <Text className="mb-3 text-2xl font-bold text-foreground">Khám phá xe</Text>
        <View className="flex-row items-center gap-3">
          <SearchInput className="bg-muted/50 flex-1 rounded-full" placeholder="Tìm kiếm xe..." />
          {/* <ModalPicker
            // visible={isModalFilter}
            icon={<FontAwesome name="sliders" size={18} color="white" />}
            className="size-11 items-center justify-center rounded-full bg-primary shadow-sm"
            onRequestClose={() => {
              setIsModalFilter(false);
              return true;
            }}>
            <View className="rounded-t-2xl p-5">
              <TextUI className="mb-4 text-xl font-bold">Bộ lọc tìm kiếm</TextUI>
              <View className="gap-3">
                <ModalClose>
                  <Button className="w-full rounded-full">
                    <FontAwesome name="money" size={16} color="white" className="mr-2" />
                    <TextUI>Lọc theo giá</TextUI>
                  </Button>
                </ModalClose>
                <ModalClose>
                  <Button className="w-full rounded-full">
                    <FontAwesome name="map-marker" size={16} color="white" className="mr-2" />
                    <TextUI>Lọc theo khoảng cách</TextUI>
                  </Button>
                </ModalClose>
                <ModalClose>
                  <Button variant="outline" className="mt-2 w-full rounded-full">
                    <TextUI>Đóng</TextUI>
                  </Button>
                </ModalClose>
              </View>
            </View>
          </ModalPicker> */}
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={data?.value.items}
            renderItem={({ item, index }) => <CarCard car={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View className="h-4" />}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
              useNativeDriver: true,
            })}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchCarsPage;
