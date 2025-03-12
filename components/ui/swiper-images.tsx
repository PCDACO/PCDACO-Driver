import React, { FunctionComponent, useState, useEffect } from 'react';
import { FlatList, View, Image, Text, StyleSheet } from 'react-native';

interface SwiperImageItem {
  id: string;
  url: string | undefined;
}

interface SwiperImagesProps {
  images?: SwiperImageItem[];
}

const ImageItem = (data: SwiperImageItem) => {
  if (!data.url) {
    return (
      <View className="h-80 w-full items-center justify-center bg-gray-400">
        <Text className="text-center text-muted-foreground">Image not available</Text>
      </View>
    );
  }

  return (
    <View>
      <Image source={{ uri: data.url }} />
    </View>
  );
};

const SwiperImages: FunctionComponent<SwiperImagesProps> = ({ images }) => {
  const flatlistRef = React.useRef<FlatList<any>>(null);
  const [viewWidth, setViewWidth] = React.useState<number>(0);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  return (
    <View>
      <FlatList
        data={images}
        ref={flatlistRef}
        renderItem={({ item }) => <ImageItem {...item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default SwiperImages;
