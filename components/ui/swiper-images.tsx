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
      <View className="h-96 w-screen flex-1 items-center justify-center bg-gray-400">
        <Text className="text-center text-muted-foreground">Image not available</Text>
      </View>
    );
  }

  return (
    <View className="w-screen bg-yellow-400">
      <Image className="h-96 w-screen" source={{ uri: data.url }} />
    </View>
  );
};

const SwiperImages: FunctionComponent<SwiperImagesProps> = ({ images }) => {
  const flatlistRef = React.useRef<FlatList<any>>(null);

  return (
    <View className="w-screen">
      <FlatList
        className="w-screen "
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
