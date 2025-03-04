import { Link } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

const HomeScreen: FunctionComponent = () => {
  return (
    <View className="gap-4">
      <Text className="text-foreground">HomeScreen</Text>

      <Link href="/(auth)/login">
        <Text className="text-foreground">Login</Text>
      </Link>
    </View>
  );
};

export default HomeScreen;
