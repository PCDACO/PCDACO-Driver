import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import SwiperImages from '~/components/ui/swiper-images';

const images = [
  {
    id: '1',
    url: undefined,
  },
];

const CarImages: FunctionComponent = () => {
  return (
    <View>
      <SwiperImages images={images} />
      <Text>Car Images</Text>
    </View>
  );
};
``;
export default CarImages;
