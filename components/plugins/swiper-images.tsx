import React, { FunctionComponent } from 'react';
import { FlatList, View, Image, Text } from 'react-native';

export interface SwiperImageItem {
  id: string;
  url: string | undefined;
}

interface SwiperImagesProps {
  images?: SwiperImageItem[];
}

const ImageItem = (data: SwiperImageItem) => {
  if (!data) {
    return (
      <View className="h-96 w-screen flex-1 items-center justify-center bg-gray-400">
        <Text className="text-center text-muted-foreground">Image not available</Text>
      </View>
    );
  }

  return <Image className="h-96 w-screen rounded-lg object-cover " source={{ uri: data.url }} />;
};

const SwiperImages: FunctionComponent<SwiperImagesProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const flatlistRef = React.useRef<FlatList<any>>(null);

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index + 1);
    } else {
      setActiveIndex(0);
    }
  };

  return (
    <View className="relative w-screen">
      <FlatList
        className="w-screen rounded-lg"
        data={images}
        ref={flatlistRef}
        renderItem={({ item }) => (
          <View className="relative w-screen">
            <ImageItem {...item} />
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View className="absolute bottom-4 right-4 rounded-full bg-black/50 p-2">
        <Text className="text-white">
          {activeIndex} / {images?.length}
        </Text>
      </View>
    </View>
  );
};

export default SwiperImages;
