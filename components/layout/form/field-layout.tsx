import React from 'react';
import { Text, View } from 'react-native';

interface FieldLayoutProps {
  children: React.ReactNode;
  label: string;
}

const FieldLayout: React.FC<FieldLayoutProps> = ({ children, label }) => {
  return (
    <View className="flex flex-col gap-2">
      <Text className="text-foreground">{label}</Text>
      <View>{children}</View>
    </View>
  );
};

export default FieldLayout;
