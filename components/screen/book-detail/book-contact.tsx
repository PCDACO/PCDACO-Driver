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
      <Text>
        Hãy xem thêm về{' '}
        <Text
          onPress={() => {
            router.push({
              pathname: '/(screen)/terms/contact',
              params: { id },
            });
          }}
          className="text-primary">
          Điều khoản & chính sách
        </Text>{' '}
        tại đây
      </Text>
    </CardBasic>
  );
};

export default BookContact;
