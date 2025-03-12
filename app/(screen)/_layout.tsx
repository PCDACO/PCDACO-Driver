import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { FunctionComponent } from 'react';

const ScreenLayout: FunctionComponent = () => {
  return (
    <>
      <StatusBar hidden />
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="/(car)/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default ScreenLayout;
