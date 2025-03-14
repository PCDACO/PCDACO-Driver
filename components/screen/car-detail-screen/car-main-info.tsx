import { FontAwesome6 } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { View, Text, Image, FlatList } from 'react-native';

import FieldLayout from '~/components/layout/form/field-layout';
import { Amenity, CarResponseDetail } from '~/constants/models/car.model';
import { cn } from '~/lib/cn';

interface CarMainInfoProps {
  car: CarResponseDetail;
}

const AmenityItem = ({ amenity }: { amenity: Amenity }) => {
  return (
    <View className="flex-row items-center gap-2">
      <Image source={{ uri: amenity.icon }} className="h-4 w-4" />
      <Text>{amenity.name}</Text>
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
            <Text className="text-sm text-muted-foreground">{description}</Text>
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
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          ListEmptyComponent={() => (
            <View className="rounded-lg border border-muted p-4">
              <Text className="text-sm text-muted-foreground">Không có tiện ích</Text>
            </View>
          )}
        />
      </FieldLayout>
      <FieldLayout label="Điều khoản" className="text-base font-semibold">
        <View className={cn('mb-2 flex-row items-center gap-2')}>
          <FontAwesome6 name="shield" size={16} color={requiresCollateral ? 'gray' : 'orange'} />
          <Text className={cn('text-sm', requiresCollateral ? 'text-gray-500' : 'text-orange-400')}>
            Yêu cầu cọc
          </Text>
        </View>
        <View className="rounded-lg border border-muted p-4">
          {terms.length > 0 ? (
            <Text className="text-sm text-muted-foreground">{terms}</Text>
          ) : (
            <Text className="text-sm text-muted-foreground">Không có điều khoản</Text>
          )}
        </View>
      </FieldLayout>
    </View>
  );
};

export default CarMainInfo;
