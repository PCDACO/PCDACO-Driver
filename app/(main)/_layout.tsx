import Icon from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';

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
            elevation: 0,
            paddingTop: 4,
            paddingHorizontal: 12,
          },
          tabBarButton: (props) => {
            // @ts-ignore toi qua met moi roi
            const newProps: TouchableOpacityProps = {
              ...props,
              delayLongPress: props.delayLongPress ?? undefined,
              activeOpacity: 1,
              disabled: props.disabled ?? undefined,
              onBlur: props.onBlur ?? undefined,
            };
            return <TouchableOpacity {...newProps} />;
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: '',
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
            tabBarLabel: '',
            tabBarIcon: ({ color }) => <Icon name="search" color={color} size={20} />,
            headerStyle: {
              height: 30,
            },
            animation: 'fade',
          }}
        />
        <Tabs.Screen
          name="booking"
          options={{
            tabBarLabel: '',
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
            tabBarLabel: '',
            tabBarIcon: ({ color }) => <Icon name="user" color={color} size={20} />,
            animation: 'fade',
          }}
        />
      </Tabs>
    </>
  );
};

export default MainLayout;
