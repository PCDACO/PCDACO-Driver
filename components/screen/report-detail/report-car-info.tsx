import { Feather, FontAwesome5 } from '@expo/vector-icons';
import React, { FunctionComponent, useState } from 'react';
import { Image, LayoutChangeEvent, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import CardBasic from '~/components/plugins/card-basic';
import Description from '~/components/ui/description';
import Subtitle from '~/components/ui/subtitle';
import { ReportDetailResponse } from '~/constants/models/report.model';
import { COLORS } from '~/theme/colors';

interface ReportCarInfoProps {
  carDetail: ReportDetailResponse['carDetail'];
}

const ReportCarInfo: FunctionComponent<ReportCarInfoProps> = ({ carDetail }) => {
  const { color, imageUrl, licensePlate, manufacturerName, modelName } = carDetail;
  const [width, setWidth] = useState(300);

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  return (
    <CardBasic className="gap-2">
      <Subtitle title="Thông tin xe" />
      <View className="flex-row items-center gap-2">
        <View className="rounded-full bg-gray-100 p-2 dark:bg-gray-900">
          <FontAwesome5 name="car-side" size={24} color={COLORS.gray} />
        </View>

        <View className="gap-1">
          <Subtitle title={`${modelName}`} />
          <Description title={`${manufacturerName} - ${color}`} />
        </View>
      </View>

      <View className="flex-row items-center gap-2">
        <Feather name="tag" size={16} color={COLORS.gray} />
        <Description title={licensePlate} />
      </View>

      <View className="h-0.5 bg-slate-200 dark:bg-slate-800" />

      <Subtitle title="Hình ảnh xe" />
      <View onLayout={handleLayout}>
        {imageUrl.length > 0 ? (
          <Carousel
            loop={false}
            width={width}
            height={160}
            data={imageUrl}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
              <View className="h-40">
                <Image
                  source={{ uri: item as string }}
                  className="h-full w-full rounded-lg"
                  resizeMode="cover"
                />
              </View>
            )}
          />
        ) : (
          <View className="h-40 items-center justify-center rounded-lg border border-gray-300">
            <Text className="text-center text-sm text-gray-500">Không có hình ảnh</Text>
          </View>
        )}
      </View>
    </CardBasic>
  );
};

export default ReportCarInfo;
