import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { FunctionComponent, useEffect } from 'react';
import { Text, View, Dimensions, ScrollView, Animated } from 'react-native';
import { useSharedValue, withSpring } from 'react-native-reanimated';

import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { Button } from '~/components/nativewindui/Button';
import { Text as TextUI } from '~/components/nativewindui/Text';
import CarBasicInfo from '~/components/screen/car-detail-screen/car-basic-info';
import CarConfiguration from '~/components/screen/car-detail-screen/car-configuration';
import CarHeader from '~/components/screen/car-detail-screen/car-header';
import CarImages from '~/components/screen/car-detail-screen/car-images';
import CarMainInfo from '~/components/screen/car-detail-screen/car-main-info';
import OwnerContactInfor from '~/components/screen/car-detail-screen/owner-contact-infor';
import { SwiperImageItem } from '~/components/ui/swiper-images';
import { useCarDetailQuery } from '~/hooks/car/use-car';
import { usePanResponder } from '~/hooks/plugins/use-pan-responder';
// import { useSwipeComplete } from '~/hooks/plugins/use-swipe-complete';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const CarDetail: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const translateY = useSharedValue(SCREEN_HEIGHT * 0.6);

  // Sheet
  const { slideAnim, panResponder: sheetPanResponder } = usePanResponder({
    onExpand: () => setIsExpanded(true),
    onCollapse: () => setIsExpanded(false),
  });

  const { data, isLoading } = useCarDetailQuery(id as string);

  const handleComplete = () => {
    router.push({
      pathname: '/booking/[id]',
      params: {
        id: data?.value.id as string,
      },
    });
  };

  // Swipe to complete booking
  // const {
  //   panResponder,
  //   translateX: buttonTranslateX,
  //   scale: buttonScale,
  //   isCompleted,
  // } = useSwipeComplete({
  //   onComplete: handleComplete,
  // });

  useEffect(() => {
    translateY.value = withSpring(SCREEN_HEIGHT * 0.4, {
      damping: 15,
      stiffness: 40,
    });
  }, []);

  if (isLoading || !data) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 text-muted-foreground">Đang tải thông tin xe...</Text>
      </View>
    );
  }

  const carImages: SwiperImageItem[] =
    data?.value.images
      .filter((item) => item.type === 'Car')
      .map((image) => ({
        id: image.id,
        url: image.url,
      })) || [];

  return (
    <View className="relative flex-1 bg-slate-100 dark:bg-slate-900">
      <CarHeader />
      <CarImages images={carImages} />

      <Animated.View
        className="absolute bottom-0 left-0 right-0 top-0 z-10 items-center justify-center rounded-t-3xl border border-gray-200 bg-white px-6 shadow-lg dark:border-gray-800 dark:bg-slate-900"
        style={{
          paddingTop: 10,
          transform: [{ translateY: slideAnim }],
        }}>
        <View {...sheetPanResponder.panHandlers} className="h-6 w-full items-center justify-center">
          <View className="h-1 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />
        </View>

        <ScrollView
          className="mb-10 h-screen w-full"
          scrollEnabled={isExpanded}
          style={{
            marginBottom: 100,
          }}
          showsVerticalScrollIndicator={false}>
          <View
            className=" h-full gap-6 py-2"
            style={{
              marginBottom: 20,
            }}>
            <View className="gap-4 pb-32">
              <CarBasicInfo car={data.value} />
              <CarConfiguration car={data.value} />
              <OwnerContactInfor car={data.value} />
              <CarMainInfo car={data.value} />
            </View>
          </View>
        </ScrollView>
      </Animated.View>

      <View className="absolute bottom-8 left-0 right-0 z-20 px-6 shadow-sm">
        <Button onPress={handleComplete} className="w-full">
          <TextUI>Đặt xe</TextUI>
        </Button>
      </View>

      {/* <View className="absolute bottom-8 left-0 right-0 z-20 px-6 shadow-sm">
        <View className="bg-foreground/20 h-12 w-full overflow-hidden rounded-full ">
          <Animated.View
            className="absolute left-1 top-1 size-10 items-center justify-center rounded-full bg-blue-500"
            style={{
              transform: [{ translateX: buttonTranslateX }, { scale: buttonScale }],
            }}
            {...panResponder.panHandlers}>
            <FontAwesome name="arrow-right" size={20} color="white" />
          </Animated.View>
          <View className="h-full w-full items-center justify-center">
            <Text className="text-base font-bold text-background ">
              {isCompleted ? 'Đặt xe thành công!' : 'Vuốt để đặt xe'}
            </Text>
          </View>
        </View>
      </View> */}
    </View>
  );
};

export default CarDetail;
