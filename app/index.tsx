import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Link, router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import Subtitle from '~/components/ui/subtitle';
import { ANIMATION_CONFIGS } from '~/configs/animated.config';
import { useBottomSheet } from '~/hooks/plugins/use-bottom-sheet';
import { useAuthStore } from '~/store/auth-store';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CAR_WIDTH = 400;
const CAR_HEIGHT = CAR_WIDTH * 0.5;

const HEADER_WIDTH = 600;
const HEADER_HEIGHT = 400;

const driverCar = require('~/assets/images/drive-car.png');
const header = require('~/assets/images/header.png');

export default function App() {
  const translateX = useRef(new Animated.Value(-CAR_WIDTH)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const fadeOutOpacity = useRef(new Animated.Value(1)).current;
  const hasAnimated = useRef(false);

  const { isAuthenticated } = useAuthStore();

  const snapPoints = React.useMemo(() => ['1%', '45%'], []);

  const { sheetRef, handleSnapPress, handleSheetChange } = useBottomSheet({ snapPoints });
  const moveUp = useRef(new Animated.Value(0)).current;
  const moveRight = useRef(new Animated.Value(0)).current;

  // Reset animation values when auth state changes
  useEffect(() => {
    if (!isAuthenticated) {
      translateX.setValue(-CAR_WIDTH);
      textOpacity.setValue(0);
      fadeOutOpacity.setValue(1);
      moveUp.setValue(0);
      moveRight.setValue(0);
      hasAnimated.current = false;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const centerX = (screenWidth - CAR_WIDTH) / 2;

    Animated.sequence([
      // Driver move from left to right
      Animated.timing(translateX, {
        toValue: centerX,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(translateX, {
        toValue: screenWidth,
        duration: 1200,
        useNativeDriver: true,
      }),

      // header and text fade in
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(moveRight, {
          toValue: 19,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1000),
      isAuthenticated
        ? Animated.timing(fadeOutOpacity, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          })
        : Animated.parallel([
            Animated.timing(moveUp, {
              toValue: -150,
              duration: 800,
              useNativeDriver: true,
            }),
          ]),
    ]).start(({ finished }) => {
      if (finished) {
        if (isAuthenticated) {
          router.replace('/(main)/home');
        } else {
          setTimeout(() => {
            handleSnapPress(1);
          }, 100);
        }
      }
    });
  }, [isAuthenticated]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeOutOpacity }]}>
      <Animated.Image
        source={driverCar}
        style={[styles.car, { transform: [{ translateX }] }]}
        resizeMode="contain"
      />
      <Animated.Image
        source={header}
        resizeMode="contain"
        style={[
          styles.header,
          { opacity: textOpacity, transform: [{ translateY: moveUp }, { translateX: moveRight }] },
        ]}
      />
      <Animated.Text
        style={[
          styles.text,
          { opacity: textOpacity, transform: [{ translateY: moveUp }, { translateX: moveRight }] },
        ]}>
        FREEDRIVER
      </Animated.Text>
      <BottomSheet
        ref={sheetRef}
        animationConfigs={ANIMATION_CONFIGS}
        snapPoints={snapPoints}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        handleComponent={null}
        enablePanDownToClose={false}
        enableOverDrag={false}>
        <BottomSheetView className="flex-1">
          <View
            className="flex-1 gap-2 bg-primary px-4 py-4"
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              justifyContent: 'space-evenly',
            }}>
            <View className="items-center">
              <Subtitle
                style={{
                  fontSize: 26,
                }}
                title="Chào mừng đã quay trở lại"
              />
            </View>
            <View className=" gap-2">
              <Button
                size="lg"
                className="bg-foreground py-4"
                onPress={() => {
                  router.push({
                    pathname: '/(auth)/login',
                  });
                }}>
                <Text className="text-background">Đăng nhập</Text>
              </Button>
              <Button
                size="lg"
                className="bg-background py-4"
                variant="secondary"
                onPress={() => {
                  router.push({
                    pathname: '/(auth)/register',
                  });
                }}>
                <Text className="text-foreground">Đăng kí</Text>
              </Button>
            </View>
            <View className="flex-row items-center justify-center">
              <View className="w-80">
                <Text className="text-center text-foreground">
                  Để đảm bảo quyền lợi của bạn, xin vui lòng xem kỹ{' '}
                  <Link
                    className="font-semibold text-background underline"
                    href="/(screen)/privacy">
                    chính sách của chúng tôi
                  </Link>
                </Text>
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  car: {
    width: CAR_WIDTH,
    height: CAR_HEIGHT,
    position: 'absolute',
    top: screenHeight / 2 - CAR_HEIGHT / 2 - 30,
  },
  header: {
    width: HEADER_WIDTH,
    height: HEADER_HEIGHT,
    position: 'absolute',
    top: screenHeight / 2 - 260,
    right: -90,
  },
  text: {
    position: 'absolute',
    top: screenHeight / 2 + 90,
    left: 90,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 5,
    color: '#000',
    textAlign: 'center',
  },
});
