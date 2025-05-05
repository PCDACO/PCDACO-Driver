import React from 'react';
import { View, ScrollView, RefreshControl, Animated } from 'react-native';

interface HomeLayoutProps {
  children: React.ReactNode;
  isRefetching: boolean;
  onRefresh: () => void;
}

export const HomeLayout: React.FC<HomeLayoutProps> = ({ children, isRefetching, onRefresh }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }} className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />}>
        <View className="gap-2 pt-4">{children}</View>
      </ScrollView>
    </Animated.View>
  );
};
