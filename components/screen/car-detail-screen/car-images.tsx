import React, { FunctionComponent } from 'react';
import { ScrollView, Text, View } from 'react-native';

import SwiperImages from '~/components/ui/swiper-images';

const images = [
  {
    id: '1',
    url: undefined,
  },
  {
    id: '2',
    url: undefined,
  },
  {
    id: '3',
    url: undefined,
  },
];

const CarImages: FunctionComponent = () => {
  return (
    <View>
      <SwiperImages images={images} />
    </View>
  );
};
export default CarImages;
