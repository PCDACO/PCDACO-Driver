import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

export const SomethingError = () => {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Something went wrong</Text>
      <Button title="Go to home" onPress={() => router.push('/')} />
    </View>
  );
};
