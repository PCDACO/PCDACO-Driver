import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { Button } from '~/components/nativewindui/Button'; // Adjust import if needed
import { useLicenseMethodStore } from '~/store/use-license-method';
import { useStepStore } from '~/store/use-step';
import { COLORS } from '~/theme/colors';

const methods = [
  {
    key: 'camera',
    icon: 'camera',
    title: 'Chụp ảnh mới',
    desc: 'Sử dụng camera để chụp ảnh giấy tờ ',
  },
  {
    key: 'library',
    icon: 'folder-image',
    title: 'Chọn ảnh từ thư viện',
    desc: 'Chọn ảnh đã có sẵn trong thiết bị của bạn',
  },
];

const image = require('~/assets/images/human-license.png');

const ChooseMethod = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const { setStep } = useStepStore();
  const { setMethod } = useLicenseMethodStore();

  return (
    <View
      className=" relative flex-1 px-4 py-8"
      style={{
        height: 740,
      }}>
      <View className="w-full items-center">
        <Image
          source={image}
          className="w-full "
          resizeMode="contain"
          style={{
            height: 200,
          }}
        />
      </View>
      <Text className="mb-2 text-center text-2xl font-bold">Xác minh danh tính của bạn</Text>
      <Text className="mb-8 text-center text-base text-gray-500">
        Vui lòng chọn phương thức để tải lên ảnh giấy tờ
      </Text>
      <View className="gap-4">
        {methods.map((method) => (
          <TouchableOpacity
            key={method.key}
            className={`w-full flex-row items-center rounded-xl border p-4 ${
              selected === method.key ? 'bg-primary/10 border-primary' : 'border-gray-200 bg-white'
            }`}
            style={{
              gap: 4,
            }}
            onPress={() => setSelected(method.key)}
            activeOpacity={0.8}>
            <MaterialCommunityIcons
              className="mr-2"
              name={method.icon as any}
              size={20}
              color={selected === method.key ? '#2563eb' : '#4B5563'}
            />
            <View className=" flex-1">
              <Text className="text-lg font-semibold">{method.title}</Text>
              <Text className="text-gray-500">{method.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View className="absolute bottom-0 left-0 right-0 z-10 gap-4 px-4">
        <View className="flex-row items-center justify-center gap-2">
          <MaterialCommunityIcons name="lock" size={14} color={COLORS.light.grey4} />
          <Text className="text-gray-400">Thông tin của bạn sẽ được mã hóa và lưu trữ an toàn</Text>
        </View>
        <Button
          size="lg"
          disabled={!selected}
          className="py-4"
          onPress={() => {
            if (selected) setMethod(selected as 'camera' | 'library');
            setStep(2);
          }}>
          <Text className="text-lg font-semibold text-white">Xác nhận phương thức</Text>
        </Button>
      </View>
    </View>
  );
};

export default ChooseMethod;
