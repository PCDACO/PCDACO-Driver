import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Link, router } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator, FlatList, Text, ToastAndroid, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CarCard } from '~/components/card/car/card';
import { useCarsListQuery } from '~/hooks/car/use-car';

const HomeScreen = () => {
  const { data: car, isLoading: carloading } = useCarsListQuery({
    limit: 2,
  });

  const carList = car?.value.items || [];

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

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        {carloading || !car ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="mt-2 text-muted-foreground">Đang tải danh sách xe...</Text>
          </View>
        ) : (
          <View className="gap-4 px-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl font-bold">Gợi ý xe</Text>
              <Link href="/search-cars" asChild>
                <Text className="text-primary underline">Xem thêm</Text>
              </Link>
            </View>
            <FlatList
              data={carList}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <CarCard
                  car={item}
                  onPress={() => {
                    router.push({
                      pathname: '/car/[id]',
                      params: {
                        id: item.id,
                      },
                    });
                  }}
                />
              )}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View className="h-4" />}
              ListEmptyComponent={() => (
                <View className="flex-1 items-center justify-center">
                  <Text className="text-muted-foreground">Không có xe </Text>
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
