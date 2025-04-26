'use client';

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import { translate } from '~/lib/translate';
import { COLORS } from '~/theme/colors';

interface CarBasicInfo {
  id: string;
  modelName: string;
  price: number;
  images: { url: string }[];
}

interface NearbyCarsSectionProps {
  cars: CarBasicInfo[];
}

export const NearbyCarsSection: React.FC<NearbyCarsSectionProps> = ({ cars }) => {
  const router = useRouter();

  return (
    <View className="px-4">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-900">{translate.home.nearbyCars}</Text>
        <TouchableOpacity onPress={() => router.push('/car')}>
          <Text className="text-blue-600">{translate.common.seeAll}</Text>
        </TouchableOpacity>
      </View>

      {cars.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-2">
          {cars.map((car) => (
            <CardBasic
              key={car.id}
              className="mr-4 w-48 overflow-hidden rounded-lg bg-white shadow-sm"
              onPress={() =>
                router.push({
                  pathname: '/(screen)/car/[id]',
                  params: { id: car.id },
                })
              }>
              <Image
                source={{ uri: car.images[0]?.url }}
                className="h-28 w-full"
                resizeMode="cover"
              />
              <View className="p-3">
                <Text className="font-semibold text-gray-900" numberOfLines={1}>
                  {car.modelName}
                </Text>
                <Text className="mt-1 font-medium text-blue-600">
                  {car.price.toLocaleString()} VND/ngày
                </Text>
              </View>
            </CardBasic>
          ))}
        </ScrollView>
      ) : (
        <CardBasic className="items-center justify-center gap-2 rounded-lg bg-white p-6">
          <Feather name="alert-circle" size={24} color={COLORS.light.grey5} />
          <Text className="text-center font-semibold text-gray-400">
            {translate.home.noNearbyCars}
          </Text>
        </CardBasic>
      )}
    </View>
  );
};
