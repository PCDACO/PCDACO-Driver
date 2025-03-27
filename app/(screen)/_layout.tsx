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
          name="car/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="booking/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Thời gian thuê',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="booking/detail/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Thông tin đặt xe',
          }}
        />
        <Stack.Screen
          name="search-cars"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="license/license-edit"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default ScreenLayout;
