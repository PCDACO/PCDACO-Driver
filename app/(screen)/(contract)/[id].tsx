import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import Loading from '~/components/plugins/loading';
import { useBookingContractQuery } from '~/hooks/book/use-book';
import { COLORS } from '~/theme/colors';

const ContractScreen: FunctionComponent = () => {
  const { id } = useLocalSearchParams();

  const { data: contract, isLoading } = useBookingContractQuery(id as string);

  if (isLoading) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <Loading />
        <Text className="mt-2 text-foreground">Đang tải thông tin hợp đồng...</Text>
      </View>
    );
  }

  if (!contract) {
    return (
      <View className="h-full flex-1 items-center justify-center gap-2">
        <Feather name="file-text" size={24} color={COLORS.gray} />
        <Text className="font-bold text-foreground text-gray-400">Không tìm thấy hợp đồng</Text>
      </View>
    );
  }

  return <WebView source={{ html: contract }} />;
};

export default ContractScreen;
