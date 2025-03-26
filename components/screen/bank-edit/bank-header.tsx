import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Pressable, View } from 'react-native';

import { COLORS } from '~/theme/colors';

const BankHeader: FunctionComponent = () => {
  return (
    <View>
      <Pressable onPress={() => router.back()} className="size-10 items-center justify-center ">
        <Feather name="arrow-left" size={24} color={COLORS.black} />
      </Pressable>
    </View>
  );
};

export default BankHeader;
