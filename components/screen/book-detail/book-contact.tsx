import { router } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';

interface Props {
  id: string;
}

const BookContact: React.FC<Props> = ({ id }) => {
  return (
    <CardBasic>
      <Text className="text-gray-400">
        Hãy xem <Text className="font-bold text-foreground">Điều khoản & chính sách</Text> có trong{' '}
        <Text
          onPress={() => {
            router.push({
              pathname: '/(screen)/(contract)/[id]',
              params: { id },
            });
          }}
          className="text-primary underline">
          hợp đồng
        </Text>
      </Text>
    </CardBasic>
  );
};

export default BookContact;
