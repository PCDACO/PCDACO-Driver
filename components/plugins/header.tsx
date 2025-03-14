import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  children?: React.ReactNode;
}

const Header = ({ title, showBack = true, children }: HeaderProps) => {
  const router = useRouter();
  return (
    <View className="min-h-18 flex-row items-center justify-between bg-white p-4 dark:bg-slate-900  ">
      <View className="flex-row items-center gap-2">
        {showBack && (
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
        )}
        <Text className="text-lg font-bold">{title}</Text>
      </View>
      {children}
    </View>
  );
};

export default Header;
