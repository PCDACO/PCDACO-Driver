import { View, Text } from 'react-native';

import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';

export default function LoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <View className="mb-8">
        <ActivityIndicator size="large" />
      </View>

      <Text className="mb-2 text-xl font-semibold">Đang xử lý</Text>
      <Text className="mb-8 text-center text-gray-500">
        Hệ thống đang xử lý báo cáo của bạn. Vui lòng đợi trong giây lát...
      </Text>

      <View className="w-full max-w-md rounded-xl bg-white p-4 shadow-sm">
        <View className="space-y-3">
          <View className="h-2 animate-pulse rounded bg-gray-200" />
          <View className="h-2 w-5/6 animate-pulse rounded bg-gray-200" />
          <View className="h-2 animate-pulse rounded bg-gray-200" />
          <View className="h-2 w-4/6 animate-pulse rounded bg-gray-200" />
        </View>
      </View>
    </View>
  );
}
