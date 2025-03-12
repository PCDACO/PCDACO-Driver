import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import CarImages from '~/components/screen/car-detail-screen/car-images';
import { useCarDetailQuery } from '~/hooks/car/use-car';

const CarDetail: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data, isLoading } = useCarDetailQuery(id as string);

  if (isLoading || !data) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <View className="absolute left-4 top-4 z-10">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <CarImages />
    </View>
  );
};

export default CarDetail;
