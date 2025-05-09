import { Feather } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { FunctionComponent } from 'react';
import { Pressable } from 'react-native';

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
          name="booking/page"
          options={{
            headerShown: true,
            headerTitle: 'Thời gian thuê',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="booking/payment"
          options={{
            headerShown: true,
            headerTitle: 'Thanh toán',
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

        <Stack.Screen
          name="booking/inspection/view"
          options={{
            headerShown: true,
            headerTitle: 'Trạng thái xe',
            headerTitleAlign: 'center',
            headerBackButtonDisplayMode: 'minimal',
            animation: 'slide_from_right',
            presentation: 'modal',
          }}
        />

        <Stack.Screen
          name="booking/extend"
          options={{
            headerShown: true,
            headerTitle: 'Gia hạn chuyến đi',
            headerTitleAlign: 'center',
            headerBackButtonDisplayMode: 'minimal',
            animation: 'slide_from_right',
            presentation: 'modal',
          }}
        />

        <Stack.Screen
          name="(signature)/book/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Chữ ký',
            headerTitleAlign: 'center',
            headerBackButtonDisplayMode: 'minimal',
            animation: 'slide_from_right',
            presentation: 'modal',
          }}
        />

        {/* Contract */}
        <Stack.Screen
          name="(contract)/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Hợp đồng',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="(contract)/contract"
          options={{
            headerShown: true,
            headerTitle: 'Hợp đồng đặt xe',
            headerTitleAlign: 'center',
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

        {/* Reports */}
        <Stack.Screen
          name="(reports)/reports"
          options={{
            headerShown: true,
            headerTitle: 'Danh sách báo cáo',
            headerTitleAlign: 'center',
            headerBackButtonDisplayMode: 'minimal',
            animation: 'slide_from_right',
            headerLeft: () => (
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/profile',
                  })
                }>
                <Feather name="arrow-left" size={24} color="black" />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="(reports)/detail/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Chi tiết báo cáo',
            headerTitleAlign: 'center',
            headerBackButtonDisplayMode: 'minimal',
            animation: 'slide_from_right',
            headerLeft: () => (
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/(screen)/(reports)/reports',
                  })
                }>
                <Feather name="arrow-left" size={24} color="black" />
              </Pressable>
            ),

            headerRight: () => (
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/(main)/home',
                  })
                }>
                <Feather name="home" size={24} color="black" />
              </Pressable>
            ),
          }}
        />

        {/* PRivacy */}
        <Stack.Screen
          name="privacy/index"
          options={{
            headerShown: true,
            headerTitle: '',
            headerTitleAlign: 'center',
            headerBackButtonDisplayMode: 'minimal',
            animation: 'slide_from_right',
          }}
        />

        {/* Withdraw */}
        <Stack.Screen
          name="(withdraw)/index"
          options={{
            headerShown: false,
            headerTitle: 'Rút tiền',
            headerTitleAlign: 'center',
            headerBackButtonDisplayMode: 'minimal',
            animation: 'slide_from_right',
          }}
        />

        {/* Optional - Future Feature */}
        {/* <Stack.Screen
          name="search-cars"
          options={{
            headerShown: false,
          }}
        /> */}
      </Stack>
    </>
  );
};

export default ScreenLayout;
