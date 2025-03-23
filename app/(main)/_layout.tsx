import Icon from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

import AuthProvider from '~/components/permission/auth-provider';

const MainLayout = () => {
  return (
    <AuthProvider>
      <StatusBar hidden />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: { backgroundColor: '#fff' },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => <Icon name="home" color={color} size={24} />,
            tabBarLabel: 'Trang chủ',
          }}
        />
        <Tabs.Screen
          name="booking"
          options={{
            headerShown: true,
            headerTitle: 'Danh sách đặt xe',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            tabBarIcon: ({ color }) => <Icon name="calendar" color={color} size={24} />,
            tabBarLabel: 'Đặt xe',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => <Icon name="user" color={color} size={24} />,
            tabBarLabel: 'Hồ sơ cá nhân',
          }}
        />
      </Tabs>
    </AuthProvider>
  );
};

export default MainLayout;
