import { Feather } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import { Button } from '~/components/nativewindui/Button';
import { Text as TextUI } from '~/components/nativewindui/Text';

interface ErrorScreenProps {
  onRetry: () => void;
}

export default function ErrorScreen({ onRetry }: ErrorScreenProps) {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <View className="mb-8">
        <Feather name="x-circle" size={64} color="red" />
      </View>

      <Text className="mb-2 text-xl font-semibold">Thanh toán thất bại</Text>
      <Text className="mb-8 text-center text-gray-500">
        Đã có lỗi xảy ra trong quá trình xử lý thanh toán. Vui lòng thử lại sau.
      </Text>

      <Button className="items-center justify-center" variant="destructive" onPress={onRetry}>
        <TextUI>Thử lại</TextUI>
      </Button>
    </View>
  );
}
