import React, { FunctionComponent, useState } from 'react';
import { View, Image, LayoutChangeEvent } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import CardBasic from '~/components/plugins/card-basic';
import Subtitle from '~/components/ui/subtitle';
import { ReportDetailResponse } from '~/constants/models/report.model';

interface ReportGalleryProps {
  imageUrls: ReportDetailResponse['imageUrls'];
}

const ReportGallery: FunctionComponent<ReportGalleryProps> = ({ imageUrls }) => {
  const [width, setWidth] = useState(300);

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  return (
    <CardBasic className="gap-2">
      <Subtitle title="Hình ảnh" />
      <View className="h-[300px]" onLayout={handleLayout}>
        <Carousel
          loop={false}
          width={width}
          height={300}
          data={imageUrls}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <View className="flex-1">
              <Image
                source={{ uri: item }}
                className="h-full w-full rounded-lg"
                resizeMode="cover"
              />
            </View>
          )}
        />
      </View>
    </CardBasic>
  );
};

export default ReportGallery;
