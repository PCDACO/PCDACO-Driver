import { FontAwesome } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import { CarResponseDetail } from '~/constants/models/car.model';

interface CarBasicInfoProps {
  car: CarResponseDetail;
}

const CarBasicInfo: FunctionComponent<CarBasicInfoProps> = ({ car }) => {
  const { manufacturer, modelName, color, price, averageRating, totalRented } = car;
  return (
    <View>
      <View className="flex-row justify-between">
        <View>
          <Text className="text-xl font-bold">
            {manufacturer.name} {modelName}
          </Text>
          <Text className="text-sm text-muted-foreground">{color}</Text>
        </View>
        <View className="items-end justify-end">
          <Text className="text-xl font-bold">{price} /day</Text>
          <View className="flex-row items-end justify-end gap-2">
            <FontAwesome name="star" size={16} color="#FACC15" />
            <Text>
              {averageRating}
              <Text className="text-sm text-gray-500">({totalRented} lượt thuê)</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CarBasicInfo;
