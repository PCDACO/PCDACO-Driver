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
      <BookImages />
      <View className="gap-2 py-2">
        <View className="flex-row items-center justify-between">
          <Text>Tên xe</Text>
          <Text>{car.modelName || ''}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text>Biển số xe</Text>
          <Text>{car.licensePlate || ''}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text>Màu xe</Text>
          <Text>{car.color || ''}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text>Ghế ngồi</Text>
          <Text>{car.seat || ''}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text>Hộp số</Text>
          <Text>{car.transmissionType || ''}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text>Nhiên liệu</Text>
          <Text>{car.fuelType || ''}</Text>
        </View>
      </View>
    </CardBasic>
  );
};

export default CarInfo;
