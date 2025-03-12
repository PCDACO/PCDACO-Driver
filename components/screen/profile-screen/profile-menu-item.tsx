import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  text: string;
  onPress: () => void;
  isLast?: boolean;
}

const ProfileMenuItem = ({ icon, text, onPress, isLast = false }: ProfileMenuItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center px-4 py-4 ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <View className="mr-3">{icon}</View>
      <Text className="flex-1 text-gray-800">{text}</Text>
      <Entypo size={24} name="chevron-small-right" />
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;
