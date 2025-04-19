import React, { FunctionComponent } from 'react';
import { Image, View, Text, LayoutChangeEvent } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { BookResponseDetail } from '~/constants/models/book.model';

interface BookImagesProps {
  car: BookResponseDetail['car'];
}

const BookImages: FunctionComponent<BookImagesProps> = ({ car }) => {
  const images = car.carImageUrl || [];
  const [width, setWidth] = React.useState(300);

  const handleOnLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  if (images.length === 0) {
    return (
      <View className="h-60 w-full items-center justify-center rounded-lg bg-slate-200">
        <Text className="text-foreground">Không có hình ảnh</Text>
      </View>
    );
  }

  return (
    <View onLayout={handleOnLayout}>
      <Carousel
        loop
        width={width}
        height={240}
        autoPlay
        data={images}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} className="h-full w-full rounded-lg" resizeMode="cover" />
        )}
      />
    </View>
  );
};

export default BookImages;
