import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { Animated, View, Text } from 'react-native';

import MainScene from '~/assets/animation/animation.json';

export default function LoadingAnimation() {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }} className="relative items-center justify-center">
      <LottieView source={MainScene} autoPlay loop style={{ width: 300, height: 300 }} />
      <View className="absolute bottom-10">
        <Text className="text-sm text-gray-500">Đang tải dữ liệu...</Text>
      </View>
    </Animated.View>
  );
}
