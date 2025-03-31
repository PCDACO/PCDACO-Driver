import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import { useBookingContractQuery } from '~/hooks/book/use-book';

const TermContact: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  console.log('id', id);
  const { data, isLoading } = useBookingContractQuery(id as string);

  console.log('data', data);

  return (
    <View>
      <Text>Điều khoản & chính sách</Text>
    </View>
  );
};

export default TermContact;
