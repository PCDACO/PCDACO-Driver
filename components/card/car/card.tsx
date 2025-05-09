import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import { CarResponseList } from '~/constants/models/car.model';
import { cn } from '~/lib/cn';
import { formatNumber, formatRating } from '~/lib/format';

interface CarCardProps extends TouchableOpacityProps {
  car: CarResponseList;
  className?: string;
  onPress?: () => void;
}

export const CarCard = ({ car, onPress, className, ...props }: CarCardProps) => {
  const carImage = car.images.find((item) => (item.type = 'Car'))?.url;
  const { ownerAvatarUrl } = car;

  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      className={cn('gap-4  rounded-xl bg-white p-4 shadow-sm', className)}>
      {/* Car Info Header */}
      <View className="flex-row items-start justify-between">
        {ownerAvatarUrl ? (
          <View className="flex-row items-center gap-2">
            <Image
              source={{ uri: ownerAvatarUrl }}
              className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-800"
              resizeMode="cover"
            />
            <View>
              <Text className="text-xl font-bold">{car.modelName}</Text>
              <Text className="text-muted-foreground">{car.ownerName}</Text>
            </View>
          </View>
        ) : (
          <View className="flex-row items-center gap-2">
            <FontAwesome name="user-circle" size={30} color="#000" />
            <View>
              <Text className="text-xl font-bold">{car.modelName}</Text>
              <Text className="text-muted-foreground">{car.ownerName}</Text>
            </View>
          </View>
        )}

        <View className="items-end">
          <Text className="text-xl font-bold">{formatNumber(car.price || 0)} ngày</Text>
          <View className="flex-row items-end justify-end gap-2">
            <FontAwesome name="star" size={16} color="#FACC15" />
            <Text>
              {formatRating(car.averageRating)}
              <Text className="text-sm text-gray-500">({car.totalRented} lượt thuê)</Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Car Image */}

      {carImage ? (
        <Image
          source={{ uri: carImage }}
          className=" h-40 w-full rounded-md border border-gray-200"
          resizeMode="cover"
        />
      ) : (
        <View className="mb-3 h-40 w-full items-center justify-center rounded-xl bg-gray-200">
          <FontAwesome name="car" size={40} color="#666" />
          <Text className="text-gray-600">Không có hình ảnh</Text>
        </View>
      )}

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
      </View>
    </TouchableOpacity>
  );
};
