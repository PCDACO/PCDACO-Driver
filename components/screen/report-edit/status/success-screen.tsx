import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SuccessScreenProps {
  id?: string;
}

export default function SuccessScreen({ id }: SuccessScreenProps) {
  const router = useRouter();
  const handleNewReport = () => {
    router.replace('/booking/report');
  };

  const handleViewReports = () => {
    router.push('/booking/reports');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <Feather name="check-circle" size={48} color="#16a34a" />
      </View>

      <Text className="mb-2 text-xl font-semibold">
        {id ? 'Cập nhật báo cáo thành công' : 'Gửi báo cáo thành công'}
      </Text>
      <Text className="mb-8 text-center text-gray-500">
        {id
          ? 'Báo cáo của bạn đã được cập nhật thành công và đang chờ xét duyệt.'
          : 'Báo cáo của bạn đã được gửi thành công và đang chờ xét duyệt.'}
      </Text>

      <View className="mb-6 w-full max-w-md rounded-xl bg-white p-4 shadow-sm">
        <Text className="mb-3 text-sm font-medium">Thông tin báo cáo</Text>
        <View className="space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-500">Trạng thái:</Text>
            <Text className="text-sm font-medium text-amber-600">Đang xét duyệt</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-500">Thời gian xét duyệt:</Text>
            <Text className="text-sm font-medium">24-48 giờ</Text>
          </View>
        </View>
      </View>

      <View className="w-full max-w-md gap-2 space-y-3">
        <TouchableOpacity
          onPress={handleViewReports}
          className="w-full items-center rounded-lg bg-primary py-4">
          <Text className="font-medium text-white">Xem danh sách báo cáo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNewReport}
          className="w-full items-center rounded-lg border border-gray-200 py-4">
          <Text className="font-medium text-black">Tạo báo cáo mới</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
