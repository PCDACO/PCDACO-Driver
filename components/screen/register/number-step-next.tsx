import React from 'react';
import { Text, View } from 'react-native';

interface NumberStepNextProps {
  number: number;
  title: string;
  subtitle: string;
}

const NumberStepNext: React.FC<NumberStepNextProps> = ({ number, title, subtitle }) => {
  return (
    <View className="flex-row items-start gap-2">
      <Text className="rounded-full bg-green-100 px-2 py-1 text-sm font-semibold text-green-600">
        {number}
      </Text>
      <View>
        <Text className="text-sm font-semibold text-foreground">{title}</Text>
        <Text className="text-sm font-semibold text-muted">{subtitle}</Text>
      </View>
    </View>
  );
};

export default NumberStepNext;
