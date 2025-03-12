import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import { CarResponseList } from '~/constants/models/car.model';
import { cn } from '~/lib/cn';
import { formatPriceToVND } from '~/lib/format';

interface CarCardProps extends TouchableOpacityProps {
  car: CarResponseList;
  className?: string;
  onPress?: () => void;
}

export const CarCard = ({ car, onPress, className, ...props }: CarCardProps) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      className={cn('mb-4 gap-2  rounded-3xl bg-white p-3 shadow-sm', className)}>
      {/* Car Info Header */}
      <View className="items-start">
        <TouchableOpacity className="flex-row items-center gap-2">
          <FontAwesome name="user-circle" size={30} color="#000" />
          <View>
            <Text className="text-xl font-bold">{car.modelName}</Text>
            <Text>{car.ownerName}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Car Image */}
      <View className="mb-3 h-40 w-full items-center justify-center rounded-xl bg-gray-200">
        <FontAwesome name="car" size={40} color="#666" />
        <Text className="text-gray-600">No image</Text>
      </View>
      {/* <View className="mb-3 h-40 w-full overflow-hidden rounded-xl">
        {imageError ? (
          <View className="h-full w-full items-center justify-center bg-gray-200">
            <FontAwesome name="car" size={40} color="#666" />
            <Text className="text-gray-600">No image</Text>
          </View>
        ) : (
          <Image
            source={{ uri: car.images?.[0] }}
            className="h-full w-full"
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        )}
      </View> */}

      {/* Car Stats */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-2">
            <FontAwesome5 name="gas-pump" size={16} color="#666" />
            <Text className="text-gray-600">{car.fuelConsumption}</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <FontAwesome name="users" size={16} color="#666" />
            <Text className="text-gray-600">{car.seat}</Text>
          </View>
        </View>

        <View>
          <Text className="text-xl font-bold text-primary">{formatPriceToVND(car.price)}/day</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
