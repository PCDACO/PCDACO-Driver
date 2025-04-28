import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import ProfileMenuItem from './profile-menu-item';

interface ProfileMenuProps {
  id: string;
}

const ProfileMenu = ({ id }: ProfileMenuProps) => {
  const router = useRouter();

  return (
    <View className="mx-4 overflow-hidden rounded-xl bg-white shadow-sm">
      <ProfileMenuItem
        icon={<Ionicons size={20} name="person-outline" />}
        text="Thông tin cá nhân"
        onPress={() =>
          router.push({
            pathname: '/(screen)/user/[id]',
            params: { id },
          })
        }
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
        onPress={() => {
          router.push({
            pathname: '/(second)/transaction',
          });
        }}
      />

      <ProfileMenuItem
        icon={<Ionicons size={20} name="lock-closed-outline" />}
        text="Thay đổi mật khẩu"
        onPress={() =>
          router.push({
            pathname: '/(screen)/user/password/[id]',
            params: { id },
          })
        }
      />

      <ProfileMenuItem
        icon={<Ionicons size={20} name="shield-outline" />}
        text="Chính sách bảo hành & Tài liệu tham khảo"
        onPress={() => router.push({ pathname: '/(screen)/privacy' })}
      />
      <ProfileMenuItem
        icon={<Ionicons size={20} name="file-tray-full-outline" />}
        text="Báo cáo"
        onPress={() =>
          router.push({
            pathname: '/(screen)/(reports)/reports',
          })
        }
        isLast
      />
    </View>
  );
};

export default ProfileMenu;
