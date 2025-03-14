import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import ProfileMenuItem from './profile-menu-item';

const ProfileMenu = () => {
  const router = useRouter();

  return (
    <View className="mx-4 mb-6 overflow-hidden rounded-xl bg-white shadow-sm">
      <ProfileMenuItem
        icon={<Ionicons size={20} name="car-outline" />}
        text="Xe của tôi"
        onPress={() => console.log('My cars pressed')}
      />

      <ProfileMenuItem
        icon={<Ionicons size={20} name="document-text-outline" />}
        text="Chỉnh sửa bằng lái xe"
        onPress={() =>
          router.push({
            pathname: '/(screen)/license/license-edit',
          })
        }
      />

      <ProfileMenuItem
        icon={<Ionicons size={20} name="wallet-outline" />}
        text="Thu nhập & hình thức thanh toán"
        onPress={() => console.log('Income & payment pressed')}
      />

      <ProfileMenuItem
        icon={<Ionicons size={20} name="star-outline" />}
        text="Đánh giá"
        onPress={() => console.log('Reviews pressed')}
      />

      <ProfileMenuItem
        icon={<Ionicons size={20} name="shield-outline" />}
        text="Chính sách bảo hành & Tài liệu tham khảo"
        onPress={() => console.log('Warranty policy pressed')}
        isLast
      />
    </View>
  );
};

export default ProfileMenu;
