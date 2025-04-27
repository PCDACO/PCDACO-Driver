import { Ionicons } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import BookImages from './book-image';

import CardBasic from '~/components/plugins/card-basic';
import Subtitle from '~/components/ui/subtitle';
import { BookResponseDetail } from '~/constants/models/book.model';
import { COLORS } from '~/theme/colors';

interface CarInfoProps {
  car: BookResponseDetail['car'];
}

const CarInfo: FunctionComponent<CarInfoProps> = ({ car }) => {
  return (
    <CardBasic className="gap-4">
      <View className="flex-row items-center gap-2">
        <Ionicons name="car-sport" size={24} color={COLORS.black} />
        <Subtitle title="Thông tin xe" />
      </View>
      <BookImages car={car} />
      <View className="gap-2 py-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-bold text-gray-400">Tên xe</Text>
          <Text className="text-sm">{car.modelName || ''}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-bold text-gray-400">Biển số xe</Text>
          <Text className="text-sm">{car.licensePlate || ''}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-bold text-gray-400">Màu xe</Text>
          <Text className="text-sm">{car.color || ''}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-bold text-gray-400">Ghế ngồi</Text>
          <Text className="text-sm">{car.seat || ''}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-bold text-gray-400">Hộp số</Text>
          <Text className="text-sm">{car.transmissionType || ''}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-bold text-gray-400">Nhiên liệu</Text>
          <Text className="text-sm">{car.fuelType || ''}</Text>
        </View>
      </View>
    </CardBasic>
  );
};

export default CarInfo;
