import React from 'react';
import { View, Text } from 'react-native';

import { formatPriceToVND } from '~/lib/format';

interface ProfileStatsProps {
  bookingsCount: number;
  income: number;
  totalCar: number;
  totalRent: number;
  totalRented: number;
}

const ProfileStats = ({ bookingsCount, income }: ProfileStatsProps) => {
  return (
    <View className="border-background/60 flex-row rounded-xl bg-background p-4 shadow-md">
      <View className="border-background/60 flex-1 items-center justify-center border-r pr-4">
        <Text className="text-xl font-bold text-foreground">{bookingsCount}</Text>
        <Text className="text-foreground/90 text-sm">Tổng số lượt đặt</Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold text-foreground">{formatPriceToVND(income)}</Text>
        <Text className="text-foreground/90 text-sm">Ví điện tử</Text>
      </View>
    </View>
  );
};

export default ProfileStats;
