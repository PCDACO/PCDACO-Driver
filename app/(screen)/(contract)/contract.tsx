import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import Loading from '~/components/plugins/loading';
import { usePreviewContactQuery } from '~/hooks/contact/use-contact';
import { useContractParamsStore } from '~/store/use-params';

const ContractScreen: FunctionComponent = () => {
  const { params } = useContractParamsStore();

  const { data: contract, isLoading } = usePreviewContactQuery({
    carId: params.carId as string,
    startTime: new Date(params.startTime as Date),
    endTime: new Date(params.endTime as Date),
  });

  if (isLoading) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <Loading />
        <Text className="mt-2 text-muted-foreground">Đang tải thông tin hợp đồng...</Text>
      </View>
    );
  }

  return <WebView source={{ html: contract }} />;
};

export default ContractScreen;
