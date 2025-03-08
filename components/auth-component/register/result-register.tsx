import Icon from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Text } from '~/components/nativewindui/Text';
import { useUserQuery } from '~/hooks/user/use-user';

const ResultRegister: React.FC = () => {
  const { currentUserQuery } = useUserQuery();

  console.log('currentUserQuery', currentUserQuery.data);

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      {/* Hiệu ứng nền gradient */}
      <LinearGradient
        colors={['#60a5fa', '#3b82f6']} // Xanh biển nhạt hơn
        className="absolute inset-0 opacity-20"
      />

      {/* Icon thành công */}
      <View className="mb-6 rounded-full bg-white p-4 shadow-lg">
        <Icon name="check-circle" size={80} color="#3b82f6" />
      </View>

      {/* Tiêu đề */}
      <Text className="mb-2 text-3xl font-bold text-foreground">Đăng ký thành công! 🎉</Text>

      {/* Mô tả ngắn */}
      <Text className="mb-6 text-center text-lg text-muted-foreground">
        Chúc mừng bạn đã đăng ký tài khoản thành công. Hãy bắt đầu trải nghiệm ngay!
      </Text>

      {/* Nút quay lại trang chủ */}
      <TouchableOpacity
        className="overflow-hidden rounded-lg shadow-lg"
        onPress={() => router.navigate('/(main)')}>
        <LinearGradient
          colors={['#93c5fd', '#60a5fa']} // Gradient xanh biển rất nhẹ
          className="rounded-lg px-8 py-3">
          <Text className="text-lg font-medium text-white">Về Trang Chủ</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ResultRegister;
