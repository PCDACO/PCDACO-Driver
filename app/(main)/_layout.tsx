import { Tabs } from 'expo-router';
import React from 'react';

const MainLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#888',

        tabBarStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="feedbacks" />
    </Tabs>
  );
};

export default MainLayout;
