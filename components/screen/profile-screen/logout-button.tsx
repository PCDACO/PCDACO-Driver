import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useAuthStore } from '~/store/auth-store';

const LogoutButton = () => {
  const { removeTokens } = useAuthStore();
  return (
    <TouchableOpacity
      className="mx-4 flex-row items-center justify-center rounded-xl bg-white p-4 shadow-sm"
      onPress={() => {
        removeTokens();
        router.navigate('/');
      }}>
      <MaterialIcons size={20} name="logout" color="red" />
      <Text className="ml-2 font-medium text-destructive">Đăng xuất</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
