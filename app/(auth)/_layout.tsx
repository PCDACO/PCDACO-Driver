import { Stack } from 'expo-router';
import React, { FunctionComponent } from 'react';

const AuthLayout: FunctionComponent = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forget-password" />
    </Stack>
  );
};

export default AuthLayout;
