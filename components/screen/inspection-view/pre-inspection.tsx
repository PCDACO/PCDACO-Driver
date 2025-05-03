import { Feather, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { LayoutChangeEvent, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import { TextWithIconNoBorder } from '~/components/layout/text-with-icon/text-icon-no-border';
import CardBasic from '~/components/plugins/card-basic';
import { PreInspectionPhotos } from '~/constants/models/book.model';
import { COLORS } from '~/theme/colors';

interface PreInspectionProps {
  preInspectionPhotos: PreInspectionPhotos;
}

const PreInspection: FunctionComponent<PreInspectionProps> = ({ preInspectionPhotos }) => {
  const { carKey, exteriorCar, fuelGauge, parkingLocation, trunkSpace } = preInspectionPhotos;

  const [fieldWidth, setFieldWidth] = React.useState<number>(300);

  const handleLayout = (event: LayoutChangeEvent) => {
    setFieldWidth(event.nativeEvent.layout.width);
  };

  const renderImageField = (title: string, icon: React.ReactNode, image: string[]) => (
    <View onLayout={handleLayout} className="gap-2">
      <TextWithIconNoBorder icon={icon} fontWeight="bold" text={title} fontSize="md" />

      {image && image.length > 0 ? (
        <Carousel
          loop
          width={fieldWidth}
          height={200}
          autoPlay={false}
          data={image}
          renderItem={({ item }) => (
            <Animated.Image
              source={{ uri: item }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
          )}
        />
      ) : (
        <View className="h-40 flex-row items-center justify-center gap-2">
          <Feather name="camera" size={20} color={COLORS.black} />
          <Text>Không có hình ảnh</Text>
        </View>
      )}
    </View>
  );

  return (
    <CardBasic className="gap-8">
      {renderImageField(
        'Ảnh Ngoại Thất',
        <Feather name="camera" size={20} color={COLORS.black} />,
        exteriorCar
      )}

      {renderImageField(
        'Ảnh Đồng Hồ Xăng',
        <MaterialCommunityIcons name="gas-station-outline" size={20} color={COLORS.black} />,
        fuelGauge
      )}

      {renderImageField(
        'Ảnh Chìa Khóa Xe',
        <Ionicons name="key-outline" size={20} color={COLORS.black} />,
        carKey
      )}

      {renderImageField(
        'Ảnh Cốp Xe',
        <MaterialCommunityIcons name="car-outline" size={20} color={COLORS.black} />,
        trunkSpace
      )}

      {renderImageField(
        'Ảnh Vị Trí Đỗ Xe',
        <SimpleLineIcons name="location-pin" size={20} color={COLORS.black} />,
        parkingLocation
      )}
    </CardBasic>
  );
};

export default PreInspection;
