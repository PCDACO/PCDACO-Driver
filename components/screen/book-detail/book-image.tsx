import React, { FunctionComponent } from 'react';
import { Image, View, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { BookResponseDetail } from '~/constants/models/book.model';

interface BookImagesProps {
  car: BookResponseDetail['car'];
}

const BookImages: FunctionComponent<BookImagesProps> = ({ car }) => {
  const images = car.carImageUrl || [];

  if (images.length === 0) {
    return (
      <View className="h-60 w-full items-center justify-center rounded-lg bg-slate-200">
        <Text className="text-foreground">Không có hình ảnh</Text>
      </View>
    );
  }

  return (
    <Carousel
      loop
      width={340}
      height={240}
      autoPlay
      data={images}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} className="h-full w-full rounded-lg" resizeMode="cover" />
      )}
    />
  );
};

export default BookImages;
