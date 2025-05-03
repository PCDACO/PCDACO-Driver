import Icon from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

const MainLayout = () => {
  return (
    <>
      <StatusBar hidden />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            backgroundColor: '#fff',
            height: 60,
            paddingBottom: 10,
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color }) => <Icon name="home" color={color} size={20} />,
            headerStyle: {
              height: 30,
            },
            animation: 'fade',
          }}
        />
        <Tabs.Screen
          name="car"
          options={{
            tabBarIcon: ({ color }) => <Icon name="car" color={color} size={20} />,
            headerStyle: {
              height: 30,
            },
            animation: 'fade',
          }}
        />
        <Tabs.Screen
          name="booking"
          options={{
            headerShown: true,
            headerTitle: '',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            tabBarIcon: ({ color }) => <Icon name="calendar" color={color} size={20} />,
            animation: 'fade',
            headerStyle: {
              height: 30,
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => <Icon name="user" color={color} size={20} />,
            animation: 'fade',
          }}
        />
      </Tabs>
    </>
  );
};

export default MainLayout;
