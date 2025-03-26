import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { View, Pressable, Text } from 'react-native';

import { cn } from '~/lib/cn';
import { COLORS } from '~/theme/colors';

const BankFooter: FunctionComponent = () => {
  const router = useRouter();
  return (
    <View className="mt-4 gap-4">
      <View className="h-0.5 rounded-full bg-gray-200" />

      <Pressable onPress={() => router.push('/bank/edit')}>
        <LinearGradient
          className={cn('flex-row items-center justify-center gap-2 rounded-lg p-4')}
          colors={['#4f46e5', '#a855f7']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={{ borderRadius: 8 }}>
          <Feather name="credit-card" size={20} color={COLORS.white} />
          <Text className="font-bold text-white">Thêm tài khoản ngân hàng</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default BankFooter;
