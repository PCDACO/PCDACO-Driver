import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import SwiperImages, { SwiperImageItem } from '~/components/ui/swiper-images';

interface CarImagesProps {
  images: SwiperImageItem[];
}

const CarImages: FunctionComponent<CarImagesProps> = ({ images }) => {
  return (
    <View>
      <SwiperImages images={images} />
    </View>
  );
};
export default CarImages;
