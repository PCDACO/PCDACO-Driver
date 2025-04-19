import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { LayoutChangeEvent, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import { TextWithIconNoBorder } from '~/components/layout/text-with-icon/text-icon-no-border';
import CardBasic from '~/components/plugins/card-basic';
import { PostInspectionPhotos } from '~/constants/models/book.model';
import { COLORS } from '~/theme/colors';

interface PostInspectionProps {
  postInspectionPhotos: PostInspectionPhotos;
}

const PostInspection: FunctionComponent<PostInspectionProps> = ({ postInspectionPhotos }) => {
  const { fuelGaugeFinal, cleanliness, scratches, tollFees } = postInspectionPhotos;

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
        'Ảnh Đồng Hồ Xăng',
        <MaterialCommunityIcons name="gauge" size={20} color={COLORS.black} />,
        fuelGaugeFinal
      )}

      {renderImageField(
        'Ảnh Nội Thất',
        <MaterialCommunityIcons name="car-seat" size={20} color={COLORS.black} />,
        cleanliness
      )}

      {renderImageField(
        'Ảnh Xước Xát',
        <MaterialCommunityIcons name="car-wrench" size={20} color={COLORS.black} />,
        scratches
      )}

      {renderImageField(
        'Ảnh Phí Đường',
        <MaterialCommunityIcons name="road-variant" size={20} color={COLORS.black} />,
        tollFees
      )}
    </CardBasic>
  );
};

export default PostInspection;
