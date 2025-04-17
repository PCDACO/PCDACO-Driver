import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text } from 'react-native';

import { Button } from '~/components/nativewindui/Button';
import { Text as TextUI } from '~/components/nativewindui/Text';

interface SuccessScreenProps {
  data: {
    orderCode: number;
  };
}

export default function SuccessScreen({ data }: SuccessScreenProps) {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <View className="mb-8">
        <Feather name="check-circle" size={64} color="green" />
      </View>

      <Text className="mb-2 text-xl font-semibold">Thanh toán thành công</Text>
      <Text className="mb-8 text-center text-gray-500">
        Giao dịch của bạn đã được xử lý thành công. Mã giao dịch: {data.orderCode}
      </Text>

      <Button onPress={() => router.push('/booking')} className="items-center justify-center">
        <TextUI>Quay lại danh sách đặt xe</TextUI>
      </Button>
    </View>
  );
}
