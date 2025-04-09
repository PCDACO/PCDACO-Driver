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
        {/* Car */}
        <Stack.Screen
          name="car/[id]"
          options={{
            headerShown: false,
          }}
        />

        {/* Booking */}
        <Stack.Screen
          name="booking/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Thời gian thuê',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="booking/report/[id]"
          options={{
            headerShown: true,
            animation: 'fade_from_bottom',
            headerTitle: 'Báo cáo',
            headerTitleAlign: 'center',
            headerBackButtonDisplayMode: 'minimal',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
            },
          }}
        />

        {/* License */}
        <Stack.Screen
          name="license/license-edit"
          options={{
            headerShown: false,
          }}
        />

        {/* Terms */}
        <Stack.Screen
          name="terms/contact"
          options={{
            headerShown: true,
            headerTitle: 'Điều khoản & chính sách',
          }}
        />
        <Stack.Screen
          name="terms/condition"
          options={{
            headerShown: true,
            headerTitle: 'Điều khoản & Điều kiện',
          }}
        />

        {/* Search */}
        {/* <Stack.Screen
          name="search-cars"
          options={{
            headerShown: false,
          }}
        /> */}

        {/* Payment */}
        <Stack.Screen
          name="booking/payment"
          options={{
            headerShown: true,
            headerTitle: 'Thanh toán',
            headerTitleAlign: 'center',
          }}
        />
      </Stack>
    </>
  );
};

export default ScreenLayout;
