import { FunctionComponent, useState, useCallback } from 'react';
import { Text, View, Animated, Image, LayoutAnimation, Platform, UIManager } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import { TransactionResponse } from '~/constants/models/transaction.model';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface CardTransactionProps {
  data: TransactionResponse;
}

const CardTransaction: FunctionComponent<CardTransactionProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <CardBasic onPress={toggleExpand}>
      <View>
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-base font-semibold">{data.type}</Text>
            <Text className="text-sm text-gray-500">{data.description}</Text>
            <Text className="mt-1 text-xs text-gray-400">
              {new Date(data.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <View className="items-end">
            <Text
              className={`text-base font-semibold ${data.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {data.amount >= 0 ? '+' : ''}
              {data.amount.toLocaleString()}
            </Text>
            <Text className="text-xs text-gray-400">
              Balance: {data.balanceAfter.toLocaleString()}
            </Text>
          </View>
        </View>

        {expanded && data.prooUrl && (
          <Image
            source={{ uri: data.prooUrl }}
            resizeMode="cover"
            height={200}
            className="w-full rounded-lg border border-gray-200"
          />
        )}
      </View>
    </CardBasic>
  );
};

export default CardTransaction;
