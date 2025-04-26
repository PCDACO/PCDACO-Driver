import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';

interface HomeLayoutProps {
  children: React.ReactNode;
  isRefetching: boolean;
  onRefresh: () => void;
}

export const HomeLayout: React.FC<HomeLayoutProps> = ({ children, isRefetching, onRefresh }) => {
  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />}>
        <View className="gap-2 pt-4">{children}</View>
      </ScrollView>
    </View>
  );
};
