import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import { UserResponse } from '~/constants/models/user.model';
import { formatNumber } from '~/lib/format';
import { COLORS } from '~/theme/colors';

interface BalanceCardProps {
  user: Partial<UserResponse>;
}

export const BalanceCard = ({ user }: BalanceCardProps) => {
  return (
    <CardBasic className="border-b-2 border-l-4 border-b-blue-400 border-l-blue-400">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-base font-bold text-gray-900 dark:text-gray-100">
            Số dư tài khoản
          </Text>
          <Text className="mt-1 text-2xl font-bold text-primary">
            {formatNumber(user.balance || 0)} VND
          </Text>
        </View>
        <Pressable
          className="bg-primary/10 h-12 w-12 items-center justify-center rounded-full"
          onPress={() =>
            router.push({
              pathname: '/(second)/bank-account',
            })
          }>
          <Ionicons name="wallet-outline" size={24} color={COLORS.light.primary} />
        </Pressable>
      </View>
      {/* <View className="mt-4 flex-row justify-between">
        <View className="items-center">
          <Text className="text-sm text-gray-500 dark:text-gray-400">Tổng xe</Text>
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {user.totalCar || 0}
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-sm text-gray-500 dark:text-gray-400">Đã cho thuê</Text>
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {user.totalRented || 0}
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-sm text-gray-500 dark:text-gray-400">Đang thuê</Text>
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {user.totalRent || 0}
          </Text>
        </View>
      </View> */}
    </CardBasic>
  );
};
