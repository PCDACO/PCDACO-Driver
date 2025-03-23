import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import { CarResponseDetail } from '~/constants/models/car.model';

interface OwnerContactInforProps {
  car: CarResponseDetail;
}

const OwnerContactInfor: FunctionComponent<OwnerContactInforProps> = ({ car }) => {
  const { ownerName, licensePlate, pickupLocation } = car;

  return (
    <View className="flex-row items-center gap-4 rounded-lg border border-muted px-4 py-2">
      <View className="h-8 w-8 items-center justify-center rounded-full bg-gray-100">
        <Text className="text-lg font-bold text-muted-foreground">{ownerName.charAt(0) || ''}</Text>
      </View>
      <View className="flex-1">
        <View className="flex-row items-center gap-2">
          <Text className="text-base font-semibold text-muted-foreground">Chủ xe:</Text>
          <Text className="text-base font-semibold text-muted-foreground">{ownerName || ''}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-sm text-muted-foreground">Biển số: </Text>
          <Text className="text-sm text-muted-foreground">{licensePlate || ''}</Text>
        </View>

        <View className=" flex-row items-start gap-2 ">
          <Text className="text-sm text-muted-foreground">Vị trí nhận: </Text>
          <Text className="flex-1 flex-wrap text-sm text-muted-foreground">
            {pickupLocation.address || ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OwnerContactInfor;
