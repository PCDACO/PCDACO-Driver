import { FontAwesome6 } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { View, Text, FlatList } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { SvgUri } from 'react-native-svg';

import FieldLayout from '~/components/layout/form/field-layout';
import { Amenity, CarResponseDetail } from '~/constants/models/car.model';
import { cn } from '~/lib/cn';
import { COLORS } from '~/theme/colors';

interface CarMainInfoProps {
  car: CarResponseDetail;
}

interface AmenityItemProps {
  amenity: Amenity;
}

export const AmenityItem = ({ amenity }: AmenityItemProps) => {
  return (
    <View className="flex-1 flex-row items-center gap-2 rounded-lg border border-gray-200 p-2">
      <SvgUri width="24" height="24" uri={amenity.icon} />
      <Text className="text-foreground">{amenity.name}</Text>
    </View>
  );
};

const CarMainInfo: FunctionComponent<CarMainInfoProps> = ({ car }) => {
  const { description, amenities, terms, requiresCollateral } = car;
  return (
    <View className="gap-4">
      <FieldLayout label="Mô tả" className="text-base font-semibold">
        <View className="rounded-lg border border-muted p-4">
          {description.length > 0 ? (
            <Markdown>{description}</Markdown>
          ) : (
            <Text className="text-sm text-muted-foreground">Không có mô tả</Text>
          )}
        </View>
      </FieldLayout>
      <FieldLayout label="Tiện ích" className="text-base font-semibold">
        <FlatList
          data={amenities}
          renderItem={({ item }) => <AmenityItem amenity={item} />}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          numColumns={2}
          columnWrapperStyle={{ gap: 8 }}
          ItemSeparatorComponent={() => <View className="h-2" />}
          ListEmptyComponent={() => (
            <View className="rounded-lg border border-muted p-4">
              <Text className="text-sm text-muted-foreground">Không có tiện ích</Text>
            </View>
          )}
        />
      </FieldLayout>
      <FieldLayout label="Điều khoản" className="text-base font-semibold">
        <View className={cn('mb-2 flex-row items-center gap-2')}>
          <FontAwesome6
            name="shield"
            size={16}
            color={!requiresCollateral ? COLORS.gray : COLORS.green}
          />
          <Text className={cn('text-sm', !requiresCollateral ? 'text-gray-500' : 'text-green-400')}>
            Yêu cầu cọc
          </Text>
        </View>
        <View className="rounded-lg border border-muted p-4">
          {terms.length > 0 ? (
            <Markdown>{terms}</Markdown>
          ) : (
            <Text className="text-sm text-muted-foreground">Không có điều khoản</Text>
          )}
        </View>
      </FieldLayout>
    </View>
  );
};

export default CarMainInfo;
